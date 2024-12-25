// header
// Responsive menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navContent = document.querySelector(".nav-content");

menuToggle.addEventListener("click", () => {
  navContent.classList.toggle("active");
  console.log("menu toggle");
});
