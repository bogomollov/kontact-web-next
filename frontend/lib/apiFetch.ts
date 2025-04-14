const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const newHeaders = {
    ...headers,
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: newHeaders,
  });

  return res;
};
