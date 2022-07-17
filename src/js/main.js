"use strict";
const inputSearch = document.querySelector(".js-inputSearch");
const foundMovies = document.querySelector(".js-foundMovies");
const favoriteMovie = document.querySelector(".js-favoriteMovies");
const btnSearch = document.querySelector(".js-btnSearch");
const btnResetSearch = document.querySelector(".js-resetSearch");
const btnRemoveMyMovies = document.querySelector(".js-btnRemoveAll");
const imgWrong =
  "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
const imgDefault = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
let filmList = []; //array guarda resultado del fetch
let myMovies = [];

//***********funciones**********************

function callFetch() {
  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      filmList = json.data;
      renderFilmList();
    });
}
/* function isFavorite(data) {
  const favoriteFound = myMovies.find((fav) => {
    fav.id === data.id;
  });
  if (favoriteFound === undefined) {
    console.log("no misiela");
    return false;
  } else {
    console.log("viva viva");
    return true;
  }
} */
function renderFilmList() {
  let html = "";

  filmList.forEach((item) => {
    if (item.images.jpg.image_url === imgWrong) {
      html += `<li class="film-card js-filmCard" id=${item.mal_id}>
    <img src="${imgDefault}" />
            <h3 >${item.title}</h3>
                </li>`;
    } else {
      html += `<li class="film-card js-filmCard  " id=${item.mal_id}>
      <img src="${item.images.jpg.image_url}" />
              <h3 >${item.title}</h3>
                  </li>`;
    }
  });

  foundMovies.innerHTML = html;
  listenerFilm();
}

function renderMyMovies() {
  let html = "";

  myMovies.forEach((item) => {
    if (item.images.jpg.image_url === imgWrong) {
      html += `<li class="film-card js-favCard" id=${item.mal_id}>
    <img src="${imgDefault}" />
            <h3 >${item.title}</h3>
                </li>`;
    } else {
      html += `<li class="film-card js-favCard " id=${item.mal_id}>
      <img src="${item.images.jpg.image_url}" />
              <h3 >${item.title}</h3>
              </li>`;
    }
  });
  favoriteMovie.innerHTML = html;
  listenerFavorites();
}

function removeMyFavorites() {
  myMovies = [];
  favoriteMovie.innerHTML = "";
  localStorage.setItem("favoriteMovies", JSON.stringify(myMovies));
}

function saveMyFavorites() {
  localStorage.setItem("favoriteMovies", JSON.stringify(myMovies));
  console.log(localStorage);
}

function loadMyFavorites() {
  const dataLocalStorage = JSON.parse(localStorage.getItem("favoriteMovies"));

  if (dataLocalStorage === null) {
    console.log(dataLocalStorage);
  } else {
    myMovies = dataLocalStorage;
    renderMyMovies();
  }
}
// ********funciones manejadoras de eventos********
function handleClickSearch(ev) {
  ev.preventDefault();
  callFetch();
}
function handleClickResetInput(ev) {
  ev.preventDefault();
  inputSearch.value = "";
  foundMovies.innerHTML = "";
}

function handleClickFilm(event) {
  const clickedMoovie = parseInt(event.currentTarget.id);
  const match = filmList.find((item) => item.mal_id === clickedMoovie);
  if (!myMovies.includes(match)) {
    myMovies.push(match);
  }

  renderMyMovies();
  saveMyFavorites();
}
function handleClickFavorite(event) {
  const clickedFav = parseInt(event.currentTarget.id);
  const match = myMovies.findIndex((item) => item.mal_id === clickedFav);

  myMovies.splice(match, 1);
  renderMyMovies();
  console.log("idex", match);
}
function pressEnter(ev) {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    callFetch();
    return false;
  }
}
function listenerFilm() {
  const film = document.querySelectorAll(".js-filmCard");
  for (const li of film) {
    li.addEventListener("click", handleClickFilm);
  }
}
function listenerFavorites() {
  const film = document.querySelectorAll(".js-favCard");
  for (const li of film) {
    li.addEventListener("click", handleClickFavorite);
  }
}

//*********eventos************
btnResetSearch.addEventListener("click", handleClickResetInput);
btnSearch.addEventListener("click", handleClickSearch);
btnRemoveMyMovies.addEventListener("click", removeMyFavorites);
inputSearch.addEventListener("keydown", pressEnter);

//*********on load*************
loadMyFavorites();
