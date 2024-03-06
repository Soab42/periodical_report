document.addEventListener("DOMContentLoaded", () => {
  const showData = document.getElementById("showData");
  const selectOption = document.getElementById("branch");

  async function fetchReport() {
    const datas = await fetch("http://localhost:3000/api/health/rp");
    const RpData = await datas.json();
    // console.log(RpData);
    let html = "";

    for (branch in RpData) {
      html += `<br></br><tr><th colspan='5'>${branch}</th></tr>`;
      html += `<tr></tr>`;
      selectOption.innerHTML += `<option value="${branch}">${branch}</option>`;
      RpData[branch].map((data) => {
        // console.log(data);

        html += `<tr>
        <td>${data[0]}</td>
        <td>${data[1]}</td>
        <td>${data[2]}</td>
        <td>${data[3]}</td>
        <td>${data[4]}</td>
        </tr>`;
      });

      //   console.log(RpData[branch]);
    }

    showData.innerHTML = html;
  }
  fetchReport();
});
