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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
                ],
            ],
            "entity" => [
        'era' => [
          'fields' => [
            [
              'name' => 'end_date',
              'title' => 'End Date',
              'type' => '`$STRING`',
              'format' => 'date',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'start_date',
              'title' => 'Start Date',
              'type' => '`$STRING`',
              'format' => 'date',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'era',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/eras',
                  'segments' => [
                    [
                      'lit' => 'eras',
                    ],
                  ],
                  'parts' => [
                    'eras',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [],
                  'select' => [],
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
              'title' => 'Shows',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'songs',
              'title' => 'Songs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'venues',
              'title' => 'Venues',
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
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'segments' => [
                    [
                      'lit' => 'search',
                    ],
                  ],
                  'parts' => [
                    'search',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'term',
                        'orig' => 'term',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'term',
                    ],
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
              'title' => 'Data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'date',
              'title' => 'Date',
              'type' => '`$STRING`',
              'short' => 'Date of the show',
              'format' => 'date',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'Unique identifier for the show',
            ],
            [
              'name' => 'location',
              'title' => 'Location',
              'type' => '`$STRING`',
              'short' => 'Location of the venue',
            ],
            [
              'name' => 'page',
              'title' => 'Page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'show_count',
              'title' => 'Show Count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'success',
              'title' => 'Success',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'total_entries',
              'title' => 'Total Entries',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'total_pages',
              'title' => 'Total Pages',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tour_id',
              'title' => 'Tour Id',
              'type' => '`$INTEGER`',
              'short' => 'ID of the tour',
            ],
            [
              'name' => 'tour_name',
              'title' => 'Tour Name',
              'type' => '`$STRING`',
              'short' => 'Name of the tour',
            ],
            [
              'name' => 'tracks',
              'title' => 'Tracks',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'venue_id',
              'title' => 'Venue Id',
              'type' => '`$INTEGER`',
              'short' => 'ID of the venue',
            ],
            [
              'name' => 'venue_name',
              'title' => 'Venue Name',
              'type' => '`$STRING`',
              'short' => 'Name of the venue',
            ],
            [
              'name' => 'year',
              'title' => 'Year',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'show',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/shows',
                  'segments' => [
                    [
                      'lit' => 'shows',
                    ],
                  ],
                  'parts' => [
                    'shows',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'sort_attr',
                        'orig' => 'sort_attr',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort_dir',
                        'orig' => 'sort_dir',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'desc',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'per_page',
                      'sort_attr',
                      'sort_dir',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/years',
                  'segments' => [
                    [
                      'lit' => 'years',
                    ],
                  ],
                  'parts' => [
                    'years',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/shows/on-date/{date}',
                  'segments' => [
                    [
                      'lit' => 'shows',
                    ],
                    [
                      'lit' => 'on-date',
                    ],
                    [
                      'var' => 'date',
                    ],
                  ],
                  'parts' => [
                    'shows',
                    'on-date',
                    '{date}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/shows/{id}',
                  'segments' => [
                    [
                      'lit' => 'shows',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'shows',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/years/{year}',
                  'segments' => [
                    [
                      'lit' => 'years',
                    ],
                    [
                      'var' => 'year',
                    ],
                  ],
                  'parts' => [
                    'years',
                    '{year}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'year',
                        'orig' => 'year',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'year',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/random-show',
                  'segments' => [
                    [
                      'lit' => 'random-show',
                    ],
                  ],
                  'parts' => [
                    'random-show',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'song' => [
          'fields' => [
            [
              'name' => 'alias',
              'title' => 'Alias',
              'type' => '`$STRING`',
              'short' => 'Alternative name or alias',
            ],
            [
              'name' => 'debut',
              'title' => 'Debut',
              'type' => '`$STRING`',
              'short' => 'Date of first performance',
              'format' => 'date',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'Unique identifier for the song',
            ],
            [
              'name' => 'last_played',
              'title' => 'Last Played',
              'type' => '`$STRING`',
              'short' => 'Date of most recent performance',
              'format' => 'date',
            ],
            [
              'name' => 'times_played',
              'title' => 'Times Played',
              'type' => '`$INTEGER`',
              'short' => 'Number of times the song has been played',
            ],
            [
              'name' => 'title',
              'title' => 'Title',
              'type' => '`$STRING`',
              'short' => 'Title of the song',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'song',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/songs',
                  'segments' => [
                    [
                      'lit' => 'songs',
                    ],
                  ],
                  'parts' => [
                    'songs',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'sort_attr',
                        'orig' => 'sort_attr',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort_dir',
                        'orig' => 'sort_dir',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'asc',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'per_page',
                      'sort_attr',
                      'sort_dir',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/songs/{id}',
                  'segments' => [
                    [
                      'lit' => 'songs',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'songs',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
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
              'title' => 'End Date',
              'type' => '`$STRING`',
              'format' => 'date',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'shows_count',
              'title' => 'Shows Count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'start_date',
              'title' => 'Start Date',
              'type' => '`$STRING`',
              'format' => 'date',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'tour',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tours',
                  'segments' => [
                    [
                      'lit' => 'tours',
                    ],
                  ],
                  'parts' => [
                    'tours',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tours/{id}',
                  'segments' => [
                    [
                      'lit' => 'tours',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'tours',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
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
              'title' => 'Duration',
              'type' => '`$INTEGER`',
              'short' => 'Duration in seconds',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'Unique identifier for the track',
            ],
            [
              'name' => 'mp3',
              'title' => 'Mp3',
              'type' => '`$STRING`',
              'short' => 'URL to MP3 file',
            ],
            [
              'name' => 'position',
              'title' => 'Position',
              'type' => '`$INTEGER`',
              'short' => 'Position in the setlist',
            ],
            [
              'name' => 'set',
              'title' => 'Set',
              'type' => '`$STRING`',
              'short' => 'Set identifier (e.g., 1, 2, E for encore)',
            ],
            [
              'name' => 'show_id',
              'title' => 'Show Id',
              'type' => '`$INTEGER`',
              'short' => 'ID of the show',
            ],
            [
              'name' => 'song_id',
              'title' => 'Song Id',
              'type' => '`$INTEGER`',
              'short' => 'ID of the song',
            ],
            [
              'name' => 'title',
              'title' => 'Title',
              'type' => '`$STRING`',
              'short' => 'Title of the track/song',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'track',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tracks/{id}',
                  'segments' => [
                    [
                      'lit' => 'tracks',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'tracks',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
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
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'Unique identifier for the venue',
            ],
            [
              'name' => 'latitude',
              'title' => 'Latitude',
              'type' => '`$NUMBER`',
              'format' => 'float',
            ],
            [
              'name' => 'location',
              'title' => 'Location',
              'type' => '`$STRING`',
              'short' => 'Location (city, state/country)',
            ],
            [
              'name' => 'longitude',
              'title' => 'Longitude',
              'type' => '`$NUMBER`',
              'format' => 'float',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Name of the venue',
            ],
            [
              'name' => 'shows_count',
              'title' => 'Shows Count',
              'type' => '`$INTEGER`',
              'short' => 'Number of shows at this venue',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'venue',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/venues',
                  'segments' => [
                    [
                      'lit' => 'venues',
                    ],
                  ],
                  'parts' => [
                    'venues',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'sort_attr',
                        'orig' => 'sort_attr',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort_dir',
                        'orig' => 'sort_dir',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'asc',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'per_page',
                      'sort_attr',
                      'sort_dir',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/venues/{id}',
                  'segments' => [
                    [
                      'lit' => 'venues',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'venues',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
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
