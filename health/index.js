// document.addEventListener("DOMContentLoaded", () => {
//   const showData = document.getElementById("showData");
//   const selectOption = document.getElementById("branch");

//   async function fetchReport() {
//     const datas = await fetch("http://localhost:3000/api/health/rp");
//     const RpData = await datas.json();
//     // console.log(RpData);
//     let html = "";

//     for (branch in RpData) {
//       html += `<table>`;
//       html += `<tr><th colspan='5' class="branch">${branch}</th></tr>`;
//       selectOption.innerHTML += `<option value="${branch}">${branch}</option>`;
//       RpData[branch].map((data) => {
//         // console.log(data);
//         html += `<tr>`;
//         html +=
//           data[0] == "Payments" ? `<td>-</td>` : `<td>${data[0] || "-"}</td>`;
//         html += `<td class="description">${data[1] || "-"}</td>
//         <td class="tMonth">${data[2] || "-"}</td>
//         <td class="tYear">${data[3] || "-"}</td>
//         <td class="cumulative">${data[4] || "-"}</td>
//         </tr>`;
//       });
//       html += `</table>`;
//       //   console.log(RpData[branch]);
//     }

//     showData.innerHTML = html;
//   }
//   fetchReport();
// });
document.addEventListener("DOMContentLoaded", () => {
  const showData = document.getElementById("showData");
  const selectOption = document.getElementById("branch");

  let RpData = {};

  async function fetchReport() {
    const response = await fetch("http://localhost:3000/api/health/rp");
    RpData = await response.json();
    populateSelectOptions(RpData);
    displayData();
  }

  function populateSelectOptions(data) {
    selectOption.innerHTML = '<option value="all">All</option>';
    for (const branch in data) {
      selectOption.innerHTML += `<option value="${branch}">${branch}</option>`;
    }
  }

  function displayData() {
    let html = "";
    const selectedBranch = selectOption.value;

    for (const branch in RpData) {
      if (selectedBranch === "all" || selectedBranch === branch) {
        html += `<table>`;
        html += `<tr><th colspan='5' class="branch">${branch}</th></tr>`;
        RpData[branch].forEach((data) => {
          html += `<tr>`;
          html +=
            data[0] == "Payments" ? `<td>-</td>` : `<td>${data[0] || "-"}</td>`;
          html += `<td class="description">${data[1] || "-"}</td>
                   <td class="tMonth">${data[2] || "-"}</td>
                   <td class="tYear">${data[3] || "-"}</td>
                   <td class="cumulative">${data[4] || "-"}</td>
                   </tr>`;
        });
        html += `</table>`;
      }
    }

    showData.innerHTML = html;
  }

  selectOption.addEventListener("change", displayData);

  fetchReport();
});
