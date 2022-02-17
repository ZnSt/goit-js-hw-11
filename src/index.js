import './sass/main.scss';
import { fetchData } from './servises/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formSearch: document.querySelector('#search-form'),
  inputSearch: document.querySelector('[name="searchQuery"]'),
  listGallery: document.querySelector('.list'),
};

refs.formSearch.addEventListener('submit', searchImg);

let inputValue = '';
console.log(fetchData);

function searchImg(events) {
  events.preventDefault();
  inputValue = events.currentTarget.elements.searchQuery.value.trim();

  if (!inputValue) {
    clearPage();
    return;
  }
  fetchData(inputValue).then(response => {
    renderGallery(response.hits);
  });
}
function renderGallery(array) {
  const markup = array
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
          <a href="${largeImageURL}" class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</a>
          `;
    })
    .join('');
  refs.listGallery.insertAdjacentHTML('beforeend', markup);
}

function clearPage() {
  refs.listGallery.innerHTML = '';
}
