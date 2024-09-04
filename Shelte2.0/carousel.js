document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.card-content');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    const cards = Array.from(slider.children);
    let isAnimating = false; 

    function getCardWidth() {
        const baseWidth = cards[0].offsetWidth;
        const margin = window.innerWidth < 1279 ? 40 : 90; //Otstupyy
        return baseWidth + margin;
    }

    function slideLeft() {
        if (isAnimating) return; 
        isAnimating = true;
        const cardWidth = getCardWidth();
        const firstCard = cards[0];
        const lastCard = cards[cards.length - 1];
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${cardWidth}px)`;

        firstCard.classList.add('hidden');

        setTimeout(() => {
            slider.style.transition = 'none';
            slider.style.transform = 'none';
            firstCard.classList.remove('hidden');
            slider.appendChild(firstCard); 
            cards.push(cards.shift()); 
            isAnimating = false; 
        }, 500); 
    }

    function slideRight() {
        if (isAnimating) return; 
        isAnimating = true; 
        const cardWidth = getCardWidth();
        const lastCard = cards[cards.length - 1];
        const firstCard = cards[0];
        const secondCard = cards[1]; 

        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(${cardWidth}px)`;
        if (window.innerWidth <= 768) {
            firstCard.classList.add('hidden'); 
        } else if (window.innerWidth <= 1279) {
            secondCard.classList.add('hidden'); 
        } else {
            lastCard.classList.add('hidden'); 
        }

        setTimeout(() => {
            slider.style.transition = 'none';
            slider.style.transform = 'none';
            firstCard.classList.remove('hidden');
            secondCard.classList.remove('hidden');
            lastCard.classList.remove('hidden');
            slider.insertBefore(lastCard, slider.firstElementChild); 
            cards.unshift(cards.pop()); 
            isAnimating = false; 
        }, 500); 
    }

    leftArrow.addEventListener('click', slideLeft);
    rightArrow.addEventListener('click', slideRight);

    window.addEventListener('resize', () => {
    });
});
