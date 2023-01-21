const copyRightYear = document.querySelectorAll(".year");
const submitSignInData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
const nameUser = document.getElementById("name")
const email = document.getElementById("email")
const passcode = document.getElementById("passcode")
const getFormData = JSON.parse(localStorage.getItem("SignedInSuccessfully"));
// const credentialsAdmin = JSON.parse(localStorage.getItem("credentialsAdmin"));
// changing Sign in input data
getFormData.forEach(data=>{

})
// email.value = getFormData[getFormData.length-1].email;
// passcode.value = getFormData[getFormData.length-1].passcode;
// nameUser.value = getFormData[getFormData.length-1].name;

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
    //admin dashboard
    if(formData.name.toLowerCase() === "nsanzimfura eric" &&
        formData.email.toLowerCase() === "erickykress1@gmail.com" &&
        formData.passcode.toLowerCase() === "kress123")
    {
    window.location.href= "../blogs/AdminDashboard/ViewBlogs/blogs.html"; 
        
    }//user Daashboard
    else{
        //check if this email is already registered
       const user =  getFormData.filter(user=>user.email.toLowerCase() === formData.email.toLowerCase() && user.name.toLowerCase() === formData.name.toLowerCase() && user.passcode === formData.passcode?user:null)
        if(user.length !==0){
            // get him in 
            localStorage.setItem("user", JSON.stringify(user)); //to be displayed in blogs dashboard
            window.location.href= "../blogs/code/blogs.html";
        }
        else{ //edited credentials wrong, can't go in
            alertMessage.style.display = "flex"
            setTimeout(function () {alertMessage.style.display = "none"; }, 2000); 
        }
    }
})