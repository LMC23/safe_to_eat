import { useEffect, useState } from "react";
import axios from 'axios'
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";
import Modal from "../components/Modal";

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

export default function Discover() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [supabaseShows, setSupabaseShows] = useState([]);
  const [type, setType] = useState('movies');
  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  // const [showModal, setShowModal] = useState(true);

  const usedTmdbIds = supabaseShows.map(item => item.tmdb_id)

  const getMovies = async () => {
    try {
      const endUrl = search !== '' ? `/tmdb/search/movie?query=${search}&page=1` : '/tmdb/list/movie?page=1'
      const result = await axios.get(import.meta.env.VITE_API_URL + endUrl)
      setMovies(result.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  const getSeries = async () => {
    try {
      const endUrl = search !== '' ? `/tmdb/search/series?query=${search}&page=1` : '/tmdb/list/series?page=1'
      const result = await axios.get(import.meta.env.VITE_API_URL + endUrl)
      setSeries(result.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  const getSupabaseShows = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/supabase/list`)
      setSupabaseShows(result.data.data);
      console.log(result.data)
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearch() {
    getMovies();
    getSeries();
    getSupabaseShows();
  }

  useEffect(() => {
    handleSearch();


  }, [isSearched])

  return (
    <div>
      {/* <Modal showModal={showModal} /> */}
      <div className="relative">
        <input
          type="text"
          id="rounded-email"
          className=" rounded-lg border-transparent flex-1 appearance-none border bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
          placeholder="Today i feel like eating to..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="absolute right-2 top-3 hover:opacity-50 text-gray-100 dark:text-dark-accent" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="inline-flex rounded-md shadow-sm py-8" role="group">
        <button onClick={() => setType('movies')} type="button" className={`py-2 px-4 text-sm   ${type === 'movies' ? 'bg-red-900' : 'bg-gray-700'}`}>
          Movies
        </button>
        <button onClick={() => setType('series')} type="button" className={`py-2 px-4 text-sm   ${type === 'series' ? 'bg-red-900' : 'bg-gray-700'}`}>
          Series
        </button>
      </div>
      {type === 'movies' ? <div>
        {movies.map(movie => {
          return <MovieCard movie={movie} key={movie.id} isOnTmdb={usedTmdbIds.includes(movie.id)} />
        })}
      </div> : <div>
        {series.map(s => {
          return <SeriesCard series={s} key={s.id} isOnTmdb={usedTmdbIds.includes(s.id)} />
        })}
      </div>}

    </div >
  );
}
