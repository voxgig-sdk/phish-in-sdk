

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
  afterEach(liveDelay('PHISH_IN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PhishInSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"shows":{"a":true,"h":"Shows","n":"shows","r":false,"t":"`$ARRAY`","key$":"shows","index$":0},"songs":{"a":true,"h":"Songs","n":"songs","r":false,"t":"`$ARRAY`","key$":"songs","index$":1},"venues":{"a":true,"h":"Venues","n":"venues","r":false,"t":"`$ARRAY`","key$":"venues","index$":2}},"name":"search","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"term","or":"term","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search","q":{"exist":["term"]},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":1}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"search_ref01","srcdatavar":"search_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-search_ref01"}}],"index$":0}]}, 'Search', {"GET /search":{"protocol":"http","operationId":"search","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"key$":"data","properties":{"shows":{"items":{"properties":{"date":{"description":"Date of the show","format":"date","type":"string"},"id":{"description":"Unique identifier for the show","type":"integer"},"location":{"description":"Location of the venue","type":"string"},"tour_id":{"description":"ID of the tour","type":"integer"},"tour_name":{"description":"Name of the tour","type":"string"},"tracks":{"items":{"properties":{"duration":{"description":"Duration in seconds","type":"integer"},"id":{"description":"Unique identifier for the track","type":"integer"},"mp3":{"description":"URL to MP3 file","type":"string"},"position":{"description":"Position in the setlist","type":"integer"},"set":{"description":"Set identifier (e.g., 1, 2, E for encore)","type":"string"},"show_id":{"description":"ID of the show","type":"integer"},"song_id":{"description":"ID of the song","type":"integer"},"title":{"description":"Title of the track/song","type":"string"}},"type":"object","x-ref":"#/components/schemas/Track"},"type":"array"},"venue_id":{"description":"ID of the venue","type":"integer"},"venue_name":{"description":"Name of the venue","type":"string"}},"type":"object","x-ref":"#/components/schemas/Show"},"type":"array","key$":"shows"},"songs":{"items":{"properties":{"alias":{"description":"Alternative name or alias","type":"string"},"debut":{"description":"Date of first performance","format":"date","type":"string"},"id":{"description":"Unique identifier for the song","type":"integer"},"last_played":{"description":"Date of most recent performance","format":"date","type":"string"},"times_played":{"description":"Number of times the song has been played","type":"integer"},"title":{"description":"Title of the song","type":"string"}},"type":"object","x-ref":"#/components/schemas/Song"},"type":"array","key$":"songs"},"venues":{"items":{"properties":{"id":{"description":"Unique identifier for the venue","type":"integer"},"latitude":{"format":"float","type":"number"},"location":{"description":"Location (city, state/country)","type":"string"},"longitude":{"format":"float","type":"number"},"name":{"description":"Name of the venue","type":"string"},"shows_count":{"description":"Number of shows at this venue","type":"integer"}},"type":"object","x-ref":"#/components/schemas/Venue"},"type":"array","key$":"venues"}},"type":"object","index$":0}},"x-ref":"#/components/schemas/SearchResponse"}}}}},"parameters":[{"name":"term","in":"query","description":"Search term","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LOAD
    const search_ref01_ent = client.Search()
    const search_ref01_match_dt0: any = {}
    const search_ref01_data_dt0 = (await search_ref01_ent.load(search_ref01_match_dt0)).data()
    assert(null != search_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PHISH_IN_TEST_SEARCH_ENTID': idmap,
    'PHISH_IN_TEST_LIVE': 'FALSE',
    'PHISH_IN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PHISH_IN_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.PHISH_IN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PHISH_IN_TEST_SEARCH_ENTID']
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
  
