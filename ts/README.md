# PhishIn TypeScript SDK

The TypeScript SDK for the PhishIn API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install phish-in
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { PhishInSDK } from 'phish-in'

const client = new PhishInSDK({})
```

### 2. List eras

```ts
const result = await client.Era().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = PhishInSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new PhishInSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new PhishInSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
PHISH-IN_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### PhishInSDK

#### Constructor

```ts
new PhishInSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Era(data?)` | `EraEntity` | Create a Era entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Show(data?)` | `ShowEntity` | Create a Show entity instance. |
| `Song(data?)` | `SongEntity` | Create a Song entity instance. |
| `Tour(data?)` | `TourEntity` | Create a Tour entity instance. |
| `Track(data?)` | `TrackEntity` | Create a Track entity instance. |
| `Venue(data?)` | `VenueEntity` | Create a Venue entity instance. |
| `Year(data?)` | `YearEntity` | Create a Year entity instance. |
| `tester(testopts?, sdkopts?)` | `PhishInSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `PhishInSDK.test(testopts?, sdkopts?)` | `PhishInSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): PhishInSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Era

| Field | Description |
| --- | --- |
| `end_date` |  |
| `id` |  |
| `name` |  |
| `start_date` |  |

Operations: list.

API path: `/eras`

#### Search

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/tours`

#### Track

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

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

Operations: list, load.

API path: `/venues`

#### Year

| Field | Description |
| --- | --- |

Operations: .

API path: ``



## Entities


### Era

Create an instance: `const era = client.Era()`

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

```ts
const eras = await client.Era().list()
```


### Search

Create an instance: `const search = client.Search()`

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

```ts
const search = await client.Search().load({ id: 'search_id' })
```


### Show

Create an instance: `const show = client.Show()`

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

```ts
const show = await client.Show().load({ id: 'show_id' })
```

#### Example: List

```ts
const shows = await client.Show().list()
```


### Song

Create an instance: `const song = client.Song()`

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

```ts
const song = await client.Song().load({ id: 'song_id' })
```

#### Example: List

```ts
const songs = await client.Song().list()
```


### Tour

Create an instance: `const tour = client.Tour()`

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

```ts
const tour = await client.Tour().load({ id: 'tour_id' })
```

#### Example: List

```ts
const tours = await client.Tour().list()
```


### Track

Create an instance: `const track = client.Track()`

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

```ts
const track = await client.Track().load({ id: 'track_id' })
```


### Venue

Create an instance: `const venue = client.Venue()`

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

```ts
const venue = await client.Venue().load({ id: 'venue_id' })
```

#### Example: List

```ts
const venues = await client.Venue().list()
```


### Year

Create an instance: `const year = client.Year()`


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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
phish-in/
├── src/
│   ├── PhishInSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { PhishInSDK } from 'phish-in'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
