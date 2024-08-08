
function switchFiles() {
    const width = window.innerWidth;
    const currentHref = window.location.href;

    if (width >= 1280 && !currentHref.includes('index1280-1.html')) {
        document.querySelector('link[rel="stylesheet"]').href = 'styles1.css';
        window.location.href = 'index1280-1.html';
    } else if (width >= 768 && width < 1280 && !currentHref.includes('index768-1.html')) {
        document.querySelector('link[rel="stylesheet"]').href = 'test1.css';
        window.location.href = 'index768-1.html';
    } else if (width < 768 && !currentHref.includes('index320-1.html')) {
        document.querySelector('link[rel="stylesheet"]').href = 'styles320-1.css';
        window.location.href = 'index320-1.html';
    }

}

window.addEventListener('load', switchFiles);


window.addEventListener('resize', switchFiles);
