// Retrieve the characterData from sessionStorage
const characterDataJson = sessionStorage.getItem('characterData');

// Check if characterData is present in sessionStorage
if (characterDataJson) {
  // Parse the JSON string to get the characterData object
  const characterData = JSON.parse(characterDataJson);

  // Now you can use the characterData as needed on the 'details.html' page
  displayCharacterDetails(characterData);

  // Optional: Clear the characterData from sessionStorage if it's no longer needed
  sessionStorage.removeItem('characterData');
} else {
  // Handle the case where characterData is not present in sessionStorage
  console.error("Character data not found in sessionStorage.");
}

  function displayCharacterDetails(data) {
    const characterDetailsContainer = document.getElementById('characterdetails');

    const div = document.createElement('div');

    // appending the elements in sequence 
    characterDetailsContainer.appendChild(div)

    document.getElementById('name').innerHTML = data.name;

    document.getElementById('description').innerHTML = data.description;

    const image = document.getElementById('heroImage');
    image.src = data.thumbnail.path +'.jpg';

    const comicsTable = document.getElementById('comicName');
    
    for (let i = 0; i < Object.keys(data.comics.items).length; i++) {
      const comicsList = document.createElement('li');
      comicsList.innerText = `${data.comics.items[i].name}`
      comicsTable.appendChild(comicsList)
    }

    const seriesTable = document.getElementById('seriesName');

    for (let i = 0; i < Object.keys(data.series.items).length; i++) {
      const series = document.createElement('li');
      series.innerText = `${data.series.items[i].name}`
      seriesTable.appendChild(series)
    }

    const storiesTable = document.getElementById('storiesName');

    for (let i = 0; i < Object.keys(data.stories.items).length; i++) {
      const stories = document.createElement('li');
      stories.innerText = `${data.stories.items[i].name}`
      storiesTable.appendChild(stories)
    }
  }

function add(){
  // Parse the JSON string to get the characterData object
  const characterData = JSON.parse(characterDataJson);
  addToFavList(characterData.name);
  // console.log('hi' + characterData.name);
}