// Sample review data
const reviews = [
  { name: "Ronald Richards", role: "Engineer", image: "imgs/person1.jpg", rating: 3, date: "8 Jun, 2021", feedback: "Great experience!" },
  { name: "Emily Johnson", role: "Designer", image: "imgs/person2.jpg", rating: 4, date: "15 Jun, 2021", feedback: "Highly recommend!" },
  { name: "Emily Johnson", role: "Designer", image: "imgs/person1.jpg", rating: 4, date: "15 Jun, 2021", feedback: "Highly recommend!" },
  { name: "Emily Johnson", role: "Designer", image: "imgs/person2.jpg", rating: 4, date: "15 Jun, 2021", feedback: "Highly recommend!" },
  { name: "Emily Johnson", role: "Designer", image: "imgs/person1.jpg", rating: 4, date: "15 Jun, 2021", feedback: "Highly recommend!" }
];

// Doctor Data
const doctor = {
  name: "Dr. Stephen Conley",
  designation: "Cardiologist",
  image: "imgs/doctor1.jpg",
  reviewsCount: 146,
  rating: 3,
  bio: "Dr. Stephen Conley is a renowned cardiologist with over 20 years of experience in diagnosing and treating complex heart conditions. He specializes in interventional cardiology, preventive care, and innovative treatment approaches.",
  services: ["Heart Disease Diagnosis", "Preventive Cardiology", "Interventional Procedures"],
  bookingLink: "../appointment/appointment.html"
};

// Sample Clinics Data
const clinics = [
  {
    name: "City Health Clinic",
    address: "123 Main Street, New York, NY",
    location: "https://www.google.com/maps?q=123+Main+Street,+New+York,+NY",
    images: ["imgs/clinic1.jpg", "imgs/clinic2.jpg", "imgs/clinic3.jpg"],
    bookingLink: "../appointment/appointment.html"
  },
  {
    name: "Green Valley Clinic",
    address: "456 Elm Street, Los Angeles, CA",
    location: "https://www.google.com/maps?q=456+Elm+Street,+Los+Angeles,+CA",
    images: ["imgs/clinic3.jpg", "imgs/clinic2.jpg", "imgs/clinic1.jpg"],
    bookingLink: "../appointment/appointment.html"
  },
  {
    name: "Sunrise Medical Center",
    address: "789 Pine Road, San Francisco, CA",
    location: "https://www.google.com/maps?q=789+Pine+Road,+San+Francisco,+CA",
    images: ["imgs/clinic2.jpg", "imgs/clinic3.jpg", "imgs/clinic1.jpg"],
    bookingLink: "../appointment/appointment.html"
  }
  
];

// Generate Stars
function generateStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? '<span class="star">★</span>' : '<span class="star-empty">☆</span>';
  }
  return stars;
}

// Load Reviews
function loadReviews() {
  const container = document.getElementById("dynamic-content");
  container.innerHTML = "";
  reviews.forEach(review => {
    container.innerHTML += `
      <div class="review">
        <div class="review-header">
          <div class="review-left">
            <img src="${review.image}" alt="${review.name}" class="review-pic">
            <div class="review-content">
              <h4>${review.name}</h4>
              <p>${review.role}</p>
            </div>
          </div>
          <div class="review-info">
            <div class="stars">${generateStars(review.rating)}</div>
            <span>${review.date}</span>
          </div>
        </div>
        <p>${review.feedback}</p>
      </div>`;
  });
}

// Load Clinics
function loadClinics() {
  const container = document.getElementById("dynamic-content");
  container.innerHTML = "";
  clinics.forEach(clinic => {
    const imagesHTML = clinic.images.map(img => `
      <img src="${img}" alt="${clinic.name}" class="clinic-image" onclick="openModal('${img}')">
    `).join('');

    container.innerHTML += `
      <div class="clinic-card">
        <!-- Left Section -->
        <div class="clinic-left">
          <h3 class="clinic-name">${clinic.name}</h3>
          <div class="clinic-images">${imagesHTML}</div>
        </div>
        <!-- Right Section -->
        <div class="clinic-right">
          <div class="clinic-address">
            <a href="${clinic.location}" target="_blank" class="location-btn" title="View Location">
              <i class="fas fa-map-marker-alt"></i>
            </a>
            ${clinic.address}
          </div>
          <!-- Buttons -->
          <div class="clinic-actions">
            <a href="${clinic.bookingLink}" target="_blank" class="book-now-btn">Book Now</a>
          </div>
        </div>
      </div>`;
  });
}

// Open Image Modal
function openModal(imageSrc) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add('show'), 10); // Smooth transition
  modalImg.src = imageSrc;
}

// Close Modal
function closeModal() {
  const modal = document.getElementById('image-modal');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = "none", 300); // Smooth transition
}

// Tab Switching
document.getElementById("reviews-tab").addEventListener("click", (e) => {
  e.preventDefault();
  loadReviews();
  setActiveTab(e.target);
});

document.getElementById("clinics-tab").addEventListener("click", (e) => {
  e.preventDefault();
  loadClinics();
  setActiveTab(e.target);
});

function setActiveTab(activeTab) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  activeTab.classList.add("active");
}

// Initialize Doctor Info
document.querySelector(".profile-img").src = doctor.image;
document.querySelector(".profile-section h2").innerText = doctor.name;
document.querySelector(".designation").innerText = doctor.designation;
document.querySelector(".ratings p").innerHTML = `<strong>${doctor.reviewsCount} Reviews</strong>`;
document.querySelector(".book-now-btn").href = doctor.bookingLink;
document.querySelector(".bio-section p").innerText = doctor.bio;
document.querySelector(".services-list").innerHTML = doctor.services.map(service => `<li class="service-item">${service}</li>`).join("");

// Initial Load
document.getElementById("reviews-tab").classList.add("active");
loadReviews();
