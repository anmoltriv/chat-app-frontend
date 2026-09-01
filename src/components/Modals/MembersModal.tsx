import type { Member } from "../../types"
import { modalTitle, Overlay } from "./CreateRoomModal"

interface MembersModalProps {
  members: Member[]
  isAdmin: boolean
  currentUserId: number
  error?: string | null
  onClose: () => void
  onRemove: (memberId: number) => Promise<void>
  onPromote: (memberId: number) => Promise<void>
}

function avatar(name: string) {
  return name.slice(0, 2).toUpperCase()
}

const palette = ["#7c5cfc", "#06b6d4", "#f59e0b", "#ec4899", "#10b981", "#f97316"]

export default function MembersModal({
  members,
  isAdmin,
  currentUserId,
  error,
  onClose,
  onRemove,
  onPromote,
}: MembersModalProps) {
  return (
    <Overlay onClose={onClose}>
      <h2 style={modalTitle}>Members · {members.length}</h2>

      {error && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#f87171" }}>{error}</p>
      )}

      {!error && members.length === 0 && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          No members loaded.
        </p>
      )}

      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.375rem", maxHeight: 360, overflowY: "auto" }}>
        {members.map((m, i) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.5rem 0.625rem",
              borderRadius: 9,
              background: "var(--muted)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: palette[i % palette.length],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#fff" }}>{avatar(m.username)}</span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)" }}>
                {m.username}
                {m.id === currentUserId && (
                  <span style={{ marginLeft: 5, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>(you)</span>
                )}
              </p>
              {m.isAdmin && (
                <p style={{ fontSize: "0.6875rem", color: "#a78bfa" }}>Admin</p>
              )}
            </div>

            {isAdmin && m.id !== currentUserId && (
              <div style={{ display: "flex", gap: 4 }}>
                {!m.isAdmin && (
                  <button
                    onClick={() => onPromote(m.id)}
                    title="Promote to admin"
                    style={actionBtn}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => onRemove(m.id)}
                  title="Remove member"
                  style={{ ...actionBtn, borderColor: "rgba(239,68,68,0.3)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="btn-ghost"
        style={{ width: "100%", marginTop: "1.25rem" }}
      >
        Close
      </button>
    </Overlay>
  )
}

const actionBtn: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 6,
  background: "transparent",
  border: "1px solid var(--border)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
