// Get all clinic items
const clinicItems = document.querySelectorAll('.clinicItem');

// Add a click event listener to each item
clinicItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'selected' class from all items
    clinicItems.forEach(i => i.classList.remove('selected'));

    // Add 'selected' class to the clicked item
    item.classList.add('selected');
  });
});
