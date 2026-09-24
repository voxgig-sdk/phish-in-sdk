

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"end_date":{"a":true,"fo":"date","h":"End Date","n":"end_date","r":false,"t":"`$STRING`","key$":"end_date","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2},"shows_count":{"a":true,"h":"Shows Count","n":"shows_count","r":false,"t":"`$INTEGER`","key$":"shows_count","index$":3},"start_date":{"a":true,"fo":"date","h":"Start Date","n":"start_date","r":false,"t":"`$STRING`","key$":"start_date","index$":4}},"id":{"field":"id","name":"id"},"name":"tour","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /tours","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/tours","q":{},"r":{},"s":[{"lit":"tours"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /tours/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/tours/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"tours"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"tour","name__orig":"tour","Name":"Tour","name_":"tour","name-":"tour","NAME":"TOUR","index$":4}, {"active":true,"entity":"tour","key$":"BasicTourFlow","kind":"basic","name":"BasicTourFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tour_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"tour_ref01","srcdatavar":"tour_ref01_data","suffix":"_dt0"},"m":{"id":"tour01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tour_ref01"}}],"index$":1}]}, 'Tour', {"GET /tours":{"protocol":"http","operationId":"getTours","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"end_date":{"format":"date","type":"string","key$":"end_date"},"id":{"type":"integer","key$":"id"},"name":{"type":"string","key$":"name"},"shows_count":{"type":"integer","key$":"shows_count"},"start_date":{"format":"date","type":"string","key$":"start_date"}},"type":"object","x-ref":"#/components/schemas/Tour","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/ToursResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /tours/{id}":{"protocol":"http","operationId":"getTourById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"data":{"type":"object","properties":{"id":{"type":"integer","key$":"id"},"name":{"type":"string","key$":"name"},"start_date":{"format":"date","type":"string","key$":"start_date"},"end_date":{"format":"date","type":"string","key$":"end_date"},"shows_count":{"type":"integer","key$":"shows_count"}},"x-ref":"#/components/schemas/Tour","index$":0}},"x-ref":"#/components/schemas/TourResponse"}}}},"404":{"description":"Tour not found"}},"parameters":[{"name":"id","in":"path","description":"Tour ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
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
  
