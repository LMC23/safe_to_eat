import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function NavBar() {

    const { user, signOut } = useAuth();

    const routes = [
        {
            path: '/',
            svg: <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                    clipRule="evenodd"
                />
            </svg>,
            title: 'Discover'
        },
        {
            path: '/safe2eat',
            svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>,
            title: 'Safe2Eat'
        },
        // {
        //     path: '/watchlist',
        //     svg: <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         className="h-5 w-5"
        //         viewBox="0 0 20 20"
        //         fill="currentColor"
        //     >
        //         <path
        //             fillRule="evenodd"
        //             d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
        //             clipRule="evenodd"
        //         />
        //     </svg>,
        //     title: 'WatchList'
        // },
    ]

    return (
        <nav className="mt-10 px-6 flex flex-wrap md:block md:text-center">

            {routes.map(route =>
                <Link
                    key={route.path}
                    to={route.path}
                    className={` md:justify-start hover:text-purple-100 flex-grow hover:bg-purple-200 flex items-center p-2 my-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-dark-accent duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${location.pathname === route.path ? 'bg-gray-800' : ''}`}
                    href="#"
                >
                    {route.svg}
                    <span className="mx-4 text-lg font-normal">
                        {route.title}
                    </span>
                </Link>
            )}
            {!user && <Link
                to="/login"
                className=" md:justify-start hover:text-purple-100 flex-grow hover:bg-purple-200 flex items-center p-2 my-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-dark-accent duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                href="#"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="ml-4 text-lg font-normal">
                    Login
                </span>

            </Link>}
            {user && <Link
                to="/profile"
                className=" md:justify-start hover:text-purple-100 flex-grow hover:bg-purple-200 flex items-center p-2 my-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-dark-accent duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                href="#"
            >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="ml-4 text-lg font-normal">
                    Profile
                </span>

            </Link>}
            {user && <button
                className="md:w-full  md:justify-start hover:text-purple-100 flex-grow hover:bg-purple-200 flex items-center p-2 my-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-dark-accent duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                onClick={() => signOut()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="ml-4">
                    Logout
                </span>

            </button>}
        </nav>


    )
}