const baseUrl = "http://localhost:8080";

export async function requestLogin(username, password) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else if (response.status === 400) {
    return { error: data };
  } else {
    return { error: "An error occurred. Please try again." };
  }
}

// returns { success: true } or { errors: [...] }
export async function requestRegister(username, password) {
  const response = await fetch(baseUrl + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    return { success: true };
  } else if (response.status === 400) {
    return { errors: data };
  } else {
    return { errors: ["An unknown error occurred. Please try again."] };
  }
}
