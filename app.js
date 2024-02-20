// api call function
async function getUsers() {
  try {

  const publickey = '9f39169afffeef58dbd798b9c0171075';
  const privatekey = '71ee64bfae3a3e53f87eedbdac50145bcb1c416a';
  const currentDate = new Date().getTime();
  const hashvalue = CryptoJS.MD5(currentDate+privatekey+publickey).toString();

  const apiUrl = `http://gateway.marvel.com/v1/public/characters?ts=${currentDate}&apikey=${publickey}&hash=${hashvalue}`;

  const options = { 
      method: 'GET', 
      headers: { 
          Accept: '*/*', 
      },  
    };

  // fetching data from api
  const dataList = await fetch(apiUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });

    // returning the data
    // heroList = push(dataList);
    return dataList;

  }catch (error) {
    console.error('Error fetching data:', error);
  }
}

// suggestions array
const characters = [];
const favList = [];

// calling the api function
getUsers().then(dataList => {
  const cardsContainer = document.querySelector('#cards-container');
  const rowdiv = document.createElement('div');
  rowdiv.classList = 'row';
  cardsContainer.appendChild(rowdiv);
  // console.log(dataList);
    // looping through the data for sowing results on main page
    for (let i = 0; i < Object.keys(dataList.data.results).length; i++) {

      // pushing names in array for suggestion
      characters.push(dataList.data.results[i].name);

      const coldiv = document.createElement('div');
      const cardmaindiv = document.createElement('div');
      const cardInnerdiv = document.createElement('div');
      const imgDiv = document.createElement('div');
      const image = document.createElement('img');
      const cardBackdiv = document.createElement('div');
      const heroName = document.createElement('h1');
      const addButton = document.createElement('button');
      const addline = document.createElement('br');
      addButton.addEventListener('click', function (e) {
        e.preventDefault();
        var favHero = dataList.data.results[i].name;
      
        // Check if the superhero is not already in the favorites list
        if (!favList.includes(favHero)) {
          // Add superhero to favorites list
          favList.push(favHero);
      
          // Update the favorites list display
          showFavList();
        } else {
          // Handle case where the superhero is already in the favorites list
          alert(`${favHero} Hero is already in the favorites list.`);
          // console.log(`${favHero} is already in the favorites list.`);
        }
      });
      

      const link = document.createElement('a');
      link.href = 'pages/details.html';

      // Set link properties
      link.href = 'details.html';
      link.innerHTML = dataList.data.results[i].name;
      
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var personData = dataList.data.results[i];
        displayPersonData(personData);
        navigateToDetailsPage(personData);
      });

      coldiv.classList = 'col-lg-4 mb-3 d-flex align-items-stretch';
      cardmaindiv.classList = 'flip-card'
      cardInnerdiv.classList = 'flip-card-inner'
      imgDiv.classList = 'flip-card-front';
      image.style = 'width:300px;height:300px;'
      cardBackdiv.classList = 'flip-card-back align-items-center';
      heroName.classList = 'card-title card-title-center'
      link.classList = 'btn btn-primary More_Details'
      addButton.classList = 'btn btn-primary Fav'

      image.src = dataList.data.results[i].thumbnail.path+'.jpg';
      heroName.innerText = `${dataList.data.results[i].name}`
      link.textContent = 'More Details'
      addButton.textContent = 'Favourite'

      // appending the elements in sequence
      rowdiv.appendChild(coldiv)
      coldiv.appendChild(cardmaindiv)
      cardmaindiv.appendChild(cardInnerdiv)
      cardInnerdiv.appendChild(imgDiv)
      imgDiv.appendChild(image)
      cardInnerdiv.appendChild(cardBackdiv)
      cardBackdiv.appendChild(heroName)
      cardBackdiv.appendChild(link)
      cardBackdiv.appendChild(addline)
      cardBackdiv.appendChild(addButton)      
      
    }
});

// Function to update the favorite hero display
const favHeroContainer = document.querySelector('#FavList');
function showFavList() {
  // Clear the current content of favHeroContainer
  favHeroContainer.innerHTML = '';

  // Update the favorite hero display
  for (let i = 0; i < favList.length; i++) {
    const a = document.createElement('a');
    const icon = document.createElement('img');
    const removeButton = document.createElement('button');
    a.textContent = favList[i];
    removeButton.classList = 'btn cancel btn-link';
    icon.src = '/delete-icon.png';
    icon.style = 'height:17px;width:17px;';
    a.classList = 'dropdown-item';
    favHeroContainer.appendChild(a);
    a.appendChild(removeButton);
    removeButton.appendChild(icon);

    // add a click handler to it which will remove this specific item, `paragraph`:
    removeButton.addEventListener('click', function() {
      console.log(a.innerText);
      const index = favList.indexOf(a.innerText);
      if (index > -1) { // only splice array when item is found
        favList.splice(index, 1); // 2nd parameter means remove one item only
      }
    });

  }
}

function displayPersonData(data) {
  console.log(data); // Log the data to the console for now
}

// used session to store charcter data and access it in details page
function navigateToDetailsPage(characterData) {
  // Store the characterData in sessionStorage
  sessionStorage.setItem('characterData', JSON.stringify(characterData));

  // Navigate to the details.html page
  window.location.href = 'details.html';
}

// auto complete
var heroList = getUsers().then(success => heroList = success);
function searchdata(character){
  // console.log(heroList);
  for (let i = 0; i < Object.keys(heroList.data.results).length; i++) {
    if(character == heroList.data.results[i].name){
      navigateToDetailsPage(heroList.data.results[i]);
    }
  }
}
// Get references to DOM elements
const searchInput = document.getElementById('searchInput');
const characterList = document.getElementById('characterList');

// Function to filter characters based on search query
function filterCharacters(query) {
  // Clear the previous results
  characterList.innerHTML = '';

  // Filter characters that contain the search query
  const filteredCharacters = characters.filter(character =>
    character.toLowerCase().includes(query.toLowerCase())
  );

  // Display filtered characters
  filteredCharacters.forEach(character => {
    const li = document.createElement('li');
    li.textContent = character;
    li.classList.add('characterItem');
    characterList.appendChild(li);

    // Add click event listener to each suggestion item
    li.addEventListener('click', function () {
      // Set the value of the search input to the selected character
      searchInput.value = character;
      searchdata(character);
      // Clear the suggestion list
      characterList.innerHTML = '';
    });
  });
}

// Add event listener for input changes
 searchInput.addEventListener('input', function() {
   filterCharacters(this.value);
 });

 // Initial call to display all characters
 filterCharacters('');

 // Debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Use debounced function for input event
searchInput.addEventListener('input', debounce(function () {
  filterCharacters(this.value);
}, 300)); // Adjust the wait time as needed
