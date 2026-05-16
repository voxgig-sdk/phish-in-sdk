
import { Context } from './Context'


class PhishInError extends Error {

  isPhishInError = true

  sdk = 'PhishIn'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PhishInError
}

