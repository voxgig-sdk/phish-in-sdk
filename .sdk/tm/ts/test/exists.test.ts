
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PhishInSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PhishInSDK.test()
    equal(null !== testsdk, true)
  })

})
