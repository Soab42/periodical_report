document
  .getElementById("puppeteerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const fileUpload = formData.get("fileUpload");
    const cbo_date = formData.get("cbo_date");
    // console.log(fileUpload);
    if (fileUpload) {
      const fileURL = URL.createObjectURL(fileUpload);
      console.log("File URL:", fileURL);
      // You can now use the fileURL as needed
      const data = {
        username,
        password,
        fileURL,
        cbo_date,
      };
      // console.log(data);
      fetch("http://localhost:3000/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      console.log("No file uploaded.");
    }
  });
