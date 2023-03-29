import './css/styles.css';
import fetchCountries from "./js/fetchCountries";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    inputEl: document.querySelector("input#search-box"),
};

refs.inputEl.addEventListener('input', debounce(onInput, 300));

function getCountries(countries) {
    // const names = countries.filter(el => el.name.official.toLowerCase().includes(`${nameStr.toLocaleLowerCase()}`));
    console.log(countries);
}

function onInput(e) {
    const name = e.target.value;
    fetchCountries(name)
    .then(getCountries)
    .catch(error => console.log(error));
}

// name.official, capital, population, flags.svg, languages 
// .map(el => el.name.official).sort((a, b) => a.localeCompare(b))