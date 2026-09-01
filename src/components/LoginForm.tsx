import { useState } from "react"

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>
  onSignupClick: () => void
  loading?: boolean
  error?: string | null
}

export default function LoginForm({ onSubmit, onSignupClick, loading, error }: LoginFormProps) {
  const [form, setForm] = useState({ username: "", password: "" })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(form.username.trim(), form.password)
  }

  return (
    <div className="w-full max-w-sm">
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "var(--foreground)",
          marginBottom: "0.375rem",
          lineHeight: 1.2,
        }}
      >
        Welcome back
      </h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", marginBottom: "2rem" }}>
        Sign in to your talkative account.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label
            htmlFor="login-username"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--card-foreground)", marginBottom: "0.5rem" }}
          >
            Username
          </label>
          <input
            id="login-username"
            type="text"
            className="talkative-input"
            placeholder="your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            autoComplete="username"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--card-foreground)", marginBottom: "0.5rem" }}
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="talkative-input"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="current-password"
            disabled={loading}
          />
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            Must include uppercase, lowercase, and a number.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 8,
              padding: "0.625rem 0.875rem",
              fontSize: "0.875rem",
              color: "#f87171",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={{ width: "100%", padding: "0.75rem", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSignupClick}
          style={{ color: "var(--accent)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          Sign up
        </button>
      </p>
    </div>
  )
}
