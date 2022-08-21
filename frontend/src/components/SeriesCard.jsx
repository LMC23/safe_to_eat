import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

export default function SeriesCard({ series, isOnTmdb }) {

    return (
        <Link className="flex flex-col justify-between md:flex-row rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-900 dark:hover:bg-gray-600 shadow-md items-center my-2 pr-2"
            style={{ minHeight: 200 }}
            to={`/show/series/${series.id}`}
        >

            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                close={{ opacity: 0 }} className="p-4 flex flex-col justify-between leading-normal w-full">
                <div className="flex gap-4 justify-between">
                    <h5 className="text-white dark:text-dark-accent font-bold text-2xl tracking-tight mb-2">
                        {series.name}
                    </h5>
                    <div>{isOnTmdb ? '✅' : '⛔'}</div>
                </div>
                <p className="font-normal text-gray-700 mb-3 dark:text-gray-200">
                    {
                        series.overview.length > 200
                            ? `${series.overview.substring(0, 200)}...`
                            : series.overview
                    }
                </p>
            </motion.div>
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                close={{ opacity: 0 }}
                className="h-auto object-cover md:w-48"
                src={IMG_PATH + series.poster_path}
                alt={series.name}
                style={{ maxWidth: 128 }}
                lazy="true"
            />
        </Link>
    )
}