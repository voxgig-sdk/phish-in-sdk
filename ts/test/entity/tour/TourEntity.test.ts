

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


describe('TourEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
  afterEach(liveDelay('PHISH_IN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PhishInSDK.test()
    const ent = testsdk.Tour()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tour.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"end_date","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"shows_count","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"format":"date","name":"start_date","req":false,"type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"tour","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /tours","json":"{\"operationId\":\"getTours\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"end_date\":{\"format\":\"date\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shows_count\":{\"type\":\"integer\"},\"start_date\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tours","segments":[{"lit":"tours"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /tours/{id}","json":"{\"operationId\":\"getTourById\",\"parameters\":[{\"description\":\"Tour ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"end_date\":{\"format\":\"date\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"shows_count\":{\"type\":\"integer\"},\"start_date\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Tour not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tours/{id}","segments":[{"lit":"tours"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"tour","name__orig":"tour","Name":"Tour","name_":"tour","name-":"tour","NAME":"TOUR","index$":4}, {"active":true,"entity":"tour","key$":"BasicTourFlow","kind":"basic","name":"BasicTourFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"tour_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"tour_ref01","srcdatavar":"tour_ref01_data","suffix":"_dt0"},"match":{"id":"tour01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tour_ref01"}}],"index$":1}]}, 'Tour')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tour_ref01_data = Object.values(setup.data.existing.tour)[0] as any

    // LIST
    const tour_ref01_ent = client.Tour()
    const tour_ref01_match: any = {}

    const tour_ref01_list = (await tour_ref01_ent.list(tour_ref01_match)).map((e: any) => e.data())


    // LOAD
    const tour_ref01_match_dt0: any = {}
    tour_ref01_match_dt0.id = tour_ref01_data.id
    const tour_ref01_data_dt0 = (await tour_ref01_ent.load(tour_ref01_match_dt0)).data()
    assert(tour_ref01_data_dt0.id === tour_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/tour/TourTestData.json')

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
    ['tour01','tour02','tour03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PHISH_IN_TEST_TOUR_ENTID': idmap,
    'PHISH_IN_TEST_LIVE': 'FALSE',
    'PHISH_IN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PHISH_IN_TEST_TOUR_ENTID']

  const live = 'TRUE' === env.PHISH_IN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PHISH_IN_TEST_TOUR_ENTID']
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
  
