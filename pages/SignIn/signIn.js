const copyRightYear = document.querySelectorAll(".year");
const submitSignInData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
const nameUser = document.getElementById("name")
const email = document.getElementById("email")
const passcode = document.getElementById("passcode")
const getFormData = JSON.parse(localStorage.getItem("SignedInSuccessfully"));
// changing Sign in input data
email.value = getFormData.email;
passcode.value = getFormData.passcode;
nameUser.value = getFormData.name;

copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
})
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
// get form data from local storage
submitSignInData.addEventListener("click", (e)=>{
    e.preventDefault();
    const formData={
        name: nameUser.value,
        email: email.value,
        passcode: passcode.value,
    }
    if(formData.name === getFormData.name &&
        formData.email === getFormData.email&&
        formData.passcode === getFormData.passcode 
     ){
        window.location.href= "../blogs/AdminDashboard/ViewBlogs/blogs.html";
        
    }else{
        window.location.href= "#";
        alertMessage.style.display = "flex"
        setTimeout(function () {alertMessage.style.display = "none"; }, 2000); 
    }
    // const 
})