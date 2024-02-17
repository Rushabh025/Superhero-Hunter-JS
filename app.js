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
    return dataList;

  }catch (error) {
    console.log(error);
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
        favList.push(favHero);
        // addFavHero(favHero);
        this.disabled = true;
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
      link.classList = 'btn btn-primary '
      addButton.classList = 'btn btn-primary '

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

// Function to update the cart display
const favHeroContainer = document.querySelector('#FavList');
function showFavList(){
  if(favList.length == 0){
    console.log('no list');
  }else{
    for(let i = 0; i < favList.length; i++){
      const li = document.createElement('li');
      const removeButton = document.createElement('button');
      li.textContent = favList[i];
      removeButton.classList = 'btn btn-primary'
      removeButton.textContent = 'Delete'
      li.classList.add('characterItem');
      favHeroContainer.appendChild(li);
      li.appendChild(removeButton);
      console.log(favList[i]);
    }
  }
}

function displayPersonData(data) {
  console.log(data); // Log the data to the console for now
}

function navigateToDetailsPage(characterData) {
  const queryParams = new URLSearchParams();
  queryParams.set('characterData', JSON.stringify(characterData));

  // Navigate to the details.html page with query parameters
  window.location.href = `details.html?${queryParams.toString()}`;
}

// auto complete

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
   });
 }

 // Add event listener for input changes
 searchInput.addEventListener('input', function() {
   filterCharacters(this.value);
 });

 // Initial call to display all characters
 filterCharacters('');
