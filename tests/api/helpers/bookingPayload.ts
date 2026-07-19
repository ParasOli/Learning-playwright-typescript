import { faker } from '@faker-js/faker'

export type BookingDates = {
  checkin: string
  checkout: string
}

export type Booking = {
  firstname: string
  lastname: string
  totalprice: number
  depositpaid: boolean
  bookingdates: BookingDates
  additionalneeds: string
}

const fmt = (d: Date) => d.toISOString().split('T')[0]

export function buildBooking(overrides: Partial<Booking> = {}): Booking {
  const checkin = faker.date.soon()
  const checkout = faker.date.soon({ days: 14, refDate: checkin })

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: fmt(checkin),
      checkout: fmt(checkout),
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner']),
    ...overrides,
  }
}
