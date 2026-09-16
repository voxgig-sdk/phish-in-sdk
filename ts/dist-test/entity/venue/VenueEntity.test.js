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
(0, node_test_1.describe)('VenueEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PHISH_IN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PhishInSDK.test();
        const ent = testsdk.Venue();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'venue.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "short": "Unique identifier for the venue", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "format": "float", "name": "latitude", "req": false, "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "location", "req": false, "short": "Location (city, state/country)", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "float", "name": "longitude", "req": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "name", "req": false, "short": "Name of the venue", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "shows_count", "req": false, "short": "Number of shows at this venue", "type": "`$INTEGER`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "venue", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 20, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "sort_attr", "orig": "sort_attr", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "asc", "kind": "query", "name": "sort_dir", "orig": "sort_dir", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /venues", "json": "{\"operationId\":\"getVenues\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Attribute to sort by\",\"in\":\"query\",\"name\":\"sort_attr\",\"required\":false,\"schema\":{\"enum\":[\"name\",\"location\",\"shows_count\"],\"type\":\"string\"}},{\"description\":\"Sort direction\",\"in\":\"query\",\"name\":\"sort_dir\",\"required\":false,\"schema\":{\"default\":\"asc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the venue\",\"type\":\"integer\"},\"latitude\":{\"format\":\"float\",\"type\":\"number\"},\"location\":{\"description\":\"Location (city, state/country)\",\"type\":\"string\"},\"longitude\":{\"format\":\"float\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the venue\",\"type\":\"string\"},\"shows_count\":{\"description\":\"Number of shows at this venue\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"page\":{\"type\":\"integer\"},\"success\":{\"type\":\"boolean\"},\"total_entries\":{\"type\":\"integer\"},\"total_pages\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/venues", "segments": [{ "lit": "venues" }], "select": { "exist": ["page", "per_page", "sort_attr", "sort_dir"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /venues/{id}", "json": "{\"operationId\":\"getVenueById\",\"parameters\":[{\"description\":\"Venue ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the venue\",\"type\":\"integer\"},\"latitude\":{\"format\":\"float\",\"type\":\"number\"},\"location\":{\"description\":\"Location (city, state/country)\",\"type\":\"string\"},\"longitude\":{\"format\":\"float\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the venue\",\"type\":\"string\"},\"shows_count\":{\"description\":\"Number of shows at this venue\",\"type\":\"integer\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Venue not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/venues/{id}", "segments": [{ "lit": "venues" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "venue", "name__orig": "venue", "Name": "Venue", "name_": "venue", "name-": "venue", "NAME": "VENUE", "index$": 6 }, { "active": true, "entity": "venue", "key$": "BasicVenueFlow", "kind": "basic", "name": "BasicVenueFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "venue_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "venue_ref01", "srcdatavar": "venue_ref01_data", "suffix": "_dt0" }, "match": { "id": "venue01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-venue_ref01" } }], "index$": 1 }] }, 'Venue');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let venue_ref01_data = Object.values(setup.data.existing.venue)[0];
        // LIST
        const venue_ref01_ent = client.Venue();
        const venue_ref01_match = {};
        const venue_ref01_list = (await venue_ref01_ent.list(venue_ref01_match)).map((e) => e.data());
        // LOAD
        const venue_ref01_match_dt0 = {};
        venue_ref01_match_dt0.id = venue_ref01_data.id;
        const venue_ref01_data_dt0 = (await venue_ref01_ent.load(venue_ref01_match_dt0)).data();
        (0, node_assert_1.default)(venue_ref01_data_dt0.id === venue_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/venue/VenueTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PhishInSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['venue01', 'venue02', 'venue03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PHISH_IN_TEST_VENUE_ENTID': idmap,
        'PHISH_IN_TEST_LIVE': 'FALSE',
        'PHISH_IN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PHISH_IN_TEST_VENUE_ENTID'];
    const live = 'TRUE' === env.PHISH_IN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PHISH_IN_TEST_VENUE_ENTID'];
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
//# sourceMappingURL=VenueEntity.test.js.map