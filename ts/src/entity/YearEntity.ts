
import { inspect } from 'node:util'

import { PhishInEntityBase } from '../PhishInEntityBase'

import type {
  PhishInSDK,
} from '../PhishInSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  Year,
} from '../PhishInTypes'

// TODO: needs Entity superclass
class YearEntity extends PhishInEntityBase<Year> {

  constructor(client: PhishInSDK, entopts: any) {
    super(client, entopts)
    this.name = 'year'
    this.name_ = 'year'
    this.Name = 'Year'
  }


  make(this: YearEntity) {
    return new YearEntity(this._client, this.entopts())
  }







}


export {
  YearEntity
}
