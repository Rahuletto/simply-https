/// <reference types="node" />
import { OutgoingHttpHeaders } from 'http2';
/**
 * **Documentation Url** of the options: https://simplyd.js.org/docs/misc/https#httpsoptions
 */
export declare type httpsOptions = {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE';
    headers: OutgoingHttpHeaders;
    body?: Object;
};
/**
 * Https function to replace your good ol' node-fetch and axios.
 *
 * @overload
 *
 * @param host
 * @param endpoint
 * @param options
 * @link `Documentation:` https://simplyd.js.org/docs/misc/https
 * @example simplydjs.https("postman-echo.com", "/get") // An Echo endpoint
 */
export declare function https(url: string, endpoint: string): Promise<any>;
export declare function https(url: string, options: httpsOptions): Promise<any>;
