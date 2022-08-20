import { useParams } from "react-router-dom"
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/Auth";

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

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
            console.log('intra aici');
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

    if (error) return "An error has occurred: " + error.message;


    return (
        <>
            {data.supabase_response ? 'da' : 'nu'}
            <div className="flex flex-col md:flex-row">
                <div className="order-2 md:order-1 w-full md:w-3/4 pb-6">
                    <div className="mb-5">
                        <h5 className="text-gray-200 dark:text-dark-accent font-bold text-2xl tracking-tight mb-4">
                            {type === 'series' ? data.tmdb_response.name : data.tmdb_response.title}
                        </h5>
                        <p className="text-gray-100 font-light italic" >
                            {data.tmdb_response.genres.map(item => item.name).join(' - ')}
                        </p>
                    </div>
                    <div className="mt-4 text-justify dark:text-gray-200">
                        <small>{data.tmdb_response.overview}</small>
                    </div>
                </div>
                <div className="order-1 md:order-2 w-full md:w-1/4">
                    <img
                        className="
                    max-h-full
                    w-auto
                    mx-auto
                    object-cover
                    rounded-t-lg
                    md:rounded-none md:rounded-l-lg
                    shadow-xl
                    mb-4 md:mb-0
                    "
                        src={IMG_PATH + data.tmdb_response.poster_path}
                        alt=""
                        style={{ maxWidth: 150 }}
                    />
                </div>

            </div>
            <button className="p-4 bg-yellow-300" onClick={addMovieToDb}>Add movie to db</button>
        </>
    )
}