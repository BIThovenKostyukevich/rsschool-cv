document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    let cardsPerPage = 8; 
    let currentPage = 1;
    let totalPages;

    const firstButton = document.getElementById("first");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const lastButton = document.getElementById("last");
    const pageNumber = document.getElementById("page-number");

    function updateCardsPerPage() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 767) {
            cardsPerPage = 3;
        } else if (screenWidth <= 1279) {
            cardsPerPage = 6;
        } else {
            cardsPerPage = 8;
        }
        totalPages = Math.ceil(cards.length / cardsPerPage);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        showPage(currentPage);
        updatePaginationButtons();
    }

    function showPage(page) {
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;

        cards.forEach((card, index) => {
            card.style.display = "none";
        });

        cards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = "block";
            }
        });

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

            if (currentPage === totalPages - 1) {
                nextButton.classList.add("active");
                lastButton.classList.add("active");
            }
        }
    }


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

    // Adjust pagination when the window is resized
    window.addEventListener("resize", updateCardsPerPage);
});
