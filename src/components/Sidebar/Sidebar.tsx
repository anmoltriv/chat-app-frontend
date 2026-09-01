import { useState } from "react"
import Logo from "../Logo"
import CreateRoomModal from "../Modals/CreateRoomModal"
import JoinRoomModal from "../Modals/JoinRoomModal"
import RoomList from "./RoomList"
import UserProfile from "./UserProfile"
import type { Room, User, WsStatus } from "../../types"

interface SidebarProps {
  user: User
  rooms: Room[]
  activeRoomId: number | null
  wsStatus: WsStatus
  onSelectRoom: (room: Room) => void
  onCreateRoom: (name: string) => Promise<void>
  onJoinRoom: (roomId: number) => Promise<void>
  onLogout: () => void
}

export default function Sidebar({
  user,
  rooms,
  activeRoomId,
  wsStatus,
  onSelectRoom,
  onCreateRoom,
  onJoinRoom,
  onLogout,
}: SidebarProps) {
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)

  return (
    <>
      <div
        style={{
          width: 264,
          flexShrink: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "var(--card)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 56,
            padding: "0 1rem",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <Logo size="sm" />
        </div>

        {/* Action buttons */}
        <div style={{ padding: "0.75rem 0.875rem", display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button
            onClick={() => setShowCreate(true)}
            style={actionBtn("primary")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Create
          </button>
          <button
            onClick={() => setShowJoin(true)}
            style={actionBtn("ghost")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Join
          </button>
        </div>

        {/* Room list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0.5rem" }}>
          <p
            style={{
              padding: "0.25rem 0.375rem 0.5rem",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Rooms
          </p>
          <RoomList rooms={rooms} activeRoomId={activeRoomId} onSelect={onSelectRoom} />
        </div>

        {/* User footer */}
        <UserProfile user={user} wsStatus={wsStatus} onLogout={onLogout} />
      </div>

      {showCreate && (
        <CreateRoomModal onClose={() => setShowCreate(false)} onCreate={onCreateRoom} />
      )}
      {showJoin && (
        <JoinRoomModal onClose={() => setShowJoin(false)} onJoin={onJoinRoom} />
      )}
    </>
  )
}

function actionBtn(variant: "primary" | "ghost"): React.CSSProperties {
  return {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
    background: variant === "primary" ? "var(--primary)" : "var(--muted)",
    color: variant === "primary" ? "#fff" : "var(--card-foreground)",
    border: variant === "ghost" ? "1px solid var(--border)" : "none",
    borderRadius: 8,
    padding: "0.5rem 0",
    fontSize: "0.8125rem",
    fontWeight: variant === "primary" ? 600 : 500,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    transition: "opacity 0.12s",
  }
}
