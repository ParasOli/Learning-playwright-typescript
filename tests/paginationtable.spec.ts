import {Locator,expect, test} from "@playwright/test"

test('read data from all the table pages', async ({page})=>{
    await page.goto('https://datatables.net/')
    
    let pageExist:boolean = true;

    while(pageExist){
        const rows= await page.locator('#example tbody tr').all()
        for(const row of rows){
            console.log(await row.innerText())
        }
        const nextButton = page.locator('[type="button"]',{hasText:'›'})
        const isDisable= await nextButton.getAttribute('class')

if(isDisable?.includes('disabled')){
    pageExist = false
}else{
    await nextButton.click()


}
    }


})


test('Filter the rows count', async ({page})=>{
        await page.goto('https://datatables.net/')
        const dropDown = page.locator('#dt-length-0')
        await dropDown.selectOption({label:'25'})
        const rows= await page.locator('#example tbody tr').all()
        expect(rows.length).toBe(25)
})

test('Validating the search functionality -- Positive', async ({page})=>{
      await page.goto('https://datatables.net/')
      const searchBox = page.locator('[type="search"]')
      await searchBox.fill('Tiger Nixon')
      const rows = await page.locator('#example tbody tr').all()

      if((rows).length>0){
        for(const row of rows){
            const filterName =await row.innerText()
            expect(filterName.includes('Tiger Nixon'))
        }

      }
})


