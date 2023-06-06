/// <reference types="node" />
export { get } from "./src/get";
export { post } from "./src/post";
import { OutgoingHttpHeaders } from "http2";
/**
 * **Documentation Url** of the options: https://simplyd.js.org/docs/misc/https#httpsoptions
 */
export declare type httpsOptions = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE";
    headers: OutgoingHttpHeaders;
    body?: Object;
    url?: string;
    host?: string;
    endpoint?: string;
};
/**
 * Https function to replace your good ol' node-fetch and axios.
 * @param host
 * @param endpoint
 * @param options
 * @link `Documentation:` https://simplyd.js.org/docs/misc/https
 * @example simplydjs.https("postman-echo.com", "/get") // An Echo endpoint
 */
export declare function https(url: string | httpsOptions, options?: httpsOptions): Promise<any>;
