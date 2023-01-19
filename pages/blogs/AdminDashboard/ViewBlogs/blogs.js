const copyRightYear = document.querySelectorAll(".year");
const mixListbox = document.getElementById("mix-listbox");
const tvBarBlogEdit = document.getElementById("tvBarBlogEdit");
const cancelEditAction = document.getElementById("cancelEditAction");
const SaveEditAction = document.getElementById("saveEditAction");
const blogsBoxFormEdit = document.getElementById("blogsBoxFormEdit");
// categories of blogs
const blogsCode = document.getElementById("blogsCode");
const blogsActivity = document.getElementById("blogsActivity");
const blogsStory = document.getElementById("blogsStory");
// access locatStoirage
const getBlogsData = JSON.parse(localStorage.getItem("blogDataAdd"));
// view more btns
const viewMoreCode = document.getElementById("viewListCode")
const viewMoreActivity = document.getElementById("viewListActivity")
const viewMoreStory = document.getElementById("viewListStory")
// view less btns
const viewLessCode = document.getElementById("viewLessCode");
const viewLessActivity = document.getElementById("viewLessActivity");
const viewLessStory = document.getElementById("viewLessStory");

// cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})
document.addEventListener('click', () => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})

// putting blogs in their order types
let codeBlogsArray = []
let activityBlogsArray = []
let storyBlogsArray = []
getBlogsData.forEach(blog=>{
    if(blog.category ==="Code"){
        codeBlogsArray.push(blog)
    }
     if(blog.category ==="Stories")
    {
        storyBlogsArray.push(blog)
    }
    if(blog.category ==="Activities")
    {
        activityBlogsArray.push(blog)
    } 
})
console.log(codeBlogsArray, "codes")
console.log(activityBlogsArray, "actives")
console.log(storyBlogsArray, "stories")
// creating the blogs categories in html
// code blogs 
if(codeBlogsArray.length >=3){
    blogsCode.innerHTML =""
    for(let i=0; i<3; i++){
        blogsCode.innerHTML += `
        <div class="bar">
            <h1>${codeBlogsArray[i].title}</h1>
            <small>${codeBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlogCode(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlogCode(${i})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `   
    }
    // see more on codes web dev
viewMoreCode.addEventListener("click",()=>{
    blogsCode.innerHTML =""
    codeBlogsArray.forEach((blog, i)=>{
        blogsCode.innerHTML += `
        <div class="bar">
            <h1>${blog.title}</h1>
            <small>${blog.time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlogCode(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlogCode(${i})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        ` 
    })
        viewMoreCode.style.display = "none";
        viewLessCode.style.display = "flex";
        
});
viewLessCode.addEventListener("click", ()=>{
    viewMoreCode.style.display = "flex";
    viewLessCode.style.display = "none";
    blogsCode.innerHTML =""
    for(let i=0; i<3; i++){
        blogsCode.innerHTML += `
        <div class="bar">
            <h1>${codeBlogsArray[i].title}</h1>
            <small>${codeBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlogCode(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlogCode(${i})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `   
    }
});
} else{
    viewMoreCode.style.display = "none"
    for(let i=0; i<=codeBlogsArray.length-1; i++){
            blogsCode.innerHTML += `
            <div class="bar">
                <h1>${codeBlogsArray[i].title}</h1>
                <small>${codeBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlogCode(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlogCode(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
                    `
    }
}
// activity blogs
if(activityBlogsArray.length >=3){
    blogsActivity.innerHTML = ""
    for(let i=0; i<3; i++){
        blogsActivity.innerHTML += `
        <div class="bar">
            <h1>${activityBlogsArray[i].title}</h1>
            <small>${activityBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlogActivity(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlogActivity(${i})">
                <i class="fa-solid fa-trash"></i>
                </div>
                </div>
                </div>
                `   
    }
    // see more activity bars
    viewMoreActivity.addEventListener("click", ()=>{
        blogsActivity.innerHTML = "";
        activityBlogsArray.forEach((blog, i)=>{
            blogsActivity.innerHTML += `
            <div class="bar">
            <h1>${blog.title}</h1>
            <small>${blog.time}</small>
            <div class="actionBox">
            <div class="edit" onclick="editBlogActivity(${i})">
            <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div class="delete" onclick="deleteBlogActivity(${i})">
            <i class="fa-solid fa-trash"></i>
            </div>
            </div>
            </div>
            `  
        });
        viewMoreActivity.style.display = "none";
        viewLessActivity.style.display = "flex";
    });
    // see less  activity bars
    viewLessActivity.addEventListener("click", ()=>{
        blogsActivity.innerHTML = "";
        viewMoreActivity.style.display = "flex";
        viewLessActivity.style.display = "none";
        for(let i=0; i<3; i++){
            blogsActivity.innerHTML += `
            <div class="bar">
                <h1>${activityBlogsArray[i].title}</h1>
                <small>${activityBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlogActivity(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlogActivity(${i})">
                    <i class="fa-solid fa-trash"></i>
                    </div>
                    </div>
                    </div>
                    `   
        }
    });
} else{
        for(let i=0; i<=activityBlogsArray.length - 1 ; i++){
        viewMoreActivity.style.display = "none";
        blogsActivity.innerHTML += `
            <div class="bar">
                <h1>${activityBlogsArray[i].title}</h1>
                <small>${activityBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlogActivity(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlogActivity(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `
    }
}
// story blogs
if(storyBlogsArray.length >=3){
    blogsStory.innerHTML = "";
    for(let i=0; i<3; i++){
        blogsStory.innerHTML += `
        <div class="bar">
            <h1>${storyBlogsArray[i].title}</h1>
            <small>${storyBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit" onclick="editBlogStory(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete" onclick="deleteBlogStory(${i})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `   
    }
    // view more bar strory blogs 
    viewMoreStory.addEventListener("click", ()=>{
        blogsStory.innerHTML = "";
        viewMoreStory.style.display = "none";
        viewLessStory.style.display = "flex";
        storyBlogsArray.forEach((blog, i)=>{
            blogsStory.innerHTML += `
            <div class="bar">
                <h1>${blog.title}</h1>
                <small>${blog.time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlogStory(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlogStory(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `
        })
    })
    // see less story blogs
    viewLessStory.addEventListener("click", ()=>{
        blogsStory.innerHTML = "";
        viewLessStory.style.display = "none";
        viewMoreStory.style.display = "flex";
        for(let i=0; i<3; i++){
            blogsStory.innerHTML += `
            <div class="bar">
                <h1>${storyBlogsArray[i].title}</h1>
                <small>${storyBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlogStory(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlogStory(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            ` 
        }
    });
} else{
    for(let i= 0; i<=storyBlogsArray.length - 1; i++){
        viewMoreStory.style.display = "none"
        blogsStory.innerHTML += `
            <div class="bar">
                <h1>${storyBlogsArray[i].title}</h1>
                <small>${storyBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit" onclick="editBlogStory(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" onclick="deleteBlogStory(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `
    }
}
// delete or edit data by calling fnx from html 
// codes blogs -----------------------------
    // edit  a blog
const editBlogCode =  (id)=>{
    console.log(id, "code edit")
    codeBlogsArray.forEach((blog, i)=>{
        if(i===id){

            console.log(blog, i)
        }
    })
}
    //delete a blog
const deleteBlogCode = (id)=>{
    console.log(id, "code delete")
    codeBlogsArray.forEach((blog, i)=>{
        if(i===id){
            console.log(blog, i)
        }
    })
}
// activity blogs ---------------------------------
    //edit a blog
const editBlogActivity = (id)=>{
    console.log(id, "acctivity edit")
    activityBlogsArray.forEach((blog, i)=>{
        if(id===i){
            console.log(blog, i)
        }
    })
}
    // delete a blog
const deleteBlogActivity = (id)=>{
    console.log(id, "activity delete")
    activityBlogsArray.forEach((blog, i)=>{
        if(id===i){
            console.log(blog, i)
        }
    })
}
// story blogs ------------------------------------
    //edit a blog
const editBlogStory = (id)=>{
    console.log(id, "story edit")
    storyBlogsArray.forEach((blog, i)=>{
        if(id===i){
            console.log(blog, i)
            tvBarBlogEdit.style.display = "flex";
            blogsBoxFormEdit.innerHTML = `
            <div class="textsInputs">
                <input type="text" name="text" id="titleEdited" value='${blog.title}' >
                <textarea rows="4" cols="50" id='editDetails' name="editDetails"></textarea>
            </div>
            <div class="uploadBox">
                <div class="tv" 
                    style=" background-image: url('${blog.img}');
                            background-position: cover;
                            "
                > 
                </div>
            </div>
        `
        const editDetails= document.getElementById("editDetails");
        editDetails.value = blog.details;
        const messageSave = document.getElementById("messageSave");
        // save data in blog to over write the old one
        let count=0
        SaveEditAction.addEventListener("click", (e)=>{
            e.preventDefault();
            count += 1
            const titleEdited = document.getElementById("titleEdited").value;
            const newValue = editDetails.value;
            const timeEdited = new Date()
            const newTime = timeEdited.toDateString()
            // replace data into the blog 
            blog.title = titleEdited;
            blog.details = newValue;
            blog.time = newTime;
            tvBarBlogEdit.style.display = "none";
            messageSave.style.display= "flex";
            console.log(blog, count)
            setTimeout(()=>{
                messageSave.style.display= "none";
            }, 1000);
        })
        }
    })
}
    // delete a blog 
const deleteBlogStory = (id)=>{
    console.log(id, "story delete")
    storyBlogsArray.forEach((blog, i)=>{
        if(id===i){
            console.log(blog, i)
        }
    })
}

// keep my arrays categories in local storage again devided just to show them in respective categories
let mixedCategories = {
    code: codeBlogsArray,
    activity: activityBlogsArray,
    story: storyBlogsArray
}
localStorage.setItem("mixedCategories", JSON.stringify(mixedCategories)); //now go to any categore and get item there from LS
//cancel  edit action
cancelEditAction.addEventListener("click", (e)=>{
    e.preventDefault();
    tvBarBlogEdit.style.display = "none";
})

// copyright year in footer
copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
});
