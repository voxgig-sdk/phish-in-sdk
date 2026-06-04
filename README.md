# PhishIn SDK

Browse the open archive of live Phish audience recordings, shows, songs, venues and tours

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Phish.in API

[Phish.in](https://phish.in) is an open-source digital archive that catalogs live audience recordings of the band Phish. It exposes its catalogue as a JSON API so other apps, sites, and agents can browse the same data that powers the phish.in website.

What you get from the API:

- Shows organized by date, tour, and era, with track listings.
- Songs with their full performance histories across shows.
- Venues with geographic information and the shows played there.
- Tours and eras that group shows into historical periods.
- Search across the catalogue and browse by year.

Audio is MP3, sourced from public taper uploads and complies with Phish's official taping policy. The project is open source and privately funded; a newer v2 API with OpenAPI/Swagger documentation is available at `/api/v2/swagger_doc`, and authenticated endpoints support user signup, login, playlist creation, and likes.

## Try it

**TypeScript**
```bash
npm install phish-in
```

**Python**
```bash
pip install phish-in-sdk
```

**PHP**
```bash
composer require voxgig/phish-in-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/phish-in-sdk/go
```

**Ruby**
```bash
gem install phish-in-sdk
```

**Lua**
```bash
luarocks install phish-in-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PhishInSDK } from 'phish-in'

const client = new PhishInSDK({})

// List all eras
const eras = await client.Era().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o phish-in-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "phish-in": {
      "command": "/abs/path/to/phish-in-mcp"
    }
  }
}
```

## Entities

The API exposes 8 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Era** | A high-level grouping of Phish history (e.g. 1.0, 2.0, 3.0) used to organize shows into historical periods. | `/eras` |
| **Search** | Full-text search across the catalogue covering shows, songs, venues, and tours. | `/search` |
| **Show** | A single Phish concert, with date, venue, tour, and the list of tracks performed. | `/shows` |
| **Song** | A song in the Phish repertoire, with its full performance history across shows. | `/songs` |
| **Tour** | A named tour that groups a set of shows played over a defined period. | `/tours` |
| **Track** | An individual recorded performance of a song within a show, served as MP3 audio. | `/tracks/{id}` |
| **Venue** | A physical location where shows were played, with geographic information and the shows held there. | `/venues` |
| **Year** | A calendar year used to browse shows chronologically across the archive. | `` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from phishin_sdk import PhishInSDK

client = PhishInSDK({})

# List all eras
eras, err = client.Era(None).list(None, None)
```

### PHP

```php
<?php
require_once 'phishin_sdk.php';

$client = new PhishInSDK([]);

// List all eras
[$eras, $err] = $client->Era(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/phish-in-sdk/go"

client := sdk.NewPhishInSDK(map[string]any{})

// List all eras
eras, err := client.Era(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "PhishIn_sdk"

client = PhishInSDK.new({})

# List all eras
eras, err = client.Era(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("phish-in_sdk")

local client = sdk.new({})

-- List all eras
local eras, err = client:Era(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PhishInSDK.test()
const result = await client.Era().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PhishInSDK.test(None, None)
result, err = client.Era(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PhishInSDK::test(null, null);
[$result, $err] = $client->Era(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Era(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PhishInSDK.test(nil, nil)
result, err = client.Era(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Era(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Phish.in API

- Upstream: [https://phish.in](https://phish.in)
- API docs: [https://phish.in/api-docs](https://phish.in/api-docs)

- Project code is MIT licensed per the GitHub repository.
- Audio is MP3 sourced from public taper uploads and complies with Phish's official taping policy.
- The project is privately funded and community-driven; please respect the band's taping policy when redistributing recordings.

---

Generated from the Phish.in API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
