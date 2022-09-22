import http from "./HttpService";

export function getMovies() {
  return http.get("http://vidly.test:8012/api/movies");
}
