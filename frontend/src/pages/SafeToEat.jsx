import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import axios from 'axios'
import NoShows from "../components/NoShows";

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

const fetchSafeToEat = () => {

    return axios.get(import.meta.env.VITE_API_URL + '/supabase/list').then(res => res.data)

}

export default function SafeToEat() {
    const { isLoading, error, data } = useQuery(["safeToEatData"], fetchSafeToEat);

    if (isLoading) return <Loader />;

    if (error) return "An error has occurred: " + error.message;
    console.log(data)

    if (data.data.length === 0) {
        return <NoShows />
    }

    function isSafeToEat(show) {
        return show.safe_to_eat
    }

    return (
        // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-hidden">
        <div className="justify-center lg:justify-start max-w-[830px] mx-auto flex flex-wrap gap-5 overflow-hidden ">
            {
                data.data.map(item => {
                    return <div key={item.id} className="w-48">
                        <div className="rounded-2xl overflow-hidden relative group cursor-pointer">
                            <span className={`absolute px-4 py-2 w-full ${isSafeToEat(item) ? 'bg-teal-400' : 'bg-red-400'}`}>
                                {isSafeToEat(item) ? '🍿 Safe' : '🤢 Not safe'}
                                {' '}
                                to eat
                            </span>
                            <span className="ease-in duration-200 bottom-0 w-full bg-yellow-400 absolute top-96 group-hover:top-52 flex items-center justify-center font-bold text-sm p-2">{item.name}</span>
                            <img className="max-w-full max-h-full" src={item.img_url} alt="" lazy="true" />
                        </div>
                    </div>
                })
            }
        </div>
    )
}