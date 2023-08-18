import { Cluster } from "puppeteer-cluster";
import * as fs from "fs";
import { loginCredentials } from "./credentials.js";

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT, // Run in parallel
    maxConcurrency: 5, // Number of concurrent puppeteer instances
    puppeteerOptions: { headless: false },
  });

  const resultData = {};

  await cluster.task(async ({ page, data: { username, password } }) => {
    // const url = process.env.BASE_URl;
    const url = "http://103.139.165.110:8080";
    // const rpUrl = process.env.RP_URL;
    const rpUrl = `http://103.139.165.110:8080/accounts/rec_pay.php?from=2023-01-01&to=2023-01-31&but_search=search`;

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

    await page.goto(rpUrl);

    const tableData = await page.evaluate(() => {
      const headerRows = Array.from(
        document.querySelectorAll("table thead tr")
      );
      const headerData = headerRows.map((row) => {
        const cells = Array.from(row.querySelectorAll("th, td"));
        const data = cells.map((cell) => cell.textContent.trim());
        return data[1] && { [data[1].replace(/ /g, "_")]: data[4] };
      });

      const bodyRows = Array.from(document.querySelectorAll("table tbody tr"));
      const bodyData = bodyRows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        const data = cells.map((cell) => cell.textContent.trim());
        return data[1] && { [data[1].replace(/ /g, "_")]: data[4] };
      });

      return [...headerData, ...bodyData];
    });

    console.log("completed" + username);
    resultData[username] = tableData;
  });

  for (const { username, password } of loginCredentials) {
    // console.log("running " + username);
    // const url = process.env.BASE_URl;
    // console.log(url);
    cluster.queue({ username, password });
  }

  await cluster.idle();
  await cluster.close();

  // Save the collected data as a JSON file
  fs.writeFileSync("cumulative.json", JSON.stringify(resultData, null, 2));
})();
