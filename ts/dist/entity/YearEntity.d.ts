import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Year } from '../PhishInTypes';
declare class YearEntity extends PhishInEntityBase<Year> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: YearEntity): YearEntity;
}
export { YearEntity };
