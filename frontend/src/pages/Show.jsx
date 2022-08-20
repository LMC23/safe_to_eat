import { useParams } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Show() {
    const { id, type } = useParams();
    const [tmdbInfo, setTmdbInfo] = useState(null);
    const [supabaseInfo, setSupabaseInfo] = useState(null);
    useEffect(() => {
        const fetchShowInfo = async () => {
            try {
                const url = import.meta.env.VITE_API_URL + `/tmdb/${type}/${id}`

                const response = await axios.get(url)
                setTmdbInfo(response.data.tmdb_response)
                setSupabaseInfo(response.data.supabase_response)

            } catch (error) {
                console.log(error)
            }
        }
        fetchShowInfo()
    }, [])


    return <div>
        Show - {id} - {type} - {type === 'series' ? tmdbInfo?.name : tmdbInfo?.title}
    </div>
}