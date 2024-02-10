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

  const dataList = await fetch(apiUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });

    return dataList;

  }catch (error) {
    console.log(error);
  }
}


getUsers().then(dataList => {
  const cardsContainer = document.querySelector('#cards-container');
    for (let i = 0; i < Object.keys(dataList.data.results).length; i++) {

      const div1 = document.createElement('div');
      const div = document.createElement('div');
      const image = document.createElement('img');
      const div2 = document.createElement('div');
      const heroName = document.createElement('h5');
      const link = document.createElement('a');
      
      div1.classList = 'col'
      div.classList = 'card'
      image.classList = 'card-img-top'
      div2.classList = 'card-body';
      heroName.classList = 'card-title'
      link.classList = 'btn btn-primary'

      image.src = dataList.data.results[i].thumbnail.path+'.jpg';
      heroName.innerText = `Name: ${dataList.data.results[i].name}`
      link.textContent = 'More Details'

      div1.appendChild(div)
      div.appendChild(image)
      div2.appendChild(heroName)
      div2.appendChild(link)
      cardsContainer.appendChild(div1)
      cardsContainer.appendChild(div)
      cardsContainer.appendChild(div2)
    }
});


//   const outputElement = document.getElementById('data');

// const apiUrl2 = `http://gateway.marvel.com/v1/public/characters?apikey=${publicApiKey}&callback=${publicApiKey}`;
// fetch()