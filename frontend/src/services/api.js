// 1. ADD YOUR RENDER URL HERE (No slash at the very end)
const BASE_URL = "https://hrms-backend-awpf.onrender.com"; 

const apiFetch = async (endpoint, options = {}) => {
  
  // 2. COMBINE THE BASE URL WITH THE ENDPOINT
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