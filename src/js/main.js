"use strict";
const inputSearch = document.querySelector(".js-inputSearch");
const filmsSearched = document.querySelector(".js-filmSearched");
let filmList = []; //array guarda resultado del fetch

fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch.value}`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    filmList = json.data;

    renderCard();
  });
function renderCard() {
  let html = "";
  filmList.forEach((item) => {
    html += `<article class="film-card">
        <img src="" alt="movie cover"  />
        <h3>${item.title}</h3>
      </article>`;
  });
  filmsSearched.innerHTML = html;
}
