import CardTpl from "./tamplates/cards.hbs"
import ListTpl from "./tamplates/list.hbs"
import API from "./fetchCountries.js"
import getRefs from './get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
const { defaults } = require('@pnotify/core');

defaults.delay = '1000';

const debounce = require('lodash.debounce');

const refs = getRefs();

refs.searchForm.addEventListener(
  'input',
    debounce(() => {onSearch()}, 500),
);

let searchQuery = ''
 
function onSearch() {
    resetSearch()
searchQuery = refs.searchForm.value; 
    
  API.fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(err => console.log(err))
}
function resetSearch() {
  refs.cardContainer.innerHTML = '';
}

function renderCountryCard(country) {
    if (country.length === 1) {
        resetSearch()
        const markup = CardTpl(country);
        refs.cardContainer.innerHTML = markup;
       
    }
    else if (country.length > 1 && country.length <= 10) {
        resetSearch()
        const list = ListTpl(country)
        refs.cardContainer.innerHTML = list
}
    else if (country.length > 10) {
       info({
  text: 'To many matches found. Please enter a more specific query!'
});
    } else {
        error({
            text: 'No matches found!'
        });}
}





