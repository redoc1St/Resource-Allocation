import axios from "axios";
const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (!token) return config;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.error(error);
  }
);
export default instance;
