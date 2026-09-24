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
			},
		},
		"entity": map[string]any{
			"era": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start_date",
						"title": "Start Date",
						"type": "`$STRING`",
						"format": "date",
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
								"kind": "http",
								"method": "GET",
								"orig": "/eras",
								"segments": []any{
									map[string]any{
										"lit": "eras",
									},
								},
								"parts": []any{
									"eras",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Shows",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "songs",
						"title": "Songs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "venues",
						"title": "Venues",
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
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "term",
											"orig": "term",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"term",
									},
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
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"short": "Date of the show",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the show",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
						"short": "Location of the venue",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "show_count",
						"title": "Show Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "total_entries",
						"title": "Total Entries",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_pages",
						"title": "Total Pages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tour_id",
						"title": "Tour Id",
						"type": "`$INTEGER`",
						"short": "ID of the tour",
					},
					map[string]any{
						"name": "tour_name",
						"title": "Tour Name",
						"type": "`$STRING`",
						"short": "Name of the tour",
					},
					map[string]any{
						"name": "tracks",
						"title": "Tracks",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "venue_id",
						"title": "Venue Id",
						"type": "`$INTEGER`",
						"short": "ID of the venue",
					},
					map[string]any{
						"name": "venue_name",
						"title": "Venue Name",
						"type": "`$STRING`",
						"short": "Name of the venue",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
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
								"kind": "http",
								"method": "GET",
								"orig": "/shows",
								"segments": []any{
									map[string]any{
										"lit": "shows",
									},
								},
								"parts": []any{
									"shows",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "sort_attr",
											"orig": "sort_attr",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_dir",
											"orig": "sort_dir",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/years",
								"segments": []any{
									map[string]any{
										"lit": "years",
									},
								},
								"parts": []any{
									"years",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"shows",
									"on-date",
									"{date}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"shows",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"years",
									"{year}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"year",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/random-show",
								"segments": []any{
									map[string]any{
										"lit": "random-show",
									},
								},
								"parts": []any{
									"random-show",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"song": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alias",
						"title": "Alias",
						"type": "`$STRING`",
						"short": "Alternative name or alias",
					},
					map[string]any{
						"name": "debut",
						"title": "Debut",
						"type": "`$STRING`",
						"short": "Date of first performance",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the song",
					},
					map[string]any{
						"name": "last_played",
						"title": "Last Played",
						"type": "`$STRING`",
						"short": "Date of most recent performance",
						"format": "date",
					},
					map[string]any{
						"name": "times_played",
						"title": "Times Played",
						"type": "`$INTEGER`",
						"short": "Number of times the song has been played",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Title of the song",
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
								"kind": "http",
								"method": "GET",
								"orig": "/songs",
								"segments": []any{
									map[string]any{
										"lit": "songs",
									},
								},
								"parts": []any{
									"songs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "sort_attr",
											"orig": "sort_attr",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_dir",
											"orig": "sort_dir",
											"type": "`$STRING`",
											"kind": "query",
											"example": "asc",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"songs",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shows_count",
						"title": "Shows Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "start_date",
						"title": "Start Date",
						"type": "`$STRING`",
						"format": "date",
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
								"kind": "http",
								"method": "GET",
								"orig": "/tours",
								"segments": []any{
									map[string]any{
										"lit": "tours",
									},
								},
								"parts": []any{
									"tours",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"tours",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Duration",
						"type": "`$INTEGER`",
						"short": "Duration in seconds",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the track",
					},
					map[string]any{
						"name": "mp3",
						"title": "Mp3",
						"type": "`$STRING`",
						"short": "URL to MP3 file",
					},
					map[string]any{
						"name": "position",
						"title": "Position",
						"type": "`$INTEGER`",
						"short": "Position in the setlist",
					},
					map[string]any{
						"name": "set",
						"title": "Set",
						"type": "`$STRING`",
						"short": "Set identifier (e.g., 1, 2, E for encore)",
					},
					map[string]any{
						"name": "show_id",
						"title": "Show Id",
						"type": "`$INTEGER`",
						"short": "ID of the show",
					},
					map[string]any{
						"name": "song_id",
						"title": "Song Id",
						"type": "`$INTEGER`",
						"short": "ID of the song",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Title of the track/song",
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
								"parts": []any{
									"tracks",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the venue",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
						"short": "Location (city, state/country)",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the venue",
					},
					map[string]any{
						"name": "shows_count",
						"title": "Shows Count",
						"type": "`$INTEGER`",
						"short": "Number of shows at this venue",
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
								"kind": "http",
								"method": "GET",
								"orig": "/venues",
								"segments": []any{
									map[string]any{
										"lit": "venues",
									},
								},
								"parts": []any{
									"venues",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "sort_attr",
											"orig": "sort_attr",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_dir",
											"orig": "sort_dir",
											"type": "`$STRING`",
											"kind": "query",
											"example": "asc",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"venues",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
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
