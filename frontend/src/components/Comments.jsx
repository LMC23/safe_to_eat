import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";
import { useAuth } from "../contexts/Auth";
import axios from 'axios'

const commentShow = ({ accessToken, ...params }) => {
    console.log(params);
    const url = import.meta.env.VITE_API_URL + `/supabase/comment`
    return axios.post(url, params, { headers: { token: accessToken } }).then(res => res.data)
}

export default function Comments({ didUserVote, movieId }) {
    const [comment, setComment] = useState('');
    const { accessToken } = useAuth();
    const queryClient = useQueryClient();

    const mutation = useMutation(commentShow, {
        onSuccess: () => {
            setComment('')
            // Invalidate and refetch
            queryClient.invalidateQueries(["showData"])
        }

    })

    function handleComment() {
        mutation.mutate({
            accessToken,
            movie_id: movieId,
            comment
        })

    }

    if (mutation.isLoading) return <Loader />;

    if (mutation.isError) return "An error has occurred: " + mutation.error?.message;


    return (
        <div className="mt-6">

            <div className="grid grid-cols-3 items-start">
                <div className="col-span-2">
                    <label
                        htmlFor="message"
                        className="text-md font-medium text-gray-100 block mb-2 dark:text-dark-accent"
                    >Comments</label>
                </div>

                <button
                    disabled={!didUserVote || comment.length === 0}
                    type="button"
                    className="
                            disabled:opacity-50
                            justify-self-end
                            py-2
                            px-4
                            bg-green-600
                            hover:bg-green-700
                            focus:ring-green-500 focus:ring-offset-green-200
                            text-white
                            w-full
                            transition
                            ease-in
                            duration-200
                            text-center text-base
                            font-semibold
                            shadow-md
                            focus:outline-none
                            focus:ring-2 focus:ring-offset-2
                            mb-4
                            disabled:cursor-not-allowed
                            "
                    onClick={() => handleComment()}

                >
                    Send
                </button>
            </div>

            <textarea
                disabled={!didUserVote}
                className="
                        flex-1
                        appearance-none
                        border 
                        w-full
                        py-2
                        px-4
                        text-gray-700
                        placeholder-gray-400
                        rounded-lg
                        text-base
                        focus:outline-none
                        
                        focus:border-transparent
                        disabled:bg-gray-200
                        bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100
                        disabled:cursor-not-allowed
                "
                id="comment"
                placeholder={didUserVote ? "Leave a comment..." : "You need to vote first in order to comment."}
                name="comment"
                rows="5"
                cols="40"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            >
            </textarea>

        </div >
    )
}