export const WS_URL = import.meta.env.VITE_WS_URL ?? "ws://localhost:4000"

export const ws = {
  sendMessage: (roomId: number, content: string) =>
    JSON.stringify({ type: "SEND_MESSAGE", data: { roomId, content } }),
  editMessage: (messageId: number, content: string) =>
    JSON.stringify({ type: "EDIT_MESSAGE", data: { messageId, content } }),
  deleteMessage: (messageId: number) =>
    JSON.stringify({ type: "DELETE_MESSAGE", data: { messageId } }),
}
