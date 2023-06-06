"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsError = void 0;
class HttpsError extends Error {
    /**
     * Emit errors and provide sufficient details to help users debug easily
     * @param {String} function
     * @param {String} error
     */
    constructor(options = {}) {
        const msg = `${options.error.toString().replace("Error:", "")}`;
        super(msg);
    }
}
exports.HttpsError = HttpsError;
Object.defineProperty(HttpsError.prototype, 'name', {
    value: 'HttpsError'
});
