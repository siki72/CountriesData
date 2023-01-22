const container = document.querySelector(".countries-container");
const myInputSearch = document.getElementById("inputSearch");
const RangeInput = document.getElementById("inputRange");
const range = document.getElementById("rangeValue");
const bbtn = document.querySelectorAll(".btnSort");
let sortMethod = "";

let countries = [];
async function fetchData() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((resp) => resp.json())
    .then((data) => {
      countries = data;
    });
  displayCountries();
}

function displayCountries() {
  fetchData();
  container.innerHTML = countries

    ////////////////filter  ///////////////
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(myInputSearch.value.toLowerCase())
    )

    ////////////////sort ///////////////
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common /// =====> compareaison alphabetique
        );
      }
    })
    ////////////////slice ///////////////
    .slice(0, RangeInput.value) /// ====> decouper le tableau à la valeur de la range

    ////////////////map ///////////////
    .map((country) => {
      return `
        <div class="card">
            <img src="${country.flags.svg}" alt="flag of ${country.translations.common}">
            <h2>${country.translations.fra.common}</h2>
            <h3>${country.capital}</h3>
            <h4>${country.population}</h4>
        </div>    
        `;
    })
    .join(" ");
}

window.addEventListener("load", fetchData);

RangeInput.addEventListener("input", () => {
  displayCountries();
  range.textContent = RangeInput.value; // =====> connecter input type range avec une span
});

bbtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    console.log(sortMethod);
  });
});
