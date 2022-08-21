import { useEffect, useState } from "react";
import axios from 'axios'
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";
import Pagination from "../components/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useStore } from "../contexts/Store";
import { motion } from "framer-motion"


const fetchHomePageData = (search) => {
  const movieUrl = search !== '' ? `/tmdb/search/movie?query=${search}&page=1` : '/tmdb/list/movie?page=1'
  const seriesUrl = search !== '' ? `/tmdb/search/series?query=${search}&page=1` : '/tmdb/list/series?page=1'

  return Promise.all([
    axios.get(import.meta.env.VITE_API_URL + movieUrl).then(res => res.data),
    axios.get(import.meta.env.VITE_API_URL + seriesUrl).then(res => res.data),
    axios.get(import.meta.env.VITE_API_URL + '/supabase/list').then(res => res.data)
  ])
}

export default function Discover() {

  const [type, setType] = useState('movies');
  const [searchInputValue, setSearchInputValue] = useState('');
  const { searchTerm, setSearchTerm } = useStore()

  useEffect(() => {
    setSearchInputValue(searchTerm);
  }, [])

  const { isLoading, error, data, isFetching } = useQuery(["homePageData", searchTerm], () => fetchHomePageData(searchTerm));

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  const [moviesData, seriesData, supabaseData] = data;

  const usedTmdbIds = supabaseData.data.map(item => item.tmdb_id)



  function handleSearch(e) {
    e.preventDefault();
    setSearchTerm(searchInputValue);
  }

  return (
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <form className="relative" onSubmit={handleSearch}>
        <input
          type="text"
          id="rounded-email"
          className=" rounded-lg border-transparent flex-1 appearance-none border bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
          placeholder="Today i feel like eating to..."
          onChange={(e) => setSearchInputValue(e.target.value)}
          value={searchInputValue}
        />
        <button type="submit" className="absolute right-2 top-3 hover:opacity-50 text-gray-100 dark:text-dark-accent" >
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
      </form>
      <div className="flex items-center gap-10 rounded-md shadow-sm py-8" role="group">
        <button onClick={() => setType('movies')} type="button" className={`py-2 px-4 text-sm rounded w-40 hover:opacity-90 ${type === 'movies' ? 'bg-yellow-300 font-bold' : 'bg-gray-200'}`}>
          Movies
        </button>
        <button onClick={() => setType('series')} type="button" className={`py-2 px-4 text-sm rounded w-40 hover:opacity-90 ${type === 'series' ? 'bg-yellow-300 font-bold' : 'bg-gray-200'}`}>
          Series
        </button>
      </div>
      {type === 'movies' ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {moviesData.results.map(movie => {
          return <MovieCard movie={movie} key={movie.id} isOnTmdb={usedTmdbIds.includes(movie.id)} />
        })}
      </div> : <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {seriesData.results.map(s => {
          return <SeriesCard series={s} key={s.id} isOnTmdb={usedTmdbIds.includes(s.id)} />
        })}
      </div>}
      <Pagination
        postsPerPage={20}
        totalPosts={73}
        paginateBack={() => console.log('back')}
        paginateFront={() => console.log('front')}
        currentPage={1}
      />
    </motion.div >
  );
}
