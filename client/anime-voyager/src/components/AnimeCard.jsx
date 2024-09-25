import { useNavigate} from "react-router-dom";


export default function AnimeCard({ anime }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/anime/${anime.mal_id}`);
  };

  return (
    <div
      className="card bg-base-100 card-size m-3 shadow-xl"
      onClick={handleClick}
    >
      <figure>
        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{anime.title}</h2>
        <div className="card-actions justify-center">
          {anime.genres.map((genre, index) => (
            <div key={index} className="badge badge-outline">
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
