import AnimeCard from './AnimeCard';

export default function AnimeCards({ animes }) {
    return (
        <div className="flex flex-wrap justify-center">
            {animes.map((anime, index) => (
                <AnimeCard key={index} anime={anime} />
            ))}
        </div>
    )
}