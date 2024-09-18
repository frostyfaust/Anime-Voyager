import ranking from "../assets/ranking.png";
import calendar from "../assets/calendar.png";
import time from "../assets/time.png";

export default function AnimePage({anime}) {
    console.log(anime);
    return (
        <div className="container flex flex-col gap-5 lg:gap-10">
            <div className="flex flex-col gap-5 border-b-2 border-black-1 pb-5 sm:flex-row lg:gap-10 lg:pb-10 dark:border-white-2">
                <img src={anime.images.jpg.large_image_url} alt={anime.title} className="mx-auto w-full max-w-44 h-auto object-center object-cover sm:mx-0 lg:max-w-72" />
                <div className="flex flex-col gap-2.5 lg:gap-5">
                    {anime.airing ? (
                        <p>{anime.status}</p>
                    ) : (
                        <p>{anime.status}</p>
                    )}
                    <h1>{anime.title}</h1>
                    <h3>{anime.title_japanese}</h3>
                    {anime.rank ? (
                    <div>
                        <img src={ranking} alt="Ranking" />
                        <p>{anime.rank}</p>
                    </div>
                    ) :(null)
                     } 
                     {anime.background.string ? (
                    <div>
                        <img src={calendar} alt="broadcasting time" />
                        <p>{anime.broadcast.string}</p>
                    </div>
                    ) :(null)
                    }
                    <div>
                        <img src={time} alt="duration" />
                        <p>{anime.duration}</p>
                    </div>  
                </div>
            </div>
            <ul>
                {anime.genres.map((genre, index) => (
                    <li key={index}>{genre.name}</li>
                ))}
            </ul>
            <h2>Synopsis</h2>
            <p>{anime.synopsis}</p>
            <div>
                <iframe src={anime.trailer.embed_url} frameborder="0"></iframe>
            </div>
            {anime.background ? (
                <div>
            <h2>Background</h2>
            <p>{anime.background}</p>
            </div>
            ) : (null)
        }
        </div>
    );
}
