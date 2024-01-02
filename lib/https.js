"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.https = void 0;
const https_1 = require("https");
const url_1 = require("url");
/**
 * ### https
 *  Https function to replace your good ol' node-fetch and axios.
 *
 * @param {string} url
 * @param {HttpsOptions} options
 */
function https(url, options) {
    return new Promise((resolve, reject) => {
        const req = (0, https_1.request)({
            agent: new https_1.Agent({ keepAlive: true }),
            headers: options?.headers || { "Content-Type": "application/json" },
            hostname: options?.url
                ? new url_1.URL(options.url)?.hostname
                : options?.hostname || new url_1.URL(url).hostname,
            method: options?.method || "GET",
            path: options?.url
                ? new url_1.URL(options.url)?.pathname
                : options?.endpoint || new url_1.URL(url).pathname,
        }, (response) => {
            const data = [];
            response.on("error", reject);
            response.on("data", (chunk) => data.push(Buffer.from(chunk)));
            response.on("end", async () => {
                if (options?.statusCode &&
                    response.statusCode !== options?.statusCode)
                    reject({
                        error: "Unexpected Status Code",
                        status: response.statusCode,
                    });
                try {
                    switch (options?.responseType) {
                        case "json":
                            resolve(await new Resolver(data).json());
                            break;
                        case "stream":
                        case "buffer":
                            resolve(await new Resolver(data).stream());
                            break;
                        case "text":
                            resolve(await new Resolver(data).text());
                            break;
                        case "blob":
                            resolve(await new Resolver(data).blob());
                            break;
                        case "arrayBuffer":
                            resolve(await new Resolver(data).array());
                            break;
                        default:
                            resolve(new Resolver(data));
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        }).on("error", reject);
        req.setTimeout(options?.timeout || 5000, () => {
            req.destroy();
            reject({ error: "Request Timed Out", status: 408 });
        });
        if (options?.body)
            req.write(typeof options?.body == "string"
                ? options?.body
                : JSON.stringify(options.body));
        req.end();
    });
}
exports.https = https;
/**
 * Resolver class
 *
 * Changes the response of the http request according to the format you want
 *
 * @class Resolver
 */
class Resolver {
    data;
    /**
     * Creates an instance of Resolver.
     * This class consists of functions used to convert data to your needs
     *
     * Promise based functions
     * - arrayBuffer() | array()
     * - blob()
     * - buffer() | stream()
     * - json()
     * - text() | string()
     *
     * Not Promise based
     * - toArrayBuffer()
     * - toBlob()
     * - toBuffer() | toStream()
     * - toJSON()
     * - toText() | toString()
     *
     * @param {Buffer[]} stream
     * @memberof Resolver
     *
     */
    constructor(stream) {
        this.data = stream;
    }
    /**
     * Converts the response data into ArrayBuffer
     *
     * `Promise based function`
     * @return {Promise<ArrayBuffer>}  {Promise<ArrayBuffer>}
     * @memberof Resolver
     */
    arrayBuffer() {
        return new Promise((resolve, reject) => {
            try {
                resolve(new ArrayBuffer(this.data.length));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Converts the response data into Blob
     *
     * `Promise based function`
     * @return {Promise<Blob>}  {Promise<Blob>}
     * @memberof Resolver
     */
    blob() {
        return new Promise((resolve, reject) => {
            try {
                resolve(new Blob(this.data));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Converts the response data into Buffer stream
     *
     * `Promise based function`
     * @return {Promise<Buffer | PromiseLike<Buffer>>}  {Promise<Buffer | PromiseLike<Buffer>>}
     * @memberof Resolver
     * @alias buffer()
     */
    stream() {
        return new Promise((resolve, reject) => {
            try {
                resolve(Buffer.concat(this.data));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Converts the response data into JSON (commonly used) [DEFAULT]
     *
     * `Promise based function`
     * @return {Promise<object>}  {Promise<object>}
     * @memberof Resolver
     */
    json() {
        return new Promise((resolve, reject) => {
            try {
                resolve(JSON.parse(Buffer.concat(this.data).toString()));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * 	Converts the response data into String (text)
     *
     * `Promise based function`
     * @return {Promise<string>}  {Promise<string>}
     * @memberof Resolver
     */
    text() {
        return new Promise((resolve, reject) => {
            try {
                resolve(Buffer.concat(this.data).toString());
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     *	Converts the response data into String (text)
     *
     * `Not Promise based function`
     * @return {string}  {string}
     * @memberof Resolver
     *
     * @alias toString()
     */
    toText = this.toString;
    /**
     *	Converts the response data into Buffer stream
     *
     * `Not Promise based function`
     * @return {string}  {string}
     * @memberof Resolver
     *
     * @alias toBuffer()
     */
    toStream = this.toBuffer;
    /**
      * Converts the response data into String (text)
      *
      * `Promise based function`
      * @return {Promise<string>}  {Promise<string>}
      * @memberof Resolver
      * @alias text()
    
      */
    string = this.text;
    /**
     * Converts the response data into Buffer stream
     *
     * `Promise based function`
     * @return {Promise<Buffer | PromiseLike<Buffer>>}  {Promise<Buffer | PromiseLike<Buffer>>}
     * @memberof Resolver
     * @alias stream()
     */
    buffer = this.stream;
    /**
     * Converts the response data into ArrayBuffer
     *
     * `Promise based function`
     * @return {Promise<ArrayBuffer>}  {Promise<ArrayBuffer>}
     * @memberof Resolver
     * @alias arrayBuffer()
     */
    array = this.arrayBuffer;
    /**
     * Converts the response data into String (text)
     *
     * `Not Promise based function`
     * @return {string}  {string}
     * @memberof Resolver
     */
    toString() {
        return Buffer.concat(this.data).toString();
    }
    /**
     * Converts the response data into Buffer Stream
     *
     * `Not Promise based function`
     * @return {Buffer}  {Buffer}
     * @memberof Resolver
     */
    toBuffer() {
        return Buffer.concat(this.data);
    }
    /**
     * Converts the response data into JSON
     *
     * `Not Promise based function`
     * @return {object}  {object}
     * @memberof Resolver
     */
    toJSON() {
        return JSON.parse(Buffer.concat(this.data).toString());
    }
    /**
     * Converts the response data into Blob
     *
     * `Not Promise based function`
     * @return {Blob}  {Blob}
     * @memberof Resolver
     */
    toBlob() {
        return new Blob(this.data);
    }
    /**
     * Converts the response data into ArrayBuffer
     *
     * `Not Promise based function`
     * @return {ArrayBuffer}  {ArrayBuffer}
     * @memberof Resolver
     */
    toArrayBuffer() {
        return new ArrayBuffer(this.data.length);
    }
}
