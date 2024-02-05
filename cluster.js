import { Cluster } from "puppeteer-cluster";
import * as fs from "fs";
import { loginCredentials } from "./credentials.js";
import ExcelJs from "exceljs";
(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT, // Run in parallel
    maxConcurrency: 5, // Number of concurrent puppeteer instances
    puppeteerOptions: { headless: false, defaultViewport: null },
  });

  const resultData = {};

  await cluster.task(async ({ page, data: { username, password } }) => {
    // const url = process.env.BASE;
    const url = "http://103.139.165.110:8080";
    // const rpUrl = process.env.RP;

    const CONSUMER_TRANS_FROM =
      "http://103.139.165.110:8080/consumer/cons_trans_from_reg.php";

    // const CONSUMER_PRODUCT=
    //   "http://103.139.165.110:8080/consumer/cons_prod_reg.php";

    // const CONSUMER_TRANS_THIS =
    //   "http://103.139.165.110:8080/consumer/cons_trans_to_reg.php";

    // const CONSUMER_SOLDOUT =
    //   "http://103.139.165.110:8080/consumer/cons_soldout_reg.php";

    await page.goto(url);

    await page.type(
      "div.form-group:nth-child(1) > div:nth-child(2) > input:nth-child(1)",
      username
    );
    await page.type(
      "div.form-group:nth-child(2) > div:nth-child(2) > input:nth-child(1)",
      password
    );

    await Promise.all([
      page.waitForNavigation(),
      page.click(".btn"),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);

    await page.goto(CONSUMER_TRANS_FROM);

    async function scrapePageData(page) {
      try {
        // ... existing scraping logic ...
        const tableData = await page.evaluate(() => {
          console.log("starting scrape");
          const headerRows = Array.from(
            document.querySelectorAll("table thead tr")
          );
          // console.log("header rows", headerRows);
          const headerData = headerRows.map((row) => {
            const cells = Array.from(row.querySelectorAll("th"));
            const data = cells.map((cell) => cell.textContent.trim());
            return data;
          });

          const bodyRows = Array.from(
            document.querySelectorAll("table tbody tr")
          );
          const bodyData = bodyRows.map((row) => {
            const cells = Array.from(row.querySelectorAll("td"));
            const data = cells.map((cell) => cell.textContent.trim());
            return data;
          });

          return [...headerData, ...bodyData];
        });
        // console.log(tableData);

        // const nextPageButton = await page.$(".pagination li.active + li a");
        // // Wait for the next page button to become available.
        // await Promise.all([
        //   new Promise((resolve) => setTimeout(resolve, 3000)),
        // ]);
        // const href = await page.evaluate(
        //   (element) => element.getAttribute("href"),
        //   nextPageButton
        // );

        // if (href) {
        //   console.log("Going to next page");
        //   await Promise.all([
        //     new Promise((resolve) => setTimeout(resolve, 2000)), // Adding a delay before navigation
        //     nextPageButton.click(),
        //   ]);
        //   const nextTableData = await scrapePageData(page);
        //   tableData.push(...nextTableData); // Append data from the next page
        // }

        return tableData;
      } catch (error) {
        console.error("An error occurred during scraping:", error);
        return []; // Return an empty array to indicate error
      }
    }
    const tableData = await scrapePageData(page);
    // console.log("final", tableData);
    console.log("completed" + username);
    resultData[username] = tableData;
  });

  for (const { username, password } of loginCredentials) {
    // console.log("running " + username);
    // const url = process.env.BASE;
    // console.log(url);
    cluster.queue({ username, password });
  }

  await cluster.idle();
  await cluster.close();

  // Save the collected data as a JSON file
  fs.writeFileSync(
    "json/CONSUMER_TRANS_FROM.json",
    JSON.stringify(resultData, null, 2)
  );
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("CONSUMER_TRANS_FROM");
  // for (const propertyName in resultData) {
  //   if (Array.isArray(resultData[propertyName])) {
  //     const nestedArray = resultData[propertyName];
  //     for (let i = 0; i < nestedArray.length; i++) {
  //       worksheet.addRow(nestedArray[i]);
  //     }
  //     // console.log(nestedArray);
  //   }
  // }

  // //   // Save the workbook to a file
  // const filePath = `excel/rp/rp.xlsx`;
  // await workbook.xlsx.writeFile(filePath);

  for (const { username } of loginCredentials) {
    if (resultData[username] && Array.isArray(resultData[username])) {
      const userData = resultData[username];
      for (let i = 0; i < userData.length; i++) {
        worksheet.addRow(userData[i]);
      }
    }
  }

  // Save the workbook to a file
  const filePath = `excel/CONSUMER_TRANS_FROM.xlsx`;
  await workbook.xlsx.writeFile(filePath);
})();
