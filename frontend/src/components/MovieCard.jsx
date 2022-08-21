import { Link } from 'react-router-dom'

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
import { motion } from "framer-motion"

export default function MovieCard({ movie }) {

    return (
        <Link className="flex flex-col md:flex-row rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-900 dark:hover:bg-gray-600 shadow-md items-center my-2 pl-2"
            style={{ minHeight: 200 }}
            to={`/show/movie/${movie.id}`}
        >
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                close={{ opacity: 0 }}
                className="h-auto object-cover md:w-48"
                src={IMG_PATH + movie.poster_path}
                alt={movie.name}
                style={{ maxWidth: 128 }}
                lazy="true"
            />
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                close={{ opacity: 0 }} className="p-4 flex flex-col justify-between leading-normal">
                <div className="flex justify-between">
                    <h5 className="text-white dark:text-dark-accent font-bold text-2xl tracking-tight mb-2">
                        {movie.title}
                    </h5>
                </div>
                <p className="font-normal text-gray-700 mb-3 dark:text-gray-200">
                    {
                        movie.overview.length > 200
                            ? `${movie.overview.substring(0, 200)}...`
                            : movie.overview
                    }
                </p>
            </motion.div>
        </Link>
    )
}