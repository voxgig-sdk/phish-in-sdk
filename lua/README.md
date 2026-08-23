# PhishIn Lua SDK



The Lua SDK for the PhishIn API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Era()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/phish-in-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("phish-in_sdk")

local client = sdk.new()
```

### 2. List era records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local eras, err = client:Era():list()
if err then error(err) end

for _, item in ipairs(eras) do
  print(item["id"], item["end_date"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local songs, err = client:Song():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Song():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### PhishInSDK

```lua
local sdk = require("phish-in_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PhishInSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local search, err = client:Search():load()
    if err then error(err) end
    -- search is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local era = client:Era(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `start_date` | `string` |  |

#### Example: List

```lua
local eras, err = client:Era():list()
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `shows` | `table` |  |
| `songs` | `table` |  |
| `venues` | `table` |  |

#### Example: Load

```lua
local search, err = client:Search():load()
```


### Show

Create an instance: `local show = client:Show(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `date` | `string` | Date of the show |
| `id` | `number` | Unique identifier for the show |
| `location` | `string` | Location of the venue |
| `page` | `number` |  |
| `show_count` | `number` |  |
| `success` | `boolean` |  |
| `total_entries` | `number` |  |
| `total_pages` | `number` |  |
| `tour_id` | `number` | ID of the tour |
| `tour_name` | `string` | Name of the tour |
| `tracks` | `table` |  |
| `venue_id` | `number` | ID of the venue |
| `venue_name` | `string` | Name of the venue |
| `year` | `number` |  |

#### Example: Load

```lua
local show, err = client:Show():load({ id = 1 })
```

#### Example: List

```lua
local shows, err = client:Show():list()
```


### Song

Create an instance: `local song = client:Song(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `string` | Alternative name or alias |
| `debut` | `string` | Date of first performance |
| `id` | `number` | Unique identifier for the song |
| `last_played` | `string` | Date of most recent performance |
| `times_played` | `number` | Number of times the song has been played |
| `title` | `string` | Title of the song |

#### Example: Load

```lua
local song, err = client:Song():load({ id = 1 })
```

#### Example: List

```lua
local songs, err = client:Song():list()
```


### Tour

Create an instance: `local tour = client:Tour(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `shows_count` | `number` |  |
| `start_date` | `string` |  |

#### Example: Load

```lua
local tour, err = client:Tour():load({ id = 1 })
```

#### Example: List

```lua
local tours, err = client:Tour():list()
```


### Track

Create an instance: `local track = client:Track(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `number` | Duration in seconds |
| `id` | `number` | Unique identifier for the track |
| `mp3` | `string` | URL to MP3 file |
| `position` | `number` | Position in the setlist |
| `set` | `string` | Set identifier (e.g., 1, 2, E for encore) |
| `show_id` | `number` | ID of the show |
| `song_id` | `number` | ID of the song |
| `title` | `string` | Title of the track/song |

#### Example: Load

```lua
local track, err = client:Track():load({ id = 1 })
```


### Venue

Create an instance: `local venue = client:Venue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Unique identifier for the venue |
| `latitude` | `number` |  |
| `location` | `string` | Location (city, state/country) |
| `longitude` | `number` |  |
| `name` | `string` | Name of the venue |
| `shows_count` | `number` | Number of shows at this venue |

#### Example: Load

```lua
local venue, err = client:Venue():load({ id = 1 })
```

#### Example: List

```lua
local venues, err = client:Venue():list()
```


### Year

Create an instance: `local year = client:Year(nil)`


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── phish-in_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`phish-in_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local song = client:Song()
song:list()

-- song:data_get() now returns the song data from the last list
-- song:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
