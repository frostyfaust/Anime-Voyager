const baseUrl = "http://localhost:8080";


// returns { errors: [...] } or { favoriteIDs: [...] }
export async function requestWatchedAnimeIDs(username, token) {
    const response = await fetch(`${baseUrl}/animeList/watchList/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return { watchedIDs: await response.json() };
    } else if (response.status === 403) {
      return { errors: ["Unauthorized"] };
    } else {
      return { errors: ["An unknown error occurred. Please try again."] };
    }
  }
  
  // returns { success: true } or { errors: [...] }
  export async function requestAddWatchedAnimeID(username, token, animeID) {
    const response = await fetch(`${baseUrl}/animeList/watchList/${username}/${animeID}`, {
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
  export async function requestRemoveWatchedAnimeID(username, token, animeID) {
    const response = await fetch(`${baseUrl}/animeList/WatchList/${username}/${animeID}`, {
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