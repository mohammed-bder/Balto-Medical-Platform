// Dummy Data
const data = {
    appointmentRequests: [
        { id: 1, name: "Alex Johnson", type: "Video Consulting", date: "10 March", time: "09:00 AM", status: "Pending" },
        { id: 2, name: "Sophia Brown", type: "Clinic Consulting", date: "11 March", time: "10:30 AM", status: "Pending" },
        { id: 3, name: "Liam Davis", type: "Emergency", date: "12 March", time: "01:15 PM", status: "Pending" },
        { id: 4, name: "Olivia Wilson", type: "Clinic Consulting", date: "12 March", time: "03:00 PM", status: "Pending" },
        { id: 5, name: "Noah Martinez", type: "Routine Check-up", date: "13 March", time: "11:45 AM", status: "Pending" }
    ],
    todayAppointments: [
        { name: "Emma Garcia", type: "Clinic Consulting", time: "10:00 AM" },
        { name: "James White", type: "Video Consulting", time: "11:00 AM" },
        { name: "Isabella Clark", type: "Emergency", time: "11:30 AM" },
        { name: "Ethan Hall", type: "Clinic Consulting", time: "01:00 PM" },
        { name: "Mia Lewis", type: "Routine Check-up", time: "02:00 PM" }
    ]
};

// Populate Appointment Requests
const requestList = document.getElementById("request-list");
data.appointmentRequests.forEach(request => {
    const li = document.createElement("li");
    li.setAttribute("data-id", request.id);

    const detailsContainer = document.createElement("div");

    const name = document.createElement("span");
    name.classList.add("name");
    name.innerText = request.name;

    const type = document.createElement("span");
    type.classList.add("type");
    type.innerText = request.type;

    const date = document.createElement("span");
    date.classList.add("date");
    date.innerText = request.date;

    const time = document.createElement("span");
    time.classList.add("time");
    time.innerText = request.time;

    const status = document.createElement("span");
    status.classList.add("status", request.status.toLowerCase());
    status.innerText = request.status;

    detailsContainer.appendChild(name);
    detailsContainer.appendChild(type);
    detailsContainer.appendChild(date);
    detailsContainer.appendChild(time);
    detailsContainer.appendChild(status);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm");
    confirmButton.innerText = "Confirm";
    confirmButton.onclick = () => updateStatus(request.id, "Confirmed");

    const declineButton = document.createElement("button");
    declineButton.classList.add("decline");
    declineButton.innerText = "Decline";
    declineButton.onclick = () => updateStatus(request.id, "Declined");

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(declineButton);

    li.appendChild(detailsContainer);
    li.appendChild(buttonContainer);

    requestList.appendChild(li);
});

// Populate Today's Appointments
const todayList = document.getElementById("today-list");
data.todayAppointments.forEach(appointment => {
    const li = document.createElement("li");
    const todayItem = document.createElement("div");
    todayItem.classList.add("today-item");

    const name = document.createElement("span");
    name.classList.add("name");
    name.innerText = appointment.name;

    const type = document.createElement("span");
    type.classList.add("type");
    type.innerText = appointment.type;

    const time = document.createElement("span");
    time.classList.add("time");
    time.innerText = appointment.time;

    todayItem.appendChild(name);
    todayItem.appendChild(type);
    todayItem.appendChild(time);

    li.appendChild(todayItem);
    todayList.appendChild(li);
});

// Update Status Function
function updateStatus(id, newStatus) {
    const requestItem = document.querySelector(`li[data-id="${id}"]`);
    const status = requestItem.querySelector(".status");
    const buttonContainer = requestItem.querySelector(".button-container");

    // Update status text and style
    status.innerText = newStatus;
    status.classList.remove("pending", "confirmed", "declined");
    status.classList.add(newStatus.toLowerCase());

    // Remove buttons if status is updated
    if (newStatus === "Confirmed" || newStatus === "Declined") {
        buttonContainer.remove();
    }
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    const title = document.querySelector('.sidebar-title');
    title.style.display = sidebar.classList.contains('collapsed') ? 'none' : 'block';
}
