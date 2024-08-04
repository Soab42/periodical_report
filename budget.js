document
  .getElementById("puppeteerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      const file = await response.json();
      console.log(file.url);

      if (file) {
        const username = formData.get("username");
        const password = formData.get("password");
        const cbo_date = formData.get("cbo_date");
        const filePath = file.url;
        const data = {
          username,
          password,
          filePath,
          cbo_date,
        };

        fetch("http://localhost:3000/api/budget", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
