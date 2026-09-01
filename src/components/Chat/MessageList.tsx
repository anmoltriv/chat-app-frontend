import { useEffect, useRef } from "react"
import type { Message } from "../../types"
import MessageBubble from "./MessageBubble"

interface MessageListProps {
  messages: Message[]
  currentUserId: number
  isAdmin: boolean
  onEdit: (id: number, content: string) => void
  onDelete: (id: number) => void
}

function isSameGroup(a: Message, b: Message) {
  if (a.senderId !== b.senderId) return false
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() < 5 * 60 * 1000
}

export default function MessageList({
  messages,
  currentUserId,
  isAdmin,
  onEdit,
  onDelete,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  if (messages.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          color: "var(--muted-foreground)",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontSize: "0.9rem" }}>No messages yet. Say something!</p>
      </div>
    )
  }

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      {messages.map((msg, i) => {
        const prev = messages[i - 1]
        const showSender = !prev || !isSameGroup(prev, msg)
        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUserId}
            isAdmin={isAdmin}
            showSender={showSender}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
