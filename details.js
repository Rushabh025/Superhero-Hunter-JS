document.addEventListener('DOMContentLoaded', function () {
    // Retrieve character data from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const characterData = JSON.parse(urlParams.get('characterData'));

    // Display character details on the new page
    displayCharacterDetails(characterData);
  });

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

    // const eventsName = document.createElement('h4');
    // eventsName.innerText = `Events Name`;
    // div.appendChild(eventsName)

    // const eventsTable = document.createElement('ul');
    // div.appendChild(eventsTable)

    // for (let i = 0; i < Object.keys(data.events.items).length; i++) {
    //   const events = document.createElement('li');
    //   events.innerText = `${data.events.items[i].name}`
    //   eventsTable.appendChild(events)
    // }

  }