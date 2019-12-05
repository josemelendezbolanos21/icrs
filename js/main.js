  const browserLanguage = navigator.language || navigator.userLanguage;
  let isEnglish = true;
  if(browserLanguage.startsWith('es')) {
    isEnglish = false;
    // enBtn.checked = false;
    // esBtn.checked = true;
  } else {
    isEnglish = true;
    // enBtn.checked = true;
    // esBtn.checked = false;
  }


window.addEventListener('load', () => {
  // REMOVE PRELOADER
  const preloader = document.querySelector('.preloader');
  // preloader.classList.add('loaded');

  // HEADER ELEMENTS
  const headerTitle = document.querySelector('.header-title');
  // isEnglish ? headerTitle.innerHTML = 'GOD LOVES YOU' : 'DIOS TE AMA'; 
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

  const timeline = gsap.timeline({ defaults:  { duration: 1 }});
  timeline.from(headerTitle, { y: '-60px', opacity: 0, duration: 1 })
    .from(subtitle, { y: '-60px', opacity: 0, duration: 1 }, "-=.65")
    .from(illustration, { y: '120px', opacity: 0, duration: .75 }, "-=.65")
    .to(aside, { backgroundPosition: "0px 0px", duration: .75 }, "-=.5");

  // ANIMATE MENU ICON 
  let showMenu = false;
  const nav = document.querySelector('.nav');
  const menuBtn = document.querySelector('.menu');

  const line1 = document.querySelector('.line-1');
  const line2 = document.querySelector('.line-2');
  const line3 = document.querySelector('.line-3');

  const menuTl = gsap.timeline({ paused: true, reversed: true });
    menuTl
      .to(line2, .05, { width: "0px" })
      .to(line1, .1, { y: "5.3px", rotation: 45,  width: '22px', background: '#fff' })
      .to(line3, .1, { y: "-5.3px", rotation: -45, width: '22px', background: '#fff' }, "-=.1")
      .to(nav, .1, { background: 'transparent' })
      .to(menuText, { color: '#fff' })
      .from(rows, .4,{ y: '-200%', opacity: 0, stagger: .1 }, "-=.15")
      .from(links, .4, { x: "200px", opacity: 0, stagger: .1 }, "-=.25")
      .to(menu, .01, { opacity: 1, pointerEvents: 'all' }, "-=1");


  menuBtn.addEventListener('click', e => {
    if(menuTl.isActive()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
    showMenu = !showMenu;
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
    triggerHook: 0.75,
    duration: 400,
  })
    .setTween(landingAnimation)
    .addTo(landingCtrl);

  // MAP 
  var map = L.map('map', { dragging: false }).setView([10.018781, -84.341831], 12);
  map.scrollWheelZoom.disable();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([10.018781, -84.341831]).addTo(map);

  // MINISTERIES ANIMATIONS
  const ministerieList = document.querySelectorAll('.ministerie');
  let min1 = new ScrollMagic.Scene({
    triggerElement: ministerieList[0],
    triggerHook: 0.3
  })
    .setClassToggle('#i1', 'show-i')
    .addTo(landingCtrl);

  const ministerieImgs = document.querySelectorAll('.ministerie img');
  const ministerieCards = document.querySelectorAll('.ministeries .card');

  const min1Tl = gsap.timeline();
  min1Tl.from(ministerieImgs[0], { opacity: 0, y: 250 })
    .from(ministerieCards[0], { opacity: 0, y: 400 });

  let min1Scene = new ScrollMagic.Scene({
    triggerElement: ministerieList[0],
    triggerHook: 0.7,
    duration: '80%',
  })
    .setTween(min1Tl)
    .addTo(landingCtrl)

  const min2Tl = gsap.timeline();
  min2Tl.from(ministerieImgs[1], { opacity: 0, y: 250 })
    .from(ministerieCards[1], { opacity: 0, y: 400 });

  let min2Scene = new ScrollMagic.Scene({
      triggerElement: ministerieList[1],
      triggerHook: 0.7,
      duration: '80%',
    })
      .setTween(min2Tl)
      .addTo(landingCtrl);

  let min2 = new ScrollMagic.Scene({
    triggerElement: ministerieList[1],
    triggerHook: 0.3
  })
    .setClassToggle('#i2', 'show-i')
    .addTo(landingCtrl); 

  let min3 = new ScrollMagic.Scene({
    triggerElement: ministerieList[2],
    triggerHook: 0.3
  })
    .setClassToggle('#i3', 'show-i')
    .addTo(landingCtrl);

  const min3Tl = gsap.timeline();
  min3Tl.from(ministerieImgs[2], { opacity: 0, y: 250 })
    .from(ministerieCards[2], { opacity: 0, y: 400 });

  let min3Scene = new ScrollMagic.Scene({
      triggerElement: ministerieList[2],
      triggerHook: 0.7,
      duration: '80%',
    })
      .setTween(min3Tl)
      .addTo(landingCtrl);

  let min4 = new ScrollMagic.Scene({
    triggerElement: ministerieList[3],
    triggerHook: 0.3
  })
    .setClassToggle('#i4', 'show-i')
    .addTo(landingCtrl);

  const min4Tl = gsap.timeline();
  min4Tl.from(ministerieImgs[3], { opacity: 0, y: 250 })
    .from(ministerieCards[3], { opacity: 0, y: 400 });

  let min4Scene = new ScrollMagic.Scene({
      triggerElement: ministerieList[3],
      triggerHook: 0.7,
      duration: '80%',
    })
      .setTween(min4Tl)
      .addTo(landingCtrl);

  let min5 = new ScrollMagic.Scene({
    triggerElement: ministerieList[4],
    triggerHook: 0.3
  })
    .setClassToggle('#i5', 'show-i')
    .addTo(landingCtrl);

  const min5Tl = gsap.timeline();
  min5Tl.from(ministerieImgs[4], { opacity: 0, y: 250 })
    .from(ministerieCards[4], { opacity: 0, y: 400 });

  let min5Scene = new ScrollMagic.Scene({
      triggerElement: ministerieList[4],
      triggerHook: 0.7,
      duration: '80%',
    })
      .setTween(min5Tl)
      .addTo(landingCtrl);

  
  // PARTNER ANIMATIONS
  const partnerText = document.querySelectorAll('.partner-text');
  const partnerTl = gsap.timeline({ defaults: { duration: 1 }});
  partnerTl.from(partnerText, { opacity: 0, y: -50, stagger: .25 });

  const partnerCtrl = new ScrollMagic.Controller();
  let partnerScene = new ScrollMagic.Scene({
    triggerElement: partners,
    triggerHook: .5
  })
  .setTween(partnerTl)
  .addTo(partnerCtrl);

  const year = document.querySelector('.year');
  year.innerHTML = new Date().getFullYear();

}); // DOCUMENT LOADED