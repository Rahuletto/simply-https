# ⚡ simply-https

A light weight yet an efficient HTTPS module to make API requests

### Summary

- [https()](#https)
- [get()](#get)
- [post()](#post)

## https()

Https function to replace your good ol' node-fetch and axios.

### Implementation

```js
const simply = require("simply-https");
simply.https("url", {
  method: "GET", // required
  // options (optional)
});
```

> This returns a Promise so you should await it and should be located inside an `async` function. Or your project should be configured to [`top-level await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)

### Types

```ts
https(
 url: string | httpsOptions,
 options: httpsOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
 }
): Promise<any>
```

- url: [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [`httpsOptions`](#httpsoptions)
- options: [`httpsOptions`](#httpsoptions)

- Resolves: [`any`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

## get()

Just the https function but with "GET" method

### Implementation

```js
const simply = require("simply-https");

simply.get("url", {
  // options (optional)
});
```

## post()

Just the https function but with "POST" method

### Implementation

```js
const simply = require("simply-https");

simply.post("url", {
  // options (optional)
});
```

## Options

### `httpsOptions`

| Parameter | Type                                                                                                                                                                                | Required | Default                                | Description                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------- | -------------------------------------------------------------- |
| `method`  | [`'GET'`/`'POST'`/`'PUT'`/`'PATCH'`/`'DELETE'`/`'HEAD'`/`'CONNECT'`/`'OPTIONS'`/`'TRACE'`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ❌       | "GET"                                  | Provide a method to access the api                             |
| `headers` | [HTTPHeaders](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)                                                                                                            | ❌       | { 'Content-Type': 'application/json' } | The header of the request                                      |
| `body`    | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)                                                                                   | ❌       | _none_                                 | The body to send the request (cannot be used in 'GET' request) |

---

## Example

- ### Default settings

```js title="https.js"
const simply = require("simply-https");

// should be inside a async function or have top-level await
await simply.https("postman-echo.com/get");
```

- ### With options

```js title="https.js"
const simply = require("simply-https");

simply.https({
  url: "postman-echo.com/get",
  method: "GET",
  headers: { "Content-Type": "application/json" },
});
```
