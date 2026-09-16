

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PhishInSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SongEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
  afterEach(liveDelay('PHISH_IN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PhishInSDK.test()
    const ent = testsdk.Song()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'song.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"alias","req":false,"short":"Alternative name or alias","type":"`$STRING`","index$":0},{"active":true,"format":"date","name":"debut","req":false,"short":"Date of first performance","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the song","type":"`$INTEGER`","index$":2},{"active":true,"format":"date","name":"last_played","req":false,"short":"Date of most recent performance","type":"`$STRING`","index$":3},{"active":true,"name":"times_played","req":false,"short":"Number of times the song has been played","type":"`$INTEGER`","index$":4},{"active":true,"name":"title","req":false,"short":"Title of the song","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"song","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":20,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"sort_attr","orig":"sort_attr","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"asc","kind":"query","name":"sort_dir","orig":"sort_dir","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /songs","json":"{\"operationId\":\"getSongs\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Attribute to sort by\",\"in\":\"query\",\"name\":\"sort_attr\",\"required\":false,\"schema\":{\"enum\":[\"title\",\"times_played\"],\"type\":\"string\"}},{\"description\":\"Sort direction\",\"in\":\"query\",\"name\":\"sort_dir\",\"required\":false,\"schema\":{\"default\":\"asc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"alias\":{\"description\":\"Alternative name or alias\",\"type\":\"string\"},\"debut\":{\"description\":\"Date of first performance\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"integer\"},\"last_played\":{\"description\":\"Date of most recent performance\",\"format\":\"date\",\"type\":\"string\"},\"times_played\":{\"description\":\"Number of times the song has been played\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the song\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"page\":{\"type\":\"integer\"},\"success\":{\"type\":\"boolean\"},\"total_entries\":{\"type\":\"integer\"},\"total_pages\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/songs","segments":[{"lit":"songs"}],"select":{"exist":["page","per_page","sort_attr","sort_dir"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /songs/{id}","json":"{\"operationId\":\"getSongById\",\"parameters\":[{\"description\":\"Song ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"alias\":{\"description\":\"Alternative name or alias\",\"type\":\"string\"},\"debut\":{\"description\":\"Date of first performance\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"integer\"},\"last_played\":{\"description\":\"Date of most recent performance\",\"format\":\"date\",\"type\":\"string\"},\"times_played\":{\"description\":\"Number of times the song has been played\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the song\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Song not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/songs/{id}","segments":[{"lit":"songs"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"song","name__orig":"song","Name":"Song","name_":"song","name-":"song","NAME":"SONG","index$":3}, {"active":true,"entity":"song","key$":"BasicSongFlow","kind":"basic","name":"BasicSongFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"song_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"song_ref01","srcdatavar":"song_ref01_data","suffix":"_dt0"},"match":{"id":"song01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-song_ref01"}}],"index$":1}]}, 'Song')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let song_ref01_data = Object.values(setup.data.existing.song)[0] as any

    // LIST
    const song_ref01_ent = client.Song()
    const song_ref01_match: any = {}

    const song_ref01_list = (await song_ref01_ent.list(song_ref01_match)).map((e: any) => e.data())


    // LOAD
    const song_ref01_match_dt0: any = {}
    song_ref01_match_dt0.id = song_ref01_data.id
    const song_ref01_data_dt0 = (await song_ref01_ent.load(song_ref01_match_dt0)).data()
    assert(song_ref01_data_dt0.id === song_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/song/SongTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PhishInSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['song01','song02','song03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PHISH_IN_TEST_SONG_ENTID': idmap,
    'PHISH_IN_TEST_LIVE': 'FALSE',
    'PHISH_IN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PHISH_IN_TEST_SONG_ENTID']

  const live = 'TRUE' === env.PHISH_IN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PHISH_IN_TEST_SONG_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PhishInSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
