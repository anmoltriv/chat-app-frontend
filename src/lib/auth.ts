export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split(".")[1]
    if (!part) return null
    const padded = part.replace(/-/g, "+").replace(/_/g, "/")
    const json = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), "="))
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

export function userIdFromToken(token: string): number | null {
  const payload = parseJwtPayload(token)
  if (!payload) return null
  const id = payload.id
  const n = typeof id === "number" ? id : Number(id)
  return Number.isFinite(n) ? n : null
}

export function apiErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback
  const record = body as {
    message?: string
    error?: { issues?: Array<{ message?: string }> }
  }
  const issue = record.error?.issues?.[0]?.message
  if (issue) return issue
  if (record.message) return record.message
  return fallback
}
