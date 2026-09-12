import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Control } from '../types';
import type { Search, SearchLoadMatch } from '../PhishInTypes';
declare class SearchEntity extends PhishInEntityBase<Search> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    load(this: any, reqmatch?: SearchLoadMatch, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };
