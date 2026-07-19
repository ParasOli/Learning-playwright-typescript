import { APIRequestContext, expect } from '@playwright/test'

export async function getToken(request: APIRequestContext): Promise<string> {
  const username = process.env.AUTH_USER ?? 'admin'
  const password = process.env.AUTH_PASS ?? 'password123'

  const response = await request.post('/auth', {
    data: { username, password },
  })

  expect(response.status(), 'auth request should return 200').toBe(200)

  const body = await response.json()
  expect(
    body.token,
    `expected a token but got: ${JSON.stringify(body)}`,
  ).toBeTruthy()

  return body.token
}

export function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Cookie: `token=${token}`,
  }
}
