const baseUrl = "http://localhost:8080";


// returns { errors: [...] } or { favoriteIDs: [...] }
export async function requestFavCharIDs(username, token) {
    const response = await fetch(`${baseUrl}/anime/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return { favoriteIDs: await response.json() };
    } else if (response.status === 403) {
      return { errors: ["Unauthorized"] };
    } else {
      return { errors: ["An unknown error occurred. Please try again."] };
    }
  }
  
  // returns { success: true } or { errors: [...] }
  export async function requestAddFavCharID(username, token, charID) {
    const response = await fetch(`${baseUrl}/favorites/${username}/${charID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (response.ok) {
      return { success: true };
    } else if (response.status === 400) {
      return { errors: await response.json() };
    } else if (response.status === 403) {
      return { errors: ["Unauthorized"] };
    } else {
      return { errors: ["An unknown error occurred. Please try again."] };
    }
  }
  
  // returns { success: true } or { errors: [...] }
  export async function requestRemoveFavCharID(username, token, charID) {
    const response = await fetch(`${baseUrl}/favorites/${username}/${charID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (response.ok) {
      return { success: true };
    } else if (response.status === 400) {
      return { errors: await response.json() };
    } else if (response.status === 403) {
      return { errors: ["Unauthorized"] };
    } else {
      return { errors: ["An unknown error occurred. Please try again."] };
    }
  }