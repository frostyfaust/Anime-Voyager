import AnimeCard from './AnimeCard';
import { useEffect,useState } from 'react';

export default function AnimeCards({ animes, watched, current, planToWatch }) {
    const [isWatched, setWatched] = useState(false);
    const [isCurrent, setCurrent] = useState(false);
    const [isPlanToWatch, setPlanToWatch] = useState(false);

    useEffect(() => {
        if (watched !== undefined) {
            setWatched(watched);
        }
        if (current !== undefined) {
            setCurrent(current);
        }
        if (planToWatch !== undefined) {
            setPlanToWatch(planToWatch);
        }
    }, [watched, current, planToWatch]);

    return (
        <div className="flex flex-wrap justify-center">
            {animes.map((anime, index) => (
                <AnimeCard key={index} anime={anime} watched={isWatched} current={isCurrent} planToWatch={isPlanToWatch}/>
            ))}
        </div>
    )
}