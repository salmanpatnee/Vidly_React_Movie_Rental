import http from "./HttpService";

export function getGenres() {
  return http.get("/genres");
}
