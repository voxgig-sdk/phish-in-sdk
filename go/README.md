# PhishIn Golang SDK



The Golang SDK for the PhishIn API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Era(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/phish-in-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/phish-in-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/phish-in-sdk/go=../phish-in-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/phish-in-sdk/go"
)

func main() {
    client := sdk.New()

    // List era records — the value is the array of records itself.
    eras, err := client.Era(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range eras.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
songs, err := client.Song(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = songs
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

song, err := client.Song(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(song) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewPhishInSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
PHISH_IN_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewPhishInSDK

```go
func NewPhishInSDK(options map[string]any) *PhishInSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *PhishInSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PhishInSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Era` | `(data map[string]any) PhishInEntity` | Create an Era entity instance. |
| `Search` | `(data map[string]any) PhishInEntity` | Create a Search entity instance. |
| `Show` | `(data map[string]any) PhishInEntity` | Create a Show entity instance. |
| `Song` | `(data map[string]any) PhishInEntity` | Create a Song entity instance. |
| `Tour` | `(data map[string]any) PhishInEntity` | Create a Tour entity instance. |
| `Track` | `(data map[string]any) PhishInEntity` | Create a Track entity instance. |
| `Venue` | `(data map[string]any) PhishInEntity` | Create a Venue entity instance. |
| `Year` | `(data map[string]any) PhishInEntity` | Create a Year entity instance. |

### Entity interface (PhishInEntity)

All entities implement the `PhishInEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    era, err := client.Era(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // era is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Era

| Field | Description |
| --- | --- |
| `"end_date"` |  |
| `"id"` |  |
| `"name"` |  |
| `"start_date"` |  |

Operations: List.

API path: `/eras`

#### Search

| Field | Description |
| --- | --- |
| `"shows"` |  |
| `"songs"` |  |
| `"venues"` |  |

Operations: Load.

API path: `/search`

#### Show

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"date"` | Date of the show |
| `"id"` | Unique identifier for the show |
| `"location"` | Location of the venue |
| `"page"` |  |
| `"show_count"` |  |
| `"success"` |  |
| `"total_entries"` |  |
| `"total_pages"` |  |
| `"tour_id"` | ID of the tour |
| `"tour_name"` | Name of the tour |
| `"tracks"` |  |
| `"venue_id"` | ID of the venue |
| `"venue_name"` | Name of the venue |
| `"year"` |  |

Operations: List, Load.

API path: `/shows`

#### Song

| Field | Description |
| --- | --- |
| `"alias"` | Alternative name or alias |
| `"debut"` | Date of first performance |
| `"id"` | Unique identifier for the song |
| `"last_played"` | Date of most recent performance |
| `"times_played"` | Number of times the song has been played |
| `"title"` | Title of the song |

Operations: List, Load.

API path: `/songs`

#### Tour

| Field | Description |
| --- | --- |
| `"end_date"` |  |
| `"id"` |  |
| `"name"` |  |
| `"shows_count"` |  |
| `"start_date"` |  |

Operations: List, Load.

API path: `/tours`

#### Track

| Field | Description |
| --- | --- |
| `"duration"` | Duration in seconds |
| `"id"` | Unique identifier for the track |
| `"mp3"` | URL to MP3 file |
| `"position"` | Position in the setlist |
| `"set"` | Set identifier (e.g., 1, 2, E for encore) |
| `"show_id"` | ID of the show |
| `"song_id"` | ID of the song |
| `"title"` | Title of the track/song |

Operations: Load.

API path: `/tracks/{id}`

#### Venue

| Field | Description |
| --- | --- |
| `"id"` | Unique identifier for the venue |
| `"latitude"` |  |
| `"location"` | Location (city, state/country) |
| `"longitude"` |  |
| `"name"` | Name of the venue |
| `"shows_count"` | Number of shows at this venue |

Operations: List, Load.

API path: `/venues`

#### Year

| Field | Description |
| --- | --- |

Operations: .

API path: ``



## Entities


### Era

Create an instance: `era := client.Era(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `start_date` | `string` |  |

#### Example: List

```go
eras, err := client.Era(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(eras) // the array of records
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `shows` | `[]any` |  |
| `songs` | `[]any` |  |
| `venues` | `[]any` |  |

#### Example: Load

```go
search, err := client.Search(nil).Load(map[string]any{"term": "term"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(search) // the loaded record
```


### Show

Create an instance: `show := client.Show(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `date` | `string` | Date of the show |
| `id` | `int` | Unique identifier for the show |
| `location` | `string` | Location of the venue |
| `page` | `int` |  |
| `show_count` | `int` |  |
| `success` | `bool` |  |
| `total_entries` | `int` |  |
| `total_pages` | `int` |  |
| `tour_id` | `int` | ID of the tour |
| `tour_name` | `string` | Name of the tour |
| `tracks` | `[]any` |  |
| `venue_id` | `int` | ID of the venue |
| `venue_name` | `string` | Name of the venue |
| `year` | `int` |  |

#### Example: Load

```go
show, err := client.Show(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(show) // the loaded record
```

#### Example: List

```go
shows, err := client.Show(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(shows) // the array of records
```


### Song

Create an instance: `song := client.Song(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `string` | Alternative name or alias |
| `debut` | `string` | Date of first performance |
| `id` | `int` | Unique identifier for the song |
| `last_played` | `string` | Date of most recent performance |
| `times_played` | `int` | Number of times the song has been played |
| `title` | `string` | Title of the song |

#### Example: Load

```go
song, err := client.Song(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(song) // the loaded record
```

#### Example: List

```go
songs, err := client.Song(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(songs) // the array of records
```


### Tour

Create an instance: `tour := client.Tour(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `shows_count` | `int` |  |
| `start_date` | `string` |  |

#### Example: Load

```go
tour, err := client.Tour(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(tour) // the loaded record
```

#### Example: List

```go
tours, err := client.Tour(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tours) // the array of records
```


### Track

Create an instance: `track := client.Track(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` | Duration in seconds |
| `id` | `int` | Unique identifier for the track |
| `mp3` | `string` | URL to MP3 file |
| `position` | `int` | Position in the setlist |
| `set` | `string` | Set identifier (e.g., 1, 2, E for encore) |
| `show_id` | `int` | ID of the show |
| `song_id` | `int` | ID of the song |
| `title` | `string` | Title of the track/song |

#### Example: Load

```go
track, err := client.Track(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(track) // the loaded record
```


### Venue

Create an instance: `venue := client.Venue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Unique identifier for the venue |
| `latitude` | `float64` |  |
| `location` | `string` | Location (city, state/country) |
| `longitude` | `float64` |  |
| `name` | `string` | Name of the venue |
| `shows_count` | `int` | Number of shows at this venue |

#### Example: Load

```go
venue, err := client.Venue(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(venue) // the loaded record
```

#### Example: List

```go
venues, err := client.Venue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(venues) // the array of records
```


### Year

Create an instance: `year := client.Year(nil)`

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/phish-in-sdk/go/
├── phish-in.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/phish-in-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
song := client.Song(nil)
song.List(nil, nil)

// song.Data() now returns the song data from the last list
// song.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
