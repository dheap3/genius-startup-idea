export async function createAccount(email, password) {
  const response = await fetch("/api/auth/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.msg || "Failed to create account");
  }

  return response.json();
}

export async function login(email, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.msg || "Login failed");
  }

  return response.json();
}

export async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok && response.status !== 204) {
    throw new Error("Logout failed");
  }
}

export async function getProgress() {
  const response = await fetch("/api/progress", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.msg || "Failed to load progress");
  }

  return response.json();
}

export async function getAllProgress() {
  const response = await fetch("/api/progress/all", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.msg || "Failed to load all progress");
  }

  return response.json();
}

export async function saveProgress(playerPosition) {
  const response = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ playerPosition }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.msg || "Failed to save progress");
  }

  return response.json();
}
