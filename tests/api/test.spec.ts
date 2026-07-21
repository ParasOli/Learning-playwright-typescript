import {test, expect} from "@playwright/test"

test('login api test', async ({request})=>{
const response = await request.post('/auth', {data:{"username" : "admin", "password" : "password123"}})

expect(response.status()).toBe(200)
expect(response.ok()).toBeTruthy()
const responseBody = await  response.json()
console.log(responseBody)
expect(responseBody).toHaveProperty('token')
expect(typeof responseBody.token).toBe('string')

})



test.only('wrong api test', async ({request})=>{
const response = await request.post('/auth', {data:{"username" : "adminsss", "password" : "password123"}})

expect(response.status()).toBe(200)
// expect(response.ok()).toBeTruthy()
const responseBody = await  response.json()
console.log(responseBody)
expect(responseBody).toHaveProperty('reason')
expect(responseBody.reason).toBe('Bad credentials')

})



