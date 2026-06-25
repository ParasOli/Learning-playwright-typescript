 import {Locator,expect, test} from "@playwright/test"

 test('Validating the table row count match', async ({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
  const rowsLocator:Locator = page.locator('table[name="BookTable"] tr')
  const rowsCount = await rowsLocator.count()
  console.log(rowsCount)
  //including header
  expect(rowsCount).toBe(7)
 })


test('Validating the table column count match', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/')
  const columnLocator: Locator = page.locator('table[name="BookTable"] th')
  const columnCount = await columnLocator.count()
  console.log(columnCount)
  expect(columnCount).toBe(4)
})

test('get the data of the second row', async ({page})=>{
    const secondRowData:(string | RegExp)[] = [ 'Learn Java', 'Mukesh', 'Java', '500' ]
      await page.goto('https://testautomationpractice.blogspot.com/')
        const secondRowCells:Locator = page.locator('table[name="BookTable"] tr').nth(2).locator('td')
        const SecondRowText: string[] =await secondRowCells.allInnerTexts()
        await expect(secondRowCells).toHaveText(secondRowData); 
})

test('printing all the data of the table exculding headers', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const tableLoactor: Locator =  page.locator('[name="BookTable"] tr')
    const allLocator = await tableLoactor.all()
    for(const tablerows of allLocator.slice(1)){
        const rowText = await tablerows.locator('td').allInnerTexts()
        console.log(rowText)

    }
})

test('printing the rows where author name is mukesh', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const tableLoactor: Locator =  page.locator('[name="BookTable"] tr')
    const allLocator = await tableLoactor.all()

    for(const tablerows of allLocator.slice(1)){
        const author = await tablerows.locator('td').nth(1).innerText()
        const bookname =await  tablerows.locator('td').nth(0).innerText()
        if(author.trim() === 'Mukesh'){
            console.log([bookname, author])
        }

    }
})


test('Validating the header text matches', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const headerToMatch:string[] = ['BookName', 'Author', 'Subject', 'Price']
    const tableHeaderLocator  =  page.locator('[name="BookTable"] th')
    const tableHeaderText:string[] =await tableHeaderLocator.allInnerTexts()
     expect(tableHeaderText).toEqual(headerToMatch)
})


test('Validating price of Master in Selenium is 3000', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const tableLocator:Locator  =  page.locator('[name="BookTable"] tr')
    const allLocator = await tableLocator.all()

    for (const tablerows of allLocator.slice(1)){
        const BookName =  await tablerows.locator('td').nth(0).innerText()
         const BookPrice =await  tablerows.locator('td').nth(3).innerText()

         if(BookName.trim()==='Master In Selenium'){
            expect(BookPrice).toEqual('3000')
         }
    }
})


test('Printing the last row data without hardcoding index', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const tableLocator:Locator  =  page.locator('[name="BookTable"] tr')
    const rowCount =await  tableLocator.count()
    const lastRowData = await tableLocator.nth(rowCount-1).locator('td').allInnerTexts()
    const trimText = lastRowData.map(text=>text.trim())
    console.log(trimText)
})



test('Finding author and price of Learn JS', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const rowsLocator:Locator = page.locator('[name="BookTable"] tr')
    const allLocator = rowsLocator.all()

    for(const tablerows of (await allLocator).slice(1)){
        const bookName = await tablerows.locator('td').nth(0).innerText()
        const bookAuthor = await tablerows.locator('td').nth(1).innerText()
        const BookPrice = await tablerows.locator('td').last().innerText()

        if(bookName ==='Learn JS'){
            console.log(`Author name of Learn JS book is ${bookAuthor}`)
            console.log(`Price of Learn JS book is ${BookPrice}`)
        }
    }
})