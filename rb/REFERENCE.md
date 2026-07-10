# PhishIn Ruby SDK Reference

Complete API reference for the PhishIn Ruby SDK.


## PhishInSDK

### Constructor

```ruby
require_relative 'PhishIn_sdk'

client = PhishInSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PhishInSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = PhishInSDK.test
```


### Instance Methods

#### `Era(data = nil)`

Create a new `Era` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Show(data = nil)`

Create a new `Show` entity instance. Pass `nil` for no initial data.

#### `Song(data = nil)`

Create a new `Song` entity instance. Pass `nil` for no initial data.

#### `Tour(data = nil)`

Create a new `Tour` entity instance. Pass `nil` for no initial data.

#### `Track(data = nil)`

Create a new `Track` entity instance. Pass `nil` for no initial data.

#### `Venue(data = nil)`

Create a new `Venue` entity instance. Pass `nil` for no initial data.

#### `Year(data = nil)`

Create a new `Year` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## EraEntity

```ruby
era = client.Era
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `start_date` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Era.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EraEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Search.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ShowEntity

```ruby
show = client.Show
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `date` | `String` | No |  |
| `id` | `Integer` | No |  |
| `location` | `String` | No |  |
| `page` | `Integer` | No |  |
| `show_count` | `Integer` | No |  |
| `success` | `Boolean` | No |  |
| `total_entry` | `Integer` | No |  |
| `total_page` | `Integer` | No |  |
| `tour_id` | `Integer` | No |  |
| `tour_name` | `String` | No |  |
| `track` | `Array` | No |  |
| `venue_id` | `Integer` | No |  |
| `venue_name` | `String` | No |  |
| `year` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Show.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Show.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ShowEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SongEntity

```ruby
song = client.Song
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alia` | `String` | No |  |
| `data` | `Hash` | No |  |
| `debut` | `String` | No |  |
| `id` | `Integer` | No |  |
| `last_played` | `String` | No |  |
| `success` | `Boolean` | No |  |
| `times_played` | `Integer` | No |  |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Song.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Song.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SongEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TourEntity

```ruby
tour = client.Tour
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Hash` | No |  |
| `end_date` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `shows_count` | `Integer` | No |  |
| `start_date` | `String` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Tour.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Tour.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TourEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrackEntity

```ruby
track = client.Track
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Track.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VenueEntity

```ruby
venue = client.Venue
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `latitude` | `Float` | No |  |
| `location` | `String` | No |  |
| `longitude` | `Float` | No |  |
| `name` | `String` | No |  |
| `shows_count` | `Integer` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Venue.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Venue.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VenueEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## YearEntity

```ruby
year = client.Year
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `YearEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = PhishInSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

