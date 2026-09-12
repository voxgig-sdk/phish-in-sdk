# PhishIn SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "PhishIn",
            "slug": "phish-in",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://phish.in/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "era": {},
                "search": {},
                "show": {},
                "song": {},
                "tour": {},
                "track": {},
                "venue": {},
                "year": {},
            },
        },
        "entity": {
      "era": {
        "fields": [
          {
            "format": "date",
            "name": "end_date",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "start_date",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "era",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/eras",
                "segments": [
                  {
                    "lit": "eras",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "eras",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "shows",
            "type": "`$ARRAY`",
          },
          {
            "name": "songs",
            "type": "`$ARRAY`",
          },
          {
            "name": "venues",
            "type": "`$ARRAY`",
          },
        ],
        "name": "search",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "term",
                      "orig": "term",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "exist": [
                    "term",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "search",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "show": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "format": "date",
            "name": "date",
            "short": "Date of the show",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the show",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "short": "Location of the venue",
            "type": "`$STRING`",
          },
          {
            "name": "page",
            "type": "`$INTEGER`",
          },
          {
            "name": "show_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "total_entries",
            "type": "`$INTEGER`",
          },
          {
            "name": "total_pages",
            "type": "`$INTEGER`",
          },
          {
            "name": "tour_id",
            "short": "ID of the tour",
            "type": "`$INTEGER`",
          },
          {
            "name": "tour_name",
            "short": "Name of the tour",
            "type": "`$STRING`",
          },
          {
            "name": "tracks",
            "type": "`$ARRAY`",
          },
          {
            "name": "venue_id",
            "short": "ID of the venue",
            "type": "`$INTEGER`",
          },
          {
            "name": "venue_name",
            "short": "Name of the venue",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "show",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "sort_attr",
                      "orig": "sort_attr",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "sort_dir",
                      "orig": "sort_dir",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/shows",
                "segments": [
                  {
                    "lit": "shows",
                  },
                ],
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                    "sort_attr",
                    "sort_dir",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "shows",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/years",
                "segments": [
                  {
                    "lit": "years",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "years",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/shows/on-date/{date}",
                "segments": [
                  {
                    "lit": "shows",
                  },
                  {
                    "lit": "on-date",
                  },
                  {
                    "var": "date",
                  },
                ],
                "select": {
                  "exist": [
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "shows",
                  "on-date",
                  "{date}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/shows/{id}",
                "segments": [
                  {
                    "lit": "shows",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "shows",
                  "{id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "year",
                      "orig": "year",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/years/{year}",
                "segments": [
                  {
                    "lit": "years",
                  },
                  {
                    "var": "year",
                  },
                ],
                "select": {
                  "exist": [
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "years",
                  "{year}",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/random-show",
                "segments": [
                  {
                    "lit": "random-show",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "random-show",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "on_date",
            ],
            [
              "year",
            ],
          ],
        },
      },
      "song": {
        "fields": [
          {
            "name": "alias",
            "short": "Alternative name or alias",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "debut",
            "short": "Date of first performance",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the song",
            "type": "`$INTEGER`",
          },
          {
            "format": "date",
            "name": "last_played",
            "short": "Date of most recent performance",
            "type": "`$STRING`",
          },
          {
            "name": "times_played",
            "short": "Number of times the song has been played",
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "short": "Title of the song",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "song",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "sort_attr",
                      "orig": "sort_attr",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "asc",
                      "kind": "query",
                      "name": "sort_dir",
                      "orig": "sort_dir",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/songs",
                "segments": [
                  {
                    "lit": "songs",
                  },
                ],
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                    "sort_attr",
                    "sort_dir",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "songs",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/songs/{id}",
                "segments": [
                  {
                    "lit": "songs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "songs",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "tour": {
        "fields": [
          {
            "format": "date",
            "name": "end_date",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "shows_count",
            "type": "`$INTEGER`",
          },
          {
            "format": "date",
            "name": "start_date",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "tour",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/tours",
                "segments": [
                  {
                    "lit": "tours",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "tours",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/tours/{id}",
                "segments": [
                  {
                    "lit": "tours",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "tours",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "track": {
        "fields": [
          {
            "name": "duration",
            "short": "Duration in seconds",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the track",
            "type": "`$INTEGER`",
          },
          {
            "name": "mp3",
            "short": "URL to MP3 file",
            "type": "`$STRING`",
          },
          {
            "name": "position",
            "short": "Position in the setlist",
            "type": "`$INTEGER`",
          },
          {
            "name": "set",
            "short": "Set identifier (e.g., 1, 2, E for encore)",
            "type": "`$STRING`",
          },
          {
            "name": "show_id",
            "short": "ID of the show",
            "type": "`$INTEGER`",
          },
          {
            "name": "song_id",
            "short": "ID of the song",
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "short": "Title of the track/song",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "track",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/tracks/{id}",
                "segments": [
                  {
                    "lit": "tracks",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "tracks",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "venue": {
        "fields": [
          {
            "name": "id",
            "short": "Unique identifier for the venue",
            "type": "`$INTEGER`",
          },
          {
            "format": "float",
            "name": "latitude",
            "type": "`$NUMBER`",
          },
          {
            "name": "location",
            "short": "Location (city, state/country)",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "longitude",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "short": "Name of the venue",
            "type": "`$STRING`",
          },
          {
            "name": "shows_count",
            "short": "Number of shows at this venue",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "venue",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "sort_attr",
                      "orig": "sort_attr",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "asc",
                      "kind": "query",
                      "name": "sort_dir",
                      "orig": "sort_dir",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/venues",
                "segments": [
                  {
                    "lit": "venues",
                  },
                ],
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                    "sort_attr",
                    "sort_dir",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "venues",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/venues/{id}",
                "segments": [
                  {
                    "lit": "venues",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "venues",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "year": {
        "fields": [],
        "name": "year",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
