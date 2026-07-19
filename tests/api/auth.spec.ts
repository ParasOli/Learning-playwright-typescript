import { test, expect } from '@playwright/test'
import { getToken } from './helpers/auth'

test('POST /auth - returns a token for valid credentials', async ({ request }) => {
  const token = await getToken(request)
  expect(token).toBeTruthy()
  expect(typeof token).toBe('string')
})

test('POST /auth - rejects invalid credentials', async ({ request }) => {
  const response = await request.post('/auth', {
    data: { username: 'wrong', password: 'nope' },
  })

  const body = await response.json()
  expect(body).toHaveProperty('reason', 'Bad credentials')
  expect(body).not.toHaveProperty('token')
})
