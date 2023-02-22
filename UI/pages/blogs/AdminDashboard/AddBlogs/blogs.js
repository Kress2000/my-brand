const copyRightYear = document.querySelectorAll(".year");
const createBlogBtn = document.getElementById("createBtn");
const uploadImg = document.getElementById("upload");
const tv = document.getElementById("tv");
const messageAlert = document.getElementById("messageAlert");
const messageAlertSuccess = document.getElementById("messageAlertSuccess");
// inputs form
const title = document.getElementById("title");
const category = document.getElementById("category");
const details = document.getElementById("details");
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

createBlogBtn.addEventListener("click", async(e) => {
  e.preventDefault();
  var regExName = /[a-z][a-z\s]?[0-9]?/gim;
  // create time when the blog is created
  const time = new Date();
  const date = time.toDateString();
  let blogDataArray = [];
  // console.log(imgUrl)
  const blogData = {
    title: title.value,
    category: category.value,
    details: details.value,
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
    blogData.details &&
    blogData.img &&
    blogData.title.match(regExName) &&
    blogData.details.match(regExName)
  ) {
    // fetch("https://nsanzimfura-server.up.railway.app/mybrand/api/blogs/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(blogData),
    // }).then(res=>res.json())
    // .then(postedBlog=>console.log("posted blog: ", postedBlog));
    console.log(blogData)
    const postUser = await fetch(
        "https://nsanzimfura-server.up.railway.app/mybrand/api/blogs/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );
      const userResp = await postUser.json();
      console.log(userResp, "posted user");
    
    messageAlertSuccess.style.display = "flex";
    setTimeout(() => {
      messageAlertSuccess.style.display = "none";
      // clean fields
      title.value = "";
      category.value = "";
      details.value = "";
      tv.style.backgroundImage = "";
    }, 2000);
  } else {
    messageAlert.style.display = "flex";
    setTimeout(() => {
      messageAlert.style.display = "none";
    }, 2000);
  }
});
