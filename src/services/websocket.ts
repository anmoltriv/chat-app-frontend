function fromHttp(origin: string) {
  return origin.replace(/^http/i, "ws")
}

function normalizeWsUrl(raw: string) {
  let url = raw.trim().replace(/\/$/, "")
  url = url.replace(/^WS:\/\//i, "ws://").replace(/^WSS:\/\//i, "wss://")
  if (/^https?:\/\//i.test(url)) url = fromHttp(url)
  if (typeof window !== "undefined" && window.location.protocol === "https:" && url.startsWith("ws://")) {
    url = `wss://${url.slice("ws://".length)}`
  }
  return url
}

function resolveWsUrl() {
  const explicit = (import.meta.env.VITE_WS_URL ?? "").trim()
  if (explicit) return normalizeWsUrl(explicit)
  const api = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/$/, "")
  if (api) return normalizeWsUrl(api)
  return "ws://localhost:4000"
}

export const WS_URL = resolveWsUrl()

export const ws = {
  sendMessage: (roomId: number, content: string) =>
    JSON.stringify({ type: "SEND_MESSAGE", data: { roomId, content } }),
  editMessage: (messageId: number, content: string) =>
    JSON.stringify({ type: "EDIT_MESSAGE", data: { messageId, content } }),
  deleteMessage: (messageId: number) =>
    JSON.stringify({ type: "DELETE_MESSAGE", data: { messageId } }),
}
