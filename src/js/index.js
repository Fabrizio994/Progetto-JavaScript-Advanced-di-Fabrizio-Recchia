import "../css/style.scss";
import favicon from "../img/favicon.ico";
import ogImage from "../img/imgog.png";

const ogMeta = document.createElement("meta");
ogMeta.setAttribute("property", "og:image");
ogMeta.setAttribute("content", ogImage);

document.head.appendChild(ogMeta);

const icon = document.createElement("link");
icon.rel = "icon";
icon.type = "image/x-icon";
icon.href = favicon;
document.head.appendChild(icon);

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
  document.getElementById("spinner").style.display = "block";

  try {
    const response = await axios.get(
      `https://openlibrary.org/subjects/${categories}.json?limit=30`
    );
    return response.data;
  } catch (error) {
    alert("error");
    handleNoResults();
    throw error;
  } finally {
    document.getElementById("spinner").style.display = "none";
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
      bookElement.classList.add("card-body");
      categoryImageContainer.appendChild(bookElement);
    }
  });
}

function createBookElement(coverURL, title, description) {
  const bookElement = document.createElement("div");
  bookElement.ariaHidden = "true";
  bookElement.classList.add("book", "card", "shadow");

  //Elemento img per la copertina
  const imgElement = document.createElement("img");
  imgElement.src = coverURL;
  imgElement.alt = title;
  imgElement.title = title;
  imgElement.classList.add("book-cover", "card-img-top");
  bookElement.appendChild(imgElement);

  const titleElement = document.createElement("h5");
  titleElement.textContent = title;
  titleElement.classList.add("card-title", "placeholder-glow");
  bookElement.appendChild(titleElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;
  descriptionElement.classList.add("card-text", "placeholder-glow");
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
