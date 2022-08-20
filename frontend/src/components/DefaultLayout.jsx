
import Footer from "./Footer";
import NavBar from "./Navbar";

export default function DefaultLayout({ children }) {

    const loading = false;
    return (
        <div className="bg-gradient-to-r from-gray-800 to-purple-900 transition-colors duration-200 ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen pb-2">
                {loading && <Loader />}
                <div className="w-full md:w-3/12">
                    <div
                        className="flex items-center justify-start flex-row mx-auto md:flex-col lg:flex-row lg:mx-6 mt-10 w-52"
                    >
                        <div className=" flex justify-center items-center" style={{ fontSize: 25 }}>🍿🎬</div>
                        <span
                            className="text-gray-100 dark:text-dark-accent ml-4 text-2xl font-bold"
                        >
                            Safe2Eat
                        </span>
                    </div>
                    <NavBar />
                </div>
                <div className="w-full md:w-9/12 py-10 px-4">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}