import { AuthContext } from "../App"
import { useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { requestPlanToWatchAnimeIDs } from "../requests/PlanToWatchRequests"
import { getAnime } from "../requests/ApiRequests"
import AnimeCards from "./AnimeCards";

export default function PlanToWatch() {
    const userManager = useContext(AuthContext);
    const [planToWatch, setPlanToWatch] = useState([]);
    const [error, setError] = useState([null]);
    const navigate = useNavigate();
    let isPlanToWatch = true;

    useEffect(() => {
        if(!userManager.username){
            navigate("/login");
        }

        const loadWatched = async() => {
            const {planToWatchIDs: newPlanIDs, errors: newErrors} 
            = await requestPlanToWatchAnimeIDs(userManager.username, userManager.token);
            const data = await Promise.all(newPlanIDs.map(async (id) => {
                const response = await getAnime(id);
                return response.data;
            }
            ));
            setPlanToWatch(data);
            setError(newErrors);
        }

        loadWatched();
    }, []
    );

    return (
        <div className="bg flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold text-yellow-400 mb-12">
        {userManager.username}'s Plan to Watch 
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
              <AnimeCards animes={planToWatch} planToWatch={isPlanToWatch} />
            </div>
      }
    </div >
    )
}
