const headerTitle = document.querySelector('.header-title');
const subtitle = document.querySelector('.subtitle');
const illustration = document.querySelector('#illustration');
const aside = document.querySelector('aside');
const rows = document.querySelectorAll('.row');
const links = document.querySelectorAll('.links a');
const menuText = document.querySelector('.menu p');
const menu = document.querySelector('.links-wrapper');

// INFO ELEMENTS
const info = document.querySelector('#info');
const infoTitle = document.querySelector('.info-title');
const scheduleCards = document.querySelectorAll('.schedule-card');
// PAGE LOAD ANIMATION

const timeline = gsap.timeline({ defaults:  { duration: 1 }});
timeline.from(headerTitle, { y: '-60px', opacity: 0, duration: 1 })
  .from(subtitle, { y: '-60px', opacity: 0, duration: 1 }, "-=.65")
  .from(illustration, { y: '120px', opacity: 0, duration: .75 }, "-=.65")
  .to(aside, { backgroundPosition: "0px 0px", duration: .75 }, "-=.5");

// ANIMATE MENU ICON 
let showMenu = false;
const menuBtn = document.querySelector('.menu');

const line1 = document.querySelector('.line-1');
const line2 = document.querySelector('.line-2');
const line3 = document.querySelector('.line-3');

const menuTl = gsap.timeline({ paused: true, reversed: true });
  menuTl.to(line1, .15, { y: "5.3px", rotation: 45,  width: '22px', background: '#fff' })
    .to(line3, .15, { y: "-5.3px", rotation: -45, width: '22px', background: '#fff' }, "-=.15")
    .to(line2, { width: "0px" }, "-=.3")
    .to(menuText, { color: '#fff' }, "+=.2")
    .from(rows, .6,{ y: '-200%', opacity: 0, stagger: .15 }, "-=.12")
    .from(links, .4, { x: "200px", opacity: 0, stagger: .1 }, "-=.22")
    .to(menu, .01, { display: 'block' }, "-=1.6");


menuBtn.addEventListener('click', e => {
  if(menuTl.isActive()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
  showMenu = !showMenu;
  // showMenu ? menuText.innerHTML = 'CLOSE' : menuText.innerHTML = 'MENU';
  if(!showMenu) {
    menuTl.reverse();
    menuText.innerHTML = 'MENU';
  } else {
    menuTl.play();
    menuText.innerHTML = 'CLOSE';
  }
});

// ANIMATION ON HOVER / OUT MENU ICON

menuBtn.addEventListener('mouseover', e => {
  if(menuTl.isActive()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
  if(!showMenu) {
    const menuHover = gsap.timeline();
    menuHover.to(line1, .05, { width: '22px' })
      .to(line3, .05, { width: '16px' }, "-=.05");    
  }  
});

menuBtn.addEventListener('mouseout', e => {
  if(menuTl.isActive()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
  if(!showMenu) {
    const menuOut= gsap.timeline();
    menuOut.to(line1, .05, { width: '16px' })
      .to(line3, .05, { width: '22px' }, "-=.05");
  }  
});

// ANIMATE LINKS HOVER

links.forEach(link => {
  link.addEventListener('click', () => {
    showMenu = false;
    showMenu ? menuText.innerHTML = 'CLOSE' : menuText.innerHTML = 'MENU';
    if(!showMenu) {
      menuTl.reverse();
    } else {
      menuTl.play();
    }
  });

  link.addEventListener('mouseover', e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const linkHover = gsap.timeline();
      linkHover.to(link, .3 , { scaleX: 1.15, color: 'transparent' });
  });

  link.addEventListener('mouseout', e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const linkHover = gsap.timeline();
      linkHover.to(link, .3 , { scaleX: 1, color: '#fff' });
  });
});

// LANDING PAGE ANIMATIONS ON SCROLL
const landingAnimation = gsap.timeline({ defaults:  { duration: .5 }});
landingAnimation.from(scheduleCards, { opacity: 0, y: "200px", stagger: .1 }, "-=.45");

const landingCtrl = new ScrollMagic.Controller();
let landingScene = new ScrollMagic.Scene({
  triggerElement: infoTitle,
  triggerHook: 1,
  duration: 400,
})
  .addIndicators()
  .setTween(landingAnimation)
  .addTo(landingCtrl);

// MAP 
var map = L.map('map').setView([10.018781, -84.341831], 12);
map.scrollWheelZoom.disable();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([10.018781, -84.341831]).addTo(map)