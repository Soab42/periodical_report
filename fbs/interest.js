document.addEventListener("DOMContentLoaded", async () => {
  const loading = document.getElementById("loading");
  const jsonDisplay = document.getElementById("json-display");
  const inputDate = document.getElementById("date");
  const buttonDate = document.getElementById("dateBtn");
  const dateSpan = document.getElementById("todaysDate");
  const refreshBtn = document.getElementById("refresh");
  let date = inputDate.value;
  let branchInfo = [];
  const branchData = await fetch("http://localhost:3000/api/branch/info")
    .then((response) => response.json())
    .then((data) => {
      branchInfo = data.branches_info;
      // console.log(data); // Log the fetched data here
      return data.branches_info; // If you need to return the data for further processing
    })
    .catch((error) => {
      console.error("Error fetching branch data:", error);
    });
  // console.log(branchInfo);

  function getBranchName(id) {
    console.log(branchInfo);
    const branch = branchInfo.filter((b) => b.branch_id === id);
    return branch[0].branch_name;
  }

  const getStatus = (status) => {
    switch (status) {
      case "A":
        return "Active";
      case "C":
        return "Closed";
      // Add more cases as needed
      default:
        return "Expired";
    }
  };

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
              <td class='member'><a href='member.html?id=${item.row.id}' >${
              item.row.id
            }</a></td>
              <td>${getBranchName(item.row.branch_id)}</td>
              <td>${item.row.member_info}</td>
              <td>${item.row.code}</td>
         
              <td>${item.row.deposit_scheme_number}</td>
              <td>${item.row.opening_date}</td>
              <td>${item.row.period}</td>
              <td>${getStatus(item.row.current_status)}</td>
              <td>${todaysPayable[0].date}</td>
              <td>${todaysPayable[0].amount}</td>
              <td>${todaysPayable[0].installment_number}</td>
      
          
              </tr>`);
          });
          loading.classList.add("hidden");
        } else {
          jsonDisplay.innerHTML = `<tr><td colspan="11" rowspan="12" style="height:20rem;background:white; font-size:5rem;color:black; text-align:center">No Payment Today 😊!</td></tr>`;
          loading.classList.add("hidden");
        }
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
        loading.classList.add("hidden");
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
        loading.classList.add("hidden");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      loading.classList.add("hidden");
    }
  }
  refreshBtn.addEventListener("click", refreshData);
});
