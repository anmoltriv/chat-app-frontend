import { createContext, useCallback, useContext, useEffect, useReducer } from "react"
import type { ReactNode } from "react"
import { useWebSocket } from "../hooks/useWebSocket"
import { normalizeMessage } from "../types"
import type { Member, Message, Room, WsEnvelope, WsStatus } from "../types"

interface ChatState {
  rooms: Room[]
  messages: Record<number, Message[]>
  members: Record<number, Member[]>
  wsStatus: WsStatus
  error: string | null
}

type Action =
  | { type: "SET_ROOMS"; rooms: Room[] }
  | { type: "ADD_ROOM"; room: Room }
  | { type: "REMOVE_ROOM"; roomId: number }
  | { type: "SET_MESSAGES"; roomId: number; messages: Message[] }
  | { type: "ADD_MESSAGE"; message: Message }
  | { type: "UPDATE_MESSAGE"; message: Message }
  | { type: "DELETE_MESSAGE"; messageId: number; roomId: number }
  | { type: "SET_MEMBERS"; roomId: number; members: Member[] }
  | { type: "REMOVE_MEMBER"; roomId: number; memberId: number }
  | { type: "PROMOTE_MEMBER"; roomId: number; memberId: number }
  | { type: "SET_WS_STATUS"; status: WsStatus }
  | { type: "SET_ERROR"; error: string | null }

function bumpRoomToTop(rooms: Room[], roomId: number, preview: string): Room[] {
  const index = rooms.findIndex((r) => r.id === roomId)
  if (index === -1) return rooms
  const room = { ...rooms[index], lastMessagePreview: preview }
  if (index === 0) return [room, ...rooms.slice(1)]
  return [room, ...rooms.slice(0, index), ...rooms.slice(index + 1)]
}

function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case "SET_ROOMS":
      return { ...state, rooms: action.rooms }
    case "ADD_ROOM": {
      if (state.rooms.some((r) => r.id === action.room.id)) return state
      return { ...state, rooms: [action.room, ...state.rooms] }
    }
    case "REMOVE_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((r) => r.id !== action.roomId),
      }
    case "SET_MESSAGES":
      return {
        ...state,
        messages: { ...state.messages, [action.roomId]: action.messages },
      }
    case "ADD_MESSAGE": {
      const roomMsgs = state.messages[action.message.roomId] ?? []
      if (roomMsgs.some((m) => m.id === action.message.id)) return state
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.message.roomId]: [...roomMsgs, action.message],
        },
        rooms: bumpRoomToTop(state.rooms, action.message.roomId, action.message.content),
      }
    }
    case "UPDATE_MESSAGE": {
      const roomId = action.message.roomId
      return {
        ...state,
        messages: {
          ...state.messages,
          [roomId]: (state.messages[roomId] ?? []).map((m) =>
            m.id === action.message.id ? { ...action.message, isEdited: true } : m,
          ),
        },
      }
    }
    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.roomId]: (state.messages[action.roomId] ?? []).filter((m) => m.id !== action.messageId),
        },
      }
    case "SET_MEMBERS":
      return {
        ...state,
        members: { ...state.members, [action.roomId]: action.members },
      }
    case "REMOVE_MEMBER":
      return {
        ...state,
        members: {
          ...state.members,
          [action.roomId]: (state.members[action.roomId] ?? []).filter((m) => m.id !== action.memberId),
        },
      }
    case "PROMOTE_MEMBER":
      return {
        ...state,
        members: {
          ...state.members,
          [action.roomId]: (state.members[action.roomId] ?? []).map((m) =>
            m.id === action.memberId ? { ...m, isAdmin: true } : m,
          ),
        },
      }
    case "SET_WS_STATUS":
      return { ...state, wsStatus: action.status }
    case "SET_ERROR":
      return { ...state, error: action.error }
    default:
      return state
  }
}

interface ChatCtx extends ChatState {
  send: (payload: string) => void
  dispatch: React.Dispatch<Action>
}

const ChatContext = createContext<ChatCtx | null>(null)

function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {}
}

export function ChatProvider({
  children,
  token,
}: {
  children: ReactNode
  token: string | null
}) {
  const [state, dispatch] = useReducer(reducer, {
    rooms: [],
    messages: {},
    members: {},
    wsStatus: "disconnected",
    error: null,
  })

  const handleMessage = useCallback((envelope: WsEnvelope) => {
    switch (envelope.type) {
      case "READY":
        break
      case "SEND_MESSAGE":
      case "NEW_MESSAGE":
      case "EDIT_MESSAGE":
      case "MESSAGE_EDITED":
        try {
          const message = normalizeMessage(asRecord(envelope.data))
          if (!Number.isFinite(message.id) || !Number.isFinite(message.roomId)) break
          dispatch({
            type: envelope.type === "EDIT_MESSAGE" || envelope.type === "MESSAGE_EDITED" ? "UPDATE_MESSAGE" : "ADD_MESSAGE",
            message,
          })
        } catch {
          break
        }
        break
      case "DELETE_MESSAGE":
      case "MESSAGE_DELETED": {
        const d = asRecord(envelope.data)
        const messageId = Number(d.messageId ?? d.id)
        const roomId = Number(d.roomId ?? d.room_id)
        if (!Number.isFinite(messageId) || !Number.isFinite(roomId)) break
        dispatch({ type: "DELETE_MESSAGE", messageId, roomId })
        break
      }
      case "ERROR": {
        const { message } = asRecord(envelope.data)
        dispatch({ type: "SET_ERROR", error: typeof message === "string" ? message : "Socket error" })
        break
      }
      default:
        break
    }
  }, [])

  const { send, status } = useWebSocket({ token, onMessage: handleMessage })

  useEffect(() => {
    dispatch({ type: "SET_WS_STATUS", status })
  }, [status])

  return (
    <ChatContext.Provider value={{ ...state, send, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error("useChat must be used inside ChatProvider")
  }
  return ctx
}
