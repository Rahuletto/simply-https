"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const https_1 = require("../https");
async function post(url, options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
}) {
    if (options)
        options.method = "POST";
    else if (typeof url != "string") {
        url.method == "POST";
    }
    if (options)
        return await (0, https_1.https)(url, options);
    else
        return await (0, https_1.https)(url);
}
exports.post = post;
