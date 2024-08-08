function switchFiles() {
    const width = window.innerWidth;
    const currentHref = window.location.href;

    if (width >= 1280 && !currentHref.includes('index1280.html')) {
        document.querySelector('link[rel="stylesheet"]').href = 'styles.css';
        window.location.href = 'index1280.html';
    } else if (width >= 768 && width < 1280 && !currentHref.includes('index768.html')) {
        document.querySelector('link[rel="stylesheet"]').href = 'test.css';
        window.location.href = 'index768.html';
    } else if (width < 768 && !currentHref.includes('index320.html')) {
        document.querySelector('link[rel="stylesheet"]').href = 'styles360.css';
        window.location.href = 'index320.html';
    }
}

window.addEventListener('load', switchFiles);

window.addEventListener('resize', switchFiles);
