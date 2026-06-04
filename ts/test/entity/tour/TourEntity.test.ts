
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { PhishInSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('TourEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PHISHIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('PHISHIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PhishInSDK.test()
    const ent = testsdk.Tour()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PHISH_IN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'tour.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set PHISH_IN_TEST_TOUR_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tour_ref01_data = Object.values(setup.data.existing.tour)[0] as any

    // LIST
    const tour_ref01_ent = client.Tour()
    const tour_ref01_match: any = {}

    const tour_ref01_list = await tour_ref01_ent.list(tour_ref01_match)


    // LOAD
    const tour_ref01_match_dt0: any = {}
    tour_ref01_match_dt0.id = tour_ref01_data.id
    const tour_ref01_data_dt0 = await tour_ref01_ent.load(tour_ref01_match_dt0)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['PHISH_IN_TEST_TOUR_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'PHISH_IN_TEST_TOUR_ENTID': idmap,
    'PHISH_IN_TEST_LIVE': 'FALSE',
    'PHISH_IN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PHISH_IN_TEST_TOUR_ENTID']

  const live = 'TRUE' === env.PHISH_IN_TEST_LIVE

  if (live) {
    client = new PhishInSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
