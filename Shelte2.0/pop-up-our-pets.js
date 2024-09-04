document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card-button"); 
    const popup = document.getElementById("popup");
    const closeButton = document.querySelector(".close-button");

    let petsData = [];
    fetch('poopy.json')
        .then(response => response.json())
        .then(data => {
            petsData = data;
        })
        .catch(error => console.error('Error loading JSON data:', error));

    cards.forEach((card) => {
        card.addEventListener("click", function() {
            const petName = card.previousElementSibling.textContent.trim(); 
            const petData = petsData.find(pet => pet.name === petName);

            if (petData) {
                updatePopupContent(petData);
                popup.style.display = "flex";
                document.querySelector('.overlay').style.display = "block"; 
            }
        });
    });

    closeButton.addEventListener("click", function() {
        popup.style.display = "none";
        document.querySelector('.overlay').style.display = "none"; 
    });

    window.addEventListener("click", function(event) {
        if (event.target === popup || event.target === document.querySelector('.overlay')) {
            popup.style.display = "none";
            document.querySelector('.overlay').style.display = "none"; 
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
