const copyRightYear = document.querySelectorAll(".year");
const submitSignUpData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");

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
// get form data
submitSignUpData.addEventListener("click", (e)=>{
    e.preventDefault()
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const passcode = document.getElementById("passcode")
    const passconfirm = document.getElementById("passconfirm")
    const formData={
        name: name.value,
        email: email.value,
        passcode: passcode.value,
        confirmPass: passconfirm.value
    }
    if(formData.name &&
        formData.email &&
        formData.passcode &&
        formData.confirmPass
     ){
        if( formData.passcode ===formData.confirmPass){
            localStorage.setItem("SignedInSuccessfully", JSON.stringify(formData));
            alertMessage.innerHTML="<p>Success!</p>"
            alertMessage.style.display = "flex";
            alertMessage.style.backgroundColor = "green";
        setTimeout(function () {
            alertMessage.style.display = "none";
            alertMessage.style.backgroundColor = "red";
            alertMessage.innerHTML="<p>Fill the missing fields plz!</p>"
         }, 2000); 
         window.location.href= "../SignIn/signIn.html";

        }
        else{
        alertMessage.style.display = "flex";
        alertMessage.innerHTML="<p>Passwords do not match!</p>"
        setTimeout(function () {
            alertMessage.style.display = "none";
            alertMessage.innerHTML="<p>Fill the missing fields plz!</p>"
         }, 2000);  
        }
    }else{
        alertMessage.style.display = "flex"
        setTimeout(function () {alertMessage.style.display = "none"; }, 2000);  

    }
    // const 
})