import { useState, useEffect } from "react";
import AnimeCards from "./AnimeCards";
import { getAnimes } from "../requests/ApiRequests";

export default function Search() {
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [searched, setSearched] = useState(false);
  const [animes, setAnimes] = useState([]);
  // const [preLoadAnime, setPreLoadAnime] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.length > 0) {
      setPageNum(1);
      fetchAnime(1);
    }
  };

  async function fetchAnime(pn) {
    const data = await getAnimes(search, pn);
      console.log(data);
      setMaxPage(data.pagination.last_visible_page);
      console.log(maxPage);
      setAnimes(data.data);
  }


  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  useEffect(() => {
    const preloadAnime = async () => {
        const data = await getAnimes("Naruto", pageNum);
        console.log(data.pagination.last_visible_page);
        setMaxPage(data.pagination.last_visible_page);
        console.log("here");
        console.log(maxPage);
        console.log(data);
        setAnimes(data.data);
    };
    preloadAnime();
  }, []);

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
      fetchAnime(pageNum -1);
    }
  };

  const nextPage = () => {
    if (pageNum < maxPage) {
      setPageNum(pageNum + 1);
      fetchAnime(pageNum + 1);
    }
  };

  return (
    <div className="cream flex flex-col items-center pt-20">
      <h1 className="text-center text-black bg-indigo-400 bg-opacity-40 p-2 rounded-md">
        Find your Anime !
      </h1>
      <form onSubmit={handleSubmit} className="flex justify-center my-8 w-3/5">
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
      <div className="join">
        <button className="join-item btn" onClick={prevPage}>
          «
        </button>
        <button className="join-item btn">{pageNum}</button>
        <button className="join-item btn" onClick={nextPage}>
          »
        </button>
      </div>
      <div className="text-center">
          <AnimeCards animes={animes} />
      </div>
    </div>
  );
}
