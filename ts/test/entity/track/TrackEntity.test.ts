

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


describe('TrackEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
  afterEach(liveDelay('PHISH_IN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PhishInSDK.test()
    const ent = testsdk.Track()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'track.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"duration","req":false,"short":"Duration in seconds","type":"`$INTEGER`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the track","type":"`$INTEGER`","index$":1},{"active":true,"name":"mp3","req":false,"short":"URL to MP3 file","type":"`$STRING`","index$":2},{"active":true,"name":"position","req":false,"short":"Position in the setlist","type":"`$INTEGER`","index$":3},{"active":true,"name":"set","req":false,"short":"Set identifier (e.g., 1, 2, E for encore)","type":"`$STRING`","index$":4},{"active":true,"name":"show_id","req":false,"short":"ID of the show","type":"`$INTEGER`","index$":5},{"active":true,"name":"song_id","req":false,"short":"ID of the song","type":"`$INTEGER`","index$":6},{"active":true,"name":"title","req":false,"short":"Title of the track/song","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"track","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /tracks/{id}","json":"{\"operationId\":\"getTrackById\",\"parameters\":[{\"description\":\"Track ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the track\",\"type\":\"integer\"},\"mp3\":{\"description\":\"URL to MP3 file\",\"type\":\"string\"},\"position\":{\"description\":\"Position in the setlist\",\"type\":\"integer\"},\"set\":{\"description\":\"Set identifier (e.g., 1, 2, E for encore)\",\"type\":\"string\"},\"show_id\":{\"description\":\"ID of the show\",\"type\":\"integer\"},\"song_id\":{\"description\":\"ID of the song\",\"type\":\"integer\"},\"title\":{\"description\":\"Title of the track/song\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Track not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tracks/{id}","segments":[{"lit":"tracks"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"track","name__orig":"track","Name":"Track","name_":"track","name-":"track","NAME":"TRACK","index$":5}, {"active":true,"entity":"track","key$":"BasicTrackFlow","kind":"basic","name":"BasicTrackFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"track_ref01","srcdatavar":"track_ref01_data","suffix":"_dt0"},"match":{"id":"track01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-track_ref01"}}],"index$":0}]}, 'Track')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let track_ref01_data = Object.values(setup.data.existing.track)[0] as any

    // LOAD
    const track_ref01_ent = client.Track()
    const track_ref01_match_dt0: any = {}
    track_ref01_match_dt0.id = track_ref01_data.id
    const track_ref01_data_dt0 = (await track_ref01_ent.load(track_ref01_match_dt0)).data()
    assert(track_ref01_data_dt0.id === track_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/track/TrackTestData.json')

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
    ['track01','track02','track03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PHISH_IN_TEST_TRACK_ENTID': idmap,
    'PHISH_IN_TEST_LIVE': 'FALSE',
    'PHISH_IN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PHISH_IN_TEST_TRACK_ENTID']

  const live = 'TRUE' === env.PHISH_IN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PHISH_IN_TEST_TRACK_ENTID']
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
  
