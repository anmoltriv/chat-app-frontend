import { useEffect, useRef, useState } from "react"
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
  const [query, setQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const filtered = rooms.filter((room) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return room.name.toLowerCase().includes(q) || String(room.id).includes(q)
  })

  const initials = (user.username || "?").slice(0, 2).toUpperCase()

  useEffect(() => {
    if (!menuOpen) return
    function close(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [menuOpen])

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo-wrap">
            <Logo size="sm" />
          </div>
          <div className="sidebar-actions">
            <button type="button" className="icon-btn primary" title="Create room" onClick={() => setShowCreate(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" className="icon-btn" title="Join room" onClick={() => setShowJoin(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div ref={menuRef} style={{ position: "relative" }}>
              <button type="button" className="user-chip" title={user.username} onClick={() => setMenuOpen((v) => !v)}>
                {initials}
              </button>
              {menuOpen && (
                <div className="user-menu">
                  <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--foreground)" }}>{user.username}</p>
                  <p style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: statusColors[wsStatus] }} />
                    {statusLabels[wsStatus]}
                  </p>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => {
                      setMenuOpen(false)
                      onLogout()
                    }}
                    style={{ width: "100%", marginTop: "0.75rem", padding: "0.5rem" }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sidebar-search">
          <input
            type="search"
            className="talkative-input"
            placeholder="Search rooms"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search rooms"
          />
        </div>

        <div className="sidebar-list">
          <RoomList rooms={filtered} activeRoomId={activeRoomId} onSelect={onSelectRoom} emptyLabel={query.trim() ? "No rooms match that search." : undefined} />
        </div>

        <div className="sidebar-footer">
          <UserProfile user={user} wsStatus={wsStatus} onLogout={onLogout} />
        </div>
      </aside>

      {showCreate && (
        <CreateRoomModal onClose={() => setShowCreate(false)} onCreate={onCreateRoom} />
      )}
      {showJoin && (
        <JoinRoomModal onClose={() => setShowJoin(false)} onJoin={onJoinRoom} />
      )}
    </>
  )
}
