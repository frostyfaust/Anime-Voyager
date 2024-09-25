export async function getAnimes(search, page) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&sfw=true&page=${page}&limit=10`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching animes", error);
  }
}

export async function getAnime(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching anime", error);
  }
}
