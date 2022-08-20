export default function CommentsList() {
    return (
        <div>
            <p v-if="comments.length > 0" class="text-gray-100 my-4 dark:text-dark-accent">
                What other people think of this show:
            </p>
            <div
                v-for="comment in comments"
                class="border border-gray-400 dark:border-gray-900 dark:bg-gray-900 shadow-md p-4 mb-4"
            >
                <div class="flex justify-end">
                    <span class="text-gray-100">10/07/2022</span>
                </div>
                <p class="mt-1 text-gray-100 dark:text-dark-accent">Continut nebun aici</p>
            </div>
        </div >
    )
}