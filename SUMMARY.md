# Phish.in API

Phish.in provides a JSON API for accessing an extensive archive of live Phish audience recordings. It supports various functionalities including retrieving data on shows, songs, venues, and playlists, with options for sorting and pagination.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 15 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Era

Results: Successful response.

SDK operations: `list`.

### Search

Results: Successful response.

SDK operations: `load`.

### Show

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `date`: Date of the show
- `id`: Unique identifier for the show
- `location`: Location of the venue
- `tour_id`: ID of the tour
- `tour_name`: Name of the tour

### Song

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `alias`: Alternative name or alias
- `debut`: Date of first performance
- `id`: Unique identifier for the song
- `last_played`: Date of most recent performance
- `times_played`: Number of times the song has been played

### Tour

Results: Successful response.

SDK operations: `list`, `load`.

### Track

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `duration`: Duration in seconds
- `id`: Unique identifier for the track
- `mp3`: URL to MP3 file
- `position`: Position in the setlist
- `set`: Set identifier (for example, 1, 2, E for encore)

### Venue

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Unique identifier for the venue
- `location`: Location (city, state/country)
- `name`: Name of the venue
- `shows_count`: Number of shows at this venue

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Era | `list` | `GET /eras` | See reference |
| Search | `load` | `GET /search` | See reference |
| Show | `list` | `GET /shows` | See reference |
| Show | `list` | `GET /years` | See reference |
| Show | `load` | `GET /shows/on-date/{date}` | See reference |
| Show | `load` | `GET /shows/{id}` | See reference |
| Show | `load` | `GET /years/{year}` | See reference |
| Show | `load` | `GET /random-show` | See reference |
| Song | `list` | `GET /songs` | See reference |
| Song | `load` | `GET /songs/{id}` | See reference |
| Tour | `list` | `GET /tours` | See reference |
| Tour | `load` | `GET /tours/{id}` | See reference |
| Track | `load` | `GET /tracks/{id}` | See reference |
| Venue | `list` | `GET /venues` | See reference |
| Venue | `load` | `GET /venues/{id}` | See reference |

## Connect to the API

- Production server: `https://phish.in/api/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `phish-in_list`: List records for an entity. Supported entities: `era`, `show`, `song`, `tour`, `venue`.
- `phish-in_load`: Load one record for an entity. Supported entities: `search`, `show`, `song`, `tour`, `track`, `venue`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

