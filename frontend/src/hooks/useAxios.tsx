import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const useApiClient = () => {
  const setBearerToken = (newToken: string) => {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newToken}`;
    localStorage.setItem("Authorization", newToken);
  };

  const removeBearerToken = () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("Authorization");
  };

  const fetchData = async (endpoint: string) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const token = localStorage.getItem("Authorization");

  if (token && !axiosInstance.defaults.headers.common["Authorization"]) {
    setBearerToken(token);
  }

  return {
    setBearerToken,
    fetchData,
    removeBearerToken,
    axios: axiosInstance,
    token,
  };
};

export default useApiClient;
