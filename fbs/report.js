document.addEventListener("DOMContentLoaded", () => {
  const jsonDisplay = document.getElementById("json-display");
  const selectOption = document.getElementById("branch");

  let jsonData;

  const fetchData = async () => {
    try {
    } catch (error) {}
    fetch("http://localhost:3000/api/fbs")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data);
        jsonDisplay.innerHTML = "<br></br>";
        jsonData = data;
        // Loop through loginCredentials usernames
        for (const key in data) {
          // console.log("key", key);
          const value = data[key];
          // console.log(value);
          // Check if the username exists in the data

          if (Array.isArray(value.fdr_info)) {
            jsonDisplay.innerHTML += value.fdr_info
              ?.map(
                (item, i) => `
               <tr>
               <td>${i + 1}</td>
                 <td><a href='member.html?id=${item.id}' >${item.id}</a></td>
                 <td>${value.branch_info.name}-${item.branch_id}</td>
                 <td>${item.code}</td>
                 <td>${item.member_id}</td>
        
                 <td>${item.weekly_savings}</td>
                 <td>${item.interest_rate}</td>
                 <td>${item.opening_date}</td>
                 <td>${item.period}</td>
                 <td>${item.closing_date || ""}</td>
                 <td>${item.payable_amount}</td>
                 <td>${item.samity_code}</td>
                 <td>${item.current_status}</td>
                 <td>${item.member_name}</td>
                 <td>${item.member_code}</td>
                 <td>${item.marital_status}</td>
                 <td>${item.fathers_name}</td>
                 <td>${item?.spouse_name || ""}</td>
                 <td>${item?.nominee_info[0]?.name || ""}</td>
                 <td>${item?.nominee_info[0]?.relation || ""}</td>
                 <td>${item?.nominee_info[0]?.share || ""}</td>
                 <td>${item.mobile_no}</td>
                 <td>${item.member_present_address}</td>
                 <td>${item.member_permanent_address}</td>
                 <td>${item.mature_date}</td>
                 <td>${item.cheque_no}</td>
                 <td>${item.total_interest_amount}</td>
               </tr>
             `
              )
              .join(" ");
            selectOption.innerHTML += `<option value="${key}">${data[key].branch_info.name}</option>`;
            jsonDisplay.innerHTML += `<br></br>`;
          } else {
            jsonDisplay.innerHTML += `<tr > <th colspan="28" style="padding:10px">No data found for : ${key} Branch</th></tr><br></br> `;
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
            const value = data[selectedValue];
            // console.log(value);

            if (Array.isArray(value.fdr_info)) {
              jsonDisplay.innerHTML = value.fdr_info
                ?.map(
                  (item, i) => `<tr>
                  <td>${i + 1}</td>
                   <td><a href='member.html?id=${item.id}' >${item.id}</a></td>
                   <td>${value.branch_info.name}-${item.branch_id}</td>
                   <td>${item.code}</td>
                   <td>${item.member_id}</td>
                   <td>${item.weekly_savings}</td>
                   <td>${item.interest_rate}</td>
                   <td>${item.opening_date}</td>
                   <td>${item.period}</td>
                   <td>${item.closing_date || ""}</td>
                   <td>${item.payable_amount}</td>
                   <td>${item.samity_code}</td>
                   <td>${item.current_status}</td>
                   <td>${item.member_name}</td>
                   <td>${item.member_code}</td>
                   <td>${item.marital_status}</td>
                   <td>${item.fathers_name}</td>
                   <td>${item?.spouse_name || ""}</td>
                   <td>${item?.nominee_info[0]?.name || ""}</td>
                   <td>${item?.nominee_info[0]?.relation || ""}</td>
                   <td>${item?.nominee_info[0]?.share || ""}</td>
                   <td>${item.mobile_no}</td>
                   <td>${item.member_present_address}</td>
                   <td>${item.member_permanent_address}</td>
                   <td>${item.mature_date}</td>
                   <td>${item.cheque_no}</td>
                   <td>${item.total_interest_amount}</td>
                 </tr>
               `
                )
                .join(" ");
            } else {
              jsonDisplay.innerHTML = `<td>No data found for username: ${key}</td>`;
            }

            // loading.classList.add("hidden");
          })
          .catch((error) => {
            console.error("Error fetching JSON:", error);
          });
      }
      getBranchData();
    } else {
      fetchData();
    }
  }
  selectOption.addEventListener("change", searchName);
});
