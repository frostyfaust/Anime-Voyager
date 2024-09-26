import ranking from "../assets/ranking.png";
import calendar from "../assets/calendar.png";
import time from "../assets/time.png";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getAnime } from "../requests/ApiRequests";
import { AuthContext } from "../App";
import {
  requestWatchedAnimeIDs,
  requestAddWatchedAnimeID,
  requestRemoveWatchedAnimeID,
} from "../requests/WatchedAnimeRequests";
import {
  requestCurrentAnimeIDs,
  requestAddCurrentAnimeID,
  requestRemoveCurrentAnimeID,
} from "../requests/CurrentlyWatchingRequests";
import {
  requestPlanToWatchAnimeIDs,
  requestAddPlanToWatchAnimeID,
  requestRemovePlanToWatchAnimeID,
} from "../requests/PlanToWatchRequests";

export default function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState();
  const [watched, setWatched] = useState(false);
  const [current, setCurrent] = useState(false);
  const [planToWatch, setPlanToWatch] = useState(false);
  const userManager = useContext(AuthContext);

  useEffect(() => {
    getAnime(id)
      .then((data) => {
        setAnime(data.data);
      })
      .catch((error) => {
        console.error("Error fetching anime", error);
      });
  }, [id]);

  useEffect(() => {
    const fetchWatchedAnimeIDs = async () => {
      const{ watchedIDs: newWatchedIDs, errors: newErrors }
       = await requestWatchedAnimeIDs(userManager.username, userManager.token);
       const data = await Promise.all(newWatchedIDs.map(async (id) => {
          const response = await getAnime(id);
          
          return response.data;
        }));
        for (let i = 0; i < data.length; i++) {
          if (data[i].mal_id === parseInt(id)) {
            setWatched(true);
            break;
          }
        }
    };
    fetchWatchedAnimeIDs();
  }, [id, userManager.username, userManager.token]);
    

  useEffect(() => {
    const fetchCurrentAnimeIDs = async () => {
      const{ currentIDs: newCurrentIDs, errors: newErrors }
       = await requestCurrentAnimeIDs(userManager.username, userManager.token);
       const data = await Promise.all(newCurrentIDs.map(async (id) => {
          const response = await getAnime(id);
          return response.data;
        }));
        for (let i = 0; i < data.length; i++) {
          if (data[i].mal_id === parseInt(id)) {
            setCurrent(true);
            break;
          }
        }
    }
    fetchCurrentAnimeIDs();
  }, [id, userManager.username, userManager.token]);

  useEffect(() => {
    const fetchPlanToWatchAnimeIDs = async () => {
      const{ planToWatchIDs: newPlanToWatchIDs, errors: newErrors }
        = await requestPlanToWatchAnimeIDs(userManager.username, userManager.token);
        const data = await Promise.all(newPlanToWatchIDs.map(async (id) => {
            const response = await getAnime(id);
            return response.data;
          }));
          for (let i = 0; i < data.length; i++) {
            if (data[i].mal_id === parseInt(id)) {
              setPlanToWatch(true);
              break;
            }
          }
    }
    fetchPlanToWatchAnimeIDs();
  }, [id, userManager.username, userManager.token]);


  // console.log(anime);
  if (!anime) {
    return <h1>Loading...</h1>;
  }

  const handleWatched = async () => {
    if (!watched) {
      const response = await requestAddWatchedAnimeID(
        userManager.username,
        userManager.token,
        anime.mal_id
      );
      if (response.success) {
        console.log("Successfully added anime to watched list");
        setWatched(true);
        console.log(watched);
      } else {
        console.error("Error adding anime to watched list", response.errors);
      }
    } else {
      const response = await requestRemoveWatchedAnimeID(
        userManager.username,
        userManager.token,
        anime.mal_id
      );
      if (response.success) {
        console.log("Successfully removed anime from watched list");
        setWatched(false);
      } else {
        console.log(watched);
        console.error(
          "Error removing anime from watched list",
          response.errors
        );
      }
    }
  };

  const handleCurrent = async () => {
    if (!current) {
      const response = await requestAddCurrentAnimeID(
        userManager.username,
        userManager.token,
        anime.mal_id
      );
      if (response.success) {
        console.log("Successfully added anime to Currently watching list");
        setCurrent(true);
      } else {
        console.error(
          "Error adding anime to Currently watching list",
          response.errors
        );
      }
    } else {
      const response = await requestRemoveCurrentAnimeID(
        userManager.username,
        userManager.token,
        anime.mal_id
      );
      if (response.success) {
        console.log("Successfully removed anime from Currently watching list");
        setCurrent(false);
      } else {
        console.error(
          "Error removing anime from Currently watching list",
          response.errors
        );
      }
    }
  };

  const handlePlanToWatch = async () => {
    if (!planToWatch) {
      const response = await requestAddPlanToWatchAnimeID(
        userManager.username,
        userManager.token,
        anime.mal_id
      );
      if (response.success) {
        console.log("Successfully added anime to Plan to Watch list");
        setPlanToWatch(true);
      } else {
        console.error(
          "Error adding anime to Plan to Watch list",
          response.errors
        );
      }
    } else {
      const response = await requestRemovePlanToWatchAnimeID(
        userManager.username,
        userManager.token,
        anime.mal_id
      );
      if (response.success) {
        console.log("Successfully removed anime from Plan to Watch list");
        setPlanToWatch(false);
      } else {
        console.error(
          "Error removing anime from Plan to Watch list",
          response.errors
        );
      }
    }
  };

  return (
    <div className="container flex flex-col gap-5 lg:gap-10 m-auto mt-20">
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
              <button
                className={`btn btn-wide my-5 ${
                  watched ? "bg-lime-500" : "bg-gray-400"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleWatched();
                }}
              >
                Already Watched
              </button>

              <button
                className={`btn btn-wide my-5 ${
                  current ? "bg-lime-500" : "bg-gray-400"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCurrent();
                }}
              >
                Currently Watching
              </button>

              <button
                className={`btn btn-wide my-5 ${
                  planToWatch ? "bg-lime-500" : "bg-gray-400"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePlanToWatch();
                }}
              >
                Plan to Watch
              </button>
            </>
          )}
        </div>
      </div>
      <ul className="text-center">
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
      {/* <div>
        <iframe src={anime.trailer.embed_url} frameborder="0"></iframe>
      </div> */}
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
