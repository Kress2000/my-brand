const copyRightYear = document.querySelectorAll(".year");
const submitSignUpData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
// when we have the email already
const alreadyThere = document.getElementById("alreadyThere");
// form data
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("passconfirm");
// reg exp
const regexPatern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let regExName = /^[a-z\s/a-z]/gi;

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
if (JSON.parse(localStorage.getItem("SignedInSuccessfully")) === null) {
  localStorage.setItem("SignedInSuccessfully", JSON.stringify([]));
}
// get form data
const postData = async (data) => {
  const postUser = await fetch(
    "https://nsanzimfura-server.up.railway.app/mybrand/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const userResp = await postUser.json();
  console.log(userResp, "posted user");
  alertMessage.innerHTML = "<p>Success!</p>";
  alertMessage.style.display = "flex";
  alertMessage.style.backgroundColor = "green";
  setTimeout(function () {
    alertMessage.style.display = "none";
    alertMessage.style.backgroundColor = "red";
    alertMessage.innerHTML = "<p>Fill the missing fields plz!</p>";
  }, 2000);
  window.location.href = "../SignIn/signIn.html";
};
submitSignUpData.addEventListener("click", async (e) => {
  e.preventDefault();
  let formData = {
    name: fullName.value,
    email: email.value,
    password: password.value,
    confirmPass: confirmPass.value,
  };
  if (
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPass
  ) {
    if (formData.name.match(regExName) && formData.email.match(regexPatern)) {
      if (formData.password.length >= 6) {
        if (formData.password === formData.confirmPass) {
          const db = await fetch(
            "https://nsanzimfura-server.up.railway.app/mybrand/api/users"
          );
          const resp = await db.json();
          if (resp.length !== 0) {
            const emailThere = resp.filter(
              (user) => user.email === formData.email
            );
            const newEmail = emailThere[0];
            if (newEmail) {
              alreadyThere.style.display = "flex";
              setTimeout(() => {
                alreadyThere.style.display = "none";
              }, 2000);
            } else {
              postData(formData);
            }
          } else {
            postData(formData);
          }
        } else {
          alertMessage.style.display = "flex";
          alertMessage.innerHTML = "<p>Passwords do not match!</p>";
          setTimeout(function () {
            alertMessage.style.display = "none";
            alertMessage.innerHTML = "<p>Fill the missing fields plz!</p>";
          }, 2000);
        }
      } else {
        alertMessage.style.display = "flex";
        alertMessage.innerHTML =
          "<p>Passwords must be 5 characters or more!</p>";
        setTimeout(function () {
          alertMessage.style.display = "none";
          alertMessage.innerHTML = "<p>Fill the missing fields plz!</p>";
        }, 2000);
      }
    } else {
      alertMessage.style.display = "flex";
      alertMessage.innerHTML = "<p>Your name or Email are not valid!</p>";
      setTimeout(function () {
        alertMessage.style.display = "none";
        alertMessage.innerHTML = "<p>Fill the missing fields plz!</p>";
      }, 2000);
    }
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
