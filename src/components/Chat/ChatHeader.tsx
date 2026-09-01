import type { Room } from "../../types"

interface ChatHeaderProps {
  room: Room
  onOpenMembers: () => void
  onLeave: () => void
}

export default function ChatHeader({ room, onOpenMembers, onLeave }: ChatHeaderProps) {
  return (
    <div
      style={{
        height: 56,
        padding: "0 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
        background: "var(--card)",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(124,92,252,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "#a78bfa",
          }}
        >
          #
        </div>
        <div>
          <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.2 }}>
            {room.name}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            Room #{room.id}
            {typeof room.memberCount === "number" &&
              ` · ${room.memberCount} member${room.memberCount !== 1 ? "s" : ""}`}
            {room.isAdmin && (
              <span
                style={{
                  marginLeft: 6,
                  background: "rgba(124,92,252,0.18)",
                  color: "#a78bfa",
                  borderRadius: 4,
                  padding: "1px 5px",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                }}
              >
                Admin
              </span>
            )}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.375rem" }}>
        <button
          onClick={onOpenMembers}
          title="View members"
          style={iconBtn}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          onClick={onLeave}
          title="Leave room"
          style={{ ...iconBtn, color: "#f87171" }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const iconBtn: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 8,
  background: "transparent",
  border: "1px solid var(--border)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--muted-foreground)",
  transition: "background 0.12s, color 0.12s",
}
