import { test, expect } from '@playwright/test'
import { buildBooking } from './helpers/bookingPayload'

test.describe('GET /booking', () => {
  test('lists booking ids', async ({ request }) => {
    const response = await request.get('/booking')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
    expect(body[0]).toHaveProperty('bookingid')
  })

  test('fetches a single booking by id', async ({ request }) => {
    const booking = buildBooking()
    const created = await request.post('/booking', { data: booking })
    const { bookingid } = await created.json()

    const response = await request.get(`/booking/${bookingid}`)
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toMatchObject(booking)
  })
})
