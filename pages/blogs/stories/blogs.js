const copyRightYear = document.querySelectorAll(".year");
const popUp = document.getElementById("popUp");
const backBtn = document.getElementById("backBtn");
const popupTvBox = document.getElementById("popupBox");
const detail = document.querySelectorAll(".details");
let numbers = document.querySelectorAll(".number")
const blogsBox = document.getElementById("blogsBox"); //blogs box
const listOfblogs = JSON.parse(localStorage.getItem("mixedCategories"));
const storyblogsList = listOfblogs.story;
const messageEmpty = document.getElementById("messageEmpty");
// users
const logo = document.getElementById("logo");
const logout = document.getElementById("logout");
//credentials
const userName =document.getElementById("userName") 
const userEmail =document.getElementById("userEmail");
// user loggedin 
const user = JSON.parse(localStorage.getItem("user"));
// comment part 
const commentPart = document.getElementById("commentPart");
const closeComment = document.getElementById("closeComment")
const formComment = document.getElementById("formComment");
const commentedText = document.getElementById("comment-area");
console.log(storyblogsList)

//users infor:
userName.innerText= user[0].name;
userEmail.innerText = user[0].email;
logo.addEventListener("mouseover", ()=>{
    logout.style.display = "flex";
    userEmail.style.transition= "all .5s ease-in-out";
});
logo.addEventListener("mouseleave", ()=>{
    logout.style.display = "none";
});
//creedentials ...
userName.addEventListener("mouseover", ()=>{
    userEmail.style.display = "flex";
    userEmail.style.transition= "all .5s ease-in-out";
});
userName.addEventListener("mouseleave", ()=>{
    userEmail.style.display = "none";
});


copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
});
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
// select box
if(storyblogsList.length ===0){
    messageEmpty.style.display = "flex";
    // blogsBox.innerHTML=""
}else{
    messageEmpty.style.display = "none";
}

if(JSON.parse(localStorage.getItem("newListOfblogs"))===null){
    localStorage.setItem("newListOfblogs", JSON.stringify([])); //keep new  with comments
}
let newListOfblogs= JSON.parse(localStorage.getItem("newListOfblogs"));
// console.log(newListOfblogs)
let xx = []
storyblogsList.forEach((blog)=>{
    blog={
        title: blog.title,
        time: blog.time,
        details: blog.details,
        img: blog.img,
        id:  blog.id,
        category: blog.category,
        userActions: {
            views: 100,
            likes: 50,
            comments: []
        }
    }
    if(newListOfblogs.length===0){
        xx.push(blog)
    }else{
        newListOfblogs.forEach(LSblog=>{
            if(LSblog.id !== blog.id){
                xx.push(blog)
            }
        })
    }
});
if(newListOfblogs.length===0){
    localStorage.setItem("newListOfblogs", JSON.stringify(xx)); //keep new  with comments
}
newListOfblogs.forEach(blog=>{
        blogsBox.innerHTML += `
        <div class="box" onclick="clickedBox(${blog.id})">
            <div class="img" style="background-image: url('${blog.img}'); background-repeat: no-repeat; background-size: cover; background-position: center;">
            </div>
            <div>
                <strong>${blog.title}</strong>
                <small>${blog.time}</small>
            </div>
            <div class="details">
                <p class="shortDetails">${blog.details.split(" ").splice(0, 4).join(" ")}...</p>
            </div>
            <div class="userDecision">
                <div class="subBox">
                    <div class="likes">
                        <i class="fa-solid fa-heart"></i>  
                    </div>
                    <div class="number heartNumber" >${blog.userActions.likes}</div>
                </div>
                <div class="subBox">
                    <div class="views">
                    <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="number eyeNumber" >${blog.userActions.views}</div>
                </div>
                <div class="subBox">
                    <div class="comments">
                    <i class="fa-solid fa-comment"></i>
                    </div>
                    <div class="number commentNumber">${blog.userActions.comments.length}</div>
                </div>
            </div>
        </div>
        `
})

function clickedBox (id){
   const blog= newListOfblogs.filter(blog=>blog.id===id? blog: null);
    if(blog){
        let blogData = blog[0]
        let index= newListOfblogs.indexOf(blogData); // help to replace blog with blogData
        blogData.userActions.views++
        popUp.style.display = "flex";
        popupTvBox.innerHTML =`
            <div class="box">
            <div class="img">
            <img src="${blogData.img}" alt="Image cover">
            </div>
            <div class="titleBox">
                <strong>${blogData.title}</strong>
                <small>${blogData.time}</small>
            </div>
            <div class="details">
                <p class="shortDetails">${blogData.details}</p>
            </div>
            <div class="userDecision">
                <div class="subBox">
                    <div class="likes">
                        <i class="fa-solid fa-heart"></i>  
                    </div>
                    <div class="number heartNumber" id="heartNumber">${blogData.userActions.likes}</div>
                </div>
                <div class="subBox">
                        <div class="views">
                            <i class="fa-solid fa-eye"></i>
                        </div>
                        <div class="number eyeNumber" id="eyeNumber">${blogData.userActions.views}</div>
                    </div>
                <div class="subBox">
                    <div class="comments">
                    <i class="fa-solid fa-comment"></i>
                    </div>
                    <div class="number commentNumber" id="commentNumber">${blogData.userActions.comments.length}</div>
                </div>
            </div>
        </div>
        <div id="commentsContainer">
            <p>Comments</p>
            <div id="userCommentsposted">
                
            </div>
        </div>
        `;

        // likes on pupUp
        const heart = popupTvBox.querySelector(".likes");
        const numberOfLikes = popupTvBox.querySelector(".heartNumber");
        // comments
        const comment = popupTvBox.querySelector(".comments .fa-comment");
        const commentNumber = document.querySelector("#commentNumber")
        comment.addEventListener("click", ()=>{
            commentPart.style.display = "flex";
        })
        let newcommentsArr = blogData.userActions.comments;
        formComment.onsubmit=(e)=>{
            e.preventDefault();
            if(commentedText.value){
                const commentObj={
                    user: user[0].email,
                    comment: commentedText.value
                }
                //bring LS bloga data and change comments
                const userCommentsposted = document.getElementById("userCommentsposted")
                newcommentsArr.push(commentObj);
                commentNumber.innerText = newcommentsArr.length;
                newcommentsArr.forEach(comment=>{
                    userCommentsposted.innerHTML +=`
                    <div>
                        <small>${comment.user}</small>
                        <p>${comment.comment}</p>
                    </div>
                    `
                })
                blogData.userActions.comments = newcommentsArr; //now bklogData changes
                newListOfblogs.splice(index, 1, blogData);
                localStorage.setItem("newListOfblogs", JSON.stringify(newListOfblogs))
                commentPart.style.display = "none";
                commentedText.value = "";
            }else{
                alert("Empty comment!")
            }
        }
        let newthing = JSON.parse(localStorage.getItem("newListOfblogs"))
        console.log(blogData.userActions.comments, "done" );
        const commentsContainer = document.getElementById("commentsContainer");
        if(blogData.userActions.comments.length===0){
            commentsContainer.style.display = "none";
        }
        else{
            commentsContainer.style.display = "flex";
        }
       
        // postMessage
        // likes 
        heart.addEventListener("click", ()=>{
            
            heart.classList.toggle("liked");
            if(heart.classList.contains('liked')){
               
                blogData.userActions.likes++
            }else{
                blogData.userActions.likes--
            }
            // console.log(user)
           let blogDataLikes={
                    title: blogData.title,
                    time: blogData.time,
                    details: blogData.details,
                    img: blogData.img,
                    id:  blogData.id,
                    category: blogData.category,
                    userActions: {
                        views: blogData.userActions.views,
                        likes: blogData.userActions.likes,
                        comments: blogData.userActions.comments
                    }
            }
            const newBlogDataLikes = JSON.parse(localStorage.getItem("newListOfblogs"))
            let index= newBlogDataLikes.indexOf(blogData);
            newBlogDataLikes.splice(index, 1, blogDataLikes);
            localStorage.setItem("newListOfblogs", JSON.stringify(newBlogDataLikes));
        })
       
    }
}
closeComment.addEventListener("click", ()=>{
    commentPart.style.display = "none";
})
const boxes = blogsBox.querySelectorAll(".box")
// console.log(boxes)
boxes.forEach(box=>{
    // likes
    const heart = box.querySelector(".likes .fa-heart");
    const numberOfLikes = box.querySelector(".heartNumber");
    // comments
    const comment = box.querySelector(".comments .fa-comment");
    const commentNumber = box.querySelector(".commentNumber");
    // views
    const numberOfViews = box.querySelector(".eyeNumber");
    const eye = box.querySelector(".views .fa-eye");
    // count    
    let countViews = +numberOfViews.innerText;
    let countlikes = +numberOfLikes.innerText;
    box.addEventListener("click", ()=>{
        countViews++
        numberOfViews.innerText = countViews;
        // console.log(countViews);
    });
})

backBtn.addEventListener("click", ()=>{
    popUp.style.display = "none";
    popupTvBox.innerHTML= "";
})
