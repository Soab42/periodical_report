document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  nav.innerHTML += ` <a href="/">All Branch Report</a>
  <a class="" href="/zone/">Zone Report</a>
  <a class="" href="/fbs/">FBS</a>
  <a class="" href="/fbs/report.html">FBS Report</a>
  <a class="" href="/fbs/interest_payable.html">FBS Interest Payable</a>
  <a class="" href="/health/">health</a>
  <a class="" href="/health/day.html">Working Day</a>
  <a class="" href="/budget.html">Budget</a>`;

  const currentURL = window.location.pathname;
  console.log(currentURL);
  const links = nav.getElementsByTagName("a");

  for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") === currentURL) {
      links[i].classList.add("active");
    }
  }
});
