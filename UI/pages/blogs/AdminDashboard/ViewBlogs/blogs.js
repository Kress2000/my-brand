const copyRightYear = document.querySelectorAll(".year");
const mixListbox = document.getElementById("mix-listbox");
const blogsBoxFormEdit = document.getElementById("blogsBoxFormEdit");
// user account
const accountUser = document.getElementById("accountUser");
const logout = document.getElementById("logout");
// categories of blogs
const blogsCode = document.getElementById("blogsCode");
const blogsActivity = document.getElementById("blogsActivity");
const blogsStory = document.getElementById("blogsStory");
// access locatStoirage
const getBlogsData = JSON.parse(localStorage.getItem("blogDataAdd")); //access LS
// view more btns
const viewMoreCode = document.getElementById("viewListCode");
const viewMoreActivity = document.getElementById("viewListActivity");
const viewMoreStory = document.getElementById("viewListStory");
// view less btns
const viewLessCode = document.getElementById("viewLessCode");
const viewLessActivity = document.getElementById("viewLessActivity");
const viewLessStory = document.getElementById("viewLessStory");
// message delete btns
const messageDelete = document.getElementById("messageDelete");
const NoBtn = document.getElementById("NoBtn");
const YesBtn = document.getElementById("YesBtn");
// to tell someone that there EMPTY SPACE
const emptyCode = document.getElementById("emptyCode");
const emptyAct = document.getElementById("emptyAct");
const emptyStory = document.getElementById("emptyStory");
// edit blogs
const tvBarBlogEdit = document.getElementById("tvBarBlogEdit");
const cancelEditAction = document.getElementById("cancelEditAction");
const SaveEditAction = document.getElementById("saveEditAction");
// saving edited message
const messageSave = document.getElementById("messageSave");
//view displays
const viewdisplay = document.querySelectorAll(".viewdisplay");
let user = {
    name: "Admin",
    email: "erickykress@gmail.com",
  }
viewdisplay.forEach((view) => {
  view.addEventListener("click", () => {
    localStorage.setItem("user", JSON.stringify(user));
  });
});

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

fetch("https://nsanzimfura-server.up.railway.app/mybrand/api/blogs/")
  .then((resp) => resp.json())
  .then((ans) => console.log(ans))
  .catch((mist) => console.log(mist, "this is th  erro"));

// console.log(getBlogsData, "single category ly");

let codeBlogsArray = [];
let activityBlogsArray = [];
let storyBlogsArray = [];
getBlogsData.forEach((blog) => {
  if (blog.category === "Code") {
    codeBlogsArray.push(blog);
  }
  if (blog.category === "Activities") {
    activityBlogsArray.push(blog);
  }
  if (blog.category === "Stories") {
    storyBlogsArray.push(blog);
  }
});
// creating the blogs categories in html
// code blogs
if (codeBlogsArray.length > 3) {
  blogsCode.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    blogsCode.innerHTML += `
        <div class="bar">
            <h1>${codeBlogsArray[i].title}</h1>
            <small>${codeBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlog(${codeBlogsArray[i].id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlog(${codeBlogsArray[i].id})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `;
  }
  // see more on codes web dev
  viewMoreCode.addEventListener("click", () => {
    blogsCode.innerHTML = "";
    codeBlogsArray.forEach((blog, i) => {
      blogsCode.innerHTML += `
        <div class="bar">
            <h1>${blog.title}</h1>
            <small>${blog.time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlog(${codeBlogsArray[i].id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlog(${codeBlogsArray[i].id})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `;
    });
    viewMoreCode.style.display = "none";
    viewLessCode.style.display = "flex";
  });
  viewLessCode.addEventListener("click", () => {
    viewMoreCode.style.display = "flex";
    viewLessCode.style.display = "none";
    blogsCode.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      blogsCode.innerHTML += `
        <div class="bar">
            <h1>${codeBlogsArray[i].title}</h1>
            <small>${codeBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlog(${codeBlogsArray[i].id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlog(${codeBlogsArray[i].id})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `;
    }
  });
} else {
  viewMoreCode.style.display = "none";
  if (codeBlogsArray.length === 0) {
    emptyCode.style.display = "flex";
  } else {
    emptyCode.style.display = "none";
  }
  for (let i = 0; i <= codeBlogsArray.length - 1; i++) {
    blogsCode.innerHTML += `
            <div class="bar">
                <h1>${codeBlogsArray[i].title}</h1>
                <small>${codeBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlog(${codeBlogsArray[i].id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlog(${codeBlogsArray[i].id})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
                    `;
  }
}
// activity blogs
if (activityBlogsArray.length > 3) {
  blogsActivity.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    blogsActivity.innerHTML += `
        <div class="bar">
            <h1>${activityBlogsArray[i].title}</h1>
            <small>${activityBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlog(${activityBlogsArray[i].id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlog(${activityBlogsArray[i].id})">
                <i class="fa-solid fa-trash"></i>
                </div>
                </div>
                </div>
                `;
  }
  viewMoreActivity.style.display = "flex";
  // see more activity bars
  viewMoreActivity.addEventListener("click", () => {
    blogsActivity.innerHTML = "";
    activityBlogsArray.forEach((blog, i) => {
      blogsActivity.innerHTML += `
            <div class="bar">
            <h1>${blog.title}</h1>
            <small>${blog.time}</small>
            <div class="actionBox">
            <div class="edit" onclick="editBlog(${activityBlogsArray[i].id})">
            <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div class="delete" onclick="deleteBlog(${activityBlogsArray[i].id})">
            <i class="fa-solid fa-trash"></i>
            </div>
            </div>
            </div>
            `;
    });
    viewMoreActivity.style.display = "none";
    viewLessActivity.style.display = "flex";
  });
  // see less  activity bars
  viewLessActivity.addEventListener("click", () => {
    blogsActivity.innerHTML = "";
    viewMoreActivity.style.display = "flex";
    viewLessActivity.style.display = "none";
    for (let i = 0; i < 3; i++) {
      blogsActivity.innerHTML += `
            <div class="bar">
                <h1>${activityBlogsArray[i].title}</h1>
                <small>${activityBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlog(${activityBlogsArray[i].id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlog(${activityBlogsArray[i].id})">
                    <i class="fa-solid fa-trash"></i>
                    </div>
                    </div>
                    </div>
                    `;
    }
  });
} else {
  viewMoreActivity.style.display = "none";
  // show that space is empty
  if (activityBlogsArray.length === 0) {
    emptyAct.style.display = "flex";
  } else {
    emptyAct.style.display = "none";
  }
  for (let i = 0; i <= activityBlogsArray.length - 1; i++) {
    blogsActivity.innerHTML += `
        <div class="bar">
            <h1>${activityBlogsArray[i].title}</h1>
            <small>${activityBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlog(${activityBlogsArray[i].id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlog(${activityBlogsArray[i].id})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `;
  }
}
// story blogs
if (storyBlogsArray.length > 3) {
  blogsStory.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    blogsStory.innerHTML += `
        <div class="bar" id="${this}">
            <h1>${storyBlogsArray[i].title}</h1>
            <small>${storyBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlog(${storyBlogsArray[i].id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlog(${storyBlogsArray[i].id})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `;
  }
  // view more bar strory blogs
  viewMoreStory.addEventListener("click", () => {
    blogsStory.innerHTML = "";
    viewMoreStory.style.display = "none";
    viewLessStory.style.display = "flex";
    storyBlogsArray.forEach((blog, i) => {
      blogsStory.innerHTML += `
            <div class="bar">
                <h1>${blog.title}</h1>
                <small>${blog.time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlog(${storyBlogsArray[i].id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlog(${storyBlogsArray[i].id})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `;
    });
  });
  // see less story blogs
  viewLessStory.addEventListener("click", () => {
    blogsStory.innerHTML = "";
    viewLessStory.style.display = "none";
    viewMoreStory.style.display = "flex";
    for (let i = 0; i < 3; i++) {
      blogsStory.innerHTML += `
            <div class="bar">
                <h1>${storyBlogsArray[i].title}</h1>
                <small>${storyBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlog(${storyBlogsArray[i].id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlog(${storyBlogsArray[i].id})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `;
    }
  });
} else {
  viewMoreStory.style.display = "none";
  if (storyBlogsArray.length === 0) {
    emptyStory.style.display = "flex";
  } else {
    emptyStory.style.display = "none";
  }
  for (let i = 0; i <= storyBlogsArray.length - 1; i++) {
    blogsStory.innerHTML += `
            <div class="bar">
                <h1>${storyBlogsArray[i].title}</h1>
                <small>${storyBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlog(${storyBlogsArray[i].id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlog(${storyBlogsArray[i].id})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `;
  }
}
// edit  a blog ---------------------
const editBlog = (id) => {
  tvBarBlogEdit.style.display = "flex";
  cancelEditAction.addEventListener("click", (e) => {
    e.preventDefault();
    tvBarBlogEdit.style.display = "none";
  });
  const editableBlog = getBlogsData.filter((blog) =>
    blog.id === id ? blog : null
  );
  if (editableBlog) {
    const blogData = editableBlog[0];
    const index = getBlogsData.indexOf(blogData);
    blogsBoxFormEdit.innerHTML = `
            <div class="textsInputs">
                <input type="text" name="text" id="titleEdited" value='${blogData.title}' >
                <textarea rows="4" cols="50" id='editDetails' name="editDetails">${blogData.description}</textarea>
            </div>
            <div class="uploadBox">
                <div class="tv" 
                    id="tv"
                    style=" background-image: url('${blogData.img}');
                            background-position: center;
                            background-repeat: no-repeat;
                            "
                > 
                </div>
                <input class="upload" id="upload" type="file" accept="image/jpeg, image/png, image/jpg, image/gif" >
            </div>
            `;
    // get uploaded img
    const uploadImg = document.getElementById("upload");
    const tv = document.getElementById("tv");
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
    const editDetails = document.getElementById("editDetails");
    // save data in blog to over write the old one
    SaveEditAction.addEventListener("click", (e) => {
      e.preventDefault();
      const titleEdited = document.getElementById("titleEdited").value;
      const newValue = editDetails.value;
      const timeEdited = new Date();
      const newTime = timeEdited.toDateString();
      // replace data into the blog
      blogData.title = titleEdited ? titleEdited : blogData.title;
      blogData.description = newValue ? newValue : blogData.description;
      blogData.time = newTime;
      blogData.img = imgUrl ? imgUrl : blogData.img;
      getBlogsData.splice(index, 1, blogData);
      localStorage.setItem("blogDataAdd", JSON.stringify(getBlogsData));
      tvBarBlogEdit.style.display = "none";
      messageSave.style.display = "flex";
      setTimeout(() => {
        messageSave.style.display = "none";
      }, 1000);
    });
  }
};
//delete a blog --------------------
const deleteBlog = (id) => {
  messageDelete.style.display = "flex";
  NoBtn.addEventListener("click", () => {
    messageDelete.style.display = "none";
  });
  const editableBlog = getBlogsData.filter((blog) =>
    blog.id === id ? blog : null
  );
  if (editableBlog) {
    const blogData = editableBlog[0];
    const index = getBlogsData.indexOf(blogData);
    YesBtn.addEventListener("click", () => {
      getBlogsData.splice(index, 1);
      localStorage.setItem("blogDataAdd", JSON.stringify(getBlogsData));
      messageDelete.style.display = "none";
    });
  }
};
// copyright year in footer
copyRightYear.forEach((year) => {
  const time = new Date();
  const timeYear = time.getFullYear();
  year.innerText = timeYear;
});
