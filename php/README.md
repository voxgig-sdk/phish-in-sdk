# PhishIn PHP SDK



The PHP SDK for the PhishIn API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Era()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/phish-in-sdk/releases](https://github.com/voxgig-sdk/phish-in-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'phishin_sdk.php';

$client = new PhishInSDK();
```

### 2. List era records

```php
try {
    // list() returns an array of Era records — iterate directly.
    $eras = $client->Era()->list();
    foreach ($eras as $item) {
        echo $item["id"] . " " . $item["end_date"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $songs = $client->Song()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = PhishInSDK::test([
    "entity" => ["song" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$song = $client->Song()->list();
print_r($song);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new PhishInSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
PHISH_IN_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### PhishInSDK

```php
require_once 'phishin_sdk.php';
$client = new PhishInSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = PhishInSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### PhishInSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Era` | `($data): EraEntity` | Create an Era entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `Show` | `($data): ShowEntity` | Create a Show entity instance. |
| `Song` | `($data): SongEntity` | Create a Song entity instance. |
| `Tour` | `($data): TourEntity` | Create a Tour entity instance. |
| `Track` | `($data): TrackEntity` | Create a Track entity instance. |
| `Venue` | `($data): VenueEntity` | Create a Venue entity instance. |
| `Year` | `($data): YearEntity` | Create a Year entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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
| `date` |  |
| `id` |  |
| `location` |  |
| `page` |  |
| `show_count` |  |
| `success` |  |
| `total_entries` |  |
| `total_pages` |  |
| `tour_id` |  |
| `tour_name` |  |
| `tracks` |  |
| `venue_id` |  |
| `venue_name` |  |
| `year` |  |

Operations: List, Load.

API path: `/shows`

#### Song

| Field | Description |
| --- | --- |
| `alias` |  |
| `debut` |  |
| `id` |  |
| `last_played` |  |
| `times_played` |  |
| `title` |  |

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
| `duration` |  |
| `id` |  |
| `mp3` |  |
| `position` |  |
| `set` |  |
| `show_id` |  |
| `song_id` |  |
| `title` |  |

Operations: Load.

API path: `/tracks/{id}`

#### Venue

| Field | Description |
| --- | --- |
| `id` |  |
| `latitude` |  |
| `location` |  |
| `longitude` |  |
| `name` |  |
| `shows_count` |  |

Operations: List, Load.

API path: `/venues`

#### Year

| Field | Description |
| --- | --- |

Operations: .

API path: ``



## Entities


### Era

Create an instance: `$era = $client->Era();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `start_date` | `string` |  |

#### Example: List

```php
// list() returns an array of Era records (throws on error).
$eras = $client->Era()->list();
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `shows` | `array` |  |
| `songs` | `array` |  |
| `venues` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Search record (throws on error).
$search = $client->Search()->load();
```


### Show

Create an instance: `$show = $client->Show();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `date` | `string` |  |
| `id` | `int` |  |
| `location` | `string` |  |
| `page` | `int` |  |
| `show_count` | `int` |  |
| `success` | `bool` |  |
| `total_entries` | `int` |  |
| `total_pages` | `int` |  |
| `tour_id` | `int` |  |
| `tour_name` | `string` |  |
| `tracks` | `array` |  |
| `venue_id` | `int` |  |
| `venue_name` | `string` |  |
| `year` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Show record (throws on error).
$show = $client->Show()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Show records (throws on error).
$shows = $client->Show()->list();
```


### Song

Create an instance: `$song = $client->Song();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `string` |  |
| `debut` | `string` |  |
| `id` | `int` |  |
| `last_played` | `string` |  |
| `times_played` | `int` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Song record (throws on error).
$song = $client->Song()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Song records (throws on error).
$songs = $client->Song()->list();
```


### Tour

Create an instance: `$tour = $client->Tour();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `shows_count` | `int` |  |
| `start_date` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Tour record (throws on error).
$tour = $client->Tour()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Tour records (throws on error).
$tours = $client->Tour()->list();
```


### Track

Create an instance: `$track = $client->Track();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` |  |
| `id` | `int` |  |
| `mp3` | `string` |  |
| `position` | `int` |  |
| `set` | `string` |  |
| `show_id` | `int` |  |
| `song_id` | `int` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Track record (throws on error).
$track = $client->Track()->load(["id" => 1]);
```


### Venue

Create an instance: `$venue = $client->Venue();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `latitude` | `float` |  |
| `location` | `string` |  |
| `longitude` | `float` |  |
| `name` | `string` |  |
| `shows_count` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Venue record (throws on error).
$venue = $client->Venue()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Venue records (throws on error).
$venues = $client->Venue()->list();
```


### Year

Create an instance: `$year = $client->Year();`


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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── phishin_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`phishin_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$song = $client->Song();
$song->list();

// $song->data_get() now returns the song data from the last list
// $song->match_get() returns the last match criteria
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
