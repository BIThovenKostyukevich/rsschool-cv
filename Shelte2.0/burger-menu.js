document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.navmenu');
    const overlay = document.querySelector('.overlay');
    const body = document.body; 

    function disableScroll() {
        body.classList.add('no-scroll');
        window.addEventListener('scroll', preventScroll);
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
    }

    function enableScroll() {
        body.classList.remove('no-scroll');
        window.removeEventListener('scroll', preventScroll);
        window.removeEventListener('wheel', preventScroll, { passive: false });
        window.removeEventListener('touchmove', preventScroll, { passive: false });
    }

    function preventScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    burgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        overlay.classList.toggle('open');
        burgerBtn.classList.toggle('open');

        // Перемещение кнопки бургера
        burgerBtn.classList.toggle('open-position');

        if (navMenu.classList.contains('open')) {
            disableScroll(); 
        } else {
            enableScroll(); 
        }
    });
});
