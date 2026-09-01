import { useState } from "react"
import { btnRow, ErrorBox, modalSub, modalTitle, Overlay } from "./CreateRoomModal"

interface JoinRoomModalProps {
  onClose: () => void
  onJoin: (roomId: number) => Promise<void>
}

export default function JoinRoomModal({ onClose, onJoin }: JoinRoomModalProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const id = parseInt(code.trim(), 10)
    if (isNaN(id)) {
      setError("Please enter a valid room ID (number).")
      return
    }
    setError(null)
    setLoading(true)
    try {
      await onJoin(id)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join room")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Overlay onClose={onClose}>
      <h2 style={modalTitle}>Join a room</h2>
      <p style={modalSub}>Enter the room ID shared by the room admin.</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.25rem" }}>
        <div>
          <label className="field-label">Room ID</label>
          <input
            type="text"
            className="talkative-input"
            placeholder="e.g. 42"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            autoFocus
            disabled={loading}
          />
        </div>

        {error && <ErrorBox>{error}</ErrorBox>}

        <div style={btnRow}>
          <button type="button" className="btn-ghost" onClick={onClose} style={{ flex: 1 }} disabled={loading}>Cancel</button>
          <button type="submit" className="btn-primary" style={{ flex: 1, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? "Joining…" : "Join room"}
          </button>
        </div>
      </form>
    </Overlay>
  )
}
