import { Link } from 'react-router-dom'

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

export default function SeriesCard({ series, isOnTmdb }) {

    return (
        <Link className="flex flex-col justify-between md:flex-row rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-900 dark:hover:bg-gray-900 shadow-md items-center my-2"
            style={{ minHeight: 200 }}
            to={`/show/${series.id}`}
        >

            <div className="p-4 flex flex-col justify-between leading-normal w-full">
                <div class="flex gap-4 justify-between">
                    <h5 className="text-white dark:text-dark-accent font-bold text-2xl tracking-tight mb-2">
                        {series.name}
                    </h5>
                    <div>{isOnTmdb ? '✅' : '⛔'}</div>
                </div>
                <p className="font-normal text-gray-700 mb-3 dark:text-gray-200">
                    {
                        series.overview > 200
                            ? `${series.overview.substring(0, 200)}...`
                            : series.overview
                    }
                </p>
            </div>
            <img
                className="h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={IMG_PATH + series.poster_path}
                alt={series.name}
                style={{ maxWidth: 128 }}
                lazy="true"
            />
        </Link>
    )
}