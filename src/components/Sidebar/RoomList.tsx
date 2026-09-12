import type { Room } from "../../types"

interface RoomListProps {
  rooms: Room[]
  activeRoomId: number | null
  onSelect: (room: Room) => void
  emptyLabel?: string
}

function roomInitial(name: string) {
  const trimmed = name.trim()
  return (trimmed[0] || "#").toUpperCase()
}

export default function RoomList({ rooms, activeRoomId, onSelect, emptyLabel }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <p style={{ padding: "0.75rem", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
        {emptyLabel ?? "No rooms yet. Join or create one."}
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
            type="button"
            className={`room-row${active ? " active" : ""}`}
            onClick={() => onSelect(room)}
          >
            <span className="room-avatar">{roomInitial(room.name)}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: active ? 600 : 500,
                    color: active ? "var(--foreground)" : "var(--card-foreground)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: 0,
                  }}
                >
                  {room.name}
                </p>
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
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: "0.15rem 0 0",
                }}
              >
                {room.lastMessagePreview || `Room #${room.id}`}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
