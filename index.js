let images;
const imageDiv = document.querySelector('#giphyViewer');

//window.localStorage(url,trendingUrl)
const trendingUrl = "https://api.giphy.com/v1/gifs/trending?api_key=t6PNxhrMllh9xZIj5CfGb61sDca43kkd&limit=25&rating=r";
setList(trendingUrl);

const search = document.querySelector('#search');
const searchInput = document.querySelector('#input');

search.addEventListener('submit',searchGif);

function searchGif(e) {
  e.preventDefault();
  console.log("I am in");
  let searchParams = searchInput.value;
  console.log(searchParams);
  const searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=t6PNxhrMllh9xZIj5CfGb61sDca43kkd&q="
    + searchParams +
    "&limit=25&offset=0&rating=r&lang=en";
  imageDiv.innerHTML = "";
  setList(searchUrl);
}


function setList(url){
  fetch(url)
    .then(function (response) {
      // The API call was successful!
      //console.log(response.json());
      // images =
    
      return response.json();
    })
    // .then(function (data) {
    //   // This is the JSON from our response
    //   images = data;
  
    //   console.log(data);
    // })

    .then(function (data) {
      console.log(data);
      console.log(data.data.length);
      console.log(data.data[2].embed_url);
      for (let i = 0; i < data.data.length; i++) {
                   
        /* Fetch only image that you want by using id. Example : https://unsplash.com/photos/6VhPY27jdps, id = '6VhPY27jdps'   */
        //if (data.results[i].id == "6VhPY27jdps") {
        let imageElement = document.createElement('img');
        imageElement.src = data.data[i].images.fixed_width.url;
        //imageElement.style = data.data[2].images.downsized_small;
        imageDiv.append(imageElement);
        //  }
      }
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}
// images[data][0];
// var img = document.createElement('img'); 
// img.src = images[data][0][url]; 
// document.getElementById('body').appendChild(img); 
