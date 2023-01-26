const body = document.getElementById("body")
const copyRightYear = document.querySelectorAll(".year");
const popUp = document.getElementById("popUp");
const backBtn = document.getElementById("backBtn");
const popupTvBox = document.getElementById("popupBox");
const detail = document.querySelectorAll(".details");
let numbers = document.querySelectorAll(".number")
const blogsBox = document.getElementById("blogsBox"); //blogs box
// Access LS
const blogDataAdd = JSON.parse(localStorage.getItem("blogDataAdd"));
const listOfblogs = JSON.parse(localStorage.getItem("mixedCategories"));
const storyblogsList = listOfblogs.story;
const messageEmpty = document.getElementById("messageEmpty");
// user loggedin 
const user = JSON.parse(localStorage.getItem("user"));
// users
const logo = document.getElementById("logo");
const logout = document.getElementById("logout");
//credentials
const userName =document.getElementById("userName") 
const userEmail =document.getElementById("userEmail");
// comment part 
const commentPart = document.getElementById("commentPart");
const closeComment = document.getElementById("closeComment")
const formComment = document.getElementById("formComment");
const commentedText = document.getElementById("comment-area");
console.log(user)
body.style.overflow= "auto";
//users infor:
userName.innerText= user[0].name;
userEmail.innerText = user[0].email;
logo.addEventListener("click", ()=>{
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
}else{
    messageEmpty.style.display = "none";
}
console.log(storyblogsList);
storyblogsList.forEach(blog=>{
        blogsBox.innerHTML += `
        <div class="box" onclick="clickedBox(${blog.id})">
            <div class="img" style="background-image: url('${blog.img}'); background-repeat: no-repeat; background-size: cover; background-position: center;">
            </div>
            <div>
                <strong>${blog.title}</strong>
                <small>${blog.time}</small>
            </div>
            <div class="details">
                <p class="shortDetails">${blog.details.split(" ").splice(0, 3).join(" ")}...</p>
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
    }
)
function clickedBox (id){
    body.style.overflow = "hidden";
   const blog= storyblogsList.filter(blog=>blog.id===id? blog: null);
    if(blog){
        let blogData = blog[0]
        let index= blogDataAdd.indexOf(blogData); // its index from teh whole blogs
        blogData.userActions.views++
        popUp.style.display = "flex";
        popupTvBox.innerHTML =`
            <div class="box">
            <div class="titleBox">
                <div class="img">
                    <img src="${blogData.img}" alt="Image cover">
                </div>
                <div>
                    <div class="titleintro">
                        <strong>${blogData.title}</strong>
                        <small>${blogData.time}</small>
                    </div>
                    <div class="details">
                        <p class="shortDetails">${blogData.details}</p>
                     </div>
                </div>
            </div>
            <div class="userDecision">
                <div class="subBox">
                    <div class="likes" id="likes">
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
        // comments
        const comment = popupTvBox.querySelector(".comments .fa-comment");
        const commentNumber = document.querySelector("#commentNumber")
        comment.addEventListener("click", ()=>{
            commentPart.style.display = "flex";
        })
        let newcommentsArr = blogData.userActions.comments;
        const userCommentsposted = document.getElementById("userCommentsposted")
        newcommentsArr.forEach((comment, commentId)=>{
            userCommentsposted.innerHTML +=`
            <div class="commentline" id="${commentId}">
                <small>${comment.user}</small>
                <p>${comment.comment}</p>
                <div>
                </div>
                <i class="fa-solid fa-trash deleteComent" onclick="deleteComent(${blogData.id, commentId})" id="${commentId}"></i>
            </div>
                `
            // allow only the poster tio delete his comments 
            const deleteComent = document.querySelectorAll(".deleteComent");
            deleteComent.forEach(commentofUser=>{
                if(comment.user===user[0].email){
                    commentofUser.style.display = "flex"; //allow to delete
                }else{
                    commentofUser.style.display = "none"; //can not able to delete
                }
            })
        });
        formComment.onsubmit=(e)=>{
            e.preventDefault();
            if(commentedText.value){
                const commentObj={
                    user: user[0].email,
                    comment: commentedText.value
                }
                //bring LS bloga data and change comments
                newcommentsArr.push(commentObj);
                commentNumber.innerText = newcommentsArr.length;
                blogData.userActions.comments = newcommentsArr; //now bklogData changes
                blogDataAdd.splice(index, 1, blogData);
                commentPart.style.display = "none";
                commentedText.value = "";
            }else{
                alert("Empty comment!")
            }
        }
        //show comments if they are there
        const commentsContainer = document.getElementById("commentsContainer");
        if(blogData.userActions.comments.length===0){
            commentsContainer.style.display = "none";
        }else{
            commentsContainer.style.display = "flex";
            popupTvBox.style.minHeight = "120vh"
        }
        // close comment 
        closeComment.addEventListener("click", ()=>{
            commentPart.style.display = "none";
        })
        // likes increase or decrease
        // let newLikesNumber = blogData.userActions.likes
        const heart = document.getElementById("likes"); 
        heart.addEventListener("click", ()=>{
            heart.classList.toggle("liked");
            if(heart.classList.contains('liked')){
                blogData.userActions.likes++
            }else{
                blogData.userActions.likes--
            }
        })
        console.log("Likes: ", blogData.userActions.likes)
        
        // let blogDataLikes={
        //          title: blogData.title,
        //          time: blogData.time,
        //          details: blogData.details,
        //          img: blogData.img,
        //          id:  blogData.id,
        //          category: blogData.category,
        //          userActions: {
        //              views: blogData.userActions.views,
        //              likes: blogData.userActions.likes,
        //              comments: blogData.userActions.comments
        //          }
        //  }
        //  blogDataAdd.splice(index, 1, blogDataLikes);
        // Cancel view blog popUp 
        backBtn.addEventListener("click", ()=>{
            popUp.style.display = "none";
            popupTvBox.innerHTML= "";
            console.log("clicked")
        }) 
    }
    
    
}
// delete a comment
function deleteComent(blogId, commentId){
    console.log(commentId)
    const deleteId = document.getElementById(`${commentId}`);
    deleteId.style.display="none";
}

// const boxes = blogsBox.querySelectorAll(".box")
// // console.log(boxes)
// boxes.forEach(box=>{
//     // likes
//     const heart = box.querySelector(".likes .fa-heart");
//     const numberOfLikes = box.querySelector(".heartNumber");
//     // comments
//     const comment = box.querySelector(".comments .fa-comment");
//     const commentNumber = box.querySelector(".commentNumber");
//     // views
//     const numberOfViews = box.querySelector(".eyeNumber");
//     const eye = box.querySelector(".views .fa-eye");
//     // count    
//     let countViews = +numberOfViews.innerText;
//     let countlikes = +numberOfLikes.innerText;
//     box.addEventListener("click", ()=>{
//         countViews++
//         numberOfViews.innerText = countViews;
//     });
// })
// footer
copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
});