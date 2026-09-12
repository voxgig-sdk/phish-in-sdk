import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Control } from '../types';
import type { Era, EraListMatch } from '../PhishInTypes';
declare class EraEntity extends PhishInEntityBase<Era> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: EraEntity): EraEntity;
    list(this: any, reqmatch?: EraListMatch, ctrl?: Control): Promise<EraEntity[]>;
}
export { EraEntity };
