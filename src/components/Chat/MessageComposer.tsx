import { useEffect, useRef, useState } from "react"

interface MessageComposerProps {
  onSend: (content: string) => void
  editTarget: { id: number; content: string } | null
  onCancelEdit: () => void
  onSaveEdit: (id: number, content: string) => void
  disabled?: boolean
}

export default function MessageComposer({
  onSend,
  editTarget,
  onCancelEdit,
  onSaveEdit,
  disabled,
}: MessageComposerProps) {
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editTarget) {
      setText(editTarget.content)
      textareaRef.current?.focus()
    } else {
      setText("")
    }
  }, [editTarget])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
    if (e.key === "Escape" && editTarget) {
      onCancelEdit()
    }
  }

  function submit() {
    const trimmed = text.trim()
    if (!trimmed) return
    if (editTarget) {
      onSaveEdit(editTarget.id, trimmed)
    } else {
      onSend(trimmed)
    }
    setText("")
  }

  return (
    <div
      className="composer"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--card)",
      }}
    >
      {editTarget && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            padding: "0.375rem 0.625rem",
            background: "rgba(181,122,74,0.1)",
            border: "1px solid rgba(181,122,74,0.2)",
            borderRadius: 7,
          }}
        >
          <span style={{ fontSize: "0.8125rem", color: "#d2b48c" }}>Editing message</span>
          <button
            onClick={onCancelEdit}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: "0.8125rem", padding: 0 }}
          >
            Cancel
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.625rem", alignItems: "flex-end" }}>
        <textarea
          ref={textareaRef}
          className="talkative-input"
          placeholder={editTarget ? "Edit message…" : "Message"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            minHeight: 40,
            maxHeight: 140,
            overflowY: "auto",
            lineHeight: 1.5,
            padding: "0.5rem 0.875rem",
          }}
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = "auto"
            el.style.height = `${Math.min(el.scrollHeight, 140)}px`
          }}
        />

        <button
          onClick={submit}
          disabled={!text.trim() || disabled}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: text.trim() && !disabled ? "var(--primary)" : "var(--muted)",
            border: "none",
            cursor: text.trim() && !disabled ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.12s",
          }}
        >
          {editTarget ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
