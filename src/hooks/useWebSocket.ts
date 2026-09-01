import { useCallback, useEffect, useRef, useState } from "react"
import { WS_URL } from "../services/websocket"
import type { WsEnvelope, WsStatus } from "../types"

interface UseWebSocketOptions {
  token: string | null
  onMessage: (envelope: WsEnvelope) => void
}

export function useWebSocket({ token, onMessage }: UseWebSocketOptions) {
  const [status, setStatus] = useState<WsStatus>("disconnected")
  const wsRef = useRef<WebSocket | null>(null)
  const onMessageRef = useRef(onMessage)
  onMessageRef.current = onMessage

  useEffect(() => {
    if (!token) {
      wsRef.current?.close()
      wsRef.current = null
      setStatus("disconnected")
      return
    }

    let cancelled = false
    let retry: ReturnType<typeof setTimeout> | undefined
    let delay = 1000

    const connect = () => {
      if (cancelled) return
      setStatus("connecting")
      const socket = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`)
      wsRef.current = socket

      socket.onopen = () => {
        delay = 1000
        if (!cancelled) setStatus("connected")
      }

      socket.onmessage = (event) => {
        try {
          const envelope = JSON.parse(event.data as string) as WsEnvelope
          onMessageRef.current(envelope)
        } catch {
          // ignore malformed frames
        }
      }

      socket.onerror = () => {
        if (!cancelled) setStatus("error")
      }

      socket.onclose = () => {
        if (wsRef.current === socket) {
          wsRef.current = null
        }
        if (cancelled) return
        setStatus("disconnected")
        retry = setTimeout(connect, delay)
        delay = Math.min(delay * 2, 15000)
      }
    }

    connect()

    return () => {
      cancelled = true
      if (retry) clearTimeout(retry)
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [token])

  const send = useCallback((payload: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(payload)
    }
  }, [])

  return { status, send }
}
