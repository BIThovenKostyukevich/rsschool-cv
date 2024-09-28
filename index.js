document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    searchPhotos(query);
  });
  
  async function searchPhotos(query) {
    const clientId = 'qdRrxKi11wsX49wrwmZWFtmrE4tKC9YYH0UBpPw2DrA'; 
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayPhotos(data.results);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }
  
//░░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄██▄▄▄▄▄▄▄▄▄░░░░▄░
//▄███████████████████████▀▀▀▀▀▀▀██████▀
//██████▀▀▀░▄██▀░░▀███░░░░░░░░░░░░░░░░░░
//▀▀▀▀░░░░░░██░░░░░▀██▄░░░░░░░░░░░░░░░░░
//░░░░░░░░░░░░░░░░░░▀███▄░░░░░░░░░░░░░░░
//░░░░░░░░░░░░░░░░░░░░▀▀░░░░░░░░░░░░░░░░

  
  function displayPhotos(photos) {
    const photosContainer = document.getElementById('photosContainer');
    photosContainer.innerHTML = '';  
  
    photos.forEach(photo => {
      const photoDiv = document.createElement('div');
      photoDiv.classList.add('photo-item');
  
      const img = document.createElement('img');
      img.src = photo.urls.small;
      img.alt = photo.alt_description || 'Unsplash Photo';
  
      photoDiv.appendChild(img);
      photosContainer.appendChild(photoDiv);
    });
  }
  
  window.onload = function() {
    searchPhotos('popular');
  };
  