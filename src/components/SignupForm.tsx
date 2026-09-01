import { useState } from "react"

interface SignupFormProps {
  onSubmit: (input: { name: string; username: string; email: string; password: string }) => Promise<void>
  onLoginClick: () => void
  loading?: boolean
  error?: string | null
}

export default function SignupForm({ onSubmit, onLoginClick, loading, error }: SignupFormProps) {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit({
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    })
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
        Create your account
      </h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", marginBottom: "2rem" }}>
        Join talkative and start chatting.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label
            htmlFor="signup-name"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--card-foreground)", marginBottom: "0.5rem" }}
          >
            Display name
          </label>
          <input
            id="signup-name"
            type="text"
            className="talkative-input"
            placeholder="e.g. Aria Chen"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            minLength={2}
            maxLength={20}
            autoComplete="name"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-username"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--card-foreground)", marginBottom: "0.5rem" }}
          >
            Username
          </label>
          <input
            id="signup-username"
            type="text"
            className="talkative-input"
            placeholder="e.g. aria_chen"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            minLength={2}
            maxLength={20}
            autoComplete="username"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--card-foreground)", marginBottom: "0.5rem" }}
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            className="talkative-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="email"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--card-foreground)", marginBottom: "0.5rem" }}
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            className="talkative-input"
            placeholder="At least 5 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={5}
            autoComplete="new-password"
            disabled={loading}
          />
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            At least 5 characters, with uppercase, lowercase, and a number.
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
          style={{ width: "100%", marginTop: "0.5rem", padding: "0.75rem", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLoginClick}
          style={{ color: "var(--accent)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          Log in
        </button>
      </p>
    </div>
  )
}
