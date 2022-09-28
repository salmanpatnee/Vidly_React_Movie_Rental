import http from "./HttpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}

export async function login(email, password) {
  await http.get("/sanctum/csrf-cookie");

  const { data: response } = await http.post("/api/login", { email, password });

  if (response.status_code !== 200) {
    throw response.message;
  } else {
    return response;
  }

  // return http.post("/login", { email, password });
}
