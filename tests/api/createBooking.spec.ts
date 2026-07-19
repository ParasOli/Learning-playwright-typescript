import { test, expect } from '@playwright/test'
import { buildBooking } from './helpers/bookingPayload'

test('POST /booking - creates a booking and echoes it back', async ({ request }) => {
  const booking = buildBooking()

  const response = await request.post('/booking', { data: booking })
  const body = await response.json()

  expect(response.status()).toBe(200)
  expect(body).toHaveProperty('bookingid')
  expect(body.booking).toMatchObject(booking)
})
