import "../css/style.scss";
import Search from "../img/search.png";

const button = document.querySelector("#btn");
const imgSearch = new Image();
imgSearch.src = Search;

button.appendChild(imgSearch);
function handleNoResults() {
  const categoryImageContainer = document.getElementById("categoryImages");
  categoryImageContainer.innerHTML = "";
  const noResultsMessage = document.createElement("p");
  noResultsMessage.textContent = "No results found";
  noResultsMessage.style.color = "whitesmoke";
  noResultsMessage.style.fontSize = "20px";
  noResultsMessage.style.textAlign = "center";
  categoryImageContainer.appendChild(noResultsMessage);
  alert("No result!");
}
async function fetchData(categories) {
  // Funzione asincrona per recuperare i dati dalla API
  try {
    const response = await axios.get(
      `https://openlibrary.org/subjects/${categories}.json?limit=30`
    );
    return response.data;
  } catch (error) {
    alert("error");
    handleNoResults();
    throw error;
  }
}

//Visualizzare libri
function displayBooks(works) {
  const categoryImageContainer = document.getElementById("categoryImages");
  categoryImageContainer.innerHTML = "";
  works.forEach((work) => {
    if (work.cover_edition_key) {
      const coverEditionUrl = `https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`;
      const bookElement = createBookElement(
        coverEditionUrl,
        work.title,
        work.description || "No description available"
      );
      categoryImageContainer.appendChild(bookElement);
    }
  });
}

function createBookElement(coverURL, title, description) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");

  //Elemento img per la copertina
  const imgElement = document.createElement("img");
  imgElement.src = coverURL;
  imgElement.alt = title;
  imgElement.title = title;
  imgElement.classList.add("book-cover");
  bookElement.appendChild(imgElement);

  const titleElement = document.createElement("p");
  titleElement.textContent = title;
  bookElement.appendChild(titleElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;
  bookElement.appendChild(descriptionElement);

  return bookElement;
}

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const categories = document.getElementById("search").value.toLowerCase();
    try {
      const data = await fetchData(categories);

      displayBooks(data.works);
    } catch (error) {
      alert(
        "An error occurred while retrieving the data. Please try again later."
      );
    }
  });
