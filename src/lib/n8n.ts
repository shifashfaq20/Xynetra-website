export async function triggerN8n(path: string, payload: Record<string, unknown>) {
  const base = process.env.N8N_WEBHOOK_BASE_URL?.replace(/\/+$/, '')
  const secret = process.env.N8N_SHARED_SECRET
  if (!base || !secret) throw new Error('n8n bridge not configured')

  const res = await fetch(`${base}/${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-xynetra-secret': secret },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`n8n/${path} failed: ${res.status}`)
  return res.json().catch(() => ({}))
}