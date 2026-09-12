import { Context } from './Context';
declare class PhishInError extends Error {
    isPhishInError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PhishInError };
