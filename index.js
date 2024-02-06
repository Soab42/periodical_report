document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const searchForm = document.querySelector("form");
  const errorDiv = document.getElementById("error");

  const fetchData = () => {
    loading.classList.remove("hidden");
    loading.classList.add("loading");

    fetch("http://localhost:3000/api/data")
      .then((response) => response.json())
      .then((data) => {
        // Display JSON data in HTML
        const jsonDisplay = document.getElementById("json-display");
        // console.log(data);
        // Loop through loginCredentials usernames
        for (const key in data) {
          // Check if the username exists in the data
          if (data[key]) {
            jsonDisplay.innerHTML += `<p>${data[key].report_view}</p><br>`;
          } else {
            jsonDisplay.innerHTML += `<p>No data found for username: ${key}</p><br>`;
          }
        }
        loading.classList.add("hidden");
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error),
          (errorDiv.innerHTML = `<div class='error'>${error}</div>`);
        loading.classList.add("hidden");
      });
  };
  function searchByDate(event) {
    event.preventDefault();
    // Get the values from the form
    const fromDate = document.getElementById("from").value;

    const toDate = document.getElementById("toDate").value;
    // console.log(fromDate);
    // console.log(toDate);
    // Make a POST request to your API endpoint with the form data
    loading.classList.remove("hidden");

    loading.classList.add("loading");

    fetch("http://localhost:3000/api/scraping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fromDate, toDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        loading.classList.add("hidden"), fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
        loading.classList.add("hidden");
        errorDiv.innerHTML = `<div class='error'>${error}</div>`;
      });
  }
  fetchData();
  searchForm.addEventListener("submit", searchByDate);

  function startCountdown() {
    let countdownTime = 180;
    updateClock(countdownTime);

    let countdownInterval = setInterval(function () {
      countdownTime--;

      if (countdownTime >= 0) {
        updateClock(countdownTime);
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    function updateClock(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;

      const minutesStr = String(minutes).padStart(2, "0");
      const secondsStr = String(seconds).padStart(2, "0");

      const clock = document.getElementById("countdown-clock");
      clock.innerHTML = `
  <div class="flip">${createFlipCard(minutesStr[0])}</div>
  <div class="flip">${createFlipCard(minutesStr[1])}</div>
  <br></br>
  <div class="flip-divider">:</div>
  <div class="flip">${createFlipCard(secondsStr[0])}</div>
  <div class="flip">${createFlipCard(secondsStr[1])}</div>
`;
    }

    function createFlipCard(digit) {
      return `
  <div class="flip">
    <div class="upper">${digit}</div>
    <div class="lower">${digit}</div>
  </div>
`;
    }
  }
  startCountdown();
});

// Function to scroll to the top of the page
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Show the button when user scrolls down, hide when at top
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}
scrollToTopBtn.addEventListener("click", scrollToTop);
