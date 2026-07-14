import {test} from '@playwright/test'

test.describe('Group1', async()=>{

    test('test 1', async()=>{
        console.log('test1...')
    })

    test('test 2', async()=>{
        console.log('test2...')
    })
})


test.describe('Group2', async()=>{

    test('test 3', async()=>{
        console.log('test1...')
    })

    test('test 4', async()=>{
        console.log('test2...')
    })
})


