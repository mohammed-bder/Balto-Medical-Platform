async function fetchDoctors() {
    const response = await fetch('Doctor.json');
    const doctors = await response.json();
    return doctors;
}

async function fetchSchedule(doctorName) {
    const response = await fetch('schedule.json');
    const schedules = await response.json();
    return schedules[doctorName] || [];
}

function createDoctorCard(doctor, schedule) {
    const doctorCard = document.createElement('div');
    doctorCard.className = 'doctor-card';
    doctorCard.innerHTML = `
        <img src="${doctor.image}" alt="Doctor Image">
        <div class="card-body">
            <h5><i class="fa fa-user-md"></i> ${doctor.name}</h5>
            <p class="specialty"><i class="fa fa-stethoscope"></i> ${doctor.specialty}</p>
            <div class="rating">${'&#9733;'.repeat(doctor.rating)}${'&#9734;'.repeat(5 - doctor.rating)}</div>
            <p class="fee"><i class="fa fa-dollar-sign"></i> Fee: <strong>${doctor.fee}</strong></p>
            <p class="location"><i class="fa fa-map-marker-alt"></i> ${doctor.location}</p>
            <p class="experience"><i class="fa fa-briefcase"></i> ${doctor.experience}</p>
            <p class="contact"><i class="fa fa-phone"></i> ${doctor.contact}</p>
        </div>
        <div class="schedule-carousel">
            <button class="schedule-arrow left">&#9664;</button>
            <div class="schedule-container">
                ${createSchedule(schedule)}
            </div>
            <button class="schedule-arrow right">&#9654;</button>
        </div>
    `;
    return doctorCard;
}

function createSchedule(schedule) {
    return schedule.map(day => `
        <div class="day-column">
            <div class="day-header ${day.type}">${day.date}</div>
            <div class="time-slots scrollable">
                ${day.slots.length ? day.slots.map(slot => `<div class="time-slot">${slot}</div>`).join('') : '<p>No appointments available</p>'}
            </div>
            <button class="book-btn ${day.slots.length ? 'active' : 'disabled'}">Book</button>
        </div>
    `).join('');
}

function initCarousel() {
    const carousels = document.querySelectorAll('.schedule-carousel');
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.schedule-container');
        const leftArrow = carousel.querySelector('.schedule-arrow.left');
        const rightArrow = carousel.querySelector('.schedule-arrow.right');
        let currentIndex = 0;

        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex -= 3;
                container.style.transform = `translateX(-${currentIndex * 100 / 3}%)`;
            }
        });

        rightArrow.addEventListener('click', () => {
            if (currentIndex < container.children.length - 3) {
                currentIndex += 3;
                container.style.transform = `translateX(-${currentIndex * 100 / 3}%)`;
            }
        });
    });
}

async function init() {
    const doctors = await fetchDoctors();
    const doctorContainer = document.querySelector('.col-md-9');

    for (const doctor of doctors) {
        const schedule = await fetchSchedule(doctor.name);
        const doctorCard = createDoctorCard(doctor, schedule);
        doctorContainer.appendChild(doctorCard);
    }

    initCarousel();
}

document.addEventListener('DOMContentLoaded', init);


/********** Filter Box Dropdown **********/
const dropdowns = document.querySelectorAll('.dropdown-toggle');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', () => {
        dropdown.parentElement.classList.toggle('open');
    });
});


/********** Toggle Gender **********/
function toggleGender(selectedGender) {
    const maleCheckbox = document.getElementById('male');
    const femaleCheckbox = document.getElementById('female');
    
    if (selectedGender === 'male') {
        femaleCheckbox.checked = false;
    } else if (selectedGender === 'female') {
        maleCheckbox.checked = false;
    }
}


/********** Filter Toggle Button **********/
function toggleFilterBox() {
    document.querySelector('.filter-box').classList.toggle('active');
}



