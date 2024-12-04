document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const closeButton = document.querySelector(".close-button");
    const body = document.body;

    let petsData = [];
    fetch('poopy.json')
        .then(response => response.json())
        .then(data => {
            petsData = data;
        })
        .catch(error => console.error('Error loading JSON data:', error));

    document.addEventListener("click", function(event) {
        const card = event.target.closest(".card"); 
        if (card) {
            const petName = card.querySelector('.card-button').getAttribute('data-name'); 
            const petData = petsData.find(pet => pet.name === petName);

            if (petData) {
                updatePopupContent(petData); 
                popup.style.display = "flex"; 
                body.style.overflow = "hidden"; 
            }
        }
    });

    closeButton.addEventListener("click", function() {
        popup.style.display = "none"; 
        body.style.overflow = ""; 
    });

    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none"; 
            body.style.overflow = ""; 
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

        popListItems[0].querySelector('.label-normal').textContent = pet.age;
        popListItems[1].querySelector('.label-normal').textContent = pet.inoculations.join(', ');
        popListItems[2].querySelector('.label-normal').textContent = pet.diseases.join(', ');
        popListItems[3].querySelector('.label-normal').textContent = pet.parasites.join(', ');
    }
});
