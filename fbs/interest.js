document.addEventListener("DOMContentLoaded", () => {
  const jsonDisplay = document.getElementById("json-display");
  const inputDate = document.getElementById("date");
  const buttonDate = document.getElementById("dateBtn");
  const dateSpan = document.getElementById("todaysDate");
  let date = inputDate.value;

  const fetchData = async (today) => {
    dateSpan.innerHTML = today;
    date = today;
    try {
    } catch (error) {}
    fetch(`http://localhost:3000/api/fbs/interest/${today}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          data.forEach((item) => {
            const todaysPayable = item?.saving_schedules?.filter(
              (entry) => entry.date === today
            );
            console.log(todaysPayable);
            return (jsonDisplay.innerHTML = `<tr>
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
        } else {
          jsonDisplay.innerHTML = `<tr ><th colspan="11" rowspan="12" style="background:pink; height:20rem; font-size:5rem;color:black; text-align:center">No Payment Today 😊!</th></tr>`;
        }
      })
      .finally(() => {})
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  };
  if (!date) {
    const today = new Date().toISOString().slice(0, 10);
    fetchData(today);
  }

  buttonDate.addEventListener("click", () => {
    fetchData(inputDate.value);
    // fetchData();
  });
});
