import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Control } from '../types';
import type { Tour, TourLoadMatch, TourListMatch } from '../PhishInTypes';
declare class TourEntity extends PhishInEntityBase<Tour> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: TourEntity): TourEntity;
    load(this: any, reqmatch?: TourLoadMatch, ctrl?: Control): Promise<TourEntity>;
    list(this: any, reqmatch?: TourListMatch, ctrl?: Control): Promise<TourEntity[]>;
}
export { TourEntity };
