import http from "./HttpService";

export function register(user) {

  return http.post("/api/register", {
    name: user.name,
    email: user.username,
    password: user.password,
  });

}

export async function login(email, password) {
  http.get("/sanctum/csrf-cookie");
  
  const response =  http.post("/api/login", { email, password });

  console.log(response);
  return;
}

export function getUser(headers) {
  return http.get("/api/user", headers);
}

