
import { AuthProvider } from "./contexts/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

// https://reactrouter.com/docs/en/v6/components/routes
// https://supabase.com/blog/supabase-js-v2
// https://github.com/ruanmartinelli/supabase-auth-react/blob/main/src/components/Signup.js
// https://www.hyperui.dev/components/application-ui/side-menu
// https://supabase.com/docs/reference/javascript/next/auth-admin-generatelink

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;