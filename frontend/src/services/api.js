<<<<<<< HEAD
const API_BASE_URL ="http://localhost:5000";

export const apiRequest = async (endpoint, options = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
=======
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const isBrowser = typeof window !== "undefined";

const getAccessToken = () => (isBrowser ? localStorage.getItem("accessToken") : null);

const saveAccessToken = (token) => {
  if (!isBrowser || !token) return;
  localStorage.setItem("accessToken", token);
};

const readResponseBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!text) return null;

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  return { message: text };
};

const refreshAccessToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return null;

  const data = await readResponseBody(response);
  const newToken = data?.accessToken;

  if (newToken) {
    saveAccessToken(newToken);
    return newToken;
  }

  return null;
};

const shouldSkipRefresh = (endpoint) => endpoint.startsWith("/auth/");

export const apiRequest = async (endpoint, options = {}, retry = true) => {
  const token = getAccessToken();
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
<<<<<<< HEAD
      ...(token && { Authorization: `Bearer ${token}` }),
=======
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
      ...options.headers,
    },
    credentials: "include",
  });

<<<<<<< HEAD
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
=======
  if (response.status === 401 && retry && !shouldSkipRefresh(endpoint)) {
    const refreshedToken = await refreshAccessToken();

    if (refreshedToken) {
      return apiRequest(endpoint, options, false);
    }
  }

  const data = await readResponseBody(response);

  if (!response.ok) {
    const errorMessage = data?.message || "حدث خطأ أثناء تنفيذ الطلب";
    throw new Error(errorMessage);
  }

  return data;
};

export { API_BASE_URL };
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
