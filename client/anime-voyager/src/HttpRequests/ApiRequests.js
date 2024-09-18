export async function getAnimes(search) {
    try{
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Error fetching animes",error)
    }
}