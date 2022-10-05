import http from "./HttpService";

const apiEndpoint = `/api/users`;

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getCustomers() {
  return http.get(apiEndpoint);
}

export default {
    customerUrl, 
    getCustomers
}