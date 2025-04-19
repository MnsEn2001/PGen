// getAuthToken.js
const puppeteer = require('puppeteer'); 

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://firefly.adobe.com/generate/images');
  
  const isLoggedIn = await page.evaluate(() => {
    return document.querySelector('selector-ขององค์ประกอบที่บ่งบอกการล็อกอิน') !== null;
  });

  if (!isLoggedIn) {
    console.log('ยังไม่ได้ล็อกอิน');
    process.exit(1); // ส่งออกสถานะผิดพลาด
  }

  const authToken = await page.evaluate(() => {
    return localStorage.getItem('authorization_token');
  });

  console.log(authToken);  // หรือส่งค่าออกไปในรูปแบบที่ต้องการ
  await browser.close();
})();
