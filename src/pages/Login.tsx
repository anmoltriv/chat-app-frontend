import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLeftPanel from "../components/AuthLeftPanel"
import LoginForm from "../components/LoginForm"
import { useAuth } from "../context/AuthContext"
import { login } from "../services/api"

export default function Login() {
  const { setSession } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(username: string, password: string) {
    setError(null)
    setLoading(true)
    try {
      const { token, user } = await login(username, password)
      setSession(token, user)
      navigate("/app", { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: "40%", minWidth: 300, flexShrink: 0 }}>
        <AuthLeftPanel mode="login" />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "var(--background)",
          overflowY: "auto",
        }}
      >
        <LoginForm
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
          onSignupClick={() => navigate("/signup")}
        />
      </div>
    </div>
  )
}
