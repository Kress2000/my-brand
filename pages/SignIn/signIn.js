const copyRightYear = document.querySelectorAll(".year");

copyRightYear.forEach(year=>{
    const time = new Date()
    const timeYear = time.getFullYear();
    year.innerText= timeYear;
})