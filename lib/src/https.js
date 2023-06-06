"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.https = void 0;
const https_1 = require("https");
const HttpsError_1 = require("./error/HttpsError");
function https(host, endpoint, options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}) {
    return new Promise((resolve, reject) => {
        // Using node:https request function
        let hostUrl;
        let endpointUrl;
        host = host.replace('https://', '').replace('http://', '');
        if (!endpoint.method) {
            hostUrl = host;
            endpointUrl = endpoint;
        }
        else {
            hostUrl = host.split('/')[0];
            endpointUrl = host.split('/').shift();
        }
        var req = (0, https_1.request)({
            hostname: hostUrl,
            path: endpointUrl,
            method: options.method,
            headers: options.headers
        }, async (response) => {
            // Handle any redirects
            if (response.headers.location && response.statusCode != 200)
                return resolve(await https(host, response.headers.location.replace(host, '')));
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
