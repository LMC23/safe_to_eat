import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/Auth";
import { supabaseClient } from '../lib/supabase'

export default function Profile() {
    const [username, setUsername] = useState('');
    const { user } = useAuth();
    useEffect(() => {
        setUsername(user.user_metadata?.username || '')
    }, [])

    async function saveUsername() {
        const { user, error } = await supabaseClient.auth.updateUser({
            data: { username: username },
        })

        console.log(user, error);
    }

    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="mt-10 text-yellow-300">
            <label htmlFor="username" className="text-md font-medium text-gray-100">
                You can pick your username:
            </label>

            <div className="relative mt-1">
                <input
                    id="username"
                    className="w-full md:w-1/2 p-4 pr-12 text-sm border-gray-900 bg-gray-700 rounded-lg shadow-sm"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />


                <motion.button onClick={saveUsername} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-yellow-300 p-4 rounded-md ml-4 text-gray-700 uppercase font-bold">Save</motion.button>
            </div>
        </div>
    </motion.div>
}