
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PhishInSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PhishInSDK.test()
    equal(testsdk instanceof PhishInSDK, true,
      'PhishInSDK.test() must return a client synchronously')
  })

})
