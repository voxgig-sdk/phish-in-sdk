import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Control } from '../types';
import type { Venue, VenueLoadMatch, VenueListMatch } from '../PhishInTypes';
declare class VenueEntity extends PhishInEntityBase<Venue> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: VenueEntity): VenueEntity;
    load(this: any, reqmatch?: VenueLoadMatch, ctrl?: Control): Promise<VenueEntity>;
    list(this: any, reqmatch?: VenueListMatch, ctrl?: Control): Promise<VenueEntity[]>;
}
export { VenueEntity };
