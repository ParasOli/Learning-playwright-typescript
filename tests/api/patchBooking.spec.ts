import { test, expect } from '@playwright/test'
import { buildBooking } from './helpers/bookingPayload'
import { getToken, authHeaders } from './helpers/auth'

test.describe('PATCH /booking/:id', () => {
  let token: string

  test.beforeAll(async ({ request }) => {
    token = await getToken(request)
  })

  test('partially updates a booking', async ({ request }) => {
    const original = buildBooking()
    const created = await request.post('/booking', { data: original })
    const { bookingid } = await created.json()

    const patch = { firstname: 'Patched', totalprice: 999 }
    const response = await request.patch(`/booking/${bookingid}`, {
      headers: authHeaders(token),
      data: patch,
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.firstname).toBe('Patched')
    expect(body.totalprice).toBe(999)
    expect(body.lastname).toBe(original.lastname)
  })
})
