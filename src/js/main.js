"use strict";
const inputSearch = document.querySelector(".js-inputSearch");
const foundMovies = document.querySelector(".js-foundMovies");
const favoriteMovie = document.querySelector(".js-favoriteMovies");
const btnSearch = document.querySelector(".js-btnSearch");
const btnResetSearch = document.querySelector(".js-resetSearch");
const btnRemoveMyMovies = document.querySelector(".js-btnRemoveAll");

let filmList = []; //array guarda resultado del fetch
let myMovies = [];

//funciones
function callFetch() {
  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      filmList = json.data;
      renderFilmList();
      listenerFilm();
    });
}

function renderFilmList() {
  let html = "";
  filmList.forEach((item) => {
    html += `<li class="film-card js-filmCard" id=${item.mal_id}>
    <img src="${item.images.jpg.image_url}" />
            <h3 >${item.title}</h3>
                </li>`;
  });
  foundMovies.innerHTML = html;
}
function renderMyMovies() {
  let html = "";
  myMovies.forEach((item) => {
    html += `<li class="favMovie-card js-filmCard" id=${item.mal_id}>
    <img src="${item.images.jpg.image_url}" />
            <h3 >${item.title}</h3>
    
                </li>`;
  });
  favoriteMovie.innerHTML = html;
}

function handleClickSearch(ev) {
  ev.preventDefault();
  callFetch();
}
function handleClickResetInput(ev) {
  ev.preventDefault();
  inputSearch.value = "";
  foundMovies.innerHTML = "";
}
function removeMyMovies() {
  myMovies = [];
  favoriteMovie.innerHTML = "";
}
function handleClickFilm(event) {
  const clickedMoovie = parseInt(event.currentTarget.id);
  const match = filmList.find((item) => item.mal_id === clickedMoovie);
  if (!myMovies.includes(match)) {
    myMovies.push(match);
  }
  renderMyMovies();
  console.log(myMovies);
}

//eventos
function listenerFilm() {
  const film = document.querySelectorAll(".js-filmCard");
  for (const li of film) {
    li.addEventListener("click", handleClickFilm);
  }
}
/* function listenerXBtn() {
  const xBtn = document.querySelectorAll(".js-xBtn");
  for (const btn of xBtn) {
    btn.addEventListener("click", handleClickXbtn);
  }
} */
btnResetSearch.addEventListener("click", handleClickResetInput);
btnSearch.addEventListener("click", handleClickSearch);
btnRemoveMyMovies.addEventListener("click", removeMyMovies);
