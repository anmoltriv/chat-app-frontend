import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ChatHeader from "../components/Chat/ChatHeader"
import MessageComposer from "../components/Chat/MessageComposer"
import MessageList from "../components/Chat/MessageList"
import LeaveRoomConfirm from "../components/Modals/LeaveRoomConfirm"
import MembersModal from "../components/Modals/MembersModal"
import { useAuth } from "../context/AuthContext"
import { useChat } from "../context/ChatContext"
import { getMembers, getMessages, leaveRoom, promoteMember, removeMember } from "../services/api"
import { ws } from "../services/websocket"
import type { Member, Room } from "../types"

interface RoomPageProps {
  room: Room
}

export default function RoomPage({ room }: RoomPageProps) {
  const { token, user } = useAuth()
  const { messages, members, send, dispatch } = useChat()
  const navigate = useNavigate()

  const roomMessages = messages[room.id] ?? []
  const roomMembers: Member[] = members[room.id] ?? []

  const [editTarget, setEditTarget] = useState<{ id: number; content: string } | null>(null)
  const [showMembers, setShowMembers] = useState(false)
  const [showLeave, setShowLeave] = useState(false)
  const [membersError, setMembersError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    getMessages(token, room.id)
      .then((msgs) => dispatch({ type: "SET_MESSAGES", roomId: room.id, messages: msgs }))
      .catch(() => {})
  }, [room.id, token, dispatch])

  useEffect(() => {
    if (!showMembers || !token) return
    setMembersError(null)
    getMembers(token, room.id)
      .then((mems) => dispatch({ type: "SET_MEMBERS", roomId: room.id, members: mems }))
      .catch((err: unknown) => {
        setMembersError(err instanceof Error ? err.message : "Could not load members")
      })
  }, [showMembers, room.id, token, dispatch])

  const handleSend = useCallback(
    (content: string) => {
      send(ws.sendMessage(room.id, content))
    },
    [send, room.id],
  )

  const handleSaveEdit = useCallback(
    (id: number, content: string) => {
      send(ws.editMessage(id, content))
      setEditTarget(null)
    },
    [send],
  )

  const handleDelete = useCallback(
    (id: number) => {
      send(ws.deleteMessage(id))
    },
    [send],
  )

  async function handleLeave() {
    if (!token) throw new Error("Not authenticated")
    await leaveRoom(token, room.id)
    dispatch({ type: "REMOVE_ROOM", roomId: room.id })
    navigate("/app", { replace: true })
  }

  async function handleRemoveMember(memberId: number) {
    if (!token) return
    await removeMember(token, room.id, memberId)
    dispatch({ type: "REMOVE_MEMBER", roomId: room.id, memberId })
  }

  async function handlePromoteMember(memberId: number) {
    if (!token) return
    await promoteMember(token, room.id, memberId)
    dispatch({ type: "PROMOTE_MEMBER", roomId: room.id, memberId })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ChatHeader
        room={room}
        onOpenMembers={() => setShowMembers(true)}
        onLeave={() => setShowLeave(true)}
        onBack={() => navigate("/app")}
      />

      <MessageList
        messages={roomMessages}
        currentUserId={user?.id ?? -1}
        isAdmin={Boolean(room.isAdmin)}
        onEdit={(id, content) => setEditTarget({ id, content })}
        onDelete={handleDelete}
      />

      <MessageComposer
        onSend={handleSend}
        editTarget={editTarget}
        onCancelEdit={() => setEditTarget(null)}
        onSaveEdit={handleSaveEdit}
        disabled={false}
      />

      {showMembers && (
        <MembersModal
          members={roomMembers}
          isAdmin={Boolean(room.isAdmin)}
          currentUserId={user?.id ?? -1}
          error={membersError}
          onClose={() => setShowMembers(false)}
          onRemove={handleRemoveMember}
          onPromote={handlePromoteMember}
        />
      )}

      {showLeave && (
        <LeaveRoomConfirm
          room={room}
          onClose={() => setShowLeave(false)}
          onConfirm={handleLeave}
        />
      )}
    </div>
  )
}
