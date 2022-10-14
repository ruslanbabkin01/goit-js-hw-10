import { fetchArticles } from './js/fetchCountries';
import { refs } from './js/refs';
import { appendTotalMarkup, appendMiniMarkup } from './js/appendMarkup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();

  if (inputValue === ' ') {
    return;
  }
  fetchArticles(inputValue).then(addMarkup).catch(onFetchError);
  clearContainer();
}

function addMarkup(name) {
  const quantityCountries = name.length;

  if (quantityCountries < 10 && quantityCountries > 2) {
    appendMiniMarkup(name);
    return;
  }
  if (quantityCountries === 1) {
    appendTotalMarkup(name);
    return;
  }
  if (quantityCountries > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}

function clearContainer() {
  refs.listUl.innerHTML = ' ';
  refs.divInfo.innerHTML = ' ';
}
