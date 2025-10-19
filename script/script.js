function isElementVisible(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  var eightyPercentWindowHeight = windowHeight * 0.8;
  return rect.top <= eightyPercentWindowHeight && rect.bottom >= 0;
}

var elements = document.querySelectorAll(".fade-in");
var elements2 = document.querySelectorAll(".fade-in2");

function fadeInElements() {
  for (var i = 0; i < elements.length; i++) {
    if (isElementVisible(elements[i])) {
      elements[i].classList.add("fade-in--visible");
    }
  }
}

function fadeInElements2() {
  for (var i = 0; i < elements2.length; i++) {
    if (isElementVisible(elements2[i])) {
      elements2[i].classList.add("fade-in2--visible");
    }
  }
}

fadeInElements();
fadeInElements2();

window.addEventListener("scroll", function () {
  fadeInElements();
  fadeInElements2();
});

/* GSAP SCROLL TRIGGER */

const sections = gsap.utils.toArray(".container section");
if (window.innerWidth >= 768) {
let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: "+=2400", // Ajustez cette valeur en fonction de vos besoins
    duration: 1,
    markers: false,
  },
});
}
/* GSAP SCROLL TRIGGER END */

/* GSAP SCROLL TRIGGER */

// Fonction pour gérer le redimensionnement de la fenêtre
function handleWindowResize() {
  const sections2 = gsap.utils.toArray(".box-title-skills");

  // Vérifier la largeur de la fenêtre et activer/désactiver les animations en conséquence
  if (window.innerWidth >= 768) {
    let scrollTween2 = gsap.to(sections2, {
      xPercent: -100 * (sections2.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".box-title-skills",
        pin: true,
        scrub: 1,
        end: "+=620",
        duration: 1,
        markers: false,
      },
    });
  } else {
    // Désactiver les animations pour les tailles d'écran plus petites
    gsap.killTweensOf(sections2);
  }
}

// Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
window.addEventListener("resize", handleWindowResize);

// Appeler la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", handleWindowResize);


/* GSAP SCROLL TRIGGER END */

/* GSAP MARQUEE */

const wrapper = document.querySelector(".wrapper-2");
const colors = ["#f38630", "#6fb936", "#ccc", "#6fb936"];
const boxes = gsap.utils.toArray(".box");
const wrapperr = document.querySelector(".wrapper-2r");
const colorsr = ["#f38630", "#6fb936", "#ccc", "#6fb936"];
const boxesr = gsap.utils.toArray(".boxr");

gsap.set(boxes, {
  backgroundColor: gsap.utils.wrap(colors),
});

const loop = horizontalLoop(boxes, {
  paused: false,
  repeat: -1,
  speed: 0.5,
  reversed: false,
});

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

gsap.set(boxesr, {
  backgroundColor: gsap.utils.wrap(colorsr),
});

const loopr = horizontalLoopr(boxesr, {
  paused: false,
  repeat: -1,
  speed: 0.5,
  reversed: true,
});

function horizontalLoopr(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

/* GSAP MARQUEE END */





















const menuContainer = document.querySelector(".menu-container");
const menuItemsContainer = document.querySelector(".menu-items-container");
const menuLeft = document.querySelector(".link-box-mobile-left");
const LinkBoxLeft = document.querySelector(".link-box-mobile-left");
const body = document.querySelector("body");

const boxnav = document.querySelector(".box-navbar");

const header = document.querySelector("header");

menuContainer.addEventListener("click", (event) => {
  menuContainer.classList.toggle("active");

  if (menuContainer.classList.contains("active")) {
    menuItemsContainer.classList.add("active");
    menuLeft.classList.add("active");
    body.classList.add("overflow-hidden"); // Ajouter la classe overflow-hidden si menuContainer est active


  } else {
    menuItemsContainer.classList.remove("active");
    menuLeft.classList.remove("active");
    body.classList.remove("overflow-hidden"); // Retirer la classe overflow-hidden si menuContainer n'est pas active

  }
});

LinkBoxLeft.addEventListener("click", () => {
  menuContainer.classList.remove("active");
  menuItemsContainer.classList.remove("active");
  menuLeft.classList.remove("active");
  body.classList.remove("overflow-hidden"); // Retirer la classe overflow-hidden si menuContainer n'est pas active
});

