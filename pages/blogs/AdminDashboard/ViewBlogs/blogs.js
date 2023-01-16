const copyRightYear = document.querySelectorAll(".year");
const mixListbox = document.getElementById("mix-listbox");
const blogCategories = mixListbox.querySelectorAll(".list-category");
const tvBarBlogEdit = document.getElementById("tvBarBlogEdit");
const cancelEditAction = document.getElementById("cancelEditAction");
const SaveEditAction = document.getElementById("saveEditAction");
const blogBox = document.getElementById("blogsBox");

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
// blogs inside
blogCategories.forEach(category=>{
    const listbox = category.querySelector(".listbox");
    const bars = listbox.querySelectorAll(".bar");
    bars.forEach(bar=>{
        const deleteBtn = bar.getElementsByClassName("delete");
        const editBtn = bar.getElementsByClassName("edit");
        deleteBtn[0].addEventListener("click", ()=>{
            bar.style.display = "none";
        })


        editBtn[0].addEventListener("click", ()=>{
            tvBarBlogEdit.style.display = "flex";
            const title = bar.getElementsByTagName("h1")
            const details = bar.getElementsByTagName("textarea")
            console.log(title[0].outerText)
            blogBox.innerHTML = `
                            <div class="textsInputs">
                                <input type="text" id="title" value='${title[0].outerText}' >
                                <textarea rows="4" cols="50" id="details" name="details" value='${details.outerText}'></textarea>
                            </div>
                            <div class="uploadBox">
                                <div class="tv" 
                                style=" background-image: url('../../../../img/blogs/car.png");
                                        background-position: cover;
                                '>            
                                </div>
                                <span class="upload">Upload a cover</span>
                            </div>
                        `

        })

    })
})
cancelEditAction.addEventListener("click", (e)=>{
    e.preventDefault();
    tvBarBlogEdit.style.display = "none";
})


