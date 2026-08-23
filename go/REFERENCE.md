# PhishIn Golang SDK Reference

Complete API reference for the PhishIn Golang SDK.


## PhishInSDK

### Constructor

```go
func NewPhishInSDK(options map[string]any) *PhishInSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *PhishInSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *PhishInSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Era(data map[string]any) PhishInEntity`

Create a new `Era` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) PhishInEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Show(data map[string]any) PhishInEntity`

Create a new `Show` entity instance. Pass `nil` for no initial data.

#### `Song(data map[string]any) PhishInEntity`

Create a new `Song` entity instance. Pass `nil` for no initial data.

#### `Tour(data map[string]any) PhishInEntity`

Create a new `Tour` entity instance. Pass `nil` for no initial data.

#### `Track(data map[string]any) PhishInEntity`

Create a new `Track` entity instance. Pass `nil` for no initial data.

#### `Venue(data map[string]any) PhishInEntity`

Create a new `Venue` entity instance. Pass `nil` for no initial data.

#### `Year(data map[string]any) PhishInEntity`

Create a new `Year` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## EraEntity

```go
era := client.Era(nil)
fmt.Println(era.GetName()) // "era"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `start_date` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Era(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EraEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `shows` | `[]any` | No |  |
| `songs` | `[]any` | No |  |
| `venues` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Search(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ShowEntity

```go
show := client.Show(nil)
fmt.Println(show.GetName()) // "show"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | No |  |
| `date` | `string` | No | Date of the show |
| `id` | `int` | No | Unique identifier for the show |
| `location` | `string` | No | Location of the venue |
| `page` | `int` | No |  |
| `show_count` | `int` | No |  |
| `success` | `bool` | No |  |
| `total_entries` | `int` | No |  |
| `total_pages` | `int` | No |  |
| `tour_id` | `int` | No | ID of the tour |
| `tour_name` | `string` | No | Name of the tour |
| `tracks` | `[]any` | No |  |
| `venue_id` | `int` | No | ID of the venue |
| `venue_name` | `string` | No | Name of the venue |
| `year` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Show(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Show(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ShowEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SongEntity

```go
song := client.Song(nil)
fmt.Println(song.GetName()) // "song"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alias` | `string` | No | Alternative name or alias |
| `debut` | `string` | No | Date of first performance |
| `id` | `int` | No | Unique identifier for the song |
| `last_played` | `string` | No | Date of most recent performance |
| `times_played` | `int` | No | Number of times the song has been played |
| `title` | `string` | No | Title of the song |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Song(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Song(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SongEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TourEntity

```go
tour := client.Tour(nil)
fmt.Println(tour.GetName()) // "tour"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `shows_count` | `int` | No |  |
| `start_date` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Tour(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Tour(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TourEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TrackEntity

```go
track := client.Track(nil)
fmt.Println(track.GetName()) // "track"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `int` | No | Duration in seconds |
| `id` | `int` | No | Unique identifier for the track |
| `mp3` | `string` | No | URL to MP3 file |
| `position` | `int` | No | Position in the setlist |
| `set` | `string` | No | Set identifier (e.g., 1, 2, E for encore) |
| `show_id` | `int` | No | ID of the show |
| `song_id` | `int` | No | ID of the song |
| `title` | `string` | No | Title of the track/song |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Track(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrackEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VenueEntity

```go
venue := client.Venue(nil)
fmt.Println(venue.GetName()) // "venue"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Unique identifier for the venue |
| `latitude` | `float64` | No |  |
| `location` | `string` | No | Location (city, state/country) |
| `longitude` | `float64` | No |  |
| `name` | `string` | No | Name of the venue |
| `shows_count` | `int` | No | Number of shows at this venue |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Venue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Venue(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VenueEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## YearEntity

```go
year := client.Year(nil)
fmt.Println(year.GetName()) // "year"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `YearEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewPhishInSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

