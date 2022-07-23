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
const warnings = document.querySelector(".js-warning");

let filmList = []; //array guarda resultado del fetch
let myMovies = [];

btnSearch.disabled = false;

//***********funciones**********************

function callFetch() {
  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((json) => {
      filmList = json.data.map((item) => {
        return {
          id: item.mal_id,
          title: item.title,
          images: item.images,
        };
      });
      notFound();
      renderFilmList();
    })
    .catch((error) => {
      console.log(`Se ha producido un error ${error}`);
      console.log("no mi siela, esto no tendría que salir");
    });
}

function renderFilmList() {
  let html = "";
  let classSelected = "";

  filmList.forEach((item) => {
    const selected = myMovies.findIndex((selected) => item.id === selected.id);
    if (selected !== -1) {
      classSelected = "selected";
    } else {
      classSelected = "";
    }

    if (item.images.jpg.image_url === imgWrong) {
      html += `<li class="film-card js-filmCard  ${classSelected}" id=${item.id} title="click para seleccionar">
    <img src="${imgDefault}" />
            <h3 >${item.title}</h3>
           
                </li>`;
    } else {
      html += `<li class="film-card js-filmCard  ${classSelected} " id=${item.id} title="click para seleccionar">
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
      html += `<li class="film-card js-favCard" id=${item.id} title="click para eliminar">
    <img src="${imgDefault}" />
            <h3 >${item.title}</h3>
                </li>`;
    } else {
      html += `<li class="film-card js-favCard " id=${item.id} title="click para eliminar">
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
  if (foundMovies.innerHTML !== "") {
    renderFilmList();
    saveMyFavorites();
  } else {
    saveMyFavorites();
  }
}

function saveMyFavorites() {
  localStorage.setItem("favoriteMovies", JSON.stringify(myMovies));
}

function loadMyFavorites() {
  const dataLocalStorage = JSON.parse(localStorage.getItem("favoriteMovies"));

  if (dataLocalStorage !== null) {
    myMovies = dataLocalStorage;
    renderMyMovies();
  }
}
const removeMsg = () => (warnings.innerHTML = "");

function validateInput() {
  if (inputSearch.value === "") {
    btnSearch.disabled = true;
    warnings.innerHTML = "Introduce un título";
    setTimeout(removeMsg, 3000);
  } else {
    btnSearch.disabled = false;
    warnings.innerHTML = "";
  }
}
function notFound() {
  const result = filmList.filter((item) =>
    item.title.toLowerCase().includes(inputSearch.value.toLowerCase())
  );

  if (result.length === 0) {
    warnings.innerHTML = "Título no encontrado";
    setTimeout(removeMsg, 3000);
  } else {
    warnings.innerHTML = "";
  }
  clearInputSearch();
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
function pressEnter(ev) {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    validateInput();
    if (btnSearch.disabled === false) {
      callFetch();
    }
    return false;
  }
}
function clearInputSearch() {
  inputSearch.value = "";
}

// ********funciones manejadoras de eventos********
function handleClickSearch(ev) {
  ev.preventDefault();
  validateInput();

  if (btnSearch.disabled === false) {
    callFetch();
  }
}
function handleClickResetInput(ev) {
  ev.preventDefault();
  clearInputSearch();
  foundMovies.innerHTML = "";
}

function handleClickFilm(event) {
  const clickedMovie = parseInt(event.currentTarget.id);
  const match = filmList.find((item) => item.id === clickedMovie);
  const select = myMovies.findIndex((item) => item.id === match.id);

  if (select === -1) {
    myMovies.push(match);
  }
  renderFilmList();
  renderMyMovies();
  saveMyFavorites();
}

function handleClickFavorite(event) {
  const clickedFav = parseInt(event.currentTarget.id);
  const matchFav = myMovies.findIndex((item) => item.id === clickedFav);

  myMovies.splice(matchFav, 1);
  renderFilmList();
  renderMyMovies();
  saveMyFavorites();
}

//*********eventos************
btnResetSearch.addEventListener("click", handleClickResetInput);
btnSearch.addEventListener("click", handleClickSearch);
btnRemoveMyMovies.addEventListener("click", removeMyFavorites);
inputSearch.addEventListener("keydown", pressEnter);

//*********on load*************
loadMyFavorites();
