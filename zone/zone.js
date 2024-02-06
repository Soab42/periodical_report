const jsonDisplay = document.querySelector("tbody");
const agrogotiDisplay = document.getElementById("agrogoti");
const container = document.getElementById("container");
const infoDiv = document.getElementById("info");
const total_periodical_progress_information = [];
let serialNumber = 1;
let serialNumber2 = 1;
let totalData;
const fetchData = async () => {
  try {
  } catch (error) {}
  fetch("http://localhost:3000/api/data")
    .then((response) => response.json())
    .then((data) => {
      showDataTable(data);
      showAgrogoti(data);
    })
    .finally(() => {
      showTotalRow();
      showAgrogotiTotalRow();
      // console.log(totalRow);
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
      container.innerHTML = `<div class="error">${error.message}</div>`;
    });
};

fetchData();

//   getDataButton.addEventListener("click", fetchData);

function showDataTable(data) {
  // Display JSON data in HTML
  // console.log(data);
  const firstData = data[Object.keys(data)[0]];
  infoDiv.innerHTML = `<div>${firstData.title}</div><div>Report Date: ${firstData.date_from} to ${firstData.date_to}</div>`;
  for (const key in data) {
    const userData = data[key];

    const {
      members = {},
      savings = {},
      loans = {},
    } = userData?.periodical_progress_data?.total_periodical_progress_info;
    if ((members, savings, loans)) {
      total_periodical_progress_information.push({
        ...members,
        ...savings,
        ...loans,
      });
    }

    // Check if the username exists in the data
    if (data[key]) {
      jsonDisplay.innerHTML += `<tr>
            <td>${serialNumber}</td>
            <td>${userData.branch_data.name}</td>
            <td>${userData.branch_data.code}</td>
            <td>${members.member_count_previous}</td>
            <td>${members.member_count_current}</td>
            <td>${savings.savings_balance_previous}</td>
            <td>${savings.savings_balance_current}</td>
            <td>${loans.loan_outstanding_principal_previous.toFixed(2)}</td>
            <td>${loans.loan_outstanding_principal_current.toFixed(2)}</td>
            <td>${loans.previous_borrower_member}</td>
            <td>${loans.current_borrower_member}</td>

            <td>${loans.principal_due_count_previous}</td>
            <td>${loans.principal_due_previous.toFixed(2)}</td>

            <td>${loans.current_expired_borrower_count_previous}</td>
            <td>${loans.current_expired_principal_amount_previous.toFixed(
              2
            )}</td>
            <td>${loans.due_expired_principal_borrower_count_previous}</td>
            <td>${loans.due_expired_amount_principal_previous.toFixed(2)}</td>
            <td>${loans.principal_due_count_current}</td>
            <td>${loans.principal_due_current.toFixed(2)}</td>
            <td>${loans.current_expired_borrower_count_current}</td>
            <td>${loans.current_expired_principal_amount_current.toFixed(
              2
            )}</td>


            <td>${loans.due_expired_principal_borrower_count_current}</td>
            <td>${loans.due_expired_amount_principal_current.toFixed(2)}</td>

            <td>${loans.OTR_principal.toFixed(2)}</td>
            <td>${loans.PRA_priciple.toFixed(2)}</td>
            <td>${loans.principle_recoverable.toFixed(2)}</td>
            <td>${loans.principle_regular_recovery.toFixed(2)}</td>

            </tr>`;
      serialNumber++;
    } else {
      jsonDisplay.innerHTML += `<tr><td colSpan="3">
            No data found for username: ${username}</td></tr>`;
    }
  }
}

function showTotalRow() {
  const totalRow = total_periodical_progress_information.reduce((acc, curr) => {
    // console.log(acc);
    acc.member_count_previous = checkInitialData(
      acc.member_count_previous,
      curr.member_count_previous
    );
    acc.member_count_current = checkInitialData(
      acc.member_count_current,
      curr.member_count_current
    );
    acc.savings_balance_previous = checkInitialData(
      acc.savings_balance_previous,
      curr.savings_balance_previous
    );
    acc.savings_balance_current = checkInitialData(
      acc.savings_balance_current,
      curr.savings_balance_current
    );
    acc.loan_outstanding_principal_previous = checkInitialData(
      acc.loan_outstanding_principal_previous,
      curr.loan_outstanding_principal_previous
    );
    acc.loan_outstanding_principal_current = checkInitialData(
      acc.loan_outstanding_principal_current,
      curr.loan_outstanding_principal_current
    );
    acc.previous_borrower_member = checkInitialData(
      acc.previous_borrower_member,
      curr.previous_borrower_member
    );
    acc.current_borrower_member = checkInitialData(
      acc.current_borrower_member,
      curr.current_borrower_member
    );
    acc.principal_due_count_previous = checkInitialData(
      acc.principal_due_count_previous,
      curr.principal_due_count_previous
    );
    acc.principal_due_previous = checkInitialData(
      acc.principal_due_previous,
      curr.principal_due_previous
    );
    acc.current_expired_borrower_count_previous = checkInitialData(
      acc.current_expired_borrower_count_previous,
      curr.current_expired_borrower_count_previous
    );
    acc.current_expired_principal_amount_previous = checkInitialData(
      acc.current_expired_principal_amount_previous,
      curr.current_expired_principal_amount_previous
    );
    acc.due_expired_principal_borrower_count_previous = checkInitialData(
      acc.due_expired_principal_borrower_count_previous,
      curr.due_expired_principal_borrower_count_previous
    );
    acc.due_expired_amount_principal_previous = checkInitialData(
      acc.due_expired_amount_principal_previous,
      curr.due_expired_amount_principal_previous
    );
    acc.principal_due_count_current = checkInitialData(
      acc.principal_due_count_current,
      curr.principal_due_count_current
    );
    acc.principal_due_current = checkInitialData(
      acc.principal_due_current,
      curr.principal_due_current
    );
    acc.current_expired_borrower_count_current = checkInitialData(
      acc.current_expired_borrower_count_current,
      curr.current_expired_borrower_count_current
    );
    acc.current_expired_principal_amount_current = checkInitialData(
      acc.current_expired_principal_amount_current,
      curr.current_expired_principal_amount_current
    ); // Check the typo in the) original line
    acc.due_expired_principal_borrower_count_current = checkInitialData(
      acc.due_expired_principal_borrower_count_current,
      curr.due_expired_principal_borrower_count_current
    );
    acc.due_expired_amount_principal_current = checkInitialData(
      acc.due_expired_amount_principal_current,
      curr.due_expired_amount_principal_current
    );
    acc.OTR_principal = checkInitialData(acc.OTR_principal, curr.OTR_principal);

    acc.PRA_priciple = checkInitialData(acc.PRA_priciple, curr.PRA_priciple); // Check the typo in the original) lineacc.
    acc.principle_recoverable = checkInitialData(
      acc.principle_recoverable,
      curr.principle_recoverable
    );
    acc.principle_regular_recovery = checkInitialData(
      acc.principle_regular_recovery,
      curr.principle_regular_recovery
    );
    return acc;
  }, {});
  totalData = totalRow;
  jsonDisplay.innerHTML += `<tr class='totalRow'>
      <td colspan='3'>Total</td>
      <td>${totalRow.member_count_previous}</td>
      <td>${totalRow.member_count_current}</td>
      <td>${totalRow.savings_balance_previous}</td>
      <td>${totalRow.savings_balance_current}</td>
      <td>${totalRow.loan_outstanding_principal_previous.toFixed(2)}</td>
      <td>${totalRow.loan_outstanding_principal_current.toFixed(2)}</td>
      <td>${totalRow.previous_borrower_member}</td>
      <td>${totalRow.current_borrower_member}</td>

      <td>${totalRow.principal_due_count_previous}</td>
      <td>${totalRow.principal_due_previous.toFixed(2)}</td>

      <td>${totalRow.current_expired_borrower_count_previous}</td>
      <td>${totalRow.current_expired_principal_amount_previous.toFixed(2)}</td>
      <td>${totalRow.due_expired_principal_borrower_count_previous}</td>
      <td>${totalRow.due_expired_amount_principal_previous.toFixed(2)}</td>
      <td>${totalRow.principal_due_count_current}</td>
      <td>${totalRow.principal_due_current.toFixed(2)}</td>
      <td>${totalRow.current_expired_borrower_count_current}</td>
      <td>${totalRow.current_expired_principal_amount_current.toFixed(2)}</td>


      <td>${totalRow.due_expired_principal_borrower_count_current}</td>
      <td>${totalRow.due_expired_amount_principal_current.toFixed(2)}</td>

      <td>${(totalRow.OTR_principal / serialNumber).toFixed(2)}</td>
      <td>${(totalRow.PRA_priciple / serialNumber).toFixed(2)}</td>
      <td>${totalRow.principle_recoverable.toFixed(2)}</td>
      <td>${totalRow.principle_regular_recovery.toFixed(2)}</td>

      </tr>`;
  jsonDisplay.innerHTML += calculateChanges(totalRow);
}
function calculateChanges(totalRow) {
  const memberCount =
    totalRow.member_count_current - totalRow.member_count_previous;

  const savings_balance =
    totalRow.savings_balance_current - totalRow.savings_balance_previous;

  const loan_outstanding_principal =
    totalRow.loan_outstanding_principal_current.toFixed(2) -
    totalRow.loan_outstanding_principal_previous.toFixed(2);

  const borrower =
    totalRow.current_borrower_member - totalRow.previous_borrower_member;

  //  prev

  const curr_due_count =
    totalRow.principal_due_count_current -
    totalRow.principal_due_count_previous;

  const curr_due_amount =
    totalRow.principal_due_current.toFixed(2) -
    totalRow.principal_due_previous.toFixed(2);

  const exp_due_count =
    totalRow.current_expired_borrower_count_current -
    totalRow.current_expired_borrower_count_previous;

  const exp_due_amount =
    totalRow.current_expired_principal_amount_current.toFixed(2) -
    totalRow.current_expired_principal_amount_previous.toFixed(2);

  const total_due_count =
    totalRow.due_expired_principal_borrower_count_current -
    totalRow.due_expired_principal_borrower_count_previous;

  const total_due_amount =
    totalRow.due_expired_amount_principal_current.toFixed(2) -
    totalRow.due_expired_amount_principal_previous.toFixed(2);

  const recoverable =
    totalRow.principle_recoverable.toFixed(2) -
    totalRow.principle_regular_recovery.toFixed(2);

  return `<tr>
        <td colspan="3">
          <div align="center">Changes</div>
        </td>
        <td>
          <div align="center">${
            isPositiveInteger(memberCount) ? "" : memberCount
          }</div>
        </td>
        <td>
          <div align="center">${
            !isPositiveInteger(memberCount) ? "" : memberCount
          }</div>
        </td>
        <td>
        <div align="center">${
          isPositiveInteger(savings_balance) ? "" : savings_balance
        }</div>
      </td>
      <td>
        <div align="center">${
          !isPositiveInteger(savings_balance) ? "" : savings_balance
        }</div>
      </td>
      <td>
      <div align="center">${
        isPositiveInteger(loan_outstanding_principal)
          ? ""
          : loan_outstanding_principal.toFixed(2)
      }</div>
    </td>
    <td>
      <div align="center">${
        !isPositiveInteger(loan_outstanding_principal)
          ? ""
          : loan_outstanding_principal.toFixed(2)
      }</div>
    </td>
    <td>
    <div align="center">${isPositiveInteger(borrower) ? "" : borrower}</div>
  </td>
    <td>
    <div align="center">${!isPositiveInteger(borrower) ? "" : borrower}</div>
    </td>
    <td>
    <div align="center">${
      isPositiveInteger(curr_due_count) ? "" : curr_due_count
    }</div>
    </td>
    <td>
        <div align="center">${
          isPositiveInteger(curr_due_amount) ? "" : curr_due_amount.toFixed(2)
        }</div>
    </td>
    <td>
    <div align="center">${
      isPositiveInteger(exp_due_count) ? "" : exp_due_count
    }</div>
    </td>
    <td>
        <div align="center">${
          isPositiveInteger(exp_due_amount) ? "" : exp_due_amount.toFixed(2)
        }</div>
    </td>
    <td>
    <div align="center">${
      isPositiveInteger(total_due_count) ? "" : total_due_count
    }</div>
    </td>
    <td>
        <div align="center">${
          isPositiveInteger(total_due_amount) ? "" : total_due_amount.toFixed(2)
        }</div>
    </td>
    <td>
    <div align="center">${
      !isPositiveInteger(curr_due_count) ? "" : curr_due_count
    }</div>
    </td>
    <td>
        <div align="center">${
          !isPositiveInteger(curr_due_amount) ? "" : curr_due_amount.toFixed(2)
        }</div>
    </td>
    <td>
    <div align="center">${
      !isPositiveInteger(exp_due_count) ? "" : exp_due_count
    }</div>
    </td>
    <td>
        <div align="center">${
          !isPositiveInteger(exp_due_amount) ? "" : exp_due_amount.toFixed(2)
        }</div>
    </td>
    <td>
    <div align="center">${
      !isPositiveInteger(total_due_count) ? "" : total_due_count
    }</div>
    </td>
    <td>
        <div align="center">${
          !isPositiveInteger(total_due_amount)
            ? ""
            : total_due_amount.toFixed(2)
        }</div>
    </td><td>
    <div align="center"></div></td>
    <td>
    <div align="center"></div></td>
    <td><div align="center"></div></td>
    <td><div align="center"></div></td>

      </tr>`;
}
function checkInitialData(acc, curr) {
  if (isNaN(acc)) {
    return Number(curr);
  }
  return Number(acc + curr);
}
function isPositiveInteger(int) {
  return int > 0;
}

function showAgrogoti(data) {
  for (const key in data) {
    const userData = data[key];

    const {
      members = {},
      savings = {},
      loans = {},
    } = userData?.periodical_progress_data?.total_periodical_progress_info;

    // Check if the username exists in the data
    if (data[key]) {
      agrogotiDisplay.innerHTML += `<tr>
            <td>${serialNumber2}</td>
            <td>${userData.branch_data.name}</td>
            <td>${userData.branch_data.code}</td>
            <td>${
              members.member_count_current - members.member_count_previous
            }</td>
         
            <td>${
              savings.savings_balance_current - savings.savings_balance_previous
            }</td>

            <td>${(
              loans.loan_outstanding_principal_current -
              loans.loan_outstanding_principal_previous
            ).toFixed(2)}</td>
      
            <td>${
              loans.current_borrower_member - loans.previous_borrower_member
            }</td>

            <td>${
              loans.principal_due_count_current -
              loans.principal_due_count_previous
            }</td>
            <td>${(
              loans.principal_due_current - loans.principal_due_previous
            ).toFixed(2)}</td>


            <td>${
              loans.current_expired_borrower_count_current -
              loans.current_expired_borrower_count_previous
            }</td>
            <td>${(
              loans.current_expired_principal_amount_current -
              loans.current_expired_principal_amount_previous
            ).toFixed(2)}</td>


            <td>${
              loans.due_expired_principal_borrower_count_current -
              loans.due_expired_principal_borrower_count_previous
            }</td>
            <td>${(
              loans.due_expired_amount_principal_current -
              loans.due_expired_amount_principal_previous
            ).toFixed(2)}</td>

            </tr>`;
      serialNumber2++;
    } else {
      agrogotiDisplay.innerHTML += `<tr><td colSpan="3">
            No data found for username: ${username}</td></tr>`;
    }
  }
}
function showAgrogotiTotalRow() {
  agrogotiDisplay.innerHTML += `<tr class='totalRow'>
      <td colspan='3'>Total</td>

      <td>${
        totalData.member_count_current - totalData.member_count_previous
      }</td>

      <td>${
        totalData.savings_balance_current - totalData.savings_balance_previous
      }</td>

      <td>${(
        totalData.loan_outstanding_principal_current -
        totalData.loan_outstanding_principal_previous
      ).toFixed(2)}</td>

      <td>${
        totalData.current_borrower_member - totalData.previous_borrower_member
      }</td>

   


      <td>${
        totalData.principal_due_count_current -
        totalData.principal_due_count_previous
      }</td>
      <td>${(
        totalData.principal_due_current - totalData.principal_due_previous
      ).toFixed(2)}</td>


      <td>${
        totalData.current_expired_borrower_count_current -
        totalData.current_expired_borrower_count_previous
      }</td>
      <td>${(
        totalData.current_expired_principal_amount_current -
        totalData.current_expired_principal_amount_previous
      ).toFixed(2)}</td>


      <td>${
        totalData.due_expired_principal_borrower_count_current -
        totalData.due_expired_principal_borrower_count_previous
      }</td>
      <td>${(
        totalData.due_expired_amount_principal_current -
        totalData.due_expired_amount_principal_previous
      ).toFixed(2)}</td>

    
      </tr>`;
}
