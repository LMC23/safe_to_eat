import { useParams } from "react-router-dom"
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/Auth";

const IMG_PATH = 'https://image.tmdb.org/t/p/w780'

const fetchShowInfo = async ({ type, id }) => {

    const url = import.meta.env.VITE_API_URL + `/tmdb/${type}/${id}`

    const response = await axios.get(url)
    return response.data

}

const saveMovie = ({ accessToken, ...params }) => {
    console.log(params)
    const url = import.meta.env.VITE_API_URL + `/supabase/add_show`
    axios.post(url, params, { headers: { token: accessToken } }).then(res => res.data)
}

export default function Show() {
    const { id, type } = useParams();
    const { isLoading, error, data, isFetching } = useQuery(["showData", { type, id }], () => fetchShowInfo({ type, id }));
    const { accessToken } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation(saveMovie, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["showData", { type, id }])
        },

    })

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

    return (
        <div className="max-w-[780px] mx-auto">

            <h5 className="text-gray-200 dark:text-dark-accent font-bold text-3xl tracking-tight mb-4 text-center">
                {type === 'series' ? data.tmdb_response.name : data.tmdb_response.title}
            </h5>


            <div className="h-[300px]  mx-auto w-auto rounded-2xl overflow-hidden relative">
                {data.tmdb_response.vote_average ? <div className="absolute top-0 right-0 p-4 bg-yellow-300 text-gray-900 text-md font-bold">
                    {data.tmdb_response.vote_average.toFixed(2)}
                </div> : ''}
                <img className="w-full h-full" src={IMG_PATH + data.tmdb_response.backdrop_path} alt="" />
            </div>
            <div className="flex gap-2 mt-4">
                <span className="text-yellow-400 w-32 block font-bold">Genre:</span>
                <p className="text-gray-100 font-light italic w-full" >
                    {data.tmdb_response.genres.map(item => item.name).join(' - ')}
                </p>
            </div>
            <div className="flex gap-2 mt-4 text-justify">
                <span className="text-yellow-400 w-32 block font-bold">Description:</span>
                <p className="text-gray-100 font-light italic w-full" >
                    {data.tmdb_response.overview}
                </p>
            </div>
            {data.tmdb_response?.release_date && <div className="flex gap-2 mt-4 text-justify">
                <span className="text-yellow-400 w-32 block font-bold">Release Date:</span>
                <p className="text-gray-100 font-light italic w-full" >
                    {data.tmdb_response.release_date}
                </p>
            </div>
            }

            {data.supabase_response ? '' : <button className="p-4 bg-yellow-300" onClick={addMovieToDb}>Add movie to db</button>}

        </div>
    )
}