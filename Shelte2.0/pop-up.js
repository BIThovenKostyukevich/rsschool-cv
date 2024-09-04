document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card-button"); // Assuming each card has a class 'card-button'
    const popup = document.getElementById("popup");
    const closeButton = document.querySelector(".close-button");

    // Load JSON data
    let petsData = [];
    fetch('poopy.json')
        .then(response => response.json())
        .then(data => {
            petsData = data;
        })
        .catch(error => console.error('Error loading JSON data:', error));

    // Event listeners for cards
    cards.forEach((card) => {
        card.addEventListener("click", function() {
            const petName = card.getAttribute('data-name'); // Get the pet name from a data attribute
            const petData = petsData.find(pet => pet.name === petName);

            if (petData) {
                updatePopupContent(petData);
                popup.style.display = "flex";
            }
        });
    });

    // Close button event listener
    closeButton.addEventListener("click", function() {
        popup.style.display = "none";
    });

    // Close popup when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
    
    function updatePopupContent(pet) {
        const popupImage = popup.querySelector('.popUp-image');
        const popTitle = popup.querySelector('.pop-title');
        const popSubtitle = popup.querySelector('.pop-subtitle');
        const popAboutTxt = popup.querySelector('.pop-about-txt');
        const popListItems = popup.querySelectorAll('.pop-name-characters');
    
        popupImage.src = pet.img;
        popupImage.alt = pet.name;
        popTitle.textContent = pet.name;
        popSubtitle.textContent = `${pet.type} - ${pet.breed}`;
        popAboutTxt.textContent = pet.description;
    
        // Set the content for each list item
        popListItems[0].querySelector('.label-normal').textContent = pet.age;
        popListItems[1].querySelector('.label-normal').textContent = pet.inoculations.join(', ');
        popListItems[2].querySelector('.label-normal').textContent = pet.diseases.join(', ');
        popListItems[3].querySelector('.label-normal').textContent = pet.parasites.join(', ');
    }
});
