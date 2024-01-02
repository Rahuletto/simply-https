# ⚡ simply-https

A light weight yet an efficient HTTPS module to make API requests

> [!IMPORTANT]
> Welcome to v2.0.0
>
> ## What's new?
>
> - New syntax to make it easy to switch from node-fetch or vanilla fetch() to simply-https
> - Faster, Efficient, More Type strict.
> - Supports [various types](#response) for response
> - Fully supports all [HTTPS methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
> - Less bloat.

## Functions

- [https()](#https)

### https()

Https function to replace your good ol' node-fetch and axios.

```js
const { https } = require("simply-https");
https("url", {
  // options (optional)
});
```

> This returns a Promise so you should await it and should be located inside an `async` function. Or your project should be configured to [`top-level await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)

Types:

```ts
https(
  url: string,
  options?: HttpsOptions
): Promise<object | Buffer | string | Resolver | ArrayBuffer | Blob>;
```

- url: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- options: [`HttpsOptions`](#httpsoptions)

- Resolves: `Promise<object | Buffer | string | Resolver | ArrayBuffer | Blob>`

## Options

### `HttpsOptions`

| Parameters     | Type                                                                                           | Default                                | Description                                                                                                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `body`         | object \| string (passed as JSON.stringify())                                                  |                                        | The body to send the request (cannot be used in 'GET' request)                                                                                                                            |
| `url`          | string                                                                                         |                                        | The URL to call the API (if you are not using the second argument and not using hostname and endpoint options)                                                                            |
| `hostname`     | string                                                                                         |                                        | The hostname of the url (Not necessary if URL argument has endpoint with it)                                                                                                              |
| `endpoint`     | string                                                                                         |                                        | Endpoint to request to (Not necessary if URL argument has endpoint with it)                                                                                                               |
| `headers`      | Record<string, string>                                                                         | { "Content-Type": "application/json" } | The headers of the request                                                                                                                                                                |
| `method`       | "GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE" \| "HEAD" \| "CONNECT" \| "OPTIONS" \| "TRACE" | GET                                    | The method of request to do with the URL                                                                                                                                                  |
| `responseType` | "json" \| "stream" \| "text" \| "blob" \| "arrayBuffer" \| "buffer"                            |                                        | Returns Resolver class where you can do .toJSON, .toString, .toBuffer, .toStream, .toBlob or Promised functions like .json(), .stream(), .text(), .blob() to support vanilla fetch syntax |
| `statusCode`   | number                                                                                         | 200                                    | Expected status code                                                                                                                                                                      |
| `timeout`      | number                                                                                         | 5000                                   | The time limit untill it gets HTTP Timeout                                                                                                                                                |

```ts
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
```

---

### Response

It returns a `Resolver` class which contains

> Promise based functions
>
> - arrayBuffer() | array()
> - blob()
> - buffer() | stream()
> - json()
> - text() | string()

> Not Promise based
>
> - toArrayBuffer()
> - toBlob()
> - toBuffer() | toStream()
> - toJSON()
> - toText() | toString()

These functions are used to resolve your data stream into desired format.
Can convert into
[`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
[`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
[`Buffer`](https://developer.mozilla.org/en-US/docs/Glossary/Buffer)
[`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## Examples

<details>
  <summary>Default mode</summary>

With await

```js title="https.js"
const { https } = require("simply-https");

// should be inside a async function or have top-level await
const data = await https("postman-echo.com/get");
const res = await res.json();
console.log(res);
```

With `.then()`

```js title="https.js"
const { https } = require("simply-https");

https("postman-echo.com/get")
  .then((data) => data.json())
  .then((res) => console.log(res));
```

</details>

<details>
  <summary>POST Request</summary>

```js title="https.js"
const { https } = require("simply-https");

https("https://httpbin.org/post", {
  method: "POST",
})
  .then((data) => data.json())
  .then((res) => console.log(res));
```

With post body

```js title="https.js"
const { https } = require("simply-https");

https("https://httpbin.org/post", {
  method: "POST",
  body: { message: "hello world" },
})
  .then((data) => data.json())
  .then((res) => console.log(res));
```

</details>

<details>
  <summary>Transition from node-fetch</summary>

<table>
<tr>
<th>
From fetch
</th>
<th>
To simply-https
</th>
</tr>

<tr>

<td>

```js
const { fetch } = require("node-fetch");

fetch("https://httpbin.org/post", {
  method: "POST",
})
  .then((data) => data.json())
  .then((res) => console.log(res));
```

</td>

<td>

```js
const { https } = require("simply-https");

https("https://httpbin.org/post", {
  method: "POST",
  body: { message: "hello world" },
})
  .then((data) => data.json())
  .then((res) => console.log(res));
```

</td>

</tr>
</table>

```diff
- fetch("https://httpbin.org/post", {
+ https("https://httpbin.org/post", {
```

Its that simple.
No bloat, no sloppy anymore.

</details>
