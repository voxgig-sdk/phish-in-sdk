import { PhishInEntityBase } from '../PhishInEntityBase';
import type { PhishInSDK } from '../PhishInSDK';
import type { Control } from '../types';
import type { Track, TrackLoadMatch } from '../PhishInTypes';
declare class TrackEntity extends PhishInEntityBase<Track> {
    constructor(client: PhishInSDK, entopts: any);
    make(this: TrackEntity): TrackEntity;
    load(this: any, reqmatch?: TrackLoadMatch, ctrl?: Control): Promise<TrackEntity>;
}
export { TrackEntity };
