<?php
declare(strict_types=1);

// PhishIn SDK configuration

class PhishInConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PhishIn",
                "slug" => "phish-in",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://phish.in/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "era" => [],
                    "search" => [],
                    "show" => [],
                    "song" => [],
                    "tour" => [],
                    "track" => [],
                    "venue" => [],
                    "year" => [],
                ],
            ],
            "entity" => [
        'era' => [
          'fields' => [
            [
              'name' => 'end_date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'start_date',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'era',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/eras',
                  'parts' => [
                    'eras',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'shows',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'songs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'venues',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'search',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'term',
                        'orig' => 'term',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'parts' => [
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'term',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'show' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'date',
              'short' => 'Date of the show',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the show',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'location',
              'short' => 'Location of the venue',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'show_count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'total_entries',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'total_pages',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tour_id',
              'short' => 'ID of the tour',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tour_name',
              'short' => 'Name of the tour',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tracks',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'venue_id',
              'short' => 'ID of the venue',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'venue_name',
              'short' => 'Name of the venue',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'show',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort_attr',
                        'orig' => 'sort_attr',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'desc',
                        'kind' => 'query',
                        'name' => 'sort_dir',
                        'orig' => 'sort_dir',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/shows',
                  'parts' => [
                    'shows',
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'per_page',
                      'sort_attr',
                      'sort_dir',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/years',
                  'parts' => [
                    'years',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/shows/on-date/{date}',
                  'parts' => [
                    'shows',
                    'on-date',
                    '{date}',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/shows/{id}',
                  'parts' => [
                    'shows',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/years/{year}',
                  'parts' => [
                    'years',
                    '{year}',
                  ],
                  'select' => [
                    'exist' => [
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/random-show',
                  'parts' => [
                    'random-show',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'on_date',
              ],
              [
                'year',
              ],
            ],
          ],
        ],
        'song' => [
          'fields' => [
            [
              'name' => 'alias',
              'short' => 'Alternative name or alias',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'debut',
              'short' => 'Date of first performance',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the song',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'last_played',
              'short' => 'Date of most recent performance',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'times_played',
              'short' => 'Number of times the song has been played',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'title',
              'short' => 'Title of the song',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'song',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort_attr',
                        'orig' => 'sort_attr',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'asc',
                        'kind' => 'query',
                        'name' => 'sort_dir',
                        'orig' => 'sort_dir',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/songs',
                  'parts' => [
                    'songs',
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'per_page',
                      'sort_attr',
                      'sort_dir',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/songs/{id}',
                  'parts' => [
                    'songs',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'tour' => [
          'fields' => [
            [
              'name' => 'end_date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'shows_count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'start_date',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'tour',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tours',
                  'parts' => [
                    'tours',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tours/{id}',
                  'parts' => [
                    'tours',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'track' => [
          'fields' => [
            [
              'name' => 'duration',
              'short' => 'Duration in seconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the track',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'mp3',
              'short' => 'URL to MP3 file',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'position',
              'short' => 'Position in the setlist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'set',
              'short' => 'Set identifier (e.g., 1, 2, E for encore)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'show_id',
              'short' => 'ID of the show',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'song_id',
              'short' => 'ID of the song',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'title',
              'short' => 'Title of the track/song',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'track',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tracks/{id}',
                  'parts' => [
                    'tracks',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'venue' => [
          'fields' => [
            [
              'name' => 'id',
              'short' => 'Unique identifier for the venue',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'latitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'location',
              'short' => 'Location (city, state/country)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'longitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the venue',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'shows_count',
              'short' => 'Number of shows at this venue',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'venue',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort_attr',
                        'orig' => 'sort_attr',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'asc',
                        'kind' => 'query',
                        'name' => 'sort_dir',
                        'orig' => 'sort_dir',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/venues',
                  'parts' => [
                    'venues',
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'per_page',
                      'sort_attr',
                      'sort_dir',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/venues/{id}',
                  'parts' => [
                    'venues',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'year' => [
          'fields' => [],
          'name' => 'year',
          'op' => [],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PhishInFeatures::make_feature($name);
    }
}
