

export default function CommentsList({ comments }) {
    console.log(comments);
    return (
        <div>
            {comments?.length > 0 ? <p className="text-gray-100 my-4 dark:text-dark-accent">
                What other people think of this show:
            </p> : ''}
            {comments?.length > 0 ? comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(comment => <div
                key={comment.id}
                className="shadow-sm shadow-gray-300 p-4 mb-4"
            >
                <div className="flex justify-between pb-2">
                    <span className="text-gray-100">{comment.username}</span>
                    <span className="text-gray-100">{comment.created_at.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-4">

                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{comment.username.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <p className="mt-1 text-gray-100 dark:text-dark-accent">{comment.comment}</p>
                </div>
            </div>) : ''}
        </div >
    )
}