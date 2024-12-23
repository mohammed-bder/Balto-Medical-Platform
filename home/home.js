let dropdown = document.querySelector(".dropdown-menu");
let dropdownbtn = document.querySelector(".search-btn-drop");

dropdownbtn.addEventListener("click", function () {
  dropdown.classList.toggle("dropdown-menu-opend");
});
