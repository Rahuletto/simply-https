import { Agent, request } from "https";
import { URL } from "url";

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
  method?:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE";
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

export function https(
  url: string,
  options?: HttpsOptions
): Promise<object | Buffer | string | Resolver | ArrayBuffer | Blob> {
  return new Promise((resolve, reject) => {
    const req = request(
      {
        agent: new Agent({ keepAlive: true }),
        headers: options?.headers || { "Content-Type": "application/json" },
        hostname: options?.url
          ? new URL(options.url)?.hostname
          : options?.hostname || new URL(url).hostname,
        method: options?.method || "GET",
        path: options?.url
          ? new URL(options.url)?.pathname
          : options?.endpoint || new URL(url).pathname,
      },
      (response) => {
        const data: Buffer[] = [];
        response.on("error", reject);
        response.on("data", (chunk) => data.push(Buffer.from(chunk)));
        response.on("end", async () => {
          if (
            options?.statusCode &&
            response.statusCode !== options?.statusCode
          )
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
          } catch (e) {
            reject(e);
          }
        });
      }
    ).on("error", reject);

    req.setTimeout(options?.timeout || 5000, () => {
      req.destroy();
      reject({ error: "Request Timed Out", status: 408 });
    });
    if (options?.body)
      req.write(
        typeof options?.body == "string"
          ? options?.body
          : JSON.stringify(options.body)
      );
    req.end();
  });
}

/**
 * Resolver class
 *
 * Changes the response of the http request according to the format you want
 *
 * @class Resolver
 */
class Resolver {
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
  constructor(stream: Buffer[]) {
    this.data = stream;
  }

  /**
   * Converts the response data into ArrayBuffer
   *
   * `Promise based function`
   * @return {Promise<ArrayBuffer>}  {Promise<ArrayBuffer>}
   * @memberof Resolver
   */
  arrayBuffer(): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      try {
        resolve(new ArrayBuffer(this.data.length));
      } catch (e) {
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
  blob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        resolve(new Blob(this.data));
      } catch (e) {
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
  stream(): Promise<Buffer | PromiseLike<Buffer>> {
    return new Promise((resolve, reject) => {
      try {
        resolve(Buffer.concat(this.data));
      } catch (e) {
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
  json(): Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(Buffer.concat(this.data).toString()));
      } catch (e) {
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
  text(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(Buffer.concat(this.data).toString());
      } catch (e) {
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
  toString(): string {
    return Buffer.concat(this.data).toString();
  }

  /**
   * Converts the response data into Buffer Stream
   *
   * `Not Promise based function`
   * @return {Buffer}  {Buffer}
   * @memberof Resolver
   */
  toBuffer(): Buffer {
    return Buffer.concat(this.data);
  }

  /**
   * Converts the response data into JSON
   *
   * `Not Promise based function`
   * @return {object}  {object}
   * @memberof Resolver
   */
  toJSON(): object {
    return JSON.parse(Buffer.concat(this.data).toString());
  }

  /**
   * Converts the response data into Blob
   *
   * `Not Promise based function`
   * @return {Blob}  {Blob}
   * @memberof Resolver
   */
  toBlob(): Blob {
    return new Blob(this.data);
  }

  /**
   * Converts the response data into ArrayBuffer
   *
   * `Not Promise based function`
   * @return {ArrayBuffer}  {ArrayBuffer}
   * @memberof Resolver
   */
  toArrayBuffer(): ArrayBuffer {
    return new ArrayBuffer(this.data.length);
  }
}
