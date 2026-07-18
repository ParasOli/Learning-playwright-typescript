import {test, expect} from "@playwright/test"
import { request } from "node:http"

test("POST - create a booking", async({request})=>{
    const requestBody = {
    "firstname" : "paras",
    "lastname" : "oli",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}
const response = await request.post("https://restful-booker.herokuapp.com/booking", {data:requestBody})
const body = await response.json()
console.log(await response.json())
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)
expect(body).toHaveProperty('bookingid')
})