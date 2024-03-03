document.addEventListener("DOMContentLoaded", () => {
  const jsonDisplay = document.getElementById("json-display");
  const selectOption = document.getElementById("branch");

  let jsonData;
  let total_data = { count: 0, amount: 0 };
  let branch_total_data = {};
  const getMarriedStatus = (status) => {
    switch (status) {
      case "M":
        return "Married";
      case "S":
        return "Single";
      // Add more cases as needed
      default:
        break;
    }
  };
  const fetchData = async () => {
    fetch("http://localhost:3000/api/fbs")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data);
        jsonDisplay.innerHTML = "<br></br>";
        jsonData = data;
        let sl = 0;
        // Loop through loginCredentials usernames
        for (const key in data) {
          // console.log("key", key);
          const value = data[key];
          // console.log(value);
          // Check if the username exists in the data

          if (Array.isArray(value.fdr_info)) {
            jsonDisplay.innerHTML += value.fdr_info
              ?.map((item, i) => {
                sl++;
                total_data["count"]++;
                total_data["amount"] += Number(item.weekly_savings);
                // Check if the branch name exists in branch_total_data
                if (!branch_total_data[value.branch_info.name]) {
                  // If not, initialize a new object for that branch
                  branch_total_data[value.branch_info.name] = {
                    count: 0,
                    amount: 0,
                  };
                }
                branch_total_data[value.branch_info.name]["count"]++;
                branch_total_data[value.branch_info.name]["amount"] += Number(
                  item.weekly_savings
                );
                return `
               <tr>
               <td>${sl}</td>
                 <td><a href='member.html?id=${item.id}' >${item.id}</a></td>
                 <td>${value.branch_info.name}</td>
                 <td>${item.code}</td>
                 <td>${item.member_name}</td>
                 <td>${item.member_code}</td>
                 <td>${item.weekly_savings}</td>
                 <td>${item.interest_rate}</td>
                 <td>${item.opening_date}</td>
                 <td>${item.period}</td>
                 <td>${item.closing_date || ""}</td>
                 <td>${item.payable_amount}</td>
                 <td>${item.current_status}</td>
              
                 <td>${getMarriedStatus(item.marital_status)}</td>
                 <td>${item.fathers_name}</td>
                 <td>${item?.nominee_info[0]?.name || ""}</td>
                 <td>${item?.nominee_info[0]?.relation || ""}</td>
                 <td>${item?.nominee_info[0]?.share || ""}</td>
                 <td>${item.mobile_no}</td>
                 <td>${item.member_present_address}</td>
                 <td>${item.member_permanent_address}</td>
                 <td>${item.mature_date}</td>
                 <td>${item.cheque_no}</td>
                 <td style=" width:4rem; height:2rem ;">
                 <a href='member.html?id=${
                   item.id
                 }' style="font-size: .9rem; font-weight:bold">
                 👁️ View
             </a>
                </td>



               </tr>
             `;
              })
              .join(" ");
            selectOption.innerHTML += `<option value="${key}">${data[key].branch_info.name}</option>`;
            jsonDisplay.innerHTML += `<tr style=''>
            <th colspan='5'>${data[key].branch_info.name} Total</th>
            <th>${branch_total_data[value.branch_info.name]["count"]}</th>
            <th>${branch_total_data[value.branch_info.name][
              "amount"
            ].toLocaleString("en-IN")}</th>
            <th colspan='20'></th>
            </tr>`;
          } else {
            jsonDisplay.innerHTML += `<tr > <td colspan="28" style="padding:10px">No data found for : ${key} Branch</td></tr> `;
          }
        }
        jsonDisplay.innerHTML += `<tr style=''>
        <th colspan='5'>Zone Total</th>
        <th>${total_data["count"]}</th>
        <th>${total_data["amount"].toLocaleString("en-IN")}</th>
        <th colspan='20'></th>
        </tr>`;
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
                   <td>${value.branch_info.name}</td>
                   <td>${item.code}</td>
                   <td>${item.member_name}</td>
                   <td>${item.member_code}</td>
                   <td>${item.weekly_savings}</td>
                   <td>${item.interest_rate}</td>
                   <td>${item.opening_date}</td>
                   <td>${item.period}</td>
                   <td>${item.closing_date || ""}</td>
                   <td>${item.payable_amount}</td>
                   <td>${item.current_status}</td>
                 
                   <td>${getMarriedStatus(item.marital_status)}</td>
                   <td>${item.fathers_name}</td>
                   <td>${item?.nominee_info[0]?.name || ""}</td>
                   <td>${item?.nominee_info[0]?.relation || ""}</td>
                   <td>${item?.nominee_info[0]?.share || ""}</td>
                   <td>${item.mobile_no}</td>
                   <td>${item.member_present_address}</td>
                   <td>${item.member_permanent_address}</td>
                   <td>${item.mature_date}</td>
                   <td>${item.cheque_no}</td>
                   <td style=" width:4rem; height:2rem ;">
                   <a href='member.html?id=${
                     item.id
                   }' style="font-size: .9rem; font-weight:bold">
                   👁️ View
               </a>
                  </td>
                 </tr>
               `
                )
                .join(" ");
            } else {
              jsonDisplay.innerHTML = `<td>No data found for username: ${key}</td>`;
            }
            jsonDisplay.innerHTML += `<tr style=''>
            <th colspan='4'></th>
            <th>${branch_total_data[value.branch_info.name]["count"]}</th>
            <th>${branch_total_data[value.branch_info.name][
              "amount"
            ].toLocaleString("en-IN")}</th>
            <th colspan='21'></th>
            </tr>`;
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
