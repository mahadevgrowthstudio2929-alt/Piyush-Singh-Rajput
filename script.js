/* ==========================================
   PIYUSH SINGH RAJPUT
   PREMIUM LANDING PAGE
   Developed By Mahadev Growth Studio
========================================== */


/* ==============================
   SCROLL REVEAL
============================== */

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.15});

document.querySelectorAll(".card,.feature,.hero-content,.cta").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});


/* ==============================
   CUSTOM CURSOR GLOW
============================== */

const glow=document.createElement("div");

glow.className="mouse-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});


/* ==============================
   FLOATING PARTICLES
============================== */

for(let i=0;i<35;i++){

let particle=document.createElement("span");

particle.className="particle";

particle.style.left=Math.random()*100+"%";

particle.style.animationDuration=

(5+Math.random()*6)+"s";

particle.style.animationDelay=

Math.random()*5+"s";

particle.style.opacity=Math.random();

document.body.appendChild(particle);

}


/* ==============================
   RIPPLE BUTTON EFFECT
============================== */

document.querySelectorAll(".join-btn,.agency-btn")

.forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

ripple.className="ripple";

ripple.style.left=e.offsetX+"px";

ripple.style.top=e.offsetY+"px";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});


/* ==============================
   HERO PARALLAX
============================== */

const hero=document.querySelector(".hero-content");

document.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/40;

const y=(window.innerHeight/2-e.clientY)/40;

hero.style.transform=

`translate(${x}px,${y}px)`;

});


/* ==============================
   CARD 3D TILT
============================== */

document.querySelectorAll(".card,.feature")

.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=((y/rect.height)-0.5)*-12;

const rotateY=((x/rect.width)-0.5)*12;

card.style.transform=

`rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

scale(1.04)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"rotateX(0deg) rotateY(0deg) scale(1)";

});

});


/* ==============================
   AUTO BUTTON GLOW
============================== */

setInterval(()=>{

document.querySelectorAll(".join-btn")

.forEach(btn=>{

btn.classList.add("pulse");

setTimeout(()=>{

btn.classList.remove("pulse");

},1000);

});

},3500);


/* ==============================
   SMOOTH SCROLL
============================== */

document.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

anchor.addEventListener("click",

function(e){

e.preventDefault();

const target=document.querySelector(

this.getAttribute("href")

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/* ==============================
   FADE HEADER ON SCROLL
============================== */

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

header.style.background="rgba(0,0,0,.65)";

header.style.backdropFilter="blur(15px)";

header.style.transition=".4s";

}else{

header.style.background="transparent";

header.style.backdropFilter="blur(0px)";

}

});


/* ==============================
   PAGE LOADER EFFECT
============================== */

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});


/* ==============================
   CONSOLE BRANDING
============================== */

console.clear();

console.log("%cMAHADEV GROWTH STUDIO",
"font-size:22px;color:#00ff66;font-weight:bold;");

console.log("%cLanding Page Loaded Successfully 🚀",
"font-size:14px;color:white;");
