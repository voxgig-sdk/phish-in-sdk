# PhishIn Ruby SDK



The Ruby SDK for the PhishIn API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Era` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/phish-in-sdk/releases](https://github.com/voxgig-sdk/phish-in-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "PhishIn_sdk"

client = PhishInSDK.new
```

### 2. List era records

```ruby
begin
  # list returns an Array of Era records — iterate directly.
  eras = client.Era.list
  eras.each do |item|
    puts "#{item["id"]} #{item["end_date"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  songs = client.Song.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = PhishInSDK.test({
  "entity" => { "song" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
song = client.Song.list()
puts song
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = PhishInSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### PhishInSDK

```ruby
require_relative "PhishIn_sdk"
client = PhishInSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = PhishInSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PhishInSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Era` | `(data) -> EraEntity` | Create an Era entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `Show` | `(data) -> ShowEntity` | Create a Show entity instance. |
| `Song` | `(data) -> SongEntity` | Create a Song entity instance. |
| `Tour` | `(data) -> TourEntity` | Create a Tour entity instance. |
| `Track` | `(data) -> TrackEntity` | Create a Track entity instance. |
| `Venue` | `(data) -> VenueEntity` | Create a Venue entity instance. |
| `Year` | `(data) -> YearEntity` | Create a Year entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `PhishInError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Era

| Field | Description |
| --- | --- |
| `end_date` |  |
| `id` |  |
| `name` |  |
| `start_date` |  |

Operations: List.

API path: `/eras`

#### Search

| Field | Description |
| --- | --- |
| `shows` |  |
| `songs` |  |
| `venues` |  |

Operations: Load.

API path: `/search`

#### Show

| Field | Description |
| --- | --- |
| `data` |  |
| `date` | Date of the show |
| `id` | Unique identifier for the show |
| `location` | Location of the venue |
| `page` |  |
| `show_count` |  |
| `success` |  |
| `total_entries` |  |
| `total_pages` |  |
| `tour_id` | ID of the tour |
| `tour_name` | Name of the tour |
| `tracks` |  |
| `venue_id` | ID of the venue |
| `venue_name` | Name of the venue |
| `year` |  |

Operations: List, Load.

API path: `/shows`

#### Song

| Field | Description |
| --- | --- |
| `alias` | Alternative name or alias |
| `debut` | Date of first performance |
| `id` | Unique identifier for the song |
| `last_played` | Date of most recent performance |
| `times_played` | Number of times the song has been played |
| `title` | Title of the song |

Operations: List, Load.

API path: `/songs`

#### Tour

| Field | Description |
| --- | --- |
| `end_date` |  |
| `id` |  |
| `name` |  |
| `shows_count` |  |
| `start_date` |  |

Operations: List, Load.

API path: `/tours`

#### Track

| Field | Description |
| --- | --- |
| `duration` | Duration in seconds |
| `id` | Unique identifier for the track |
| `mp3` | URL to MP3 file |
| `position` | Position in the setlist |
| `set` | Set identifier (e.g., 1, 2, E for encore) |
| `show_id` | ID of the show |
| `song_id` | ID of the song |
| `title` | Title of the track/song |

Operations: Load.

API path: `/tracks/{id}`

#### Venue

| Field | Description |
| --- | --- |
| `id` | Unique identifier for the venue |
| `latitude` |  |
| `location` | Location (city, state/country) |
| `longitude` |  |
| `name` | Name of the venue |
| `shows_count` | Number of shows at this venue |

Operations: List, Load.

API path: `/venues`

#### Year

| Field | Description |
| --- | --- |

Operations: .

API path: ``



## Entities


### Era

Create an instance: `era = client.Era`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `start_date` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Era records (raises on error).
eras = client.Era.list
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `shows` | `Array` |  |
| `songs` | `Array` |  |
| `venues` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Search record (raises on error).
search = client.Search.load()
```


### Show

Create an instance: `show = client.Show`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `date` | `String` | Date of the show |
| `id` | `Integer` | Unique identifier for the show |
| `location` | `String` | Location of the venue |
| `page` | `Integer` |  |
| `show_count` | `Integer` |  |
| `success` | `Boolean` |  |
| `total_entries` | `Integer` |  |
| `total_pages` | `Integer` |  |
| `tour_id` | `Integer` | ID of the tour |
| `tour_name` | `String` | Name of the tour |
| `tracks` | `Array` |  |
| `venue_id` | `Integer` | ID of the venue |
| `venue_name` | `String` | Name of the venue |
| `year` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Show record (raises on error).
show = client.Show.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Show records (raises on error).
shows = client.Show.list
```


### Song

Create an instance: `song = client.Song`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `String` | Alternative name or alias |
| `debut` | `String` | Date of first performance |
| `id` | `Integer` | Unique identifier for the song |
| `last_played` | `String` | Date of most recent performance |
| `times_played` | `Integer` | Number of times the song has been played |
| `title` | `String` | Title of the song |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Song record (raises on error).
song = client.Song.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Song records (raises on error).
songs = client.Song.list
```


### Tour

Create an instance: `tour = client.Tour`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `shows_count` | `Integer` |  |
| `start_date` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Tour record (raises on error).
tour = client.Tour.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Tour records (raises on error).
tours = client.Tour.list
```


### Track

Create an instance: `track = client.Track`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `Integer` | Duration in seconds |
| `id` | `Integer` | Unique identifier for the track |
| `mp3` | `String` | URL to MP3 file |
| `position` | `Integer` | Position in the setlist |
| `set` | `String` | Set identifier (e.g., 1, 2, E for encore) |
| `show_id` | `Integer` | ID of the show |
| `song_id` | `Integer` | ID of the song |
| `title` | `String` | Title of the track/song |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Track record (raises on error).
track = client.Track.load({ "id" => 1 })
```


### Venue

Create an instance: `venue = client.Venue`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` | Unique identifier for the venue |
| `latitude` | `Float` |  |
| `location` | `String` | Location (city, state/country) |
| `longitude` | `Float` |  |
| `name` | `String` | Name of the venue |
| `shows_count` | `Integer` | Number of shows at this venue |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Venue record (raises on error).
venue = client.Venue.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Venue records (raises on error).
venues = client.Venue.list
```


### Year

Create an instance: `year = client.Year`


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── PhishIn_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`PhishIn_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
song = client.Song
song.list()

# song.data_get now returns the song data from the last list
# song.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
