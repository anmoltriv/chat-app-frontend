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
    <div className="auth-layout">
      <div className="auth-brand">
        <AuthLeftPanel mode="login" />
      </div>
      <div className="auth-form">
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
