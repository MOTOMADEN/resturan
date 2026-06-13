let menu = document.querySelector(".phone__menu")
let menuBtn = document.querySelector(".hamberger__menu")
let menuBtnIcon = document.querySelector(".hamberger__menu img")

menuBtn.addEventListener("click",function (){
    if (menuBtnIcon.classList.contains("burgerocon")){
        menu.style.right = "-20px"
        menuBtnIcon.classList = "hiden"
        document.body.style.cursor='grabbing'
    
    } else {
        menu.style.right = "-400px"
        menuBtnIcon.classList = "burgerocon"
        document.body.style.cursor = 'default'
    }
})

// --------------------------------------------------------------

add =document.querySelector(".add"),number =document.querySelector(".number"),mines =document.querySelector(".mines");

var a = 1;

add.addEventListener("click" , ()=>{
    a++
    a = (a < 10) ? "0" + a : a
    number.innerText=a

    if (parseInt(a) > 0) {
        mines.disabled = false;
    }
})

mines.addEventListener("click" , ()=>{
    if (a > 0) {
        a--;
        a = (a < 10) ? "0" + a : a; // Add leading zero if less than 10
        number.innerText = a;
    }

    if (parseInt(a) === 0) {
        mines.disabled = true;
    }
})
if (a === 0) {
    mines.disabled = true;
}


// ---------------------------------------------------- 

xpage = document.querySelector(".x__page");

xpage.addEventListener("click",()=>{
    window.location.href = "https://x.com/Khamenei_m";
})



xpage = document.querySelector(".youtube__page");

xpage.addEventListener("click",()=>{
    window.location.href = "https://www.youtube.com/@Matarzak/community";
})



xpage = document.querySelector(".instagram__page");

xpage.addEventListener("click",()=>{
    window.location.href = ("https://www.instagram.com/elias_1d/?utm_source=ig_web_button_share_sheet");
})