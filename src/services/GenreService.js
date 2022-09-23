import http from "./HttpService";

export function getGenres() {
  return http.get("http://vidly.test:8012/api/genres");
}
