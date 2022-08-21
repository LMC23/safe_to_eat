import React, { useContext, useState, useEffect } from 'react'

const StoreContext = React.createContext()

export function useStore() {
  return useContext(StoreContext)
}

export function StoreProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');

  const store = {
    setSearchTerm,
    searchTerm,
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}