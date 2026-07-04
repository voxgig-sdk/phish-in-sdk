# PhishIn PHP SDK



The PHP SDK for the PhishIn API — an entity-oriented client using PHP conventions.

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
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
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
    echo "Error: " . $result["err"]->getMessage();
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
    "entity" => ["era" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$era = $client->Era()->load(["id" => "test01"]);
print_r($era);
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
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
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
| `data` |  |
| `success` |  |

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
| `total_entry` |  |
| `total_page` |  |
| `tour_id` |  |
| `tour_name` |  |
| `track` |  |
| `venue_id` |  |
| `venue_name` |  |
| `year` |  |

Operations: List, Load.

API path: `/shows`

#### Song

| Field | Description |
| --- | --- |
| `alia` |  |
| `data` |  |
| `debut` |  |
| `id` |  |
| `last_played` |  |
| `success` |  |
| `times_played` |  |
| `title` |  |

Operations: List, Load.

API path: `/songs`

#### Tour

| Field | Description |
| --- | --- |
| `data` |  |
| `end_date` |  |
| `id` |  |
| `name` |  |
| `shows_count` |  |
| `start_date` |  |
| `success` |  |

Operations: List, Load.

API path: `/tours`

#### Track

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/tracks/{id}`

#### Venue

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |
| `latitude` |  |
| `location` |  |
| `longitude` |  |
| `name` |  |
| `shows_count` |  |
| `success` |  |

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
| `end_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `start_date` | ``$STRING`` |  |

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
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```php
// load() returns the bare Search record (throws on error).
$search = $client->Search()->load(["id" => "search_id"]);
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

```php
// load() returns the bare Show record (throws on error).
$show = $client->Show()->load(["id" => "show_id"]);
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
| `alia` | ``$STRING`` |  |
| `data` | ``$OBJECT`` |  |
| `debut` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `last_played` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `times_played` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```php
// load() returns the bare Song record (throws on error).
$song = $client->Song()->load(["id" => "song_id"]);
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
| `data` | ``$OBJECT`` |  |
| `end_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `shows_count` | ``$INTEGER`` |  |
| `start_date` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```php
// load() returns the bare Tour record (throws on error).
$tour = $client->Tour()->load(["id" => "tour_id"]);
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
| `data` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```php
// load() returns the bare Track record (throws on error).
$track = $client->Track()->load(["id" => "track_id"]);
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
| `data` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `location` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `shows_count` | ``$INTEGER`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```php
// load() returns the bare Venue record (throws on error).
$venue = $client->Venue()->load(["id" => "venue_id"]);
```

#### Example: List

```php
// list() returns an array of Venue records (throws on error).
$venues = $client->Venue()->list();
```


### Year

Create an instance: `$year = $client->Year();`


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
error is returned to the caller as the second element in the return array.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$era = $client->Era();
$era->load(["id" => "example_id"]);

// $era->dataGet() now returns the loaded era data
// $era->matchGet() returns the last match criteria
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
