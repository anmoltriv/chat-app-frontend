import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"
import { useAuth } from "../context/AuthContext"
import { useChat } from "../context/ChatContext"
import { createRoom, getRooms, joinRoom, logout } from "../services/api"
import type { Room } from "../types"
import RoomPage from "./RoomPage"

export default function AppLayout() {
  const { user, token, clearAuth } = useAuth()
  const { rooms, wsStatus, dispatch } = useChat()
  const navigate = useNavigate()
  const { roomId: roomIdParam } = useParams()
  const [roomsError, setRoomsError] = useState<string | null>(null)
  const [roomsLoaded, setRoomsLoaded] = useState(false)

  const activeRoomId = roomIdParam ? Number(roomIdParam) : null
  const activeRoom =
    activeRoomId != null && Number.isFinite(activeRoomId)
      ? (rooms.find((r) => r.id === activeRoomId) ?? null)
      : null

  useEffect(() => {
    if (!token) return
    getRooms(token)
      .then((r) => {
        dispatch({ type: "SET_ROOMS", rooms: r })
        setRoomsError(null)
      })
      .catch((err: unknown) => {
        setRoomsError(err instanceof Error ? err.message : "Failed to load rooms")
      })
      .finally(() => setRoomsLoaded(true))
  }, [token, dispatch])

  function handleSelectRoom(room: Room) {
    navigate(`/app/room/${room.id}`)
  }

  async function handleCreateRoom(name: string) {
    if (!token) throw new Error("Not authenticated")
    const room = await createRoom(token, name)
    dispatch({ type: "ADD_ROOM", room })
    navigate(`/app/room/${room.id}`)
  }

  async function handleJoinRoom(roomId: number) {
    if (!token) throw new Error("Not authenticated")
    const room = await joinRoom(token, roomId)
    dispatch({ type: "ADD_ROOM", room })
    navigate(`/app/room/${room.id}`)
  }

  async function handleLogout() {
    if (token) {
      await logout(token).catch(() => {})
    }
    clearAuth()
    navigate("/login", { replace: true })
  }

  const shellUser = user ?? { id: 0, username: "…" }

  return (
    <div style={{ display: "flex", height: "100%", background: "var(--background)" }}>
      <Sidebar
        user={shellUser}
        rooms={rooms}
        activeRoomId={activeRoom?.id ?? null}
        wsStatus={wsStatus}
        onSelectRoom={handleSelectRoom}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        onLogout={handleLogout}
      />

      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--card)" }}>
        {roomsError && (
          <div
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(239,68,68,0.12)",
              color: "#f87171",
              fontSize: "0.8125rem",
              borderBottom: "1px solid rgba(239,68,68,0.25)",
            }}
          >
            {roomsError}
          </div>
        )}
        {activeRoom ? (
          <RoomPage key={activeRoom.id} room={activeRoom} />
        ) : (
          <EmptyState missing={roomsLoaded && Boolean(roomIdParam)} />
        )}
      </main>
    </div>
  )
}

function EmptyState({ missing }: { missing?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        color: "var(--muted-foreground)",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p style={{ fontWeight: 600, color: "var(--card-foreground)", marginBottom: "0.25rem" }}>
          {missing ? "Room not found" : "No room selected"}
        </p>
        <p style={{ fontSize: "0.875rem" }}>
          {missing
            ? "This room is not in your list. Join it from the sidebar if you have the ID."
            : "Choose a room from the sidebar, or create one to get started."}
        </p>
      </div>
    </div>
  )
}
