let cur = 0;
let numOfItemsPerPage = 25;
let currentPage;
let totalPages;
let offset = 0;
const imageDiv = document.querySelector("#giphyViewer");
const currentPageInput = document.querySelector("#pageNumber");
const numOfItemsPerPageInput = document.querySelector("#perPage");
const totalPagesLabel = document.querySelector("#totalPages");
let searchUrl;
let persistUrl;
let editPage = false;
let searchParams;

numOfItemsPerPageInput.value = numOfItemsPerPage;

let trendingUrl;

trendingGif(numOfItemsPerPage);
function trendingGif(num) {
  trendingUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=t6PNxhrMllh9xZIj5CfGb61sDca43kkd&limit=" +
    num +
    "&rating=r";
  setList(trendingUrl);
}

const search = document.querySelector("#search");
const searchInput = document.querySelector("#input");

search.addEventListener("submit", searching);

function searching(e) {
  e.preventDefault();
  searchParams = searchInput.value;
  //console.log(searchParams);
  searchGif();
}

function searchGif() {
  searchUrl =
    "https://api.giphy.com/v1/gifs/search?api_key=t6PNxhrMllh9xZIj5CfGb61sDca43kkd&q=" +
    searchParams +
    "&limit=" +
    numOfItemsPerPage +
    "&offset=" +
    offset +
    "&rating=r&lang=en";
  imageDiv.innerHTML = "";

  setList(searchUrl);
}

const pagination = document.querySelector("#pk");
numOfItemsPerPageInput.addEventListener("input", pages);

function pages(e) {
  e.preventDefault();
  //console.log("I've penetrated")
  numOfItemsPerPage = numOfItemsPerPageInput.value;
  
  

  if (persistUrl == trendingUrl) {
    imageDiv.innerHTML = "";

    trendingGif(numOfItemsPerPage);
  } else if (persistUrl == searchUrl) {
    imageDiv.innerHTML = "";

    searchGif();
  }
}

currentPageInput.addEventListener("input", movePages);
function movePages(e) { 
  e.preventDefault();
  currentPage = currentPageInput.value;

  if (persistUrl == searchUrl) {
    
    offset = currentPage * numOfItemsPerPage

    editPage = true;
    searchGif();
  } 
}

function setPages(){ 
  if (offset == 0) {
    currentPage = 1;
  } else {
    currentPage = Math.ceil(offset / numOfItemsPerPage);
  }
  currentPageInput.value = currentPage;
}

function setList(url) {
  persistUrl = url;
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
      //console.log(data);
      //console.log(Math.ceil(data.pagination.total_count / numOfItemsPerPage));
      //console.log(data.data.length);

      for (let i = 0; i < data.data.length; i++) {
        /* Fetch only image that you want by using id. Example : https://unsplash.com/photos/6VhPY27jdps, id = '6VhPY27jdps'   */
        //if (data.results[i].id == "6VhPY27jdps") {
        let imageElement = document.createElement("img");
        imageElement.src = data.data[i].images.fixed_width.url;
        //imageElement.style = data.data[2].images.downsized_small;
        imageDiv.append(imageElement);
        //  }
        totalPages = Math.ceil(data.pagination.total_count / numOfItemsPerPage);
        totalPagesLabel.innerHTML = "Total Pages: " + totalPages;
      }
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
  if (editPage == false) {
    setPages();

  } else if(editPage == true){ 
    movePages();
    editPage = false;

  }
}
// images[data][0];
// var img = document.createElement('img');
// img.src = images[data][0][url];
// document.getElementById('body').appendChild(img);
