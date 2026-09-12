import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLeftPanel from "../components/AuthLeftPanel"
import SignupForm from "../components/SignupForm"
import { useAuth } from "../context/AuthContext"
import { signup } from "../services/api"

export default function Signup() {
  const { setSession } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(input: { name: string; username: string; email: string; password: string }) {
    setError(null)
    setLoading(true)
    try {
      const { token, user } = await signup({
        name: input.name,
        user_name: input.username,
        email: input.email,
        password: input.password,
      })
      setSession(token, user)
      navigate("/app", { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-brand">
        <AuthLeftPanel mode="signup" />
      </div>
      <div className="auth-form">
        <SignupForm
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
          onLoginClick={() => navigate("/login")}
        />
      </div>
    </div>
  )
}
