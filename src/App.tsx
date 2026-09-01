import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ChatProvider } from "./context/ChatContext"
import AppLayout from "./pages/AppLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function GuestOnly({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  if (token) return <Navigate to="/app" replace />
  return <>{children}</>
}

function AuthenticatedApp() {
  const { token } = useAuth()
  return (
    <ProtectedRoute>
      <ChatProvider token={token}>
        <AppLayout />
      </ChatProvider>
    </ProtectedRoute>
  )
}

function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith("/app/room/")) {
      document.title = "Room · talkative"
      return
    }
    const titles: Record<string, string> = {
      "/": "talkative",
      "/login": "Sign in · talkative",
      "/signup": "Create account · talkative",
      "/app": "Chat · talkative",
    }
    document.title = titles[pathname] ?? "talkative"
  }, [pathname])

  return null
}

export default function App() {
  return (
    <AuthProvider>
      <DocumentTitle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <GuestOnly>
              <Login />
            </GuestOnly>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestOnly>
              <Signup />
            </GuestOnly>
          }
        />
        <Route path="/app" element={<AuthenticatedApp />} />
        <Route path="/app/room/:roomId" element={<AuthenticatedApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
