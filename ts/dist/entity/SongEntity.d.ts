import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Control } from '../types';
import type { Song, SongLoadMatch, SongListMatch } from '../PhishInTypes';
declare class SongEntity extends PhishInEntityBase<Song> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: SongEntity): SongEntity;
    load(this: any, reqmatch?: SongLoadMatch, ctrl?: Control): Promise<SongEntity>;
    list(this: any, reqmatch?: SongListMatch, ctrl?: Control): Promise<SongEntity[]>;
}
export { SongEntity };
