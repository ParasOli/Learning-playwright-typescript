import { Locator, test, expect } from '@playwright/test';


test('iframes tests', async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/')

    const frames = page.frames()
    console.log(frames.length)

    const frame =page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1'})
    if(frame){
       await frame.locator('[name="mytext1"]').fill('paras')
    }else{
        console.log('frame doesnt exist')
    }
})
