
import { https, httpsOptions } from "../https";

export async function post(
  url: string | httpsOptions,
  options: httpsOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }
) {
  if (options) options.method = "POST";
  else if(typeof url != "string") { url.method == "POST" }

  if (options) return await https(url, options);
  else return await https(url);
}

