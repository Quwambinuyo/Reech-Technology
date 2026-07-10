import axios from "axios";
import { getAuthToken } from "../utils";

// export const baseURL = "https://be-reech-1.onrender.com/api/v1";
// export const baseURL = "http://217.117.15.108:8090/api/v1";
export const baseURL = "http://217.117.15.108:8090/api/v1";
// export const baseURL = "https://api-dev.reechtechnology.ng/api/v1";
// export const baseURL = "http://35.177.170.30:8080/api/v1";

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
