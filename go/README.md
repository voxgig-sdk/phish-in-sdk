# PhishIn Golang SDK



The Golang SDK for the PhishIn API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/phish-in-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/phish-in-sdk/go=../path/to/github.com/voxgig-sdk/phish-in-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/phish-in-sdk/go"
    "github.com/voxgig-sdk/phish-in-sdk/go/core"
)

func main() {
    client := sdk.NewPhishInSDK(map[string]any{
        "apikey": os.Getenv("PHISH-IN_APIKEY"),
    })
```

### 2. List eras

```go
    result, err := client.Era(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
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

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
PHISH-IN_TEST_LIVE=TRUE
PHISH-IN_APIKEY=<your-key>
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
| `"apikey"` | `string` | API key for authentication. |
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
| `Era` | `(data map[string]any) PhishInEntity` | Create a Era entity instance. |
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/search`

#### Show

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"date"` |  |
| `"id"` |  |
| `"location"` |  |
| `"page"` |  |
| `"show_count"` |  |
| `"success"` |  |
| `"total_entry"` |  |
| `"total_page"` |  |
| `"tour_id"` |  |
| `"tour_name"` |  |
| `"track"` |  |
| `"venue_id"` |  |
| `"venue_name"` |  |
| `"year"` |  |

Operations: List, Load.

API path: `/shows`

#### Song

| Field | Description |
| --- | --- |
| `"alia"` |  |
| `"data"` |  |
| `"debut"` |  |
| `"id"` |  |
| `"last_played"` |  |
| `"success"` |  |
| `"times_played"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/songs`

#### Tour

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"end_date"` |  |
| `"id"` |  |
| `"name"` |  |
| `"shows_count"` |  |
| `"start_date"` |  |
| `"success"` |  |

Operations: List, Load.

API path: `/tours`

#### Track

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/tracks/{id}`

#### Venue

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"id"` |  |
| `"latitude"` |  |
| `"location"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"shows_count"` |  |
| `"success"` |  |

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
| `end_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `start_date` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Era(nil).List(nil, nil)
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
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.Search(nil).Load(map[string]any{"id": "search_id"}, nil)
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
| `data` | ``$ARRAY`` |  |
| `date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `location` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `show_count` | ``$INTEGER`` |  |
| `success` | ``$BOOLEAN`` |  |
| `total_entry` | ``$INTEGER`` |  |
| `total_page` | ``$INTEGER`` |  |
| `tour_id` | ``$INTEGER`` |  |
| `tour_name` | ``$STRING`` |  |
| `track` | ``$ARRAY`` |  |
| `venue_id` | ``$INTEGER`` |  |
| `venue_name` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Show(nil).Load(map[string]any{"id": "show_id"}, nil)
```

#### Example: List

```go
results, err := client.Show(nil).List(nil, nil)
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
| `alia` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `debut` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `last_played` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `times_played` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Song(nil).Load(map[string]any{"id": "song_id"}, nil)
```

#### Example: List

```go
results, err := client.Song(nil).List(nil, nil)
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
| `data` | ``$OBJECT`` |  |
| `end_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `shows_count` | ``$INTEGER`` |  |
| `start_date` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.Tour(nil).Load(map[string]any{"id": "tour_id"}, nil)
```

#### Example: List

```go
results, err := client.Tour(nil).List(nil, nil)
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
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.Track(nil).Load(map[string]any{"id": "track_id"}, nil)
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
| `data` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `location` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `shows_count` | ``$INTEGER`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.Venue(nil).Load(map[string]any{"id": "venue_id"}, nil)
```

#### Example: List

```go
results, err := client.Venue(nil).List(nil, nil)
```


### Year

Create an instance: `year := client.Year(nil)`


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
