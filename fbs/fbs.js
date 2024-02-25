document.addEventListener("DOMContentLoaded", () => {
  const jsonDisplay = document.getElementById("json-display");
  const selectOption = document.getElementById("branch");

  const fetchData = async () => {
    try {
    } catch (error) {}
    fetch("http://localhost:3000/api/fbs")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data);

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
});
