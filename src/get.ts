
import { https, httpsOptions } from "../https";

export async function get(
  url: string | httpsOptions,
  options: httpsOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }
) {
  if (options) options.method = "GET";
  else if(typeof url != "string") { url.method == "GET" }

  if (options) return await https(url, options);
  else return await https(url);
}
