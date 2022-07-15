"use strict";
const inputSearch = document.querySelector(".js-inputSearch");
const foundMovies = document.querySelector(".js-foundMovies");
const btnSearch = document.querySelector(".js-btnSearch");
const btnResetSearch = document.querySelector(".js-resetSearch");

let filmList = []; //array guarda resultado del fetch
let myMovies = [];

//funciones
function callFetch() {
  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      filmList = json.data;
      renderCard();
      listenerFilm();
    });
}

function renderCard() {
  let html = "";
  filmList.forEach((item) => {
    html += `<li class="film-card js-filmCard" id=${item.mal_id}>
            <h3 >${item.title}</h3>
                </li>`;
  });
  foundMovies.innerHTML = html;
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
function handleClickFilm(event) {
  const clickedMoovie = parseInt(event.currentTarget.id);
  const match = filmList.find((item) => item.mal_id === clickedMoovie);
  myMovies.push(match);
  console.log(myMovies);
}

//eventos
function listenerFilm() {
  const film = document.querySelectorAll(".js-filmCard");
  for (const li of film) {
    li.addEventListener("click", handleClickFilm);
  }
}
btnResetSearch.addEventListener("click", handleClickResetInput);
btnSearch.addEventListener("click", handleClickSearch);
