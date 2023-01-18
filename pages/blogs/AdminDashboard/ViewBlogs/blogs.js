const copyRightYear = document.querySelectorAll(".year");
const mixListbox = document.getElementById("mix-listbox");
const blogCategories = mixListbox.querySelectorAll(".list-category");
const tvBarBlogEdit = document.getElementById("tvBarBlogEdit");
const cancelEditAction = document.getElementById("cancelEditAction");
const SaveEditAction = document.getElementById("saveEditAction");
const blogBox = document.getElementById("blogsBox");
// categories of blogs
const blogsCode = document.getElementById("blogsCode");
const blogsActivity = document.getElementById("blogsActivity");
const blogsStory = document.getElementById("blogsStory");
// access locatStoirage
const getBlogsData = JSON.parse(localStorage.getItem("blogDataAdd"));
// view more btns
const viewMoreCode = document.getElementById("viewListCode")
const viewMoreActivity = document.getElementById("viewListActivity")
const viewMoreStory = document.getElementById("viewListCode")

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
// console.log(codeBlogsArray, "codes")
// console.log(activityBlogsArray, "actives")
// console.log(storyBlogsArray, "stories")
// creating the blogs categories in html
// code blogs 
if(codeBlogsArray.length >=3){
    for(let i=0; i<3; i++){
        blogsCode.innerHTML += `
        <div class="bar">
            <h1>${codeBlogsArray[i].title}</h1>
            <small>${codeBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `   
    }
} else{
    for(let i=0; i<=codeBlogsArray.length-1; i++){
            blogsCode.innerHTML += `
            <div class="bar">
                <h1>${codeBlogsArray[i].title}</h1>
                <small>${codeBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
                    `
    }
}
// activity blogs
if(activityBlogsArray.length >=3){
    for(let i=0; i<3; i++){
        blogsActivity.innerHTML += `
        <div class="bar">
            <h1>${activityBlogsArray[i].title}</h1>
            <small>${activityBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete">
                <i class="fa-solid fa-trash"></i>
                </div>
                </div>
                </div>
                `   
            }
} else{
        for(let i=0; i<=activityBlogsArray.length - 1 ; i++){
        blogsActivity.innerHTML += `
            <div class="bar">
                <h1>${activityBlogsArray[i].title}</h1>
                <small>${activityBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `
    }
}
// story blogs
if(storyBlogsArray.length >=3){
    for(let i=0; i<3; i++){
        blogsStory.innerHTML += `
        <div class="bar">
            <h1>${storyBlogsArray[i].title}</h1>
            <small>${storyBlogsArray[i].time}</small>
            <div class="actionBox">
                <div class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="delete">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        `   
    }
} else{
    for(let i= 0; i<=storyBlogsArray.length - 1; i++){
        blogsStory.innerHTML += `
            <div class="bar">
                <h1>${storyBlogsArray[i].title}</h1>
                <small>${storyBlogsArray[i].time}</small>
                <div class="actionBox">
                    <div class="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            `
    }
}
// keep my arrays categories in local storage again devided just to show them in respective categories
let mixedCategories = {
    code: codeBlogsArray,
    activity: activityBlogsArray,
    story: storyBlogsArray
}
localStorage.setItem("mixedCategories", JSON.stringify(mixedCategories)); //now go to any categore and get item there from LS
// we can now click btns to view more bars


// blogs inside --------EDIT OR DELETE BLOGS
blogCategories.forEach(category=>{
    const listbox = category.querySelector(".listbox");
    const bars = listbox.querySelectorAll(".bar");
    bars.forEach(bar=>{
        const deleteBtn = bar.getElementsByClassName("delete");
        const editBtn = bar.getElementsByClassName("edit");
        deleteBtn[0].addEventListener("click", ()=>{
            bar.style.display = "none";
        })
        editBtn[0].addEventListener("click", ()=>{
            tvBarBlogEdit.style.display = "flex";
            const title = bar.getElementsByTagName("h1")
            const details = bar.getElementsByTagName("textarea")
            blogBox.innerHTML = `
                            <div class="textsInputs">
                                <input type="text" id="title" value='${title[0].outerText}' >
                                <textarea rows="4" cols="50" id="details" name="details" value='${details.outerText}'></textarea>
                            </div>
                            <div class="uploadBox">
                                <div class="tv" 
                                style=" background-image: url('../../../../img/blogs/car.png");
                                        background-position: cover;
                                '>            
                                </div>
                                <span class="upload">Upload a cover</span>
                            </div>
                        `
        })
    })
})
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
