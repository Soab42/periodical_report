const memberDetails = document.getElementById("memberDetails");

// Extract member ID from query parameter
const urlParams = new URLSearchParams(window.location.search);
const memberId = urlParams.get("id");
console.log("id", memberId);

fetch(`http://localhost:3000/api/fbs/${memberId}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    const getPaidAmount = (installment_number, installment_amount) => {
      const payable_amount = installment_number * installment_amount;
      if (payable_amount <= Number(data?.paid_interest_amount)) return true;
      return false;
    };
    const nomineeRows = data?.nominee_info?.map((nominee) => {
      return `<tr>
                    <td>${nominee.name}</td>
                    <td>${nominee.birth_registration_no}</td>
                    <td>${nominee.national_id}</td>
                    <td>${nominee.relation}</td>
                    <td>${nominee.share}</td>
                </tr>`;
    });

    const Schedule = data?.saving_schedules?.map((s, i) => {
      //   console.log(s);
      return `<tr>
        <td align="left" class="field-values">${s.installment_number}</td>
        <td align="center" class="field-values" style="text-align: left;">${
          s.date
        }</td>
        <td class="field-values" style="text-align: right; padding-right: 5px;">       ${
          s.principal_amount || ""
        }
        </td>
        <td class="field-values" style="text-align: right; padding-right: 5px;">
        ${s.amount || ""}
        </td>
        <td class="field-values" style="text-align: right; padding-right: 5px;">
            
            ${s.principal_amount || ""}
        </td>
        <td class="field-values" style="text-align: center; color: green;">
${getPaidAmount(s.installment_number, s.amount) ? "Paid" : ""}
        </td>
    </tr>`;
    });

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

    const html = ` <table border="0" cellspacing="0px" cellpadding="0px"
    class="uiInfoTableConfig table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline">
    <tbody>
        <tr>
            <th width="20%" align="left" class="field-label">Member</th>
            <td width="28%" class="field-items">${data.row.member_info}</td>
            <th width="20%" align="left" class="field-label">Product</th>
            <td width="28%" class="field-items">${
              data.row.saving_product_name
            }</td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">Deposit Type</th>
            <td width="28%" class="field-items">FDR (VOLUNTARY)</td>
            <th width="20%" align="left" class="field-label">Interest Rate</th>
            <td width="28%" class="field-items">${data.row.interest_rate} %</td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">Code</th>
            <td width="28%" class="field-items">${data.row.code}</td>
            <th width="20%" align="left" class="field-label">Auto process Amount</th>
            <td width="28%" class="field-items">${data.principal_amount}</td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">Opening Date</th>
            <td width="28%" class="field-items">${data.row.opening_date}</td>
            <th width="20%" align="left" class="field-label">Total Deposit</th>
            <td width="28%" class="field-items">${data.principal_amount}</td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">Total Refund</th>
            <td width="28%" class="field-items"></td>
            <th width="20%" align="left" class="field-label">Total Interest</th>
            <td width="28%" class="field-items"></td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">Total Saving</th>
            <td width="28%" class="field-items">
            ${data.principal_amount}
            </td>
            <th class="field-label">Current Status</th>
            <td class="field-items">${getStatus(data?.row?.current_status)}</td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">Deposit scheme number</th>
            <td width="28%" class="field-items">${
              data.row.deposit_scheme_number
            }</td>
        </tr>
        <tr>
            <th class="field-label"></th>
            <td class="field-items"></td>
            <td class="field-label">&nbsp;</td>
            <td class="field-items">&nbsp;</td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">mature Date</th>
            <td width="28%" class="field-items">${data.row.mature_date}</td>
            <th width="20%" align="left" class="field-label">Period:</th>
            <td width="28%" class="field-items">${data.row.period}</td>
        </tr>
        <tr>
            <th width="20%" align="left" class="field-label">Total Payable:</th>
            <td class="field-items">${data.row.payable_amount}</td>
            <td class="field-label">&nbsp;</td>
            <td class="field-items">&nbsp;</td>
        </tr>
    </tbody>
</table>
<table border="0" cellspacing="0px" cellpadding="0px"
    class="uiInfoTableConfig table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline">
    
        <th>
            Nominee information
        </th>
     
        
    <tr>
        <th width="20%"> Name</th>
        <th width="20%"> birth registration No</th>
        <th width="20%">national ID</th>
        <th width="20%">Relation</th>
        <th width="20%">Share (%)</th>
    </tr>
   
    ${nomineeRows?.join("")}

    
</table>
<table class="table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline">
        <tbody>
            <tr>
                <th align="left" colspan="6" class="field-header">
                    &nbsp;Interest Schedule
                </th>
            </tr>
            <tr>
                <th width="6%" class="field-title">#</th>
                <th width="20%" class="field-title">Date</th>
                <th width="20%" class="field-title">principal Amount (P)</th>
                <th width="20%" class="field-title">Interest Amount (I)</th>
                <th width="20%" class="field-title">transaction Amount</th>
                <th width="15%" class="field-title" style="text-align: center;">Status</th>
            </tr>
            
            ${Schedule?.join("")}
           
            <tr>
                <th class="field-values">&nbsp;</th>
                <th class="field-values">&nbsp;</th>
                <th class="field-values" style="text-align: right;"> ${
                  data.principal_amount
                }</th>
                <th class="field-values" style="text-align: right;">${
                  data.total_amount
                }</th>
                <th class="field-values" style="text-align: right;"> ${
                  data.principal_amount
                }

                </th>
                <th class="field-values">&nbsp;</th>
            </tr>
        </tbody>
    </table>`;

    memberDetails.innerHTML = html;
  });
