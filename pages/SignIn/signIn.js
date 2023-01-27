const copyRightYear = document.querySelectorAll(".year");
const submitSignInData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
const email = document.getElementById("email")
const passcode = document.getElementById("passcode")
const getFormData = JSON.parse(localStorage.getItem("SignedInSuccessfully"));


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
        email: email.value,
        passcode: passcode.value,
    }
    //admin dashboard
    if(formData.email.toLowerCase() === "erickykress1@gmail.com" &&
        formData.passcode.toLowerCase() === "kress123")
    {
    window.location.href= "../blogs/AdminDashboard/ViewBlogs/blogs.html"; 
        
    }//user Daashboard
    else{
        //check if this email is already registered
       const user =  getFormData.filter(user=>user.email.toLowerCase() === formData.email.toLowerCase() && user.passcode === formData.passcode?user:null)
        if(user.length !==0){
            // get him in 
            localStorage.setItem("user", JSON.stringify(user)); //to be displayed in blogs dashboard
            //getting user Locations
    //         // if(JSON.parse(localStorage.getItem("locateUser"))===null){
    //         //     localStorage.setItem("locateUser". JSON.stringify([]));
    //         // }
    //         // if('geolocation' in navigator ){
    //         //     navigator.geolocation.getCurrentPosition(position=>{
    //         //         let lng = position.coords.longitude;
    //         //         let lat = position.coords.latitude;
    //         //         let locateUser={
    //         //             user: user,
    //         //             location: {
    //         //                 latitude: lat,
    //         //                 longitude: lng
    //         //             }
    //         //         }
    //         //         localStorage.setItem("locateUser". JSON.stringify(locateUser));
    //         //         const locate = JSON.parse(localStorage.getItem("locateUser"))
    //         //         alert(locate)
                    
    //         //     }, error=>{
    //         //         alert(error.code)
    //         //     })
    // }
            window.location.href= "../blogs/code/blogs.html";
        }
        else{ //edited credentials wrong, can't go in
            alertMessage.style.display = "flex"
            setTimeout(function () {alertMessage.style.display = "none"; }, 2000); 
        }
    }
})