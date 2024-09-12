document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.card-content');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    const petsData = [
        { name: 'Katrine', image: 'pets-katrine.png' },
        { name: 'Jennifer', image: 'pets-jennifer.png' },
        { name: 'Woody', image: 'pets-woody.png' },
        { name: 'Charly', image: 'pets-charly.png' },
        { name: 'Sophia', image: 'pets-katrine1.png' },
        { name: 'Freddie', image: 'pets-katrine2.png' },
        { name: 'Scarlet', image: 'pets-scarlet.png' },
        { name: 'Timmy', image: 'pets-timmy.png' }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

    let shuffledPets = shuffleArray([...petsData]);

    let currentIndex = 0;  
    let visibleCards = 3;  
    let isAnimating = false;
    
    const historyStack = [];  
    let futureStack = [];  

    function getVisibleCardsCount() {
        if (window.innerWidth <= 320) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3; 
    }

    function updateVisibleCards() {
        visibleCards = getVisibleCardsCount();
    }

    function generateCard(pet) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const img = document.createElement('img');
        img.src = pet.image;
        img.alt = pet.name;
        img.classList.add('card-image');
        
        const text = document.createElement('div');
        text.classList.add('card-text');
        text.textContent = pet.name;
        
        const button = document.createElement('button');
        button.classList.add('card-button');
        button.textContent = 'Learn more';
        button.setAttribute('data-name', pet.name);
        
        card.appendChild(img);
        card.appendChild(text);
        card.appendChild(button);
        
        return card;
    }

    function showCards(startIndex) {
        slider.innerHTML = '';


        for (let i = 0; i < visibleCards; i++) {
            const cardIndex = (startIndex + i) % shuffledPets.length; 
            const pet = shuffledPets[cardIndex];
            slider.appendChild(generateCard(pet));
        }
    }

    function slide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        updateVisibleCards(); 


        let transformDirection = direction === 'right' ? '100%' : '-100%';

        if (direction === 'right') {
            historyStack.push(currentIndex);  
            currentIndex = (currentIndex + visibleCards) % shuffledPets.length; // Сдвиг по фазе и в вправо


            futureStack = [];

        } else if (direction === 'left') {
            if (historyStack.length > 0) {
                futureStack.push(currentIndex);  
                currentIndex = historyStack.pop(); 
            } else {
                currentIndex = (currentIndex - visibleCards + shuffledPets.length) % shuffledPets.length;
            }
        }

        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(${transformDirection})`; 

        setTimeout(() => {
            showCards(currentIndex); 
            slider.style.transition = 'none';
            slider.style.transform = 'none'; 
            isAnimating = false;
        }, 500);
    }

    leftArrow.addEventListener('click', function() {
        slide('left');
    });

    rightArrow.addEventListener('click', function() {
        slide('right');
    });

    updateVisibleCards();
    showCards(currentIndex);

    window.addEventListener('resize', function() {
        updateVisibleCards();
        showCards(currentIndex);
    });
});
