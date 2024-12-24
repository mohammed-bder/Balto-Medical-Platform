// Function to handle dropdown toggle and option selection
function setupDropdown(
  dropdownBtnId,
  dropdownMenuId,
  subtitleSelector,
  dataUrl
) {
  let dropdownBtn = document.getElementById(dropdownBtnId);
  let dropdownMenu = document.getElementById(dropdownMenuId);
  let subtitle = document.querySelector(subtitleSelector);

  dropdownBtn.addEventListener("click", function () {
    dropdownMenu.classList.toggle("dropdown-menu-opend");
  });

  fetch(dataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dropdownMenu.innerHTML = data.map((item) => `<p>${item}</p>`).join("");
      dropdownMenu.querySelectorAll("p").forEach((option) => {
        option.addEventListener("click", function () {
          subtitle.textContent = this.textContent;
          dropdownMenu.classList.remove("dropdown-menu-opend");
        });
      });
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
}

// Setup dropdowns
setupDropdown(
  "sp-dd-btn",
  "sp-dd",
  "#sp-dd-btn .row-content-subtitle",
  "/home/json/specialties.json"
);
setupDropdown(
  "gov-dd-btn",
  "gov-dd",
  "#gov-dd-btn .row-content-subtitle",
  "/home/json/governorates.json"
);
setupDropdown(
  "reg-dd-btn",
  "reg-dd",
  "#reg-dd-btn .row-content-subtitle",
  "/home/json/regions.json"
);

// Function to populate doctor grid elements
function populateDoctorGrids() {
  fetch("/home/json/doctors.json")
    .then((response) => response.json())
    .then((doctors) => {
      const doctorColContent = document.querySelector(".doctor-col-content");
      doctors.forEach((doctor) => {
        const doctorGrid = document.createElement("div");
        doctorGrid.className = "doctor-grid";
        doctorGrid.style.background = `url(${doctor.image}) no-repeat center`;
        doctorGrid.style.backgroundSize = "cover";

        const doctorGridContent = `
          <div class="doctor-grid-content">
            <div class="doctor-grid-dr-name">
              <span>${doctor.name}</span>
            </div>
            <div class="doctor-grid-dr-Speciality">
              <span>${doctor.specialty}</span>
            </div>
            <div class="doctor-grid-dr-rate">
              <span>⭐⭐⭐⭐ ${doctor.rating} (${doctor.reviews} reviews)</span>
            </div>
            <div class="doctor-grid-dr-action">
              <input class="doc-btn doc-btn-v" type="button" value="View Profile" />
              <input class="doc-btn doc-btn-b" type="button" value="Book appointment" />
            </div>
          </div>
        `;

        doctorGrid.innerHTML = doctorGridContent;
        doctorColContent.appendChild(doctorGrid);
      });
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
}

// Populate doctor grids on page load
document.addEventListener("DOMContentLoaded", populateDoctorGrids);
