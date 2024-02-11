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

    const name = document.createElement('h2');
    name.innerText = data.name;
    div.appendChild(name)

    const image = document.createElement('img');
    image.src = data.thumbnail.path +'.jpg';
    div.appendChild(image)

    const comicsName = document.createElement('h4');
    comicsName.innerText = `Comics Name`;
    div.appendChild(comicsName)

    const comicsTable = document.createElement('ul');
    div.appendChild(comicsTable)
    
    for (let i = 0; i < Object.keys(data.comics.items).length; i++) {
      const comicsList = document.createElement('li');
      comicsList.innerText = `${data.comics.items[i].name}`
      comicsTable.appendChild(comicsList)
    }

    const seriesName = document.createElement('h4');
    seriesName.innerText = `Series Name`;
    div.appendChild(seriesName)

    const seriesTable = document.createElement('ul');
    div.appendChild(seriesTable)

    for (let i = 0; i < Object.keys(data.series.items).length; i++) {
      const series = document.createElement('li');
      series.innerText = `${data.series.items[i].name}`
      seriesTable.appendChild(series)
    }

    const storiesName = document.createElement('h4');
    storiesName.innerText = `Stories Name`;
    div.appendChild(storiesName)

    const storiesTable = document.createElement('ul');
    div.appendChild(storiesTable)

    for (let i = 0; i < Object.keys(data.stories.items).length; i++) {
      const stories = document.createElement('li');
      stories.innerText = `${data.stories.items[i].name}`
      storiesTable.appendChild(stories)
    }

    const eventsName = document.createElement('h4');
    eventsName.innerText = `Events Name`;
    div.appendChild(eventsName)

    const eventsTable = document.createElement('ul');
    div.appendChild(eventsTable)

    for (let i = 0; i < Object.keys(data.events.items).length; i++) {
      const events = document.createElement('li');
      events.innerText = `${data.events.items[i].name}`
      eventsTable.appendChild(events)
    }

  }