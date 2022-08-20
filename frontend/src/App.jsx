
import { AuthProvider } from "./contexts/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import DefaultLayout from "./components/DefaultLayout";
import Show from "./pages/Show";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StoreProvider } from "./contexts/Store";
// https://reactrouter.com/docs/en/v6/components/routes
// https://supabase.com/blog/supabase-js-v2
// https://github.com/ruanmartinelli/supabase-auth-react/blob/main/src/components/Signup.js
// https://www.hyperui.dev/components/application-ui/side-menu
// https://supabase.com/docs/reference/javascript/next/auth-admin-generatelink

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={

                  <DefaultLayout>

                    <HomePage />
                  </DefaultLayout>

                }
              />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="/show/:type/:id" element={<DefaultLayout><Show /></DefaultLayout>} />
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
