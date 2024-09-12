document.addEventListener("DOMContentLoaded", function() {
    const cards = Array.from(document.querySelectorAll(".card"));
    let cardsPerPage;
    let currentPage = 1;
    let totalPages;
    let shuffledCards;
    let extraPages = 2; 

    const firstButton = document.getElementById("first");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const lastButton = document.getElementById("last");
    const pageNumber = document.getElementById("page-number");

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getShuffledCards() {
        const savedOrder = localStorage.getItem('shuffledCards');
        if (savedOrder) {
            const indices = JSON.parse(savedOrder);
            return indices.map(index => cards[index]);
        } else {
            return shuffleArray(cards.slice());
        }
    }

    function saveShuffledOrder() {
        const indices = shuffledCards.map(card => cards.indexOf(card));
        localStorage.setItem('shuffledCards', JSON.stringify(indices));
    }

    function updateCardsPerPage() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 320) {
            cardsPerPage = 1; 
        } else if (screenWidth <= 768) {
            cardsPerPage = 3; 
        } else if (screenWidth <= 1280) {
            cardsPerPage = 6; 
        } else {
            cardsPerPage = 8; 
        }

        totalPages = Math.max(Math.ceil(cards.length / cardsPerPage), getTotalPagesByWidth(screenWidth) + extraPages);
        
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        showPage(currentPage);
        updatePaginationButtons();
    }

    function getTotalPagesByWidth(width) {
        if (width <= 320) return 16;
        if (width <= 768) return 8;
        if (width <= 1280) return 6;
        return Math.ceil(cards.length / 8); 
    }

    function generateExtraPages() {
        const extraCards = Array.from({ length: cards.length }, (_, i) => cards[i % cards.length]); // Используем текущие карты для генерации дополнительных страниц
        return shuffleArray(extraCards);
    }

    function showPage(page) {
        let start, end;

        if (page <= getTotalPagesByWidth(window.innerWidth)) {
            start = (page - 1) * cardsPerPage;
            end = start + cardsPerPage;
            
            shuffledCards.forEach((card, index) => {
                card.style.display = "none";
            });

            shuffledCards.forEach((card, index) => {
                if (index >= start && index < end) {
                    card.style.display = "block";
                }
            });
        } else {
            const extraCards = generateExtraPages();
            start = (page - getTotalPagesByWidth(window.innerWidth) - 1) * cardsPerPage;
            end = start + cardsPerPage;

            extraCards.forEach((card, index) => {
                card.style.display = "none";
            });

            extraCards.forEach((card, index) => {
                if (index >= start && index < end) {
                    card.style.display = "block";
                }
            });
        }

        pageNumber.textContent = page;
    }

    function updatePaginationButtons() {
        [firstButton, prevButton, nextButton, lastButton].forEach(button => {
            button.classList.remove("active");
        });

        if (totalPages <= 1) {
            [firstButton, prevButton, nextButton, lastButton].forEach(button => button.classList.add("inactive"));
        } else {
            if (currentPage === 1) {
                nextButton.classList.add("active");
                lastButton.classList.add("active");
            } else if (currentPage === totalPages) {
                firstButton.classList.add("active");
                prevButton.classList.add("active");
            } else {
                firstButton.classList.add("active");
                prevButton.classList.add("active");
                nextButton.classList.add("active");
                lastButton.classList.add("active");
            }
        }
    }

    shuffledCards = getShuffledCards();
    saveShuffledOrder();
    updateCardsPerPage();

    firstButton.addEventListener("click", () => {
        if (currentPage !== 1) {
            currentPage = 1;
            showPage(currentPage);
            updatePaginationButtons();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePaginationButtons();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updatePaginationButtons();
        }
    });

    lastButton.addEventListener("click", () => {
        if (currentPage !== totalPages) {
            currentPage = totalPages;
            showPage(currentPage);
            updatePaginationButtons();
        }
    });

    window.addEventListener("resize", updateCardsPerPage);
});
