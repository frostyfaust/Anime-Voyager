import ranking from "../assets/ranking.png";
import calendar from "../assets/calendar.png";
import time from "../assets/time.png";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getAnime } from "../requests/ApiRequests";
import { AuthContext } from "../App";
import { requestAddWatchedAnimeID } from "../requests/WatchedAnimeRequests";
import { requestAddCurrentAnimeID } from "../requests/CurrentlyWatchingRequests";
import { requestAddPlanToWatchAnimeID } from "../requests/PlanToWatchRequests";

export default function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState();
  const userManager = useContext(AuthContext);

  useEffect(() => {
    getAnime(id)
      .then((data) => {
        console.log(data);
        setAnime(data.data);
      })
      .catch((error) => {
        console.error("Error fetching anime", error);
      });
  }, [id]);

  // console.log(anime);
  if (!anime) {
    return <h1>Loading...</h1>;
  }

  const handleWatched = async() => {
    const response = await requestAddWatchedAnimeID(userManager.username, userManager.token, anime.mal_id);
    if(response.success){
      console.log("Successfully added anime to watched list");
    } else {
      console.error("Error adding anime to watched list", response.errors);
    }
  }

  const handleCurrent = async() => {
    const response = await requestAddCurrentAnimeID(userManager.username, userManager.token, anime.mal_id);
    if(response.success){
      console.log("Successfully added anime to Currently watching list");
    } else {
      console.error("Error adding anime to Currently watching list", response.errors);
    }
  }

  const handlePlanToWatch = async() => {
    const response = await requestAddPlanToWatchAnimeID(userManager.username, userManager.token, anime.mal_id);
    if(response.success){
      console.log("Successfully added anime to Plan to Watch list");
    } else {
      console.error("Error adding anime to Plan to Watch list", response.errors);
    }
  }
    

  return (
    <div className="container flex flex-col gap-5 lg:gap-10">
      <div className="flex flex-col gap-5 border-b-2 border-black-1 pb-5 sm:flex-row lg:gap-10 lg:pb-10 dark:border-white-2">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className=""
        />
        <div className="flex flex-col gap-2.5 lg:gap-5">
          {anime.airing ? (
            <p className="text-small">{anime.status}</p>
          ) : (
            <p className="text-small">{anime.status}</p>
          )}
          <h1>{anime.title}</h1>
          <h3>{anime.title_japanese}</h3>
          {anime.rank ? (
            <div className="flex flex-row items-center gap-2.5 lg:gap-5">
              <img src={ranking} alt="Ranking" className="" />
              <p>{anime.rank}</p>
            </div>
          ) : null}
          {anime.broadcast.string ? (
            <div className="flex flex-row items-center gap-2.5 lg:gap-5">
              <img src={calendar} alt="broadcasting time" />
              <p>{anime.broadcast.string}</p>
            </div>
          ) : null}
          <div className="flex flex-row items-center gap-2.5 lg:gap-5">
            <img src={time} alt="duration" />
            <p>{anime.duration}</p>
          </div>
        </div>
        <div className="flex flex-col m-auto">
          {userManager.username && (
            <>
              <button className="btn btn-wide my-5" onClick={(e)=>{
                e.preventDefault();
                handleWatched();
              }}>Already Watched</button>

              <button className="btn btn-wide my-5" onClick={(e)=>{
                e.preventDefault();
                handleCurrent();
              }}>Currently Watching</button>

              <button className="btn btn-wide my-5" onClick={(e)=>{
                e.preventDefault();
                handlePlanToWatch();
              }}>Plan to Watch</button>
            </>
          )}
        </div>
      </div>
      <ul>
        {anime.genres.map((genre, index) => (
          <li
            key={index}
            className="badge badge-lg badge-neutral text-body px-6 py-5 mx-4"
          >
            {genre.name}
          </li>
        ))}
      </ul>
      <h2>Synopsis</h2>
      <p className="text-justify">{anime.synopsis}</p>
      <div>
        <iframe src={anime.trailer.embed_url} frameborder="0"></iframe>
      </div>
      {anime.background ? (
        <div className="p">
          <h2>Background</h2>
          <p>{anime.background}</p>
        </div>
      ) : null}
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
}
