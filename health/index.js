document.addEventListener("DOMContentLoaded", () => {
  const showData = document.getElementById("showData");
  const selectOption = document.getElementById("branch");

  async function fetchReport() {
    const datas = await fetch("http://localhost:3000/api/health/rp");
    const RpData = await datas.json();
    // console.log(RpData);
    let html = "";

    for (branch in RpData) {
      html += `<table>`;
      html += `<tr><th colspan='5' class="branch">${branch}</th></tr>`;
      selectOption.innerHTML += `<option value="${branch}">${branch}</option>`;
      RpData[branch].map((data) => {
        // console.log(data);
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
      //   console.log(RpData[branch]);
    }

    showData.innerHTML = html;
  }
  fetchReport();
});
