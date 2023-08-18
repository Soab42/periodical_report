import puppeteer from "puppeteer";
import * as fs from "fs";
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  // http://103.139.165.110:8080/accounts/rec_pay.php?from=2023-01-01&to=2023-01-31&but_search=Search"
  const url = "http://103.139.165.110:8080";
  const rpUrl =
    "http://103.139.165.110:8080/accounts/rec_pay.php?from=2023-01-01&to=2023-01-31&but_search=search";
  const page = await browser.newPage();
  await page.goto(url);

  await page.type(
    "div.form-group:nth-child(1) > div:nth-child(2) > input:nth-child(1)",
    "Azampur",
    { delay: 100 }
  );
  await page.type(
    "div.form-group:nth-child(2) > div:nth-child(2) > input:nth-child(1)",
    "Azampur@010",
    { delay: 100 }
  );

  await Promise.all([
    // page.waitForNetworkIdle(),
    page.waitForNavigation(),
    page.click(".btn"),
    new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    }),
  ]);

  //after clicking login button goto Receipt-payment report page
  await page.goto(rpUrl);

  const tableData = await page.evaluate(() => {
    // header table data
    const headerRows = Array.from(document.querySelectorAll("table thead tr"));
    const headerData = headerRows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      return cells.slice(0, 3).map((cell) => cell.textContent.trim());
    });

    //body table data
    const bodyRows = Array.from(document.querySelectorAll("table tbody tr"));
    const bodyData = bodyRows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return cells.slice(0, 3).map((cell) => cell.textContent.trim());
    });

    return { header: headerData, body: bodyData };
  });

  await browser.close();

  // Process the extracted data into a JSON format
  console.log(JSON.stringify(tableData, null, 2));
  fs.writeFileSync("report.json", JSON.stringify(tableData, null, 2));
  // await browser.close();
})();

// "http://103.139.165.110:8080/index.php
