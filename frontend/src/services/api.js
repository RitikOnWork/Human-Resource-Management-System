// In dev: Vite proxy handles /api -> localhost:5000
// In prod: Vercel rewrites handle /api -> Render backend
const BASE_URL = "";

const apiFetch = async (endpoint, options = {}) => {
  const fullUrl = `${BASE_URL}${endpoint}`;

  const response = await fetch(fullUrl, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let error = "Request failed";
    try {
      const data = await response.json();
      error = data.error || error;
    } catch (_) {}
    throw new Error(error);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export default apiFetch;
