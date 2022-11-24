import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    listEl: document.querySelector('.country-list'),
    infoEl: document.querySelector('.country-info')

}

refs.inputEl.addEventListener('input', Debounce((e) => {
    const value = e.target.value.trim();
    if (value === '') {
        refs.listEl.innerHTML = '';
        refs.infoEl.innerHTML = '';
    } else {
        renderCountries(value);
    }
   
},DEBOUNCE_DELAY))

function createMurkupList(countries) {
    const markup = countries.map(country => {
        return `
            <li>
                <img src="${country.flags.svg}" alt="flag">
                <p>${country.name.official}</p>
            </li>
            `
    }).join('');

    return markup;
}

function createMurkupInfo(countries) {
    const markup = countries.map(country => {
        return `
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages).join(' ')}</p >
            `
    }).join('');
    return markup;
}

function renderCountries(value) {
        fetchCountries(value)
        .then(data => {
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length > 1 && data.length <= 10 ) {
        refs.listEl.innerHTML = createMurkupList(data);
    } else if (data.length === 1) {
        refs.listEl.innerHTML = createMurkupList(data);
        refs.infoEl.innerHTML = createMurkupInfo(data)
    }
        })
        .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
}