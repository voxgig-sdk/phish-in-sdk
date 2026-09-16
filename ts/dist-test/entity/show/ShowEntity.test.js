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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ShowEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PHISH_IN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PhishInSDK.test();
        const ent = testsdk.Show();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'show.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "data", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "format": "date", "name": "date", "req": false, "short": "Date of the show", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the show", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "location", "req": false, "short": "Location of the venue", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "page", "req": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "show_count", "req": false, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "success", "req": false, "type": "`$BOOLEAN`", "index$": 6 }, { "active": true, "name": "total_entries", "req": false, "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "total_pages", "req": false, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "tour_id", "req": false, "short": "ID of the tour", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "tour_name", "req": false, "short": "Name of the tour", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "tracks", "req": false, "type": "`$ARRAY`", "index$": 11 }, { "active": true, "name": "venue_id", "req": false, "short": "ID of the venue", "type": "`$INTEGER`", "index$": 12 }, { "active": true, "name": "venue_name", "req": false, "short": "Name of the venue", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "year", "req": false, "type": "`$INTEGER`", "index$": 14 }], "id": { "field": "id", "name": "id" }, "name": "show", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 20, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "sort_attr", "orig": "sort_attr", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "desc", "kind": "query", "name": "sort_dir", "orig": "sort_dir", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /shows", "json": "{\"operationId\":\"getShows\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Attribute to sort by\",\"in\":\"query\",\"name\":\"sort_attr\",\"required\":false,\"schema\":{\"enum\":[\"date\",\"venue\",\"location\"],\"type\":\"string\"}},{\"description\":\"Sort direction\",\"in\":\"query\",\"name\":\"sort_dir\",\"required\":false,\"schema\":{\"default\":\"desc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"date\":{\"description\":\"Date of the show\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the show\",\"type\":\"integer\"},\"location\":{\"description\":\"Location of the venue\",\"type\":\"string\"},\"tour_id\":{\"description\":\"ID of the tour\",\"type\":\"integer\"},\"tour_name\":{\"description\":\"Name of the tour\",\"type\":\"string\"},\"tracks\":{\"items\":{\"properties\":{\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the track\",\"type\":\"integer\"},\"mp3\":{\"description\":\"URL to MP3 file\",\"type\":\"string\"},\"position\":{\"description\":\"Position in the setlist\",\"type\":\"integer\"},\"set\":{\"description\":\"Set identifier (e.g., 1, 2, E for encore)\",\"type\":\"string\"},\"show_id\":{\"description\":\"ID of the show\",\"type\":\"integer\"},\"song_id\":{\"description\":\"ID of the song\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the track/song\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"venue_id\":{\"description\":\"ID of the venue\",\"type\":\"integer\"},\"venue_name\":{\"description\":\"Name of the venue\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"page\":{\"type\":\"integer\"},\"success\":{\"type\":\"boolean\"},\"total_entries\":{\"type\":\"integer\"},\"total_pages\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/shows", "segments": [{ "lit": "shows" }], "select": { "exist": ["page", "per_page", "sort_attr", "sort_dir"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "GET /years", "json": "{\"operationId\":\"getYears\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"show_count\":{\"type\":\"integer\"},\"year\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/years", "segments": [{ "lit": "years" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "date", "orig": "date", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /shows/on-date/{date}", "json": "{\"operationId\":\"getShowsByDate\",\"parameters\":[{\"description\":\"Date in YYYY-MM-DD format\",\"in\":\"path\",\"name\":\"date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"date\":{\"description\":\"Date of the show\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the show\",\"type\":\"integer\"},\"location\":{\"description\":\"Location of the venue\",\"type\":\"string\"},\"tour_id\":{\"description\":\"ID of the tour\",\"type\":\"integer\"},\"tour_name\":{\"description\":\"Name of the tour\",\"type\":\"string\"},\"tracks\":{\"items\":{\"properties\":{\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the track\",\"type\":\"integer\"},\"mp3\":{\"description\":\"URL to MP3 file\",\"type\":\"string\"},\"position\":{\"description\":\"Position in the setlist\",\"type\":\"integer\"},\"set\":{\"description\":\"Set identifier (e.g., 1, 2, E for encore)\",\"type\":\"string\"},\"show_id\":{\"description\":\"ID of the show\",\"type\":\"integer\"},\"song_id\":{\"description\":\"ID of the song\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the track/song\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"venue_id\":{\"description\":\"ID of the venue\",\"type\":\"integer\"},\"venue_name\":{\"description\":\"Name of the venue\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"page\":{\"type\":\"integer\"},\"success\":{\"type\":\"boolean\"},\"total_entries\":{\"type\":\"integer\"},\"total_pages\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/shows/on-date/{date}", "segments": [{ "lit": "shows" }, { "lit": "on-date" }, { "var": "date" }], "select": { "exist": ["date"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /shows/{id}", "json": "{\"operationId\":\"getShowById\",\"parameters\":[{\"description\":\"Show ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"date\":{\"description\":\"Date of the show\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the show\",\"type\":\"integer\"},\"location\":{\"description\":\"Location of the venue\",\"type\":\"string\"},\"tour_id\":{\"description\":\"ID of the tour\",\"type\":\"integer\"},\"tour_name\":{\"description\":\"Name of the tour\",\"type\":\"string\"},\"tracks\":{\"items\":{\"properties\":{\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the track\",\"type\":\"integer\"},\"mp3\":{\"description\":\"URL to MP3 file\",\"type\":\"string\"},\"position\":{\"description\":\"Position in the setlist\",\"type\":\"integer\"},\"set\":{\"description\":\"Set identifier (e.g., 1, 2, E for encore)\",\"type\":\"string\"},\"show_id\":{\"description\":\"ID of the show\",\"type\":\"integer\"},\"song_id\":{\"description\":\"ID of the song\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the track/song\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"venue_id\":{\"description\":\"ID of the venue\",\"type\":\"integer\"},\"venue_name\":{\"description\":\"Name of the venue\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Show not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/shows/{id}", "segments": [{ "lit": "shows" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "year", "orig": "year", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /years/{year}", "json": "{\"operationId\":\"getShowsByYear\",\"parameters\":[{\"description\":\"Year (YYYY format)\",\"in\":\"path\",\"name\":\"year\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"date\":{\"description\":\"Date of the show\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the show\",\"type\":\"integer\"},\"location\":{\"description\":\"Location of the venue\",\"type\":\"string\"},\"tour_id\":{\"description\":\"ID of the tour\",\"type\":\"integer\"},\"tour_name\":{\"description\":\"Name of the tour\",\"type\":\"string\"},\"tracks\":{\"items\":{\"properties\":{\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the track\",\"type\":\"integer\"},\"mp3\":{\"description\":\"URL to MP3 file\",\"type\":\"string\"},\"position\":{\"description\":\"Position in the setlist\",\"type\":\"integer\"},\"set\":{\"description\":\"Set identifier (e.g., 1, 2, E for encore)\",\"type\":\"string\"},\"show_id\":{\"description\":\"ID of the show\",\"type\":\"integer\"},\"song_id\":{\"description\":\"ID of the song\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the track/song\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"venue_id\":{\"description\":\"ID of the venue\",\"type\":\"integer\"},\"venue_name\":{\"description\":\"Name of the venue\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"page\":{\"type\":\"integer\"},\"success\":{\"type\":\"boolean\"},\"total_entries\":{\"type\":\"integer\"},\"total_pages\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/years/{year}", "segments": [{ "lit": "years" }, { "var": "year" }], "select": { "exist": ["year"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "active": true, "args": {}, "contract": { "id": "GET /random-show", "json": "{\"operationId\":\"getRandomShow\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"date\":{\"description\":\"Date of the show\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the show\",\"type\":\"integer\"},\"location\":{\"description\":\"Location of the venue\",\"type\":\"string\"},\"tour_id\":{\"description\":\"ID of the tour\",\"type\":\"integer\"},\"tour_name\":{\"description\":\"Name of the tour\",\"type\":\"string\"},\"tracks\":{\"items\":{\"properties\":{\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the track\",\"type\":\"integer\"},\"mp3\":{\"description\":\"URL to MP3 file\",\"type\":\"string\"},\"position\":{\"description\":\"Position in the setlist\",\"type\":\"integer\"},\"set\":{\"description\":\"Set identifier (e.g., 1, 2, E for encore)\",\"type\":\"string\"},\"show_id\":{\"description\":\"ID of the show\",\"type\":\"integer\"},\"song_id\":{\"description\":\"ID of the song\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the track/song\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"venue_id\":{\"description\":\"ID of the venue\",\"type\":\"integer\"},\"venue_name\":{\"description\":\"Name of the venue\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/random-show", "segments": [{ "lit": "random-show" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 3 }], "key$": "load" } }, "relations": { "ancestors": [["on_date"], ["year"]] }, "key$": "show", "name__orig": "show", "Name": "Show", "name_": "show", "name-": "show", "NAME": "SHOW", "index$": 2 }, { "active": true, "entity": "show", "key$": "BasicShowFlow", "kind": "basic", "name": "BasicShowFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "show_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "show_ref01", "srcdatavar": "show_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-show_ref01" } }], "index$": 1 }] }, 'Show');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let show_ref01_data = Object.values(setup.data.existing.show)[0];
        // LIST
        const show_ref01_ent = client.Show();
        const show_ref01_match = {};
        const show_ref01_list = (await show_ref01_ent.list(show_ref01_match)).map((e) => e.data());
        // LOAD
        const show_ref01_match_dt0 = {};
        show_ref01_match_dt0.id = show_ref01_data.id;
        const show_ref01_data_dt0 = (await show_ref01_ent.load(show_ref01_match_dt0)).data();
        (0, node_assert_1.default)(show_ref01_data_dt0.id === show_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/show/ShowTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PhishInSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['show01', 'show02', 'show03', 'on_date01', 'on_date02', 'on_date03', 'year01', 'year02', 'year03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PHISH_IN_TEST_SHOW_ENTID': idmap,
        'PHISH_IN_TEST_LIVE': 'FALSE',
        'PHISH_IN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PHISH_IN_TEST_SHOW_ENTID'];
    const live = 'TRUE' === env.PHISH_IN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PHISH_IN_TEST_SHOW_ENTID'];
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
//# sourceMappingURL=ShowEntity.test.js.map