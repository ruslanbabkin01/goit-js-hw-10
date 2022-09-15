import './css/styles.css';
import { fetchArticles } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  listUl: document.querySelector('.country-list'),
  divInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();

  if (inputValue !== ' ') {
    fetchArticles(inputValue).then(addMarkup).catch(onFetchError);
    clearContainer();
    return;
  }
  clearContainer();
}

function addMarkup(name) {
  const quantityCountries = name.length;

  appendMiniMarkup(name);

  if (quantityCountries > 10 && quantityCountries > 2) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (quantityCountries === 1) {
    appendTotalMarkup(name);
    return;
  }
}

function appendTotalMarkup(name) {
  const markup = name
    .map(({ name, flags, capital, population, languages }) => {
      return `<li>
      <h2><img width="35" height="25" src="${flags.svg}"</img>
      ${name.official}</h2>
      <p>Capital: ${capital[0]}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)
        .toString()
        .split(',')
        .join(', ')}</p>
    </li> `;
    })
    .join('');
  refs.listUl.innerHTML = markup;
}

function appendMiniMarkup(name) {
  const markup = name
    .map(({ name, flags }) => {
      return `<li>
      <h2><img width="35" height="25" src="${flags.svg}"</img>
      ${name.official}</h2>`;
    })
    .join('');
  refs.listUl.innerHTML = markup;
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}

function clearContainer() {
  refs.listUl.innerHTML = ' ';
  refs.divInfo.innerHTML = ' ';
}
