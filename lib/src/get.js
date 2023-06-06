"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const https_1 = require("../https");
async function get(url, options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
}) {
    if (options)
        options.method = "GET";
    else if (typeof url != "string") {
        url.method == "GET";
    }
    if (options)
        return await (0, https_1.https)(url, options);
    else
        return await (0, https_1.https)(url);
}
exports.get = get;
