package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PhishIn",
			"slug": "phish-in",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://phish.in/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"era": map[string]any{},
				"search": map[string]any{},
				"show": map[string]any{},
				"song": map[string]any{},
				"tour": map[string]any{},
				"track": map[string]any{},
				"venue": map[string]any{},
				"year": map[string]any{},
			},
		},
		"entity": map[string]any{
			"era": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date",
						"name": "end_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "start_date",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "era",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/eras",
								"segments": []any{
									map[string]any{
										"lit": "eras",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"eras",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "shows",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "songs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "venues",
						"type": "`$ARRAY`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "term",
											"orig": "term",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"term",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"search",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"show": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date",
						"name": "date",
						"short": "Date of the show",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the show",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"short": "Location of the venue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "show_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "total_entries",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_pages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tour_id",
						"short": "ID of the tour",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tour_name",
						"short": "Name of the tour",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tracks",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "venue_id",
						"short": "ID of the venue",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "venue_name",
						"short": "Name of the venue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "show",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort_attr",
											"orig": "sort_attr",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "sort_dir",
											"orig": "sort_dir",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/shows",
								"segments": []any{
									map[string]any{
										"lit": "shows",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
										"sort_attr",
										"sort_dir",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"shows",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/years",
								"segments": []any{
									map[string]any{
										"lit": "years",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"years",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/shows/on-date/{date}",
								"segments": []any{
									map[string]any{
										"lit": "shows",
									},
									map[string]any{
										"lit": "on-date",
									},
									map[string]any{
										"var": "date",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"shows",
									"on-date",
									"{date}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/shows/{id}",
								"segments": []any{
									map[string]any{
										"lit": "shows",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"shows",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "year",
											"orig": "year",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/years/{year}",
								"segments": []any{
									map[string]any{
										"lit": "years",
									},
									map[string]any{
										"var": "year",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"years",
									"{year}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/random-show",
								"segments": []any{
									map[string]any{
										"lit": "random-show",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"random-show",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"on_date",
						},
						[]any{
							"year",
						},
					},
				},
			},
			"song": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alias",
						"short": "Alternative name or alias",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "debut",
						"short": "Date of first performance",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the song",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date",
						"name": "last_played",
						"short": "Date of most recent performance",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "times_played",
						"short": "Number of times the song has been played",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the song",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "song",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort_attr",
											"orig": "sort_attr",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "asc",
											"kind": "query",
											"name": "sort_dir",
											"orig": "sort_dir",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/songs",
								"segments": []any{
									map[string]any{
										"lit": "songs",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
										"sort_attr",
										"sort_dir",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"songs",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/songs/{id}",
								"segments": []any{
									map[string]any{
										"lit": "songs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"songs",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tour": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date",
						"name": "end_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shows_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date",
						"name": "start_date",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "tour",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/tours",
								"segments": []any{
									map[string]any{
										"lit": "tours",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"tours",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tours/{id}",
								"segments": []any{
									map[string]any{
										"lit": "tours",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"tours",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"track": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "duration",
						"short": "Duration in seconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the track",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mp3",
						"short": "URL to MP3 file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "position",
						"short": "Position in the setlist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "set",
						"short": "Set identifier (e.g., 1, 2, E for encore)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "show_id",
						"short": "ID of the show",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "song_id",
						"short": "ID of the song",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the track/song",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "track",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tracks/{id}",
								"segments": []any{
									map[string]any{
										"lit": "tracks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"tracks",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"venue": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the venue",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "float",
						"name": "latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "location",
						"short": "Location (city, state/country)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the venue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shows_count",
						"short": "Number of shows at this venue",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "venue",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort_attr",
											"orig": "sort_attr",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "asc",
											"kind": "query",
											"name": "sort_dir",
											"orig": "sort_dir",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/venues",
								"segments": []any{
									map[string]any{
										"lit": "venues",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
										"sort_attr",
										"sort_dir",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"venues",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/venues/{id}",
								"segments": []any{
									map[string]any{
										"lit": "venues",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"venues",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"year": map[string]any{
				"fields": []any{},
				"name": "year",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
