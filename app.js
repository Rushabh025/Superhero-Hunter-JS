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

  const data = await fetch(apiUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
    // .then(response =>{
    //   console.log(response);
    // });

    return data;

  }catch (error) {
    console.log(error);
  }
}

getUsers().then(data => {
  console.log(data);

  const preElement = document.getElementById('json-data');

  preElement.style.fontSize = '18px';
  
  preElement.innerHTML = JSON.stringify(data);
});


//   const outputElement = document.getElementById('data');

// const apiUrl2 = `http://gateway.marvel.com/v1/public/characters?apikey=${publicApiKey}&callback=${publicApiKey}`;
// fetch()