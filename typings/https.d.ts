/// <reference types="node" />
/**
 * HttpsOptions
 * @param {Object} [options.body]
 * @param {string} [options.url]
 * @param {string} [options.hostname]
 * @param {string} [options.endpoint]
 * @param {Record<string, string>} [options.headers]
 * @param {("GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE")} [options.method="GET"]
 * @param {("json"|"stream"|"text"|"blob"|"arrayBuffer"|"buffer")} [options.responseType="json"] - Expected response type.
 * @param {number} [options.statusCode] - Expected status code.
 * @param {number} [options.timeout] - Request Timeout in Milliseconds
 * @returns {Promise<object | Buffer | string | Resolver | ArrayBuffer | Blob>} - Returns the response from the request.
 * @throws {PromiseRejectedResult} - If the request fails.
 */
interface HttpsOptions {
    body?: object | string;
    url?: string;
    hostname?: string;
    endpoint?: string;
    headers?: Record<string, string>;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE";
    responseType?: "json" | "stream" | "text" | "blob" | "arrayBuffer" | "buffer";
    statusCode?: number;
    timeout?: number;
}
/**
 * ### https
 *  Https function to replace your good ol' node-fetch and axios.
 *
 * @param {string} url
 * @param {HttpsOptions} options
 */
export declare function https(url: string, options?: HttpsOptions): Promise<object | Buffer | string | Resolver | ArrayBuffer | Blob>;
/**
 * Resolver class
 *
 * Changes the response of the http request according to the format you want
 *
 * @class Resolver
 */
declare class Resolver {
    data: Buffer[];
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
    constructor(stream: Buffer[]);
    /**
     * Converts the response data into ArrayBuffer
     *
     * `Promise based function`
     * @return {Promise<ArrayBuffer>}  {Promise<ArrayBuffer>}
     * @memberof Resolver
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Converts the response data into Blob
     *
     * `Promise based function`
     * @return {Promise<Blob>}  {Promise<Blob>}
     * @memberof Resolver
     */
    blob(): Promise<Blob>;
    /**
     * Converts the response data into Buffer stream
     *
     * `Promise based function`
     * @return {Promise<Buffer | PromiseLike<Buffer>>}  {Promise<Buffer | PromiseLike<Buffer>>}
     * @memberof Resolver
     * @alias buffer()
     */
    stream(): Promise<Buffer | PromiseLike<Buffer>>;
    /**
     * Converts the response data into JSON (commonly used) [DEFAULT]
     *
     * `Promise based function`
     * @return {Promise<object>}  {Promise<object>}
     * @memberof Resolver
     */
    json(): Promise<object>;
    /**
     * 	Converts the response data into String (text)
     *
     * `Promise based function`
     * @return {Promise<string>}  {Promise<string>}
     * @memberof Resolver
     */
    text(): Promise<string>;
    /**
     *	Converts the response data into String (text)
     *
     * `Not Promise based function`
     * @return {string}  {string}
     * @memberof Resolver
     *
     * @alias toString()
     */
    toText: () => string;
    /**
     *	Converts the response data into Buffer stream
     *
     * `Not Promise based function`
     * @return {string}  {string}
     * @memberof Resolver
     *
     * @alias toBuffer()
     */
    toStream: () => Buffer;
    /**
      * Converts the response data into String (text)
      *
      * `Promise based function`
      * @return {Promise<string>}  {Promise<string>}
      * @memberof Resolver
      * @alias text()
    
      */
    string: () => Promise<string>;
    /**
     * Converts the response data into Buffer stream
     *
     * `Promise based function`
     * @return {Promise<Buffer | PromiseLike<Buffer>>}  {Promise<Buffer | PromiseLike<Buffer>>}
     * @memberof Resolver
     * @alias stream()
     */
    buffer: () => Promise<Buffer | PromiseLike<Buffer>>;
    /**
     * Converts the response data into ArrayBuffer
     *
     * `Promise based function`
     * @return {Promise<ArrayBuffer>}  {Promise<ArrayBuffer>}
     * @memberof Resolver
     * @alias arrayBuffer()
     */
    array: () => Promise<ArrayBuffer>;
    /**
     * Converts the response data into String (text)
     *
     * `Not Promise based function`
     * @return {string}  {string}
     * @memberof Resolver
     */
    toString(): string;
    /**
     * Converts the response data into Buffer Stream
     *
     * `Not Promise based function`
     * @return {Buffer}  {Buffer}
     * @memberof Resolver
     */
    toBuffer(): Buffer;
    /**
     * Converts the response data into JSON
     *
     * `Not Promise based function`
     * @return {object}  {object}
     * @memberof Resolver
     */
    toJSON(): object;
    /**
     * Converts the response data into Blob
     *
     * `Not Promise based function`
     * @return {Blob}  {Blob}
     * @memberof Resolver
     */
    toBlob(): Blob;
    /**
     * Converts the response data into ArrayBuffer
     *
     * `Not Promise based function`
     * @return {ArrayBuffer}  {ArrayBuffer}
     * @memberof Resolver
     */
    toArrayBuffer(): ArrayBuffer;
}
export {};
