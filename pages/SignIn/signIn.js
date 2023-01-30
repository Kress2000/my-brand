const copyRightYear = document.querySelectorAll(".year");
const submitSignInData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
const email = document.getElementById("email")
const passcode = document.getElementById("passcode")
//  users fron LS
const getFormData = JSON.parse(localStorage.getItem("SignedInSuccessfully"));
let lastUser= getFormData.filter(user=> user===getFormData[getFormData.length -1])
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
email.value = lastUser[0].email;
passcode.value = lastUser[0].passcode;
const formData={
    email: email.value,
    passcode: passcode.value,
}
// get form data from local storage
submitSignInData.addEventListener("click", (e)=>{
    e.preventDefault();
    //admin dashboard
    if(formData.email.toLowerCase() === "erickykress1@gmail.com" &&
        formData.passcode.toLowerCase() === "kress123")
    {
        window.location.href= "../blogs/AdminDashboard/ViewBlogs/blogs.html"; 
    }//user Daashboard
    else{
        //check if this email is already registered first
       getFormData.forEach(user=>{
            if(user.email.toLowerCase() === formData.email.toLowerCase() && user.passcode === formData.passcode){
                alertMessage.style.display = "none";
                //getting user Locations
                if('geolocation' in navigator ){
                    navigator.geolocation.getCurrentPosition(position=>{
                        let lng = position.coords.longitude;
                        let lat = position.coords.latitude;
                        let locateUser={
                            user: user,
                            location: {
                                lat: lat,
                                lng: lng
                            }
                        }
                        localStorage.setItem("locateUser". JSON.stringify(locateUser));
                    }, error=>{
                        localStorage.setItem("locateUser". JSON.stringify(error));
                    })
                }
                localStorage.setItem("user", JSON.stringify(user)); //to be displayed in blogs dashboard
                window.location.href= "../blogs/code/blogs.html";
            }else{//edited credentials wrong, can't go in
                alertMessage.style.display = "flex";
                setTimeout(function () {alertMessage.style.display = "none"; }, 2000); 
            }
        })
    }
})
copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
})
