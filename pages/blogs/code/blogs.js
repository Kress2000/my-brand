const copyRightYear = document.querySelectorAll(".year");
const boxes = document.querySelectorAll(".box");
const popUp = document.getElementById("popUp");
const backBtn = document.getElementById("backBtn");
const popupTvBox = document.getElementById("popupBox");
const detail = document.querySelectorAll(".details");
let numbers = document.querySelectorAll(".number")

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
boxes.forEach(box=>{
    const details = box.querySelector(".details");
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
});
// increase likeds and comments
// numbers on icons
numbers.forEach(number=>{
    number.innerText =100;
});


