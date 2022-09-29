import http from "./HttpService";

const tokenKey = "access_token";
const authUserKey = "auth_user";

export async function register(user) {
  const { data } = await http.post("/api/register", {
    name: user.name,
    email: user.username,
    password: user.password,
  });

  localStorage.setItem(tokenKey, data.access_token);

  await getUser(data.access_token);
}

export async function login(email, password) {
  http.get("/sanctum/csrf-cookie");

  const { data } = await http.post("/api/login", { email, password });

  localStorage.setItem(tokenKey, data.access_token);

  await getUser(data.access_token);
}

export async function getUser(access_token) {
  const headers = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const { data: response } = await http.get("/api/user", headers);

  localStorage.setItem(authUserKey, JSON.stringify(response));
}

export function getCurrrentUser() {
  try {
    return JSON.parse(localStorage.getItem(authUserKey));
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(authUserKey);
}

export default {
  register,
  login,
  getCurrrentUser,
  logout,
};
