document.addEventListener('DOMContentLoaded', function () {
    // Retrieve character data from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const characterData = JSON.parse(urlParams.get('characterData'));

    // Display character details on the new page
    displayCharacterDetails(characterData);
  });

  function displayCharacterDetails(data) {
    const characterDetailsContainer = document.getElementById('characterdetails');

    // Format and display the character details on the page
    characterDetailsContainer.innerHTML = `
      <h1>${data.name}</h1>
      <img src="${data.thumbnail.path}.jpg" alt="${data.name}">
      <p>Born: ${data.born}</p>
      <p>Spouse: ${data.spouse}</p>
      <!-- Add more details as needed -->
    `;
  }