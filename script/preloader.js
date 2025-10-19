window.addEventListener("load", function () {
  var progress = document.getElementById("progress");
  var loader = document.getElementById("loader");
  var preloader = document.getElementById("preloader");
  var boxLoader = document.querySelector(".box-loader");
  var boxLoader2 = document.querySelector(".box-loader-2");
  var percent = 0;
  var duration = 20000;
  var increment = Math.ceil(100 / (duration / 1));
  var id = setInterval(frame, 2);
  var body = document.querySelector("body");

  function frame() {
    body.style.overflow = "hidden";
    percent += increment;
    window.scrollTo(0, 0);
    if (percent >= 100) {
      percent = 100;
      clearInterval(id);
      setTimeout(function () {
        boxLoader.classList.add("move-right");
        boxLoader2.classList.add("move-left");
        body.classList.remove("no-animations");
        body.style.overflow = "";
        setTimeout(function () {
          preloader.style.display = "none";
        }, 400);
      }, 200);
    }
    body.classList.add("no-animations");
    var count =
      percent < 10 ? "00" + percent : percent < 100 ? "0" + percent : percent;
    progress.innerHTML = count + "%";

    window.scrollTo(0, 0);
  }
});
