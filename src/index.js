import './css/styles.css';
import fetchCountries from "./js/fetchCountries";
import Notiflix from 'notiflix';
import Debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    searchBox: document.querySelector("input#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info"),
};

refs.searchBox.addEventListener('input', Debounce(onInput, 300));

function getCountries(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }
    if (countries.length >= 2 && countries.length <= 10) {
        renderList(countries, 'p');
        return;
    }
    if (countries.length === 1) {
        renderList(countries, 'h1');
        renderInfo(countries);
        return;
    }
}

function onInput(e) {
    const name = e.target.value.trim();
    if (!name) {
        clearHtml();
        return;
    }
    clearHtml();

    fetchCountries(name)
    .then(getCountries)
    .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
}


function clearHtml() {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
}

function renderList(countries, tag) {
    const markup = countries.map(({ name, capital, population, flags, languages }) =>
            `<li class="country-list__item">
            <div class="country-list__flag">
                <img src="${flags.svg}" width="30" alt="${flags.alt}">
            </div>
            <div class="country-list__name">
                <${tag}>${name.official}</${tag}>
            </div>
            </li>`
        ).join('');
        refs.list.insertAdjacentHTML("afterbegin", markup);
}

function renderInfo(countries) {
    const markupInfo = countries.map(({ name, capital, population, flags, languages }) =>
        `
            <p><span class="country-info__header">Capital:</span> ${capital}</p>
            <p><span class="country-info__header">Population:</span> ${population}</p>
            <p><span class="country-info__header">Languages:</span> ${Object.values(languages)}</p>
        `
    ).join('');

    refs.info.insertAdjacentHTML("afterbegin", markupInfo);
}