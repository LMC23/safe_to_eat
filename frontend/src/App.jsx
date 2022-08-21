
import { AuthProvider } from "./contexts/Auth";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StoreProvider } from "./contexts/Store";
import AnimatedRoutes from "./components/AnimatedRoutes";
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
            <AnimatedRoutes />
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
