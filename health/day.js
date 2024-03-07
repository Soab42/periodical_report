document.addEventListener("DOMContentLoaded", () => {
  const showData = document.getElementById("showData");
  const button = document.getElementById("click");
  //   const selectOption = document.getElementById("branch");

  async function fetchReport() {
    const data = await fetch("http://localhost:3000/api/health/day");
    let dayData = await data.json();
    // console.log(RpData);
    // console.log(button);
    button.addEventListener("click", async () => {
      console.log("clicked");
      const data = await fetch("http://localhost:3000/api/scraping/day", {
        method: "POST",
        // Additional options like headers, body, etc. can be added here
      });
      const Data = await data.json();
      dayData = Data.data;
      fetchReport();
    });
    let html = "";
    let sl = 0;

    let branchName = Object.keys(dayData)[0];

    html += `<tr style='font-size:1.2rem; width:10rem'>
    <th colspan='2'>Health Software Working Date</th>
    <th></th>
    <th>Reporting Date: ${dayData[branchName].reportingDate.slice(0, 10)}</th>
    </tr>
    <tr style='font-size:1.2rem; width:10rem'>
    <th>sl</th>
    <th>Branch Name</th>
    <th>Software Working Day</th>
    <th>Lag Day</th>
    
    </tr>`;

    for (branch in dayData) {
      // console.log(dayData);
      const branchData = dayData[branch];

      const date1 = new Date(branchData.workingDate);
      const date2 = new Date(); // This will take today's date
      // console.log(data);
      // Calculate the difference in milliseconds
      const differenceInMilliseconds = date2 - date1;

      // Convert milliseconds to days
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      sl++;
      html += `<tr style="width:10rem;background: ${
        differenceInDays >= 5
          ? "#FC819E"
          : differenceInDays >= 3
          ? "#F6FDC3"
          : "#A5DD9B"
      }; font-size:1.5rem;">
          <td>${sl}</td>
          <td>${branchData.branchName}</td>
          <td>${branchData.workingDate}</td>
          <td >${Math.floor(differenceInDays)}</td>

          </tr>`;

      //   console.log(RpData[branch]);
    }

    showData.innerHTML = html;
  }
  fetchReport();
});
