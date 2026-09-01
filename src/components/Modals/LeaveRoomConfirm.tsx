import { useState } from "react"
import type { Room } from "../../types"
import { btnRow, ErrorBox, modalSub, modalTitle, Overlay } from "./CreateRoomModal"

interface LeaveRoomConfirmProps {
  room: Room
  onClose: () => void
  onConfirm: () => Promise<void>
}

export default function LeaveRoomConfirm({ room, onClose, onConfirm }: LeaveRoomConfirmProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm() {
    setError(null)
    setLoading(true)
    try {
      await onConfirm()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to leave room")
      setLoading(false)
    }
  }

  return (
    <Overlay onClose={onClose}>
      <h2 style={modalTitle}>Leave #{room.name}?</h2>
      <p style={modalSub}>
        You will no longer see this room in your list. You can rejoin later with the room ID.
      </p>

      {error && <ErrorBox>{error}</ErrorBox>}

      <div style={{ ...btnRow, marginTop: "1.5rem" }}>
        <button className="btn-ghost" onClick={onClose} style={{ flex: 1 }} disabled={loading}>Cancel</button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          style={{
            flex: 1,
            background: "#ef4444",
            color: "#fff",
            borderRadius: "var(--radius)",
            padding: "0.625rem 1.25rem",
            fontWeight: 600,
            fontSize: "0.9375rem",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {loading ? "Leaving…" : "Leave room"}
        </button>
      </div>
    </Overlay>
  )
}
