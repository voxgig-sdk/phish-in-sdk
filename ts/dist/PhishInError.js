"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhishInError = void 0;
class PhishInError extends Error {
    isPhishInError = true;
    sdk = 'PhishIn';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PhishInError = PhishInError;
//# sourceMappingURL=PhishInError.js.map