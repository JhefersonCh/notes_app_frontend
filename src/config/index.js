/* eslint-disable no-unused-vars */
import axios from "axios";
import tokenService from "../Modules/shared/services/tokenService";
import { toast } from "react-toastify";
import navigationService from "../Modules/shared/services/navigationService";
import { baseURL } from "../environment.product";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((req) => {
  if (req.url?.includes("assets")) return req;
  const token = tokenService.getLocalAccessToken();
  req.headers["x-access-token"] = token;
  return req;
});

api.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  async (error) => {

    toast.error(error?.response?.data?.error || "An error occurred");
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenService.getLocalRefreshToken();

      try {
        const { data } = await tokenService.refreshToken(refreshToken);

        tokenService.setUser(data?.data?.user)
        api.defaults.headers.common["x-access-token"] = data?.data?.accessToken;
        originalRequest.headers["x-access-token"] = data?.data?.accessToken;

        return api(originalRequest);
      } catch (refreshError) {
        toast.error(refreshError?.response?.data?.error || "An error occurred while refreshing token");
        navigationService.dynamicUrl('/auth');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
