import { useState } from "react"

interface CreateRoomModalProps {
  onClose: () => void
  onCreate: (name: string) => Promise<void>
}

export default function CreateRoomModal({ onClose, onCreate }: CreateRoomModalProps) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setError(null)
    setLoading(true)
    try {
      await onCreate(trimmed)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create room")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Overlay onClose={onClose}>
      <h2 style={modalTitle}>Create a room</h2>
      <p style={modalSub}>You will automatically become the admin.</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.25rem" }}>
        <div>
          <label className="field-label">Room name</label>
          <input
            type="text"
            className="talkative-input"
            placeholder="e.g. design-feedback"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            disabled={loading}
          />
        </div>

        {error && <ErrorBox>{error}</ErrorBox>}

        <div style={btnRow}>
          <button type="button" className="btn-ghost" onClick={onClose} style={{ flex: 1 }} disabled={loading}>Cancel</button>
          <button type="submit" className="btn-primary" style={{ flex: 1, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? "Creating…" : "Create room"}
          </button>
        </div>
      </form>
    </Overlay>
  )
}

// ── shared modal primitives ────────────────────────────────────────────────

export function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "1.75rem",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
          animation: "slideUp 0.15s ease",
        }}
      >
        {children}
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}

export const modalTitle: React.CSSProperties = {
  fontSize: "1.125rem",
  fontWeight: 700,
  color: "var(--foreground)",
  marginBottom: "0.25rem",
}

export const modalSub: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "var(--muted-foreground)",
}

export const btnRow: React.CSSProperties = {
  display: "flex",
  gap: "0.625rem",
}

export function ErrorBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(239,68,68,0.1)",
        border: "1px solid rgba(239,68,68,0.25)",
        borderRadius: 8,
        padding: "0.5rem 0.75rem",
        fontSize: "0.875rem",
        color: "#f87171",
      }}
    >
      {children}
    </div>
  )
}
