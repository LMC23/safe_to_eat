import { useAuth } from "../contexts/Auth";

export default function WatchList() {
    const { user } = useAuth();

    if (!user) {
        return <div className="text-2xl text-gray-100 my-10">
            You need to be logged in to have a watch list😊.
        </div>
    }

    return (
        <>
            <div>
                WatchList here - {user?.email}
            </div>
        </>
    )
}