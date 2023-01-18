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

// get uploaded img
let image = []
let imgUrl = ""
uploadImg.addEventListener("change", ()=>{
    const filechosen=  uploadImg.files;
    image = [filechosen[0]];
    const displayImg = ()=>{
        image.forEach((img) => {
            const url = `url('${URL.createObjectURL(img)}')`
            tv.style.backgroundImage = url;
            tv.style.backgroundRepeat = "no-repeat";
            imgUrl =URL.createObjectURL(img);
        })
    }
    displayImg();
})
// submit data to local storage
createBlogBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    // create time when the blog is created
    const time = new Date();
    const date = time.toDateString();
    let blogDataArray=[]
    const blogData={
        title: title.value,
        category: category.value,
        details: details.value,
        img: imgUrl,
        time: date
    }
    // blog data must not be empty
    if(blogData.title &&
        blogData.category &&
        blogData.details &&
        blogData.img 
    ){
        blogDataArray = JSON.parse(localStorage.getItem("blogDataAdd"));
        blogDataArray.push(blogData);
        localStorage.setItem("blogDataAdd", JSON.stringify(blogDataArray));
        messageAlertSuccess.style.display = "flex";
        setTimeout(()=>{
        messageAlertSuccess.style.display = "none";
        // clean fields
            title.value= "";
            category.value= "";
            details.value= "";
            tv.style.backgroundImage = ""
        }, 2000)
    }else{
        messageAlert.style.display = "flex"
        setTimeout(()=>{
            messageAlert.style.display = "none"
        }, 2000)

    }
})
