import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, loginRequest, logoutRequest } from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const existing = getCurrentUser()
    setUser(existing)
    setLoading(false)
  }, [])

  const login = async (credentials, role) => {
    const loggedInUser = await loginRequest(credentials, role)
    setUser(loggedInUser)
    return loggedInUser
  }

  const logout = () => {
    logoutRequest()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth لازم يُستخدم جوا AuthProvider')
  return ctx
}