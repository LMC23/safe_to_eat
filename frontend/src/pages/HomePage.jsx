import { useEffect, useState } from "react";
import axios from 'axios'
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

export default function Discover() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [type, setType] = useState('movies');


  useEffect(() => {
    const getMovies = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/tmdb/list/movie?page=1`)
        setMovies(result.data.results);
        console.log(result.data.results[0])
      } catch (error) {
        console.log(error);
      }
    }

    const getSeries = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/tmdb/list/series?page=1`)
        setSeries(result.data.results);
        console.log(result.data.results[0])
      } catch (error) {
        console.log(error);
      }
    }

    getMovies();
    getSeries();
  }, [])

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          id="rounded-email"
          className=" rounded-lg border-transparent flex-1 appearance-none border bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
          placeholder="Today i feel like eating to..."
        />
        <button className="absolute right-2 top-3 hover:opacity-50 text-gray-100 dark:text-dark-accent" >
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
          return <MovieCard movie={movie} key={movie.id} />
        })}
      </div> : <div>
        {series.map(s => {
          return <SeriesCard series={s} key={s.id} />
        })}
      </div>}

    </div >
  );
}
