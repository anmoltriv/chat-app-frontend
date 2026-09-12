import type { Room } from "../../types"

interface ChatHeaderProps {
  room: Room
  onOpenMembers: () => void
  onLeave: () => void
  onBack?: () => void
}

export default function ChatHeader({ room, onOpenMembers, onLeave, onBack }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0, flex: 1 }}>
        {onBack && (
          <button type="button" className="icon-btn chat-header-back" title="Back to rooms" onClick={onBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(124,92,252,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "#a78bfa",
            flexShrink: 0,
          }}
        >
          #
        </div>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--foreground)",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {room.name}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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

      <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
        <button type="button" onClick={onOpenMembers} title="View members" className="icon-btn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <button type="button" onClick={onLeave} title="Leave room" className="icon-btn" style={{ color: "#f87171" }}>
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
