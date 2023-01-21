const copyRightYear = document.querySelectorAll(".year");
const submitSignUpData = document.getElementById("submitSignUpData");
const alertMessage = document.getElementById("alertMessage");
// when we have the email already
const alreadyThere = document.getElementById("alreadyThere");

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
if(JSON.parse(localStorage.getItem("SignedInSuccessfully"))===null){
    localStorage.setItem("SignedInSuccessfully",JSON.stringify([]));
}
console.log(JSON.parse(localStorage.getItem("SignedInSuccessfully")))
// get form data
submitSignUpData.addEventListener("click", (e)=>{
    e.preventDefault()
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const passcode = document.getElementById("passcode")
    const passconfirm = document.getElementById("passconfirm")
    const regexPatern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regExName = /^[a-z\s/a-z]/gi;
    let formData={
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
        if(formData.name.match(regExName) && formData.email.match(regexPatern)){ //check for name and email validity
            // password must be more than 5 chars
            if(formData.passcode.length >=5){
                // passwords must be equal
                if(formData.passcode === formData.confirmPass){
                    let users = JSON.parse(localStorage.getItem("SignedInSuccessfully"));
                    // when we have the email already
                    if(users){
                        users.forEach(user=>{
                            if(user.email.toLowerCase()===formData.email.toLowerCase()){
                                // console.log(user.email, formData.email)
                                formData =null
                                alreadyThere.style.display = "flex";
                                setTimeout(()=>{
                                    alreadyThere.style.display = "none";
                                }, 2000);
                            }
                        })
                    }
                    console.log("whta's  up")
                    if(formData !==null){
                        users.push(formData);
                        localStorage.setItem("SignedInSuccessfully", JSON.stringify(users));
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
                alertMessage.style.display = "flex";
                alertMessage.innerHTML="<p>Passwords must be 5 characters or more!</p>"
                setTimeout(function () {
                    alertMessage.style.display = "none";
                    alertMessage.innerHTML="<p>Fill the missing fields plz!</p>"
                }, 2000);  
            }

        }else{
            alertMessage.style.display = "flex";
            alertMessage.innerHTML="<p>Your name or Email are not valid!</p>"
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