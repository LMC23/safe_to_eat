import { useParams } from "react-router-dom"
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/Auth";
import Comments from "../components/Comments";

const IMG_PATH = 'https://image.tmdb.org/t/p/w780'

const fetchShowInfo = async ({ type, id }) => {

    const url = import.meta.env.VITE_API_URL + `/tmdb/${type}/${id}`

    const response = await axios.get(url)
    return response.data

}

const fetchShowPageData = ({ type, id }) => {
    const showUrl = import.meta.env.VITE_API_URL + `/tmdb/${type}/${id}`
    const creditsUrl = import.meta.env.VITE_API_URL + `/tmdb/credits/${type}/${id}`
    return Promise.all([
        axios.get(showUrl).then(res => res.data),
        axios.get(creditsUrl).then(res => res.data)
    ])
}

const saveMovie = ({ accessToken, ...params }) => {
    console.log(params)
    const url = import.meta.env.VITE_API_URL + `/supabase/add_show`
    axios.post(url, params, { headers: { token: accessToken } }).then(res => res.data)
}

export default function Show() {
    const { id, type } = useParams();
    const { isLoading, error, data, isFetching } = useQuery(["showData", { type, id }], () => fetchShowPageData({ type, id }));
    const { accessToken } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation(saveMovie, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["showData", { type, id }])
        },

    })

    function isSafeToEat(show) {
        return show.safe_to_eat
    }

    function addMovieToDb() {
        console.log(accessToken)
        mutation.mutate({
            accessToken,
            "name": type === 'series' ? data.tmdb_response.name : data.tmdb_response.title,
            "img_url": IMG_PATH + data.tmdb_response.poster_path,
            "mark": data.tmdb_response.vote_average,
            "description": data.tmdb_response.overview,
            "safe_to_eat": true,
            "type": type,
            "genre_ids": [],
            "tmdb_id": data.tmdb_response.id
        })
    }

    if (isLoading) return <Loader />;

    if (error) return "An error has occurred: " + error?.message;
    const [showInfo, castInfo] = data
    console.log(castInfo)
    return (
        <div className="max-w-[780px] mx-auto">

            <h5 className="text-gray-200 dark:text-dark-accent font-bold text-3xl tracking-tight mb-4 text-center">
                {type === 'series' ? showInfo.tmdb_response.name : showInfo.tmdb_response.title}
            </h5>


            <div className="h-[300px]  mx-auto w-auto rounded-2xl overflow-hidden relative">
                {showInfo.supabase_response ? <div className={`absolute bottom-0 left-0 rounded-tr-2xl p-4 ${isSafeToEat(showInfo.supabase_response) ? 'bg-teal-400' : 'bg-red-400'} text-gray-900 text-md font-bold`}>
                    {isSafeToEat(showInfo.supabase_response) ? "🍿 Safe to eat" : "🤢 Not safe to eat"}
                </div> : <div className="absolute bottom-0 left-0 rounded-tr-2xl p-4 bg-yellow-300 text-gray-900 text-md font-bold">
                    🦄 Not yet rated
                </div>}
                <img className="w-full h-full" src={IMG_PATH + showInfo.tmdb_response.backdrop_path} alt="" />
            </div>
            <div className="flex gap-2 mt-4">
                <span className="text-yellow-400 w-32 block font-bold">Genre:</span>
                <p className="text-gray-100 font-light italic w-full" >
                    {showInfo.tmdb_response.genres.map(item => item.name).join(' - ')}
                </p>
            </div>
            <div className="flex gap-2 mt-4">
                <span className="text-yellow-400 w-32 block font-bold">With:</span>
                <p className="text-gray-100 font-light italic w-full" >
                    {castInfo.cast.slice(0, 5).map(item => item.name).join(', ')}
                </p>
            </div>

            <div className="flex gap-2 mt-4 text-justify">
                <span className="text-yellow-400 w-32 block font-bold">Description:</span>
                <p className="text-gray-100 font-light italic w-full" >
                    {showInfo.tmdb_response.overview}
                </p>
            </div>
            {
                showInfo.tmdb_response?.release_date && <div className="flex gap-2 mt-4 text-justify">
                    <span className="text-yellow-400 w-32 block font-bold">Release Date:</span>
                    <p className="text-gray-100 font-light italic w-full" >
                        {showInfo.tmdb_response.release_date}
                    </p>
                </div>
            }
            {
                showInfo.tmdb_response?.vote_average && <div className="flex gap-2 mt-4 text-justify">
                    <span className="text-yellow-400 w-32 block font-bold">TMDB Score:</span>
                    <p className="text-gray-100 font-light italic w-full" >
                        {showInfo.tmdb_response.vote_average.toFixed(2)} ({showInfo.tmdb_response.vote_count} votes)
                    </p>
                </div>
            }

            <div className="flex gap-2 mt-4 text-justify">
                <span className="text-yellow-400 w-32 block font-bold">Your vote:</span>
                <p className="text-gray-100 font-light w-full" >
                    {showInfo.supabase_response?.liked ?
                        <span >🍿🥤</span>
                        :
                        <span >🤢</span>
                    }
                </p>
            </div>


            {/* <p className="mt-10 text-gray-100 text-xl text-center">Would you eat while watching this?</p>
            <div className="p-6 mt-4 flex gap-10 justify-evenly">
                <button className="w-1/3 bg-lime-600 text-gray-900 rounded-lg p-4 hover:opacity-95 cursor-pointer">🍿🥤</button>
                <button className="w-1/3 bg-rose-700 text-gray-900 rounded-lg p-4 hover:opacity-95 cursor-pointer">🤢</button>
            </div> */}

            <p className="mt-10 text-gray-100 text-xl text-center">Looks like you already rated this. Changed your mind?</p>
            <div className="p-6 mt-4 flex gap-10 justify-evenly">
                <button className="w-1/3 bg-lime-600 text-gray-900 rounded-lg p-4 hover:opacity-95 cursor-pointer">🍿🥤</button>
                <button className="w-1/3 bg-rose-700 text-gray-900 rounded-lg p-4 hover:opacity-95 cursor-pointer">🤢</button>
            </div>

            <Comments />

            {/* {showInfo.supabase_response ? '' : <button className="p-4 bg-yellow-300" onClick={addMovieToDb}>Add movie to db</button>} */}

        </div>
    )
}