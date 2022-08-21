export default function CommentsList() {
    return (
        <div>
            <p v-if="comments.length > 0" className="text-gray-100 my-4 dark:text-dark-accent">
                What other people think of this show:
            </p>
            <div
                v-for="comment in comments"
                className="shadow-sm shadow-gray-300 p-4 mb-4"
            >
                <div className="flex justify-end">
                    <span className="text-gray-100">10/07/2022</span>
                </div>
                <div className="flex items-center gap-4">

                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                    </div>
                    <p className="mt-1 text-gray-100 dark:text-dark-accent">Continut nebun aici</p>
                </div>
            </div>
        </div >
    )
}