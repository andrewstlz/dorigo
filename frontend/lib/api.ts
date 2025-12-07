import axios, { AxiosResponse } from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- GET wrapper ---
export async function apiGet<T = unknown>(path: string) {
  const res: AxiosResponse<T> = await client.get(path);
  return res;
}

// --- POST wrapper ---
export async function apiPost<T = unknown>(path: string, body?: any) {
  const res: AxiosResponse<T> = await client.post(path, body, {
    withCredentials: true,
  });
  return res;
}

// --- DELETE wrapper ---
export async function apiDelete<T = unknown>(path: string) {
  const res: AxiosResponse<T> = await client.delete(path, {
    withCredentials: true,
  });
  return res;
}

export default {
  get: apiGet,
  post: apiPost,
  delete: apiDelete,
};
