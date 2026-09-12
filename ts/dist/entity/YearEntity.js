"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearEntity = void 0;
const PhishInEntityBase_1 = require("../PhishInEntityBase");
// TODO: needs Entity superclass
class YearEntity extends PhishInEntityBase_1.PhishInEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'year';
        this.name_ = 'year';
        this.Name = 'Year';
    }
    make() {
        return new YearEntity(this._client, this.entopts());
    }
}
exports.YearEntity = YearEntity;
//# sourceMappingURL=YearEntity.js.map