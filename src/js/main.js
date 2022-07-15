"use strict";
const inputSearch = document.querySelector(".js-inputSearch");
const filmsSearched = document.querySelector(".js-filmSearched");
const btnSearch = document.querySelector(".js-btnSearch");
let filmList = []; //array guarda resultado del fetch

//funciones
function callFetch() {
  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      filmList = json.data;

      renderCard();
    });
}

function renderCard() {
  let html = "";
  filmList.forEach((item) => {
    html += `<article class="film-card">`;
    html += `<article class="film-card">
        <img src="" alt=""  />
        <h3>${item.title}</h3>
      </article>`;
  });
  filmsSearched.innerHTML = html;
}
function handleClick(ev) {
  ev.preventDefault();
  callFetch();
}
//eventos

btnSearch.addEventListener("click", handleClick);
