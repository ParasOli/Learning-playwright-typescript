import { test, expect } from '@playwright/test'
import { buildBooking } from './helpers/bookingPayload'
import { getToken, authHeaders } from './helpers/auth'

test.describe('PUT /booking/:id', () => {
  let token: string

  test.beforeAll(async ({ request }) => {
    token = await getToken(request)
  })

  test('fully replaces an existing booking', async ({ request }) => {
    const original = buildBooking()
    const created = await request.post('/booking', { data: original })
    const { bookingid } = await created.json()

    const updated = buildBooking({ firstname: 'Updated', lastname: 'Booking' })
    const response = await request.put(`/booking/${bookingid}`, {
      headers: authHeaders(token),
      data: updated,
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toMatchObject(updated)
  })

  test('rejects an update with no token (403)', async ({ request }) => {
    const created = await request.post('/booking', { data: buildBooking() })
    const { bookingid } = await created.json()

    const response = await request.put(`/booking/${bookingid}`, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: buildBooking(),
    })

    expect(response.status()).toBe(403)
  })
})
