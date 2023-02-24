const copyRightYear = document.querySelectorAll(".year");
// inputs form
const title = document.getElementById("title");
const category = document.getElementById("category");
const details = document.getElementById("details");
// user account
const accountUser = document.getElementById("accountUser");
const logout = document.getElementById("logout");

// logout rights
accountUser.addEventListener("mouseover", () => {
    logout.style.display = "flex";
  });
  logout.addEventListener("mouseover", () => {
    logout.style.display = "flex";
  });
  logout.addEventListener("click", () => {
    logout.style.display = "none";
  });
  logout.addEventListener("mouseleave", () => {
    logout.style.display = "none";
  });
  copyRightYear.forEach((year) => {
    const time = new Date();
    const timeYear = time.getFullYear();
    year.innerText = timeYear;
  });
  // cursor
  const cursor = document.querySelector(".cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.setAttribute(
      "style",
      "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
    );
  });
  document.addEventListener("click", () => {
    cursor.classList.add("expand");
    setTimeout(() => {
      cursor.classList.remove("expand");
    }, 500);
  });
const lists = document.getElementById("lists");
let users=[]
fetch("https://nsanzimfura-server.up.railway.app/mybrand/api/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if(data){
        data.forEach(user => {
            lists.innerHTML +=`
            <div class="info">
            <div class="info_box">
                <div class="info_">Name: <span class="input"> ${user.name}</span> </div>
                <div class="info_">mail: <span class="input"> ${user.email}</span> </div>
                <div class="info_">Password: <span class="input pass"> ${user.password}</span> </div>
                <div class="info_">_id: <span class="input"> ${user._id}</span> </div>
            </div>
            <div class="actions">
                <button onclick="handleDelete(${user._id})">Delete user</button>
            </div>
        </div>`

            
        });
    }
  })
  .catch((err) => console.log(err));

  const handleDelete = async(id)=>{
      console.log(id) 
  }
