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
