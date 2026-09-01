import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { getMe } from "../services/api"
import type { User } from "../types"

const TOKEN_KEY = "talkative_token"
const USER_KEY = "talkative_user"

interface AuthCtx {
  user: User | null
  token: string | null
  setSession: (token: string, user: User) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  token: null,
  setSession: () => {},
  clearAuth: () => {},
})

function userFromStorage(): User | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<User | null>(userFromStorage)

  function setSession(t: string, next: User) {
    localStorage.setItem(TOKEN_KEY, t)
    localStorage.setItem(USER_KEY, JSON.stringify(next))
    setToken(t)
    setUser(next)
  }

  function clearAuth() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (!token) return
    getMe(token)
      .then((fresh) => {
        localStorage.setItem(USER_KEY, JSON.stringify(fresh))
        setUser(fresh)
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : ""
        if (/401|403|expired|revoked|malformed/i.test(message)) {
          clearAuth()
        }
      })
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, setSession, clearAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
