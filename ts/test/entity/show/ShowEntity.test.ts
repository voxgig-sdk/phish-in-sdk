

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


describe('ShowEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PHISH_IN_TEST_LIVE=TRUE.
  afterEach(liveDelay('PHISH_IN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PhishInSDK.test()
    const ent = testsdk.Show()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'show.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"Date of the show","t":"`$STRING`","key$":"date","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the show","t":"`$INTEGER`","key$":"id","index$":2},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location of the venue","t":"`$STRING`","key$":"location","index$":3},"page":{"a":true,"h":"Page","n":"page","r":false,"t":"`$INTEGER`","key$":"page","index$":4},"show_count":{"a":true,"h":"Show Count","n":"show_count","r":false,"t":"`$INTEGER`","key$":"show_count","index$":5},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":6},"total_entries":{"a":true,"h":"Total Entries","n":"total_entries","r":false,"t":"`$INTEGER`","key$":"total_entries","index$":7},"total_pages":{"a":true,"h":"Total Pages","n":"total_pages","r":false,"t":"`$INTEGER`","key$":"total_pages","index$":8},"tour_id":{"a":true,"h":"Tour Id","n":"tour_id","r":false,"sh":"ID of the tour","t":"`$INTEGER`","key$":"tour_id","index$":9},"tour_name":{"a":true,"h":"Tour Name","n":"tour_name","r":false,"sh":"Name of the tour","t":"`$STRING`","key$":"tour_name","index$":10},"tracks":{"a":true,"h":"Tracks","n":"tracks","r":false,"t":"`$ARRAY`","key$":"tracks","index$":11},"venue_id":{"a":true,"h":"Venue Id","n":"venue_id","r":false,"sh":"ID of the venue","t":"`$INTEGER`","key$":"venue_id","index$":12},"venue_name":{"a":true,"h":"Venue Name","n":"venue_name","r":false,"sh":"Name of the venue","t":"`$STRING`","key$":"venue_name","index$":13},"year":{"a":true,"h":"Year","n":"year","r":false,"t":"`$INTEGER`","key$":"year","index$":14}},"id":{"field":"id","name":"id"},"name":"show","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /shows","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"sort_attr","or":"sort_attr","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"desc","k":"query","n":"sort_dir","or":"sort_dir","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/shows","q":{"exist":["page","per_page","sort_attr","sort_dir"]},"r":{},"s":[{"lit":"shows"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /years","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/years","q":{},"r":{},"s":[{"lit":"years"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /shows/on-date/{date}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/shows/on-date/{date}","q":{"exist":["date"]},"r":{},"s":[{"lit":"shows"},{"lit":"on-date"},{"var":"date"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /shows/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/shows/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"shows"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /years/{year}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"year","or":"year","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/years/{year}","q":{"exist":["year"]},"r":{},"s":[{"lit":"years"},{"var":"year"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /random-show","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/random-show","q":{},"r":{},"s":[{"lit":"random-show"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"show","name__orig":"show","Name":"Show","name_":"show","name-":"show","NAME":"SHOW","index$":2}, {"active":true,"entity":"show","key$":"BasicShowFlow","kind":"basic","name":"BasicShowFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"show_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"show_ref01","srcdatavar":"show_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-show_ref01"}}],"index$":1}]}, 'Show', {"GET /shows":{"protocol":"http","operationId":"getShows","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"total_entries":{"key$":"total_entries","type":"integer"},"total_pages":{"key$":"total_pages","type":"integer"},"page":{"key$":"page","type":"integer"},"data":{"items":{"properties":{"date":{"description":"Date of the show","format":"date","type":"string","key$":"date"},"id":{"description":"Unique identifier for the show","type":"integer","key$":"id"},"location":{"description":"Location of the venue","type":"string","key$":"location"},"tour_id":{"description":"ID of the tour","type":"integer","key$":"tour_id"},"tour_name":{"description":"Name of the tour","type":"string","key$":"tour_name"},"tracks":{"items":{"properties":{"duration":{"description":"Duration in seconds","type":"integer"},"id":{"description":"Unique identifier for the track","type":"integer"},"mp3":{"description":"URL to MP3 file","type":"string"},"position":{"description":"Position in the setlist","type":"integer"},"set":{"description":"Set identifier (e.g., 1, 2, E for encore)","type":"string"},"show_id":{"description":"ID of the show","type":"integer"},"song_id":{"description":"ID of the song","type":"integer"},"title":{"description":"Title of the track/song","type":"string"}},"type":"object","x-ref":"#/components/schemas/Track"},"type":"array","key$":"tracks"},"venue_id":{"description":"ID of the venue","type":"integer","key$":"venue_id"},"venue_name":{"description":"Name of the venue","type":"string","key$":"venue_name"}},"type":"object","x-ref":"#/components/schemas/Show","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/ShowsResponse"}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1},"index$":0},{"name":"per_page","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":20},"index$":1},{"name":"sort_attr","in":"query","description":"Attribute to sort by","required":false,"schema":{"type":"string","enum":["date","venue","location"]},"index$":2},{"name":"sort_dir","in":"query","description":"Sort direction","required":false,"schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":3}],"securitySource":"unspecified"},"GET /years":{"protocol":"http","operationId":"getYears","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"items":{"properties":{"show_count":{"type":"integer","key$":"show_count"},"year":{"type":"integer","key$":"year"}},"type":"object","x-ref":"#/components/schemas/Year","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/YearsResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /shows/on-date/{date}":{"protocol":"http","operationId":"getShowsByDate","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"total_entries":{"key$":"total_entries","type":"integer"},"total_pages":{"key$":"total_pages","type":"integer"},"page":{"key$":"page","type":"integer"},"data":{"items":{"properties":{"date":{"description":"Date of the show","format":"date","type":"string","key$":"date"},"id":{"description":"Unique identifier for the show","type":"integer","key$":"id"},"location":{"description":"Location of the venue","type":"string","key$":"location"},"tour_id":{"description":"ID of the tour","type":"integer","key$":"tour_id"},"tour_name":{"description":"Name of the tour","type":"string","key$":"tour_name"},"tracks":{"items":{"properties":{"duration":{"description":"Duration in seconds","type":"integer"},"id":{"description":"Unique identifier for the track","type":"integer"},"mp3":{"description":"URL to MP3 file","type":"string"},"position":{"description":"Position in the setlist","type":"integer"},"set":{"description":"Set identifier (e.g., 1, 2, E for encore)","type":"string"},"show_id":{"description":"ID of the show","type":"integer"},"song_id":{"description":"ID of the song","type":"integer"},"title":{"description":"Title of the track/song","type":"string"}},"type":"object","x-ref":"#/components/schemas/Track"},"type":"array","key$":"tracks"},"venue_id":{"description":"ID of the venue","type":"integer","key$":"venue_id"},"venue_name":{"description":"Name of the venue","type":"string","key$":"venue_name"}},"type":"object","x-ref":"#/components/schemas/Show","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/ShowsResponse","index$":0}}}}},"parameters":[{"name":"date","in":"path","description":"Date in YYYY-MM-DD format","required":true,"schema":{"type":"string","format":"date"},"index$":0}],"securitySource":"unspecified"},"GET /shows/{id}":{"protocol":"http","operationId":"getShowById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"key$":"data","properties":{"date":{"description":"Date of the show","format":"date","type":"string","key$":"date"},"id":{"description":"Unique identifier for the show","type":"integer","key$":"id"},"location":{"description":"Location of the venue","type":"string","key$":"location"},"tour_id":{"description":"ID of the tour","type":"integer","key$":"tour_id"},"tour_name":{"description":"Name of the tour","type":"string","key$":"tour_name"},"tracks":{"items":{"properties":{"duration":{"description":"Duration in seconds","type":"integer"},"id":{"description":"Unique identifier for the track","type":"integer"},"mp3":{"description":"URL to MP3 file","type":"string"},"position":{"description":"Position in the setlist","type":"integer"},"set":{"description":"Set identifier (e.g., 1, 2, E for encore)","type":"string"},"show_id":{"description":"ID of the show","type":"integer"},"song_id":{"description":"ID of the song","type":"integer"},"title":{"description":"Title of the track/song","type":"string"}},"type":"object","x-ref":"#/components/schemas/Track"},"type":"array","key$":"tracks"},"venue_id":{"description":"ID of the venue","type":"integer","key$":"venue_id"},"venue_name":{"description":"Name of the venue","type":"string","key$":"venue_name"}},"type":"object","x-ref":"#/components/schemas/Show","index$":0}},"x-ref":"#/components/schemas/ShowResponse"}}}},"404":{"description":"Show not found"}},"parameters":[{"name":"id","in":"path","description":"Show ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"GET /years/{year}":{"protocol":"http","operationId":"getShowsByYear","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"total_entries":{"key$":"total_entries","type":"integer"},"total_pages":{"key$":"total_pages","type":"integer"},"page":{"key$":"page","type":"integer"},"data":{"items":{"properties":{"date":{"description":"Date of the show","format":"date","type":"string","key$":"date"},"id":{"description":"Unique identifier for the show","type":"integer","key$":"id"},"location":{"description":"Location of the venue","type":"string","key$":"location"},"tour_id":{"description":"ID of the tour","type":"integer","key$":"tour_id"},"tour_name":{"description":"Name of the tour","type":"string","key$":"tour_name"},"tracks":{"items":{"properties":{"duration":{"description":"Duration in seconds","type":"integer"},"id":{"description":"Unique identifier for the track","type":"integer"},"mp3":{"description":"URL to MP3 file","type":"string"},"position":{"description":"Position in the setlist","type":"integer"},"set":{"description":"Set identifier (e.g., 1, 2, E for encore)","type":"string"},"show_id":{"description":"ID of the show","type":"integer"},"song_id":{"description":"ID of the song","type":"integer"},"title":{"description":"Title of the track/song","type":"string"}},"type":"object","x-ref":"#/components/schemas/Track"},"type":"array","key$":"tracks"},"venue_id":{"description":"ID of the venue","type":"integer","key$":"venue_id"},"venue_name":{"description":"Name of the venue","type":"string","key$":"venue_name"}},"type":"object","x-ref":"#/components/schemas/Show","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/ShowsResponse","index$":0}}}}},"parameters":[{"name":"year","in":"path","description":"Year (YYYY format)","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"GET /random-show":{"protocol":"http","operationId":"getRandomShow","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"key$":"success","type":"boolean"},"data":{"key$":"data","properties":{"date":{"description":"Date of the show","format":"date","type":"string","key$":"date"},"id":{"description":"Unique identifier for the show","type":"integer","key$":"id"},"location":{"description":"Location of the venue","type":"string","key$":"location"},"tour_id":{"description":"ID of the tour","type":"integer","key$":"tour_id"},"tour_name":{"description":"Name of the tour","type":"string","key$":"tour_name"},"tracks":{"items":{"properties":{"duration":{"description":"Duration in seconds","type":"integer"},"id":{"description":"Unique identifier for the track","type":"integer"},"mp3":{"description":"URL to MP3 file","type":"string"},"position":{"description":"Position in the setlist","type":"integer"},"set":{"description":"Set identifier (e.g., 1, 2, E for encore)","type":"string"},"show_id":{"description":"ID of the show","type":"integer"},"song_id":{"description":"ID of the song","type":"integer"},"title":{"description":"Title of the track/song","type":"string"}},"type":"object","x-ref":"#/components/schemas/Track"},"type":"array","key$":"tracks"},"venue_id":{"description":"ID of the venue","type":"integer","key$":"venue_id"},"venue_name":{"description":"Name of the venue","type":"string","key$":"venue_name"}},"type":"object","x-ref":"#/components/schemas/Show","index$":0}},"x-ref":"#/components/schemas/ShowResponse"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let show_ref01_data = Object.values(setup.data.existing.show)[0] as any

    // LIST
    const show_ref01_ent = client.Show()
    const show_ref01_match: any = {}

    const show_ref01_list = (await show_ref01_ent.list(show_ref01_match)).map((e: any) => e.data())


    // LOAD
    const show_ref01_match_dt0: any = {}
    show_ref01_match_dt0.id = show_ref01_data.id
    const show_ref01_data_dt0 = (await show_ref01_ent.load(show_ref01_match_dt0)).data()
    assert(show_ref01_data_dt0.id === show_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/show/ShowTestData.json')

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
    ['show01','show02','show03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PHISH_IN_TEST_SHOW_ENTID': idmap,
    'PHISH_IN_TEST_LIVE': 'FALSE',
    'PHISH_IN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PHISH_IN_TEST_SHOW_ENTID']

  const live = 'TRUE' === env.PHISH_IN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PHISH_IN_TEST_SHOW_ENTID']
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
  
