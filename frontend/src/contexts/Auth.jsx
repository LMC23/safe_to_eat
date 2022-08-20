import React, { useContext, useState, useEffect } from 'react'
import { supabaseClient } from '../lib/supabase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {

    let listener = null;

    async function getSession() {
      const { data: sessionData } = await supabaseClient.auth.getSession()

      setUser(sessionData?.session?.user ?? null)
      setLoading(false)

      console.log(sessionData);
      setAccessToken(sessionData?.session?.access_token ?? null)

      const { data } = supabaseClient.auth.onAuthStateChange(
        async (event, sessionData) => {
          console.log('A intrat in change', { event, sessionData })
          setUser(sessionData?.user ?? null)
          setAccessToken(sessionData?.access_token ?? null)
          setLoading(false)
        }
      )
      listener = data;
    }

    getSession()


    return () => {
      listener?.unsubscribe()
    }
  }, [])

  const store = {
    signUp: (data) => supabaseClient.auth.signUp(data),
    signIn: (data) => supabaseClient.auth.signInWithPassword(data),
    signOut: () => supabaseClient.auth.signOut(),
    user,
    accessToken
  }

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  )
}