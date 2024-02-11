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

// calling the api function
getUsers().then(dataList => {
  const cardsContainer = document.querySelector('#cards-container');

    // looping through the data for sowing results on main page
    for (let i = 0; i < Object.keys(dataList.data.results).length; i++) {

      const div1 = document.createElement('div');
      const div = document.createElement('div');
      const image = document.createElement('img');
      const div2 = document.createElement('div');
      const heroName = document.createElement('h5');
      const link = document.createElement('a');
      link.href= 'pages/details.html';

      // Set link properties
      link.href = 'details.html';
      link.innerHTML = dataList.data.results[i].name;
      
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var personData = dataList.data.results[i];
        displayPersonData(personData);
        navigateToDetailsPage(personData);
      });

      div1.classList = 'col'
      div.classList = 'card'
      image.classList = 'card-img-top'
      div2.classList = 'card-body';
      heroName.classList = 'card-title'
      link.classList = 'btn btn-primary'

      image.src = dataList.data.results[i].thumbnail.path+'.jpg';
      heroName.innerText = `Name: ${dataList.data.results[i].name}`
      link.textContent = 'More Details'
      
      // appending the elements in sequence 
      cardsContainer.appendChild(div1)
      div1.appendChild(div)
      div.appendChild(image)
      div.appendChild(div2)
      div2.appendChild(heroName)
      div2.appendChild(link)
    }
});

function displayPersonData(data) {

   // adding urls butons
  // var personDataContainer = document.getElementById('personDataContainer');

  // personDataContainer.innerHTML = '<p>' + data + '</p>';

  // Extract and format the relevant data from 'data' to display on the page
  // For example, you can update 'personDataContainer.innerHTML' with the formatted content
  console.log(data); // Log the data to the console for now
}

function navigateToDetailsPage(characterData) {
  const queryParams = new URLSearchParams();
  queryParams.set('characterData', JSON.stringify(characterData));

  // Navigate to the details.html page with query parameters
  window.location.href = `details.html?${queryParams.toString()}`;
}

