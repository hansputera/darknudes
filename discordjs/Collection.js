"use strict";

const BaseCollection = require("@discordjs/collection");
const Util = require("../handler/Util");

module.exports = class Collection extends BaseCollection {
    constructor() {

    }

    toJSON() {
        return this.map(e => (typeof e === "function" ? e.toJSON() : Util.flatten(e)));
    }
};