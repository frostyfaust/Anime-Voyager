const baseUrl = "http://localhost:8080";


// returns { errors: [...] } or { favoriteIDs: [...] }
export async function requestCurrentAnimeIDs(username, token) {
    const response = await fetch(`${baseUrl}/animeList/currentList/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return { currentIDs: await response.json() };
    } else if (response.status === 403) {
      return { errors: ["Unauthorized"] };
    } else {
      return { errors: ["An unknown error occurred. Please try again."] };
    }
  }
  
  // returns { success: true } or { errors: [...] }
  export async function requestAddCurrentAnimeID(username, token, animeID) {
    const response = await fetch(`${baseUrl}/animeList/currentList/${username}/${animeID}`, {
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
  export async function requestRemoveCurrentAnimeID(username, token, animeID) {
    const response = await fetch(`${baseUrl}/animeList/currentList/${username}/${animeID}`, {
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