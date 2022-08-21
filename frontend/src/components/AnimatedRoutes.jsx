import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import DefaultLayout from "../components/DefaultLayout";
import Show from "../pages/Show";
import SafeToEat from "../pages/SafeToEat";
import WatchList from "../pages/WatchList";

import { AnimatePresence } from 'framer-motion'

export default function AnimatedRoutes() {
    const location = useLocation();
    console.log(location);
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={

                        <DefaultLayout>

                            <HomePage />
                        </DefaultLayout>

                    }
                />
                <Route path="login" element={<DefaultLayout><Login /></DefaultLayout>} />
                <Route path="signup" element={<DefaultLayout><SignUp /></DefaultLayout>} />
                <Route path="safe2eat" element={<DefaultLayout><SafeToEat /></DefaultLayout>} />
                <Route path="watchlist" element={<DefaultLayout><WatchList /></DefaultLayout>} />
                <Route path="/show/:type/:id" element={<DefaultLayout><Show /></DefaultLayout>} />
            </Routes>
        </AnimatePresence>
    )
}