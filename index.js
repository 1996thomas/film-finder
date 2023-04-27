const url = "http://www.omdbapi.com/?s=%22avatar%27&apikey=bd96c9ba";
let movies = [];
let movieForModal = [];
const getMovie = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    movies.push(data);
  } catch (error) {
    console.log("Erreur :", error.message);
  }
};

async function fetchMovieInfo() {
  await getMovie();
  movies[0].Search.map((movie) => {
    title = movie.Title;
    imdbID = movie.imdbID;
    poster = movie.Poster;
    if (poster === "N/A") {
      poster = "./5058385.png";
    }
    year = movie.Year;
    displayCard();
  });
  openModal();
}

function createCard() {
  card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);

  cardImage = document.createElement("div");
  cardImage.classList.add("card__image");
  card.appendChild(cardImage);
  img = document.createElement("img");
  cardImage.appendChild(img);

  cardContent = document.createElement("div");
  cardContent.classList.add("card__content");
  card.appendChild(cardContent);

  cardCTA = document.createElement("button");
  cardCTAText = document.createTextNode("Voir plus");
  cardCTA.appendChild(cardCTAText);
}

function displayCard() {
  cardTitle = document.createElement("h2");
  cardTitleText = document.createTextNode(title);
  cardTitle.appendChild(cardTitleText);

  cardYear = document.createElement("h3");
  cardYearText = document.createTextNode("Year :" + year);
  cardYear.appendChild(cardYearText);
  createCard();

  movies[0].Search.map((movie) => {
    img.src = poster;
    cardContent.append(cardTitle, cardYear, cardCTA);
  });
}

function createModal() {
  modal = document.createElement("div");
  modal.classList.add("modal");

  modalImg = document.createElement("div");
  modalImg.classList.add("modal__image");
  modalPoster = document.createElement("img");
  modalImg.appendChild(modalPoster);

  modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");
  modalTitle = document.createElement("h2");
  modalPlot = document.createElement("p");
  modalContent.append(modalTitle, modalPlot);

  modalClose = document.createElement("span");
  modalClose.classList.add("modal__close");

  modal.append(modalImg, modalContent, modalClose);
  main[0].appendChild(modal);
}

async function fetchMovieInfoModal(movieName) {
  let modalURL = movieName.toLowerCase().replaceAll(" ", "_");
  const modalLink = `http://www.omdbapi.com/?t=%22${modalURL}%27&apikey=bd96c9ba`;
  const response = await fetch(modalLink);
  const dataModal = await response.json();
  modalPoster.src = dataModal.Poster;
  modalTitle.innerHTML = dataModal.Title;
  modalPlot.innerHTML = dataModal.Plot;
}

function openModal() {
  ctaButton = document.querySelectorAll("div.card > div > button");
  main = document.getElementsByTagName("main");
  ctaButton.forEach((element) => {
    element.addEventListener("click", function (e) {
      const movieName = element.parentNode.firstChild.innerHTML;
      createModal();
      fetchMovieInfoModal(movieName);
      modal.classList.add("modal--show");
      window.addEventListener("click", function (e) {
        if (e.target === modalClose) {
          modalToDestroy = document.querySelector(".modal");
          modal.classList.remove("modal--show");
          modalToDestroy.remove();
        }
      });
    });
  });
}

fetchMovieInfo();
