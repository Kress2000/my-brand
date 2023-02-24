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
// let resUser = [];

const lists = document.getElementById("lists");
const getDataUsers= async()=>{
  const usersfetch = await fetch("https://nsanzimfura-server.up.railway.app/mybrand/api/users");
  const resUser = await usersfetch.json();
  // resUser.forEach((user, i) => {
    console.log(resUser)
   for(let i in resUser){
     lists.innerHTML += `
          <div class="info" id="${resUser[i]._id}">
          <div class="info_box">
              <div class="info_">Name: <span class="input"> ${resUser[i].name}</span> </div>
              <div class="info_">mail: <span class="input"> ${resUser[i].email}</span> </div>
              <div class="info_">Password: <span class="input pass"> ${resUser[i].password}</span> </div>
              <div class="info_">_id: <span class="input"> ${resUser[i]._id}</span> </div>
          </div>
          <div class="actions">
              <button onclick="handleDelete('${resUser[i]._id}')">Delete user</button>
          </div>
      </div>`;

   }
}
getDataUsers();

  const handleDelete = (id) => {
      fetch(`https://nsanzimfura-server.up.railway.app/mybrand/api/users/${id}`, {method: "DELETE"})
    .then(resp=> resp.json())
    .then(ans=>console.log({message: "User deleted successfully", user: ans}));
    const ids= document.getElementById(id);
    ids.style.opacity = 0.1;
    setTimeout(()=>{
      ids.style.display = "none";
    }, 1000)
  
  };
