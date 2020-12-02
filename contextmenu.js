
window.addEventListener("click", function () {
  document.getElementById("context-menu").classList.remove("active");
});
window.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  var contextElement = document.getElementById("context-menu");
  contextElement.style.top = event.offsetY + "px";
  contextElement.style.left = event.offsetX + "px";
  contextElement.classList.add("active");
}, false);