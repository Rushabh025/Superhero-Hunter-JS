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

// adding urls butons
for(var i in json){
  var key=Object.keys(json[i])[0];
  var a=document.createElement('a');
  a.href=key;
  a.innerHTML=key;
  document.querySelector('body').appendChild(a);
}
var hyperlinks=document.getElementsByTagName('a');
for(i=0;i<hyperlinks.length;i++){
hyperlinks[i].onclick=function(e){
 e.preventDefault();
 var href=this.getAttribute('href');
 alert(href);
}
}

