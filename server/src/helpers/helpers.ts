import { Response } from "express";

export function writeJsonResponse(res: Response, httpCode: number, data) {
  res.setHeader("Content-Type", "application/json");
  res.status(httpCode);
  res.send(JSON.stringify(data));
  res.end();
}

export function writeServerError(res: Response, err: Error, reqBody?: string) {
  writeError(res, 500, `Error: ${err.message}\nRequest: ${reqBody}`);
}

export function writeError(res: Response, httpCode: number, message?: string) {
  res.status(httpCode);
  res.send(message || httpErrorMessage(httpCode));
  res.end();
}

export function httpErrorMessage(httpCode: number) {
  switch (httpCode) {
    case 400:
      return "400 Bad Request";
    case 403:
      return "403 Forbidden";
    case 404:
      return "404 Not Found";
    case 500:
      return "500 Internal Server Error";
    default:
      return `Error ${httpCode}`;
  }
}
