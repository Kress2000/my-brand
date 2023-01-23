const copyRightYear = document.querySelectorAll(".year");
const boxes = document.querySelectorAll(".box");
const popUp = document.getElementById("popUp");
const backBtn = document.getElementById("backBtn");
const popupTvBox = document.getElementById("popupBox");
const detail = document.querySelectorAll(".details");
let numbers = document.querySelectorAll(".number")
const blogsBox = document.getElementById("blogsBox"); //blogs box
const listOfblogs = JSON.parse(localStorage.getItem("mixedCategories"));
const codeBlogsList = listOfblogs.code;
// message empty
const messageEmpty = document.getElementById("messageEmpty");
// users
const logo = document.getElementById("logo");
const logout = document.getElementById("logout");
//credentials
const userName =document.getElementById("userName") 
const userEmail =document.getElementById("userEmail") 

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
});
document.addEventListener('click', () => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
});

// select box
if(codeBlogsList.length ===0){
    messageEmpty.style.display = "flex";

}else{
    messageEmpty.style.display = "none";
    codeBlogsList.forEach((blog, index)=>{
        blogsBox.innerHTML += `
        <div class="box">
            <div class="img" style="background-image: url('${blog.img}'); background-repeat: no-repeat; background-size: cover; background-position: center;">
            </div>
            <div>
                <strong>${blog.title}</strong>
                <small>${blog.time}</small>
            </div>
            <div class="details">
                <p class="shortDetails">${blog.details}</p>
            </div>
            <div class="userDecision">
                <div class="userBox">
                    <div class="likes">
                        <i class="fa-solclass fa-heart"></i>
                    </div>
                    <div class="number heartNumber" >150</div>
                </div>
                <div class="userBox">
                    <div class="views">
                        <i class="fa-solclass fa-eye"></i>
                    </div>
                    <div class="number eyeNumber" >150</div>
                </div>
                <div class="userBox">
                    <div class="comments">
                        <i class="fa-solclass fa-comment"></i>
                    </div>
                    <div class="number commentNumber">122</div>
                </div>
            </div>
        </div>
        `
        const boxes = document.querySelectorAll(".box")
        boxes.forEach(box=>{

            const shortDetails = box.querySelector(".shortDetails");
            let shortDetailsArray =shortDetails.innerText.split(" ");
            let shortDetailsArrayResume = shortDetailsArray.splice(0, 4)
            const shortDetailsArrayNeeded = shortDetailsArrayResume.join(" ") + "...";
            shortDetails.innerText = shortDetailsArrayNeeded;
            // likes
            const numberOfLikes = box.querySelector(".eyeNumber");
            const heart = box.querySelector(".fa-heart");
            // comments
            const comment = box.querySelector(".fa-comment");
            const commentNumber = box.querySelector(".commentNumber");
            // views
            const numberOfViews = box.querySelector(".eyeNumber");
            const eye = box.querySelector(".fa-eye");
            // count    
            let countViews = 100;
            let countlikes = 100;
            let countcomments = 100;
            
            box.addEventListener("click", ()=>{
                popUp.style.display = "flex";
                popupTvBox.innerHTML= box.innerHTML;
                numberOfViews.innerText = countViews++
                // incease or decrease likes
                heart.addEventListener("click", ()=>{
                    heart.classList.toggle("liked");
                    if(heart.classList.contains("liked")){
                        numberOfLikes.innerText = countlikes++
                    }
                    else{
                        numberOfLikes.innerText = countlikes--
                    }
                })
            })
            backBtn.addEventListener("click", ()=>{
                popUp.style.display = "none";
                popupTvBox.innerHTML= "";
            })
        })
    });
}
// increase likeds and comments
// numbers on icons
numbers.forEach(number=>{
    number.innerText =100;
});


