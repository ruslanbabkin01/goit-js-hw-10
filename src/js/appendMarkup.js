import { refs } from './refs';

export function appendTotalMarkup(name) {
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

export function appendMiniMarkup(name) {
  const markup = name
    .map(({ name, flags }) => {
      return `<li>
      <h2><img width="35" height="25" src="${flags.svg}"</img>
      ${name.official}</h2>`;
    })
    .join('');
  refs.listUl.innerHTML = markup;
}
