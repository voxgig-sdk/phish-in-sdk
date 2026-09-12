import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Control } from '../types';
import type { Show, ShowLoadMatch, ShowListMatch } from '../PhishInTypes';
declare class ShowEntity extends PhishInEntityBase<Show> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: ShowEntity): ShowEntity;
    load(this: any, reqmatch?: ShowLoadMatch, ctrl?: Control): Promise<ShowEntity>;
    list(this: any, reqmatch?: ShowListMatch, ctrl?: Control): Promise<ShowEntity[]>;
}
export { ShowEntity };
