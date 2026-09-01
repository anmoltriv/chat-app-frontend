export interface User {
  id: number
  username: string
  name?: string
  email?: string
}

export interface Room {
  id: number
  name: string
  lastMessagePreview?: string | null
  isAdmin?: boolean
  memberCount?: number
}

export interface MessageSender {
  id: number
  name?: string
  username?: string
}

export interface Message {
  id: number
  roomId: number
  content: string
  senderId: number
  senderName: string
  createdAt: string
  isDeleted?: boolean
  isEdited?: boolean
}

export interface Member {
  id: number
  username: string
  isAdmin: boolean
}

export type WsStatus = "connecting" | "connected" | "disconnected" | "error"

export interface WsEnvelope<T = unknown> {
  type: string
  data: T
}

export function normalizeRoom(raw: Record<string, unknown>, extras?: Partial<Room>): Room {
  const last = raw.last_message as { content?: string } | null | undefined
  const memberCountRaw = raw.memberCount ?? extras?.memberCount
  const memberCount =
    memberCountRaw === undefined || memberCountRaw === null ? undefined : Number(memberCountRaw)

  return {
    id: Number(raw.id),
    name: String(raw.name ?? ""),
    lastMessagePreview: last?.content ?? (typeof raw.lastMessagePreview === "string" ? raw.lastMessagePreview : null),
    isAdmin: extras?.isAdmin ?? Boolean(raw.isAdmin),
    memberCount: Number.isFinite(memberCount) ? memberCount : undefined,
  }
}

export function normalizeMessage(raw: Record<string, unknown>): Message {
  const sender = (raw.sender as MessageSender | undefined) ?? undefined
  const senderId = sender?.id ?? Number(raw.senderId ?? raw.sender_id ?? 0)
  const senderName =
    sender?.name ||
    sender?.username ||
    (typeof raw.senderName === "string" ? raw.senderName : "Unknown")

  return {
    id: Number(raw.id),
    roomId: Number(raw.roomId ?? raw.room_id),
    content: String(raw.content ?? ""),
    senderId,
    senderName,
    createdAt: String(raw.createdAt ?? raw.created_at ?? new Date().toISOString()),
    isDeleted: Boolean(raw.isDeleted),
    isEdited: Boolean(raw.isEdited),
  }
}
