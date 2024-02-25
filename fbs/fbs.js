document.addEventListener("DOMContentLoaded", () => {
  const jsonDisplay = document.getElementById("json-display");
  const selectOption = document.getElementById("branch");
  const loading = document.getElementById("loading");
  const refreshForm = document.getElementById("refresh");
  const dateInput = document.getElementById("date");
  let date = dateInput.value;

  if (!date) {
    const today = new Date().toISOString().slice(0, 10);
    dateInput.value = today;
  }
  const fetchData = async () => {
    loading.classList.remove("hidden");
    loading.classList.add("loading");
    jsonDisplay.innerHTML = "";
    fetch("http://localhost:3000/api/fbs")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data);
        loading.classList.remove("loading");

        // Loop through loginCredentials usernames
        for (const key in data) {
          // Check if the username exists in the data
          if (data[key]) {
            jsonDisplay.innerHTML += `<p>${data[key].report_view}</p><br>`;
            selectOption.innerHTML += `<option value="${key}">${data[key].branch_info.name}</option>`;
            //   selectOption.innerHTML += `<option value="${key}">${data[key].branch_data.name}</option>`;
          } else {
            jsonDisplay.innerHTML += `<p>No data found for username: ${key}</p><br>`;
          }
        }
      })
      .finally(() => {})
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
    loading.classList.add("hidden");
  };

  fetchData();
  // console.log("jsonData", data);
  function searchName() {
    const selectedValue = selectOption.value;
    // console.log(selectedValue);
    if (selectedValue) {
      function getBranchData() {
        fetch("http://localhost:3000/api/fbs")
          .then((response) => response.json())
          .then((data) => {
            // Check if the username exists in the data
            if (data[selectedValue]) {
              jsonDisplay.innerHTML = `<p>${data[selectedValue].report_view}</p><br>`;
            } else {
              jsonDisplay.innerHTML = `<p>No data found for username: ${key}</p><br>`;
            }

            // loading.classList.add("hidden");
          })
          .catch((error) => {
            console.error("Error fetching JSON:", error),
              (errorDiv.innerHTML = `<div class='error'>${error}</div>`);
            loading.classList.add("hidden");
          });
      }
      getBranchData();
    } else {
      fetchData();
    }
  }
  selectOption.addEventListener("change", searchName);
  async function refreshData(e) {
    e.preventDefault();
    const date = dateInput.value;
    loading.classList.remove("hidden");
    loading.classList.add("loading");
    try {
      const response = await fetch("http://localhost:3000/api/scraping/fbs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toDate: date }),
      });
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

  refreshForm.addEventListener("submit", refreshData);
});
