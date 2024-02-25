import { Cluster } from "puppeteer-cluster";
import * as fs from "fs";
import { loginCredentials } from "./credentials.js";
import ExcelJs from "exceljs";
(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT, // Run in parallel
    maxConcurrency: 5, // Number of concurrent puppeteer instances
    puppeteerOptions: {
      headless: "new",
      defaultViewport: null,
    },
  });

  await cluster.task(async ({ page, data: { username, password } }) => {
    // const url = process.env.BASE;
    const url = "http://103.139.165.110:8080";
    // const rpUrl = process.env.RP;

    const dayEnd = "http://103.139.165.110:8080/day_end_process.php";

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

    await page.goto(dayEnd);

    try {
      const numberOfClicks = 100; // Replace with the desired number of clicks

      for (let i = 0; i < numberOfClicks; i++) {
        const anchorElement = await page.$("a.glyphicon.glyphicon-trash"); // Select the anchor element

        if (anchorElement) {
          const tdElement = await page.$(
            'td[style="padding: 2px; font-size: 12px; text-align: center;"]'
          );

          const tdText = await page.evaluate(
            (element) => element.textContent,
            tdElement
          );
          // console.log("NextDay:", tdText.trim());
          await anchorElement.click(); // Click on the anchor element
          // console.log("click", i + 1);
        } else {
          console.log("Anchor element not found.");
        }
        await page.waitForTimeout(1000); // Add a delay between clicks (1 second in this example)
      }
    } catch (error) {
      console.error("An error occurred during scraping:", error);
    }
  });

  for (const { username, password } of loginCredentials) {
    // console.log("running " + username);
    // const url = process.env.BASE;
    // console.log(url);
    cluster.queue({ username, password });
  }

  await cluster.idle();
  await cluster.close();

  // // Save the collected data as a JSON file
  // fs.writeFileSync(
  //   "json/dayEnd.json",
  //   JSON.stringify(resultData, null, 2)
  // );
  // const workbook = new ExcelJs.Workbook();
  // const worksheet = workbook.addWorksheet("dayEnd");
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
  // const filePath = "excel/dayEnd.xlsx";
  // await workbook.xlsx.writeFile(filePath);
})();
