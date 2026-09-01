import type { User, WsStatus } from "../../types"

interface UserProfileProps {
  user: User
  wsStatus: WsStatus
  onLogout: () => void
}

const statusColors: Record<WsStatus, string> = {
  connected: "#10b981",
  connecting: "#f59e0b",
  disconnected: "#6b7280",
  error: "#ef4444",
}

const statusLabels: Record<WsStatus, string> = {
  connected: "Connected",
  connecting: "Connecting…",
  disconnected: "Offline",
  error: "Connection error",
}

export default function UserProfile({ user, wsStatus, onLogout }: UserProfileProps) {
  const initials = (user.username || "?").slice(0, 2).toUpperCase()

  return (
    <div
      style={{
        padding: "0.75rem 1rem",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c5cfc, #a78bfa)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{initials}</span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--foreground)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.username}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: statusColors[wsStatus],
              flexShrink: 0,
            }}
          />
          <p style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>
            {statusLabels[wsStatus]}
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        title="Sign out"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--muted-foreground)",
          padding: 4,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
