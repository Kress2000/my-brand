// const body = document.getElementById("body")
const copyRightYear = document.querySelectorAll(".year");
const popUp = document.getElementById("popUp");
const backBtn = document.getElementById("backBtn");
const popupTvBox = document.getElementById("popupBox");
const detail = document.querySelectorAll(".details");
let numbers = document.querySelectorAll(".number")
const blogsBox = document.getElementById("blogsBox"); //blogs box
// Access LS
let blogDataAdd =[];
let storyblogsList =[];
if(blogDataAdd){
    blogDataAdd = JSON.parse(localStorage.getItem("blogDataAdd"));
    storyblogsList = blogDataAdd.filter(blog=>blog.category==="Activities"? blog:null)
}
const messageEmpty = document.getElementById("messageEmpty");
// user loggedin 
const user = JSON.parse(localStorage.getItem("user"));
// users credentials
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
//users infor:
if(user){
    userName.innerText= user.name;
    userEmail.innerText = user.email;
}
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
// console.log(storyblogsList);
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
   const blog= storyblogsList.filter(blog=>blog.id===id? blog: null);
    if(blog){
        let blogData = blog[0]
        const blogfromAllArr= blogDataAdd.filter(blogfromAll=>blogfromAll.id===blogData.id? blogfromAll: null);
        const blogfromAll = blogfromAllArr[0];
        let index= blogDataAdd.indexOf(blogfromAll); // its index from teh whole blogs
        //increase view the blog is viewed
        blogData.userActions.views++
        blogData.userActions.views=blogData.userActions.views;
        blogDataAdd.splice(index, 1, blogData);
        localStorage.setItem("blogDataAdd", JSON.stringify(blogDataAdd)) //save to LS with new views
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
        //list comments--
        let newcommentsArr = blogData.userActions.comments;
        const userCommentsposted = document.getElementById("userCommentsposted");
        userCommentsposted.innerHTML =""  
        newcommentsArr.forEach((comment, commentId)=>{
            const wholecommentId = commentId+1
            const data = {
                blog: blogData,
                comId: wholecommentId,
                indexOfBlogData: index,
                indexOfComment: commentId
            }
            userCommentsposted.innerHTML +=`
            <div class="commentline" id="${wholecommentId}">
                <div>
                    <small>${comment.user}</small>
                    <p>${comment.comment}</p>
                </div>
                <div>
                    <i class="fa-solid fa-trash deleteComent" onclick='deleteComent(${JSON.stringify(data)})' id="${commentId}"></i>
                </div>
            </div>
                `
            // allow only the poster tio delete his comments 
            let deleteComentBtn = document.getElementById(`${commentId}`);
                if(comment.user===user[0].email ||user[0].email==="erickykress1@gmail.com"){
                    deleteComentBtn.style.display = "flex"; //allow to delete
                }else{
                    deleteComentBtn.style.display = "none"; //can not able to delete
                }
        });
        //add comment
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
                localStorage.setItem("blogDataAdd", JSON.stringify(blogDataAdd))
                commentPart.style.display = "none";
                userCommentsposted.innerHTML +=`
                <div class="commentline">
                    <div>
                        <small>${commentObj.user}</small>
                        <p>${commentObj.comment}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash deleteComent"></i>
                    </div>
                </div>
                    `
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
        const heart = document.getElementById("likes"); 
        const likesNumber = document.getElementById("heartNumber")
        heart.addEventListener("click", ()=>{
            let likes = blogData.userActions.likes;
            heart.classList.toggle("liked");
            if(heart.classList.contains('liked')){
                likes++
                
            }else{
                likes--
            }
            blogData.userActions.likes =likes;
                blogDataAdd.splice(index, 1, blogData)
                localStorage.setItem("blogDataAdd", JSON.stringify(blogDataAdd))
            likesNumber.innerText = blogData.userActions.likes;
        })
        // if()
        // Cancel view blog popUp 
        backBtn.addEventListener("click", ()=>{
            popUp.style.display = "none";
            popupTvBox.innerHTML= "";
        }) 
    }
}
// delete a comment
function deleteComent({blog, comId, indexOfBlogData, indexOfComment}){
    //change blog
    blog.userActions.comments.splice(indexOfComment, 1);
    blogDataAdd.splice(indexOfBlogData, 1, blog);
    localStorage.setItem("blogDataAdd", JSON.stringify(blogDataAdd))
    const deleteCommFromDom = document.getElementById(`${comId}`);
    deleteCommFromDom.style.display="none";
}
// footer
copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
});