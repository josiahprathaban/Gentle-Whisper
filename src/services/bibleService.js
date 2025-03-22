// import store from "../store";
import axiosInstance from "../axiosInstance";

const API_URL = "https://api.scripture.api.bible";

export const getBibles = async () => {
  if (navigator.onLine) {
    const url = API_URL + `/v1/bibles`;
    const params = {};
    const headers = {};
    const method = "get";

    try {
      const response = await axiosInstance({
        method,
        url,
        data: params,
        headers: {
          ...headers,
        },
      });

      if (response.data == null) {
        // store.commit("setError", { isError: true, error: "Item not found." });
      } else if (response.data.error) {
        // store.commit("setError", { isError: true, error: response.data.error });
      } else {
        const data = response.data.data;
        return data;
      }
    } catch (error) {
      console.error(`Failed to fetch data:`, error);
      // store.commit("setError", { isError: true, error: error });
    }
  } else {
    // store.commit("setError", { isError: true, error: "You are offline." });
  }
};
