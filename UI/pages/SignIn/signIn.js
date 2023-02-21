const copyRightYear = document.querySelectorAll(".year");
const submitSignInData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
const email = document.getElementById("email");
const passcode = document.getElementById("passcode");
//  users fron LS
const getFormData = JSON.parse(localStorage.getItem("SignedInSuccessfully"));
let lastUser = getFormData.filter(
  (user) => user === getFormData[getFormData.length - 1]
);
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
if (lastUser) {
  email.value = lastUser[0].email;
  passcode.value = lastUser[0].passcode;
}
const formData = {
  email: email.value,
  passcode: passcode.value,
};
const submitDataFn = () => {
  if (
    formData.email.toLowerCase() === "erickykress@gmail.com" &&
    formData.passcode.toLowerCase() === "kress123"
  ) {
    // window.location.href = "../blogs/AdminDashboard/ViewBlogs/blogs.html";
    window.location.href = "./signup.js";
    alert("fdjhfdfidn", formData);
  } //user Daashboard
  else {
    //check if this email is already registered first
    getFormData.forEach((user) => {
      if (
        user.email.toLowerCase() === formData.email.toLowerCase() &&
        user.passcode === formData.passcode
      ) {
        alertMessage.style.display = "none";
        //getting user Locations
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              let lng = position.coords.longitude;
              let lat = position.coords.latitude;
              let newUserInfo = {
                user: user,
                location: {
                  lat: lat,
                  lng: lng,
                },
              };
              localStorage.setItem("locateUser".JSON.stringify(newUserInfo));
            },
            (error) => {
              throw error;
            }
          );
        }
        localStorage.setItem("user", JSON.stringify(user)); //to be displayed in blogs dashboard
        fetch("https://nsanzimfura-server.up.railway.app/mybrand/login", {
          method: "POST",
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        // window.location.href = "../blogs/code/blogs.html";
      } else {
        //edited credentials wrong, can't go in
        alertMessage.style.display = "flex";
        setTimeout(function () {
          alertMessage.style.display = "none";
        }, 2000);
      }
    });
  }
};
// get form data from local storage
submitSignInData.addEventListener("click", (e) => {
  e.preventDefault();
  submitDataFn();
  //admin dashboard
});
copyRightYear.forEach((year) => {
  const time = new Date();
  const timeYear = time.getFullYear();
  year.innerText = timeYear;
});
