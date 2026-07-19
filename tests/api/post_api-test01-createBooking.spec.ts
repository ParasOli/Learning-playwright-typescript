import {test, expect} from "@playwright/test"
import {faker} from '@faker-js/faker'

test("POST - create a booking", async({request})=>{
    const requestBody = {
    "firstname" : faker.person.firstName(),
    "lastname" : faker.person.lastName(),
    "totalprice" : faker.number.int({ min: 100, max: 1000 }),
    "depositpaid" : faker.datatype.boolean(),
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : faker.helpers.arrayElement(["Breakfast", "Lunch", "Dinner"])
}
const response = await request.post("/booking", {data:requestBody})
const responseBody = await response.json()
console.log(responseBody)
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)
expect(responseBody).toHaveProperty('bookingid')
expect(responseBody).toHaveProperty('booking')

expect(responseBody.booking).toMatchObject(requestBody)
expect(responseBody.booking.bookingdates).toMatchObject(requestBody.bookingdates)
expect(responseBody.booking.additionalneeds).toBe(requestBody.additionalneeds)
})