import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "api-key": "89f4496e54e9384254ecce74d4cf9cb7",
  },
});

// Response interceptor to handle errors based on API error codes
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      let err;
      switch (status) {
        case 400:
          err = "Invalid ID supplied";
          break;
        case 401:
          err =
            "The API key provided is either missing, invalid, or unauthorized for API access.";
          break;
        case 403:
          err =
            "Server understood the request, but provided API key is not authorized to retrieve this information.";
          break;
        case 404:
          err = "Resource not found.";
          break;
        default:
          err = "An unexpected error occurred.";
      }
      return Promise.reject(err);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
