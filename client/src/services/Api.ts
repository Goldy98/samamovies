import axios from "axios";

// const API_URL = "http://httpbin.org/";
export const API_URL = "http://localhost:8081";

type AxiosMethod =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK"
  | undefined;

export async function apiRequest(
  method: AxiosMethod,
  endPoint: string,
  variables?: any,
  formData?: boolean
) {
  const authToken = sessionStorage.getItem("token");

  try {
    const options = {
      method,
      url: `${API_URL}/${endPoint}`,
      data: variables,
      headers: {},
    };

    if (authToken) options.headers["authorization"] = `Bearer ${authToken}`;

    if (formData) options.headers["Content-Type"] = "multipart/form-data";

    const resp = await axios(options);

    if (!resp) throw new Error("Error from API: " + resp);

    return resp;
  } catch (err) {
    // console.log(err);
    const resp = err.response;
    if (resp.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
    }
    /* const resp = err.response;
    if (!resp)
      throw err;
    const graphqlErrors = resp.data && resp.data.errors;
    if (graphqlErrors)
      throw new Error(graphqlErrors.map(error => error.message).join("\n"));
    if (typeof resp.data === "string")
      throw new Error(`HTTP Status ${resp.status} (${resp.statusText}), ${resp.data}`);
    throw err; */
  }
}
