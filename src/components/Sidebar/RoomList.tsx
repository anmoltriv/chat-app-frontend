import type { Room } from "../../types"

interface RoomListProps {
  rooms: Room[]
  activeRoomId: number | null
  onSelect: (room: Room) => void
}

export default function RoomList({ rooms, activeRoomId, onSelect }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <p style={{ padding: "0.75rem", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
        No rooms yet. Join or create one.
      </p>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {rooms.map((room) => {
        const active = room.id === activeRoomId
        return (
          <button
            key={room.id}
            onClick={() => onSelect(room)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "0.5rem 0.75rem",
              borderRadius: 8,
              background: active ? "rgba(124,92,252,0.15)" : "transparent",
              border: active ? "1px solid rgba(124,92,252,0.25)" : "1px solid transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = "var(--secondary)"
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"
            }}
          >
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: active ? "#a78bfa" : "var(--muted-foreground)",
                flexShrink: 0,
              }}
            >
              #
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--foreground)" : "var(--card-foreground)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {room.name}
              </p>
              {room.lastMessagePreview && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted-foreground)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {room.lastMessagePreview}
                </p>
              )}
            </div>
            {room.isAdmin && (
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  color: "#a78bfa",
                  background: "rgba(124,92,252,0.15)",
                  borderRadius: 4,
                  padding: "1px 4px",
                  flexShrink: 0,
                }}
              >
                Admin
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
