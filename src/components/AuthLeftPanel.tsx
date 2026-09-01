import Logo from "./Logo"

interface AuthLeftPanelProps {
  mode: "signup" | "login"
}

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="#a78bfa" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Create or join any room",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="#a78bfa" strokeWidth="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#a78bfa" strokeWidth="2" />
      </svg>
    ),
    label: "Private rooms, your rules",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Real-time messaging",
  },
]

export default function AuthLeftPanel({ mode }: AuthLeftPanelProps) {
  return (
    <div
      className="flex flex-col justify-between h-full p-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #10102a 0%, #0b0b18 60%, #13131a 100%)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 320,
          height: 320,
          background: "radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 40,
          right: -40,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Logo size="md" />

      <div>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            lineHeight: 1.25,
            color: "var(--foreground)",
            marginBottom: "0.75rem",
          }}
        >
          {mode === "signup"
            ? "Your conversations, your rooms."
            : "Welcome back to your rooms."}
        </h2>
        <p style={{ color: "var(--secondary-foreground)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
          {mode === "signup"
            ? "talkative gives you private, organized spaces to talk with the people who matter."
            : "Pick up right where you left off."}
        </p>

        <ul style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {features.map((f) => (
            <li key={f.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: "rgba(124,92,252,0.12)",
                  border: "1px solid rgba(124,92,252,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <span style={{ color: "var(--card-foreground)", fontSize: "0.875rem" }}>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <p style={{ color: "var(--muted-foreground)", fontSize: "0.8125rem" }}>
        © 2026 talkative. All rights reserved.
      </p>
    </div>
  )
}
