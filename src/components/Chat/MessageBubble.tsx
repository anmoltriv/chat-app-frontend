import { useEffect, useRef, useState } from "react"
import type { Message } from "../../types"

const EDIT_WINDOW_MS = 15 * 60 * 1000 // 15 min — match backend policy

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  isAdmin?: boolean
  showSender: boolean
  onEdit: (id: number, current: string) => void
  onDelete: (id: number) => void
}

function avatar(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function colorFromId(id: number) {
  const palette = ["#b57a4a", "#06b6d4", "#f59e0b", "#ec4899", "#10b981", "#f97316"]
  return palette[id % palette.length]
}

function canEdit(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() < EDIT_WINDOW_MS
}

export default function MessageBubble({
  message,
  isOwn,
  isAdmin,
  showSender,
  onEdit,
  onDelete,
}: MessageBubbleProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function close(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [menuOpen])

  if (message.isDeleted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: isOwn ? "flex-end" : "flex-start",
          padding: "2px 0",
        }}
      >
        <span
          style={{
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
            fontStyle: "italic",
            padding: "0.4rem 0.75rem",
            background: "var(--muted)",
            borderRadius: 10,
          }}
        >
          This message was deleted.
        </span>
      </div>
    )
  }

  const editAllowed = isOwn && canEdit(message.createdAt)
  const deleteAllowed = isOwn || Boolean(isAdmin)
  const showMenu = editAllowed || deleteAllowed

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  if (isOwn) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "2px 0", gap: 6 }}>
        {showMenu && (
          <div style={{ position: "relative", display: "flex", alignItems: "flex-end" }} ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              style={menuBtn}
              title="Message actions"
            >
              ···
            </button>
            {menuOpen && (
              <div style={menuStyle}>
                {editAllowed && (
                  <button style={menuItem} onClick={() => { setMenuOpen(false); onEdit(message.id, message.content) }}>
                    Edit
                  </button>
                )}
                {deleteAllowed && (
                  <button style={{ ...menuItem, color: "#f87171" }} onClick={() => { setMenuOpen(false); onDelete(message.id) }}>
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        <div className="msg-max" style={{ minWidth: 0 }}>
          <div
            style={{
              background: "var(--primary)",
              color: "#fff",
              padding: "0.5rem 0.875rem",
              borderRadius: "14px 14px 4px 14px",
              fontSize: "0.9375rem",
              lineHeight: 1.5,
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {message.content}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, marginTop: 3 }}>
            {message.isEdited && (
              <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>edited</span>
            )}
            <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>{time}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", gap: "0.5rem", padding: "2px 0", alignItems: "flex-start" }}>
      {showSender ? (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: colorFromId(message.senderId),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#fff" }}>{avatar(message.senderName)}</span>
        </div>
      ) : (
        <div style={{ width: 32, flexShrink: 0 }} />
      )}

      <div className="msg-max" style={{ minWidth: 0 }}>
        {showSender && (
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--card-foreground)" }}>
              {message.senderName}
            </span>
            <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>{time}</span>
          </div>
        )}
        <div
          style={{
            background: "var(--secondary)",
            color: "var(--foreground)",
            padding: "0.5rem 0.875rem",
            borderRadius: showSender ? "4px 14px 14px 14px" : "14px",
            fontSize: "0.9375rem",
            lineHeight: 1.5,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            display: "inline-block",
          }}
        >
          {message.content}
        </div>
        {(message.isEdited || !showSender) && (
          <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
            {message.isEdited && (
              <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>edited</span>
            )}
            {!showSender && (
              <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>{time}</span>
            )}
          </div>
        )}
      </div>

      {showMenu && (
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end" }} ref={deleteAllowed ? menuRef : undefined}>
          <button onClick={() => setMenuOpen((v) => !v)} style={menuBtn} title="Message actions">···</button>
          {menuOpen && (
            <div style={{ ...menuStyle, left: 0, right: "auto" }}>
              {deleteAllowed && (
                <button style={{ ...menuItem, color: "#f87171" }} onClick={() => { setMenuOpen(false); onDelete(message.id) }}>
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const menuBtn: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--border)",
  borderRadius: 6,
  color: "var(--muted-foreground)",
  fontSize: "1rem",
  cursor: "pointer",
  padding: "0 6px",
  lineHeight: 1.2,
  height: 26,
  fontFamily: "monospace",
}

const menuStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "calc(100% + 4px)",
  right: 0,
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 9,
  padding: "4px",
  minWidth: 110,
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  zIndex: 30,
}

const menuItem: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "left",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0.5rem 0.75rem",
  borderRadius: 6,
  fontSize: "0.875rem",
  color: "var(--card-foreground)",
  fontFamily: "Inter, sans-serif",
}
