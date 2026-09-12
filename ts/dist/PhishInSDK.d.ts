import { EraEntity } from './entity/EraEntity';
import { SearchEntity } from './entity/SearchEntity';
import { ShowEntity } from './entity/ShowEntity';
import { SongEntity } from './entity/SongEntity';
import { TourEntity } from './entity/TourEntity';
import { TrackEntity } from './entity/TrackEntity';
import { VenueEntity } from './entity/VenueEntity';
import { YearEntity } from './entity/YearEntity';
export type * from './PhishInTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PhishInEntityBase } from './PhishInEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PhishInSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Era(entopts?: Record<string, any>): EraEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Show(entopts?: Record<string, any>): ShowEntity;
    Song(entopts?: Record<string, any>): SongEntity;
    Tour(entopts?: Record<string, any>): TourEntity;
    Track(entopts?: Record<string, any>): TrackEntity;
    Venue(entopts?: Record<string, any>): VenueEntity;
    Year(entopts?: Record<string, any>): YearEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PhishInSDK;
    tester(testopts?: any, sdkopts?: any): PhishInSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PhishInSDK;
export { stdutil, config, BaseFeature, PhishInEntityBase, PhishInSDK, SDK, };
