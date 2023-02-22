const copyRightYear = document.querySelectorAll(".year");
const submitSignInData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
const email = document.getElementById("email");
const password = document.getElementById("password");

// cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
  );
});
document.addEventListener("click", () => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});
const submitDataFn = (data) => {
  fetch("https://nsanzimfura-server.up.railway.app/mybrand/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) console.log("Error, not getting Url");
      return res.json();
    })
    .then((ans) => {
      const message = ans.message;
      console.log(message);
      alertMessage.style.background=message==="Welcome Admin!"?"green":"red"
      alertMessage.style.display = "flex";
      alertMessage.innerText = message ? message : "Incorrect credentials!";
      setTimeout(function () {
        alertMessage.style.display = "none";
      }, 2000);
      return ans;
    })
    .catch((err) => console.log(err));
  if (
    data.email.toLowerCase() === "erickykress@gmail.com" &&
    data.password.toLowerCase() === "kress123"
  ) {
    window.location.href = "../blogs/AdminDashboard/ViewBlogs/blogs.html";
  } else {
    window.location.href = "../blogs/code/blogs.html";
  }
};
submitSignInData.addEventListener("click", async (e) => {
  e.preventDefault();
  let formData = {
    email: email.value,
    password: password.value,
  };
  console.log(formData);
  const db = await fetch(
    "https://nsanzimfura-server.up.railway.app/mybrand/api/users"
  );
  const resp = await db.json();
  const emailThere = resp.filter((user) => user.email === formData.email);
  let newEmail = emailThere[0];
  if (newEmail) {
    alertMessage.style.display = "none";
    localStorage.setItem("user", JSON.stringify(newEmail));
    //getting user Locations
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("No Geolocation");
    }
    function showPosition(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      formData = {
        ...formData,
        location: {
          lat,
          lng,
        },
      };
    }
    submitDataFn(formData);
  } else {
    alertMessage.style.display = "flex";
    setTimeout(function () {
      alertMessage.style.display = "none";
    }, 2000);
  }
});
copyRightYear.forEach((year) => {
  const time = new Date();
  const timeYear = time.getFullYear();
  year.innerText = timeYear;
});
