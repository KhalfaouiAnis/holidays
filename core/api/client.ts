import axios from "axios";
import { getToken, signOut } from "../auth";

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

client.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    console.log({ error });
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      signOut();
    }
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ error });
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      signOut();
    }
    return Promise.reject(error);
  }
);
