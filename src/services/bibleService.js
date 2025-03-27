// import store from "../store";
// API doc https://scripture.api.bible/livedocs#/

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

export const search = async (bibleId, searchText, offset) => {
  if (navigator.onLine) {
    const url =
      API_URL +
      `/v1/bibles/${bibleId}/search?query=${searchText}&offset=${offset}`;
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

export const getBibleInfo = async (bibleId) => {
  if (navigator.onLine) {
    const url = API_URL + `/v1/bibles/${bibleId}`;
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

export const getBibleBooks = async (bibleId) => {
  if (navigator.onLine) {
    const url = API_URL + `/v1/bibles/${bibleId}/books?include-chapters=true`;
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

export const getBibleChapters = async (bibleId) => {
  if (navigator.onLine) {
    const url = API_URL + `/v1/bibles/${bibleId}/books?include-chapters=true`;
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

export const getBibleChapterVerses = async (bibleId, chapterId) => {
  if (navigator.onLine) {
    const url = API_URL + `/v1/bibles/${bibleId}/chapters/${chapterId}?content-type=json&include-titles=false`;
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
