import { useState } from "react";
import AnimeCards from "./AnimeCards";
import { getAnimes } from "../requests/ApiRequests";

export default function Search() {
  const [search, setSearch] = useState("");
  const [animes, setAnimes] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.length > 0) {
      const data = await getAnimes(search);
      console.log(data.data);
      setAnimes(data.data);
    }
  };

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }
  return (
    <div>
      <h1 className="text-center">Lets go on a voyage to find your anime!</h1>
      <form onSubmit={handleSubmit} className="flex justify-center mb-8">
        <input
          type="text"
          className="py-2 px-4 text-lg rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-purple-500 w-2/3"
          placeholder="Naruto, One Piece, Attack on Titan..."
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <button
          type="submit"
          className="ml-2 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-r-lg transition-all"
        >
          Search
        </button>
      </form>
      <div className="text-center">
        {animes.length > 0 ? (
          <AnimeCards animes={animes} />
        ) : (
          <p className="text-center text-2xl">No animes found</p>
        )}
      </div>
    </div>
  );
}
