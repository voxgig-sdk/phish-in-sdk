"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SongEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PHISH_IN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PhishInSDK.test();
        const ent = testsdk.Song();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'song.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "alias": { "a": true, "h": "Alias", "n": "alias", "r": false, "sh": "Alternative name or alias", "t": "`$STRING`", "key$": "alias", "index$": 0 }, "debut": { "a": true, "fo": "date", "h": "Debut", "n": "debut", "r": false, "sh": "Date of first performance", "t": "`$STRING`", "key$": "debut", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the song", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "last_played": { "a": true, "fo": "date", "h": "Last Played", "n": "last_played", "r": false, "sh": "Date of most recent performance", "t": "`$STRING`", "key$": "last_played", "index$": 3 }, "times_played": { "a": true, "h": "Times Played", "n": "times_played", "r": false, "sh": "Number of times the song has been played", "t": "`$INTEGER`", "key$": "times_played", "index$": 4 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "Title of the song", "t": "`$STRING`", "key$": "title", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "song", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /songs", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "sort_attr", "or": "sort_attr", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "asc", "k": "query", "n": "sort_dir", "or": "sort_dir", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/songs", "q": { "exist": ["page", "per_page", "sort_attr", "sort_dir"] }, "r": {}, "s": [{ "lit": "songs" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /songs/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/songs/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "songs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "song", "name__orig": "song", "Name": "Song", "name_": "song", "name-": "song", "NAME": "SONG", "index$": 3 }, { "active": true, "entity": "song", "key$": "BasicSongFlow", "kind": "basic", "name": "BasicSongFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "song_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "song_ref01", "srcdatavar": "song_ref01_data", "suffix": "_dt0" }, "m": { "id": "song01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-song_ref01" } }], "index$": 1 }] }, 'Song', { "GET /songs": { "protocol": "http", "operationId": "getSongs", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "key$": "success", "type": "boolean" }, "total_entries": { "key$": "total_entries", "type": "integer" }, "total_pages": { "key$": "total_pages", "type": "integer" }, "page": { "key$": "page", "type": "integer" }, "data": { "items": { "properties": { "alias": { "description": "Alternative name or alias", "type": "string", "key$": "alias" }, "debut": { "description": "Date of first performance", "format": "date", "type": "string", "key$": "debut" }, "id": { "description": "Unique identifier for the song", "type": "integer", "key$": "id" }, "last_played": { "description": "Date of most recent performance", "format": "date", "type": "string", "key$": "last_played" }, "times_played": { "description": "Number of times the song has been played", "type": "integer", "key$": "times_played" }, "title": { "description": "Title of the song", "type": "string", "key$": "title" } }, "type": "object", "x-ref": "#/components/schemas/Song", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/SongsResponse" } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 1 }, "index$": 0 }, { "name": "per_page", "in": "query", "description": "Number of results per page", "required": false, "schema": { "type": "integer", "default": 20 }, "index$": 1 }, { "name": "sort_attr", "in": "query", "description": "Attribute to sort by", "required": false, "schema": { "type": "string", "enum": ["title", "times_played"] }, "index$": 2 }, { "name": "sort_dir", "in": "query", "description": "Sort direction", "required": false, "schema": { "type": "string", "enum": ["asc", "desc"], "default": "asc" }, "index$": 3 }], "securitySource": "unspecified" }, "GET /songs/{id}": { "protocol": "http", "operationId": "getSongById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean" }, "data": { "type": "object", "properties": { "id": { "description": "Unique identifier for the song", "type": "integer", "key$": "id" }, "title": { "description": "Title of the song", "type": "string", "key$": "title" }, "alias": { "description": "Alternative name or alias", "type": "string", "key$": "alias" }, "times_played": { "description": "Number of times the song has been played", "type": "integer", "key$": "times_played" }, "debut": { "description": "Date of first performance", "format": "date", "type": "string", "key$": "debut" }, "last_played": { "description": "Date of most recent performance", "format": "date", "type": "string", "key$": "last_played" } }, "x-ref": "#/components/schemas/Song", "index$": 0 } }, "x-ref": "#/components/schemas/SongResponse" } } } }, "404": { "description": "Song not found" } }, "parameters": [{ "name": "id", "in": "path", "description": "Song ID", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let song_ref01_data = Object.values(setup.data.existing.song)[0];
        // LIST
        const song_ref01_ent = client.Song();
        const song_ref01_match = {};
        const song_ref01_list = (await song_ref01_ent.list(song_ref01_match)).map((e) => e.data());
        // LOAD
        const song_ref01_match_dt0 = {};
        song_ref01_match_dt0.id = song_ref01_data.id;
        const song_ref01_data_dt0 = (await song_ref01_ent.load(song_ref01_match_dt0)).data();
        (0, node_assert_1.default)(song_ref01_data_dt0.id === song_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/song/SongTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PhishInSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['song01', 'song02', 'song03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PHISH_IN_TEST_SONG_ENTID': idmap,
        'PHISH_IN_TEST_LIVE': 'FALSE',
        'PHISH_IN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PHISH_IN_TEST_SONG_ENTID'];
    const live = 'TRUE' === env.PHISH_IN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PHISH_IN_TEST_SONG_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PhishInSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PHISH_IN_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=SongEntity.test.js.map