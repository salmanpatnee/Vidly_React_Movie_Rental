import http from "./HttpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
