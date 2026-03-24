import apiFetch from "./api";

export const login = (email, password) => {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const logout = () => {
  return apiFetch("/api/auth/logout", {
    method: "POST",
  });
};

export const getCurrentUser = () => {
  return apiFetch("/api/auth/me", {
    method: "GET",
  });
};

export const getHRUser = () => {
  return apiFetch('/api/hr/user', {
    method: 'GET'
  });
};
