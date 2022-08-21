import { useParams } from "react-router-dom"
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/Auth";
import Comments from "../components/Comments";
import { motion } from "framer-motion"

const IMG_PATH = 'https://image.tmdb.org/t/p/w780'


const fetchShowPageData = ({ type, id }) => {
    const showUrl = import.meta.env.VITE_API_URL + `/tmdb/${type}/${id}`
    const creditsUrl = import.meta.env.VITE_API_URL + `/tmdb/credits/${type}/${id}`
    return Promise.all([
        axios.get(showUrl).then(res => res.data),
        axios.get(creditsUrl).then(res => res.data)
    ])
}

// const saveMovie = ({ accessToken, ...params }) => {
//     const url = import.meta.env.VITE_API_URL + `/supabase/add_show`
//     return axios.post(url, params, { headers: { token: accessToken } }).then(res => res.data)
// }

const voteShow = ({ accessToken, ...params }) => {
    const url = import.meta.env.VITE_API_URL + `/supabase/vote`
    return axios.post(url, params, { headers: { token: accessToken } }).then(res => res.data)
}

export default function Show() {
    const { id, type } = useParams();
    const { isLoading, error, data } = useQuery(["showData", { type, id }], () => fetchShowPageData({ type, id }));
    const { accessToken } = useAuth();
    const { user } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation(voteShow, {
        onSuccess: () => {
            // Invalidate and refetch
            console.log('success')
            queryClient.invalidateQueries(["showData", { type, id }])
        }

    })

    function isSafeToEat(votes) {
        return votes.like > votes.dislike
    }

    // function addMovieToDb(show) {
    //     console.log(accessToken)
    //     mutation.mutate({
    //         accessToken,
    //         "name": type === 'series' ? show.name : show.title,
    //         "img_url": IMG_PATH + show.poster_path,
    //         "mark": show.vote_average,
    //         "description": show.overview,
    //         "safe_to_eat": true,
    //         "type": type,
    //         "genre_ids": [],
    //         "tmdb_id": show.id
    //     })
    // }

    function getNbOfVotes(votes) {

        const localVotes = {
            like: 0,
            dislike: 0,
            your_vote: null
        }
        votes?.forEach(vote => {
            if (vote.is_safe) {
                localVotes.like += 1;
            } else {
                localVotes.dislike += 1;
            }
            if (user?.id === vote.user_id) {
                localVotes.your_vote = vote.is_safe;
            }
        })
        return localVotes
    }

    function didUserVote(votes) {
        return votes.your_vote !== null
    }

    function handleVoteShow(value, show) {
        mutation.mutate({
            accessToken,
            tmdb_id: show.id,
            type,
            is_safe: value
        })
    }



    if (isLoading || mutation.isLoading) return <Loader />;

    if (error) return "An error has occurred: " + error?.message;
    const [showInfo, castInfo] = data

    const votes = getNbOfVotes(showInfo.supabase_response?.votes)
    console.log(votes);
    return (
        <motion.div className="max-w-[780px] mx-auto" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>

            <h5 className="text-gray-200 dark:text-dark-accent font-bold text-3xl tracking-tight mb-4 text-center">
                {type === 'series' ? showInfo.tmdb_response.name : showInfo.tmdb_response.title}
            </h5>


            <div className="h-[300px]  mx-auto w-auto rounded-2xl overflow-hidden relative">
                {votes.like + votes.dislike > 0 ? <div className={`absolute bottom-0 left-0 rounded-tr-2xl p-4 ${isSafeToEat(votes) ? 'bg-teal-400' : 'bg-red-400'} text-gray-900 text-md font-bold`}>
                    {isSafeToEat(votes) ? "🍿 Safe to eat" : "🤢 Not safe to eat"}
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
                    {didUserVote(votes) ?
                        isSafeToEat(votes) ?
                            <span >🍿🥤</span>
                            :
                            <span >🤢</span>
                        : '-'
                    }
                </p>
            </div>

            <p className="mt-10 text-gray-100 text-xl text-center">
                {didUserVote(votes) ? 'Looks like you already rated this. Changed your mind?' : 'Would you eat while watching this?'}
            </p>
            <div className="p-6 mt-4 flex gap-10 justify-evenly">
                <motion.button onClick={() => handleVoteShow(true, showInfo.tmdb_response)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-1/3 bg-lime-600 text-gray-900 rounded-lg p-4 hover:opacity-95 cursor-pointer">🍿🥤</motion.button>
                <motion.button onClick={() => handleVoteShow(false, showInfo.tmdb_response)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-1/3 bg-rose-700 text-gray-900 rounded-lg p-4 hover:opacity-95 cursor-pointer">🤢</motion.button>
            </div>

            <Comments />

            {/* {showInfo.supabase_response ? '' : <button className="p-4 bg-yellow-300" onClick={() => addMovieToDb(showInfo.tmdb_response)}>Add movie to db</button>} */}

        </motion.div>
    )
}