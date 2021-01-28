let images;
const imageDiv = document.querySelector('#giphyViewer');
const giphyUrl = "https://api.giphy.com/v1/gifs/trending?api_key=t6PNxhrMllh9xZIj5CfGb61sDca43kkd&limit=25&rating=r"
fetch(giphyUrl)
  .then(function (response) {
    // The API call was successful!
    //console.log(response.json());
   // images =
    
    return  response.json();
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
    //for (let i = 0; i < data.results.length; i++) {
                   
      /* Fetch only image that you want by using id. Example : https://unsplash.com/photos/6VhPY27jdps, id = '6VhPY27jdps'   */
      //if (data.results[i].id == "6VhPY27jdps") {
          let imageElement = document.createElement('img');
          imageElement.src = data.data[2].images.original.url;
    //imageElement.style = data.data[2].images.downsized_small;
          imageDiv.append(imageElement);
    //  }
  //}
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });

// images[data][0];
// var img = document.createElement('img'); 
// img.src = images[data][0][url]; 
// document.getElementById('body').appendChild(img); 
