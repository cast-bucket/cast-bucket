import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`;

const client = async (endpoint: string, { body, ...customConfig }: any = {}) => {
  const { token } = customConfig;
  const headers: any = { "content-type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return axios(`${API_URL}/${endpoint}`, config).then(r => r.data);
};

export default client;
