const puppeteer = require('puppeteer')
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()
    await page.goto("https://enam.gov.in/web/dashboard/trade-data", {
        waitUntil: 'networkidle2'
    });
    await page.select('select[id="min_max_state"]', '276')
    await page.$eval('input#min_max_apmc_from_date', el => el.value = '2021-03-01');
    await page.$eval('input#min_max_apmc_to_date', el => el.value = '2021-03-05');
    await page.click('#refresh')

    page.on('response', async (response) => {
        if (response.url() == "https://enam.gov.in/web/Ajax_ctrl/trade_data_list") {
            console.log('XHR response received');
         const array = await response.json();
         console.log(array.data);

        }
    });
})()
