// constants 
const navBar = document.getElementById("nav-section");
const navLinks = document.querySelectorAll(".nav-links");
const navATags = document.querySelectorAll(".nav-links  a");
const smallNav = document.getElementById("small-nav");
const copyRightYear = document.querySelectorAll(".year");
// btns
const hambaga = document.getElementById("hambaga");
const closeBtn = document.getElementById("close-box");
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
// navbar hover on a tags
const navbarHover = ()=>{
    navLinks.forEach((li)=>{
        navATags.forEach(aTag=>{
            aTag.style.color = "white";
     })
        li.addEventListener("mouseover", ()=>{
            navATags.forEach(aTag=>{
                aTag.classList.remove("purpledcolor");
                aTag.style.color = "hsla(0, 0%, 100%, .3";
             })
         })
         li.addEventListener("mouseout", ()=>{
             navATags.forEach(aTag=>{
                 aTag.style.color = "white";
          })
     })
     })
     navATags.forEach(hoveredTag =>{
         hoveredTag.addEventListener("mouseover", ()=>{
             hoveredTag.setAttribute("id", "hovered");
         })
         hoveredTag.addEventListener("mouseout", ()=>{
             hoveredTag.removeAttribute("id");
         })
     })
}
navbarHover();
const navBarHoverScrolling = ()=>{
    const stictyNavLinks = document.querySelectorAll(".sticky .nav-links");
    const stickyNavATags = document.querySelectorAll(".sticky .nav-links li a");
    stictyNavLinks.forEach((li)=>{
        li.addEventListener("mouseover", ()=>{
            stickyNavATags.forEach(aTag=>{
                aTag.classList.add("purpledcolor");
             })
         })
         li.addEventListener("mouseout", ()=>{
            stickyNavATags.forEach(aTag=>{
                aTag.classList.remove("purpledcolor");
                 aTag.style.color = "#A40FFF";
          })
     })
     })
     stickyNavATags.forEach(hoveredTag =>{
         hoveredTag.addEventListener("mouseover", ()=>{
             hoveredTag.setAttribute("id", "hoveredSticky");
         })
         hoveredTag.addEventListener("mouseout", ()=>{
             hoveredTag.removeAttribute("id");
         })
     })
}
// Set active link nav tag
navATags.forEach(aTag=>{
    aTag.addEventListener("click", ()=>{
        aTag.classList.add("active");
        let active = document.querySelectorAll(".active");
        if(active.length>1){
            for(let i=0;  i <active.length; i++){
                active[0].classList.remove("active");
            }
        }
    });
})
// click on small navbar screens

// sticky navbar bottom
let sticky = navBar.offsetTop;
window.addEventListener("scroll", ()=>{
    const countScroll = window.innerHeight + window.scrollY;
    const countOffset= document.body.offsetHeight;
    // console.log("scroll: ", countScroll, "Offset: ", countOffset, "Top: ", sticky, "Compare: ", window.scrollY )
    if (window.scrollY >= sticky) {    
        navBar.classList.add("sticky");
        navBarHoverScrolling();
    }
    else if(window.scrollY < sticky || countScroll < countOffset ) {
        navBar.classList.remove("sticky");  
        navBar.classList.remove("stickyTop");  
        navbarHover();
    }
    if(countScroll >= countOffset){
        navBar.classList.remove("sticky");  
        navBar.classList.add("stickyTop");  
        navBarHoverScrolling();
    }
});
// Min screens navbar
hambaga.addEventListener("click", ()=>{
    smallNav.style.display = "none";
    navBar.style.display = "flex";
});
closeBtn.addEventListener("click", ()=>{
    smallNav.style.display = "flex";
    navBar.style.display = "none";
})
// copy right years
copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
})




