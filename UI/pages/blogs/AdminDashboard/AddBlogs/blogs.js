const copyRightYear = document.querySelectorAll(".year");
const createBlogBtn = document.getElementById("createBtn");
const uploadImg = document.getElementById("upload");
const tv = document.getElementById("tv");
const messageAlert = document.getElementById("messageAlert");
const messageAlertSuccess = document.getElementById("messageAlertSuccess");
// inputs form
const title = document.getElementById("title");
const category = document.getElementById("category");
const description = document.getElementById("details");
// user account
const accountUser = document.getElementById("accountUser");
const logout = document.getElementById("logout");

if (JSON.parse(localStorage.getItem("blogDataAdd")) === null) {
  localStorage.setItem("blogDataAdd", JSON.stringify([])); // to restore my key in LS
}
// logout rights
accountUser.addEventListener("mouseover", () => {
  logout.style.display = "flex";
});
logout.addEventListener("mouseover", () => {
  logout.style.display = "flex";
});
logout.addEventListener("click", () => {
  logout.style.display = "none";
});
logout.addEventListener("mouseleave", () => {
  logout.style.display = "none";
});
copyRightYear.forEach((year) => {
  const time = new Date();
  const timeYear = time.getFullYear();
  year.innerText = timeYear;
});
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
// get uploaded img
let imgUrl = "";
uploadImg.addEventListener("change", (e) => {
  e.preventDefault();
  const reader = new FileReader();
  reader.readAsDataURL(uploadImg.files[0]);
  reader.addEventListener("load", () => {
    const url = reader.result;
    tv.style.backgroundImage = `url('${url}')`;
    tv.style.backgroundRepeat = "no-repeat";
    imgUrl = url;
  });
});
// submit data to local storage

createBlogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  var regExName = /[a-z][a-z\s]?[0-9]?/gim;
  // create time when the blog is created
  const randomumbers = Math.random(10);
  const time = new Date();
  const getSeconds = time.getSeconds();
  const date = time.toDateString();
  let blogDataArray = JSON.parse(localStorage.getItem("blogDataAdd"));
  // console.log(imgUrl)
  const newId = randomumbers + getSeconds;
  const blogData = {
    id: newId,
    title: title.value,
    category: category.value,
    description: description.value,
    img: imgUrl,
    time: date,
    userActions: {
      views: 100,
      likes: 50,
      comments: [],
    },
  };
  // blog data must not be empty
  if (
    blogData.title &&
    blogData.category &&
    blogData.description &&
    blogData.img &&
    blogData.title.match(regExName) &&
    blogData.description.match(regExName)
  ) {
    blogDataArray.push(blogData);
    localStorage.setItem("blogDataAdd", JSON.stringify(blogDataArray));
    console.log(blogData)
    blogData.img = "imgUrl";
    fetch("https://nsanzimfura-server.up.railway.app/mybrand/api/blogs/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then((resp) => resp.json())
      .then((ans) => console.log(ans))
      .catch((mist) => console.log(mist, "this is th  erro"));

    messageAlertSuccess.style.display = "flex";
    setTimeout(() => {
      messageAlertSuccess.style.display = "none";
      // clean fields
      title.value = "";
      category.value = "";
      description.value = "";
      tv.style.backgroundImage = "";
    }, 2000);
  } else {
    messageAlert.style.display = "flex";
    setTimeout(() => {
      messageAlert.style.display = "none";
    }, 2000);
  }
});
