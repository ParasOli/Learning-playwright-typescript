import {test} from '@playwright/test'
import { afterEach, beforeEach } from 'node:test'

test.beforeEach(async()=>{
    console.log('before each login')
})
test.beforeAll(async()=>{
    console.log('before all hook...')
})

test.afterEach(async()=>{
    console.log('after each logout')

})

test.afterAll(async()=>{
    console.log('after all hook...')
})


test.describe('Group1', async()=>{

    test('test 1', async()=>{
        console.log('test1...')
    })

    test('test 2', async()=>{
        console.log('test2...')
    })
})




