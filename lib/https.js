"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.https = exports.post = exports.get = void 0;
var get_1 = require("./src/get");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return get_1.get; } });
var post_1 = require("./src/post");
Object.defineProperty(exports, "post", { enumerable: true, get: function () { return post_1.post; } });
const https_1 = require("https");
const HttpsError_1 = require("./src/error/HttpsError");
/**
 * Https function to replace your good ol' node-fetch and axios.
 * @param host
 * @param endpoint
 * @param options
 * @link `Documentation:` https://simplyd.js.org/docs/misc/https
 * @example simplydjs.https("postman-echo.com", "/get") // An Echo endpoint
 */
function https(url, options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}) {
    return new Promise((resolve, reject) => {
        let hostUrl;
        let endpointUrl;
        if (!options && typeof url != "string") {
            options = url;
            if (url.host && url.endpoint) {
                hostUrl = url.host.replace("https://", "").replace("http://", "");
                endpointUrl = url.endpoint;
            }
            else if (url.url) {
                const split = url.url.split("/");
                hostUrl = split[0];
                split.shift();
                endpointUrl = "/" + split.join("/");
            }
            else
                throw new Error("Provide a Url (or) Host name & Endpoint to make a request");
        }
        else if (typeof url == "string") {
            url = url.replace("https://", "").replace("http://", "");
            const split = url.split("/");
            hostUrl = split[0];
            split.shift();
            endpointUrl = "/" + split.join("/");
        }
        // Using node:https request function
        var req = (0, https_1.request)({
            hostname: hostUrl,
            path: endpointUrl,
            method: options.method,
            headers: options.headers
        }, async (response) => {
            // Handle any redirects
            if (response.headers.location && response.statusCode != 200) {
                return resolve(await https(response.headers.location, { method: options.method, headers: options.headers, body: options.body }));
            }
            // Data stream
            let data = '';
            response.on('error', reject);
            response.on('data', (chunk) => (data += chunk));
            response.on('end', async () => {
                try {
                    // Resolve any objects
                    resolve(JSON.parse(data));
                }
                catch (e) {
                    // Some API sends html file as error. So this throws error if there is some
                    throw new HttpsError_1.HttpsError({
                        error: e.stack
                    });
                }
            });
        });
        // Write body into the request if its other than GET method
        if (options?.body)
            req.write(JSON.stringify(options.body));
        // closes the request
        req.end();
    });
}
exports.https = https;
