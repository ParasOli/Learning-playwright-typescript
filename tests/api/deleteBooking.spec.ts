import { test, expect } from '@playwright/test'
import { buildBooking } from './helpers/bookingPayload'
import { getToken, authHeaders } from './helpers/auth'

test.describe('DELETE /booking/:id', () => {
  let token: string

  test.beforeAll(async ({ request }) => {
    token = await getToken(request)
  })

  test('deletes a booking, then confirms it is gone', async ({ request }) => {
    const created = await request.post('/booking', { data: buildBooking() })
    const { bookingid } = await created.json()

    const response = await request.delete(`/booking/${bookingid}`, {
      headers: authHeaders(token),
    })
    expect(response.status()).toBe(201)

    const check = await request.get(`/booking/${bookingid}`)
    expect(check.status()).toBe(404)
  })
})
