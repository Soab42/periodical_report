document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const jsonDisplay = document.getElementById("json-display");
  const inputDate = document.getElementById("date");
  const buttonDate = document.getElementById("dateBtn");
  const dateSpan = document.getElementById("todaysDate");
  const refreshBtn = document.getElementById("refresh");
  let date = inputDate.value;

  const fetchData = async (today) => {
    loading.classList.remove("hidden");
    loading.classList.add("loading");
    dateSpan.innerHTML = today;
    date = today;

    fetch(`http://localhost:3000/api/fbs/interest/${today}`)
      .then((response) => response.json())
      .then((data) => {
        jsonDisplay.innerHTML = "";

        // console.log(data);
        if (data.length > 0) {
          data.forEach((item) => {
            const todaysPayable = item?.saving_schedules?.filter(
              (entry) => entry.date === today
            );
            // console.log(todaysPayable);
            return (jsonDisplay.innerHTML += `<tr>
              <td>${item.row.id}</td>
              <td>${item.row.branch_id}</td>
              <td>${item.row.member_info}</td>
              <td>${item.row.code}</td>
         
              <td>${item.row.deposit_scheme_number}</td>
              <td>${item.row.opening_date}</td>
              <td>${item.row.period}</td>
              <td>${item.row.current_status}</td>
              <td>${todaysPayable[0].date}</td>
              <td>${todaysPayable[0].amount}</td>
              <td>${todaysPayable[0].installment_number}</td>
      
          
              </tr>`);
          });
          loading.classList.add("hidden");
        } else {
          jsonDisplay.innerHTML = `<tr><td colspan="11" rowspan="12" style="height:20rem;background:white; font-size:5rem;color:black; text-align:center">No Payment Today 😊!</td></tr>`;
        }
      })
      .finally(() => {})
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  };
  if (!date) {
    const today = new Date().toISOString().slice(0, 10);
    inputDate.value = today;
    fetchData(today);
  }

  buttonDate.addEventListener("click", () => {
    fetchData(inputDate.value);
    // fetchData();
  });

  async function refreshData() {
    loading.classList.remove("hidden");
    loading.classList.add("loading");
    try {
      const response = await fetch(
        "http://localhost:3000/api/scraping/fbs_interest"
      );
      if (response.ok) {
        loading.classList.add("hidden");

        console.log("Scraping request sent successfully");
      } else {
        console.error("Failed to send scraping request");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  refreshBtn.addEventListener("click", refreshData);
});
