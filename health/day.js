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
    html += `<tr style='font-size:1.5rem'>
    <th>sl</th>
    <th>Branch Name</th>
    <th>Working Day</th>
    <th>Lag Day</th>
    
    </tr>`;

    for (branch in dayData) {
      dayData[branch].map((data) => {
        // console.log(data);
        // Define the two dates
        const date1 = new Date(data[1]);
        const date2 = new Date(); // This will take today's date

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = date2 - date1;

        // Convert milliseconds to days
        const differenceInDays =
          differenceInMilliseconds / (1000 * 60 * 60 * 24);
        sl++;
        html += `<tr style="background: ${
          differenceInDays > 5 ? "#FC819E" : "#A5DD9B"
        }; font-size:1.5rem;">
          <td>${sl}</td>
          <td>${data[0]}</td>
          <td>${data[1]}</td>
          <td >${Math.floor(differenceInDays)}</td>
         
          </tr>`;
      });

      //   console.log(RpData[branch]);
    }

    showData.innerHTML = html;
  }
  fetchReport();
});
