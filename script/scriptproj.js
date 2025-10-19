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

const sections2 = gsap.utils.toArray(".left-bar");

let scrollTween2 = gsap.to(sections2, {
  xPercent: -100 * (sections2.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".left-bar",
    pin: true,
    scrub: 1,
    end: "bottom center", // Ajustez cette valeur en fonction de vos besoins
    duration: 1,
    markers: false,
  }
});





/* GSAP SCROLL TRIGGER END */

  /*  // Sélectionnez tous les liens avec la classe "fade"
   var links = document.querySelectorAll('.fade');

   // Ajoutez un écouteur d'événements de défilement à la fenêtre
   window.addEventListener('scroll', function() {
       // Parcourez chaque lien
       links.forEach(function(link, index) {
           // Obtenez la position de chaque section par rapport au haut de la page
           var section = document.querySelector(link.getAttribute('href'));
           var sectionTop = section.offsetTop;

           // Calculez la distance entre le haut de la page et la position de défilement actuelle
           var distance = window.scrollY - sectionTop;

           // Ajustez la condition pour ajouter la classe "active"
           if (distance >= -100 && distance < section.clientHeight) {
               // Ajoutez la classe "active" à tous les liens précédents
               for (var i = 0; i <= index; i++) {
                   links[i].classList.add('active');
               }
           } else {
               // Sinon, retirez la classe "active"
               link.classList.remove('active');
           }
       });
   });

   // Ajoutez un écouteur d'événements pour marquer la première section comme active initialement
   window.addEventListener('DOMContentLoaded', function() {
       links[0].classList.add('active');
   }); */




       // Sélectionnez tous les liens avec la classe "fade"
       var links = document.querySelectorAll('.fade');

       // Ajoutez un écouteur d'événements de défilement à la fenêtre
       window.addEventListener('scroll', function() {
           // Parcourez chaque lien
           links.forEach(function(link) {
               // Obtenez la position de chaque section par rapport au haut de la page
               var section = document.querySelector(link.getAttribute('href'));
               var sectionTop = section.offsetTop;
   
               // Calculez la distance entre le haut de la page et la position de défilement actuelle
               var distance = window.scrollY - sectionTop;
   
               // Ajustez la condition pour ajouter la classe "active"
               if (distance >= -100 && distance < section.clientHeight) {
                   // Retirez la classe "active" de tous les liens
                   links.forEach(function(link) {
                       link.classList.remove('active');
                   });
   
                   // Ajoutez la classe "active" uniquement au lien correspondant à la section actuelle
                   link.classList.add('active');
               }
           });
       });
   
       // Ajoutez un écouteur d'événements pour marquer la première section comme active initialement
       window.addEventListener('DOMContentLoaded', function() {
           links[0].classList.add('active');
       });