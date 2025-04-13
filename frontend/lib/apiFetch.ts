const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (endpoint: string, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  return res;
};
