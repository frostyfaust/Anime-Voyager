import { AuthContext } from "../App"
import { useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { requestCurrentAnimeIDs } from "../requests/CurrentlyWatchingRequests"
import { getAnime } from "../requests/ApiRequests"
import AnimeCards from "./AnimeCards";

export default function CurrentlyWatching() {
    const userManager = useContext(AuthContext);
    const [current, setCurrent] = useState([]);
    const [error, setError] = useState([null]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userManager.username){
            navigate("/login");
        }

        const loadWatched = async() => {
            const {currentIDs: newCurrentIDs, errors: newErrors} 
            = await requestCurrentAnimeIDs(userManager.username, userManager.token);
            const data = await Promise.all(newCurrentIDs.map(async (id) => {
                const response = await getAnime(id);
                return response.data;
            }
            ));
            setCurrent(data);
            setError(newErrors);
        }

        loadWatched();
    }, []
    );

    return (
        <div className="relative z-10 text-center flex-col items-center mt-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-12">
        {userManager.username}'s currently Watching 
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
              <AnimeCards animes={current} />
            </div>
      }
    </div >
    )
}
