import { apiErrorMessage } from "../lib/auth"
import { normalizeMessage, normalizeRoom } from "../types"
import type { Member, Message, Room, User } from "../types"

/** Empty in local Vite (proxied). Production: `https://your-api.example.com` */
const ORIGIN = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "")

function url(path: string) {
  return `${ORIGIN}${path}`
}

function authHeaders(token: string): HeadersInit {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
}

async function parseBody(res: Response): Promise<unknown> {
  return res.json().catch(() => ({}))
}

function readUser(body: unknown): User | null {
  if (!body || typeof body !== "object") return null
  const user = (body as { user?: Record<string, unknown> }).user
  if (!user) return null
  const id = Number(user.id)
  const username = String(user.username ?? user.user_name ?? "")
  if (!Number.isFinite(id) || !username) return null
  return {
    id,
    username,
    name: typeof user.name === "string" ? user.name : undefined,
    email: typeof user.email === "string" ? user.email : undefined,
  }
}

async function request<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url(path), {
    ...options,
    headers: { ...authHeaders(token), ...options?.headers },
  })
  const body = await parseBody(res)
  if (!res.ok) {
    throw new Error(apiErrorMessage(body, `Request failed: ${res.status}`))
  }
  return body as T
}

export async function login(
  user_name: string,
  password: string,
): Promise<{ token: string; user: User }> {
  const res = await fetch(url("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_name, password }),
  })
  const body = await parseBody(res)
  if (!res.ok) {
    throw new Error(apiErrorMessage(body, "Login failed"))
  }
  const token = (body as { token?: string }).token
  const user = readUser(body)
  if (!token || !user) throw new Error("Login succeeded but the server returned an incomplete payload")
  return { token, user }
}

export async function signup(input: {
  name: string
  user_name: string
  email: string
  password: string
}): Promise<{ token: string; user: User }> {
  const res = await fetch(url("/api/auth/signup"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  const body = await parseBody(res)
  if (!res.ok) {
    throw new Error(apiErrorMessage(body, "Signup failed"))
  }
  const token = (body as { token?: string }).token
  const user = readUser(body)
  if (!token || !user) throw new Error("Signup succeeded but the server returned an incomplete payload")
  return { token, user }
}

export async function getMe(token: string): Promise<User> {
  const body = await request<{ user?: Record<string, unknown> }>("/api/auth/me", token)
  const user = readUser(body)
  if (!user) throw new Error("Could not load your profile")
  return user
}

export async function logout(token: string): Promise<void> {
  await request("/api/auth/logout", token, { method: "POST" })
}

export async function getRooms(token: string): Promise<Room[]> {
  const body = await request<{ rooms?: Record<string, unknown>[] }>("/api/room/my-rooms", token)
  return (body.rooms ?? []).map((row) => normalizeRoom(row))
}

export async function createRoom(token: string, name: string): Promise<Room> {
  const body = await request<{ room?: Record<string, unknown> }>("/api/room/", token, {
    method: "POST",
    body: JSON.stringify({ name }),
  })
  if (!body.room) throw new Error("Room was created but the server returned no room payload")
  return normalizeRoom(body.room)
}

export async function joinRoom(token: string, roomId: number): Promise<Room> {
  const body = await request<{ room?: Record<string, unknown> }>(`/api/room/${roomId}/join`, token, {
    method: "POST",
  })
  if (!body.room) throw new Error("Joined but the server returned no room payload")
  return normalizeRoom(body.room)
}

export async function leaveRoom(token: string, roomId: number): Promise<void> {
  await request(`/api/room/${roomId}/leave`, token, { method: "POST" })
}

export async function getMessages(token: string, roomId: number): Promise<Message[]> {
  const body = await request<{ messages?: Record<string, unknown>[] }>(
    `/api/room/${roomId}/messages`,
    token,
  )
  return (body.messages ?? []).map((row) => normalizeMessage(row))
}

export async function getMembers(token: string, roomId: number): Promise<Member[]> {
  const body = await request<{ members?: Member[] }>(`/api/room/${roomId}/members`, token)
  return body.members ?? []
}

export async function removeMember(token: string, roomId: number, memberId: number): Promise<void> {
  await request(`/api/room/${roomId}/members/${memberId}`, token, { method: "DELETE" })
}

export async function promoteMember(token: string, roomId: number, memberId: number): Promise<void> {
  await request(`/api/room/${roomId}/members/${memberId}/promote`, token, { method: "POST" })
}
