export default function AnimeCard({ anime }) {
    return (
        <div className="card bordered shadow-lg w-80">
            <figure>
                <img src={anime.image_url} alt={anime.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{anime.title}</h2>
                <p>{anime.synopsis}</p>
            </div>
        </div>
    )
}