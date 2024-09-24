import { AuthContext } from "../App"
import { useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { requestWatchedAnimeIDs } from "../requests/WatchedAnimeRequests"
import { getAnime } from "../requests/ApiRequests"
import AnimeCards from "./AnimeCards";

export default function Watched() {
    const userManager = useContext(AuthContext);
    const [watched, setWatched] = useState([]);
    const [error, setError] = useState([null]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userManager.username){
            navigate("/login");
        }

        const loadWatched = async() => {
            const {watchedIDs: newWatchedIDs, errors: newErrors} 
            = await requestWatchedAnimeIDs(userManager.username, userManager.token);
            const data = await Promise.all(newWatchedIDs.map(async (id) => {
                const response = await getAnime(id);
                return response.data;
            }
            ));
            setWatched(data);
            setError(newErrors);
        }

        loadWatched();
    }, []
    );

    return (
        <div className="relative z-10 text-center flex-col items-center mt-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-12">
        {userManager.username}'s Finished Animes
      </h1>
      {/* <button className="p-2 bg-yellow-400 text-black rounded" onClick={() => setLoading(true)}>refresh</button> */}
      {error ?
            <div className="mt-2">
              < span className="text-red-500">Error loading Watched Animes:</span>
              <ul>
                {error.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
            </div>
            :
            <div>
              <AnimeCards animes={watched} />
            </div>
      }
    </div >
    )
}