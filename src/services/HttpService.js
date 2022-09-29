import axios from "axios";
import logger from "./LogService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred.");
    logger.log(error);
  }

  return Promise.reject(error);
});

function setToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// axios.defaults.baseURL = import.meta.env.API_BASE_URL;

axios.defaults.baseURL = "http://vidly.test:8012";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};

export default methods;
