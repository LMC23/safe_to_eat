import CommentsList from "./CommentsList";

export default function Comments() {
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
                            "
                >
                    Send
                </button>
            </div>

            <textarea
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
                "
                id="comment"
                placeholder="Leave a comment..."
                name="comment"
                rows="5"
                cols="40"
                v-model="comment"
            >
            </textarea>
            <CommentsList />
        </div >
    )
}