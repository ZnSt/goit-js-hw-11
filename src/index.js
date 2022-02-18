import './sass/main.scss';
import { fetchData } from './servises/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formSearch: document.querySelector('#search-form'),
  inputSearch: document.querySelector('[name="searchQuery"]'),
  listGallery: document.querySelector('.list'),
  btnGallery: document.querySelector('.btn-render'),
};

let page = 1;
let inputValue = '';

const searchImg = async events => {
  btnClassAdd();
  clearPage();
  events.preventDefault();
  inputValue = events.currentTarget.elements.searchQuery.value.trim();

  if (!inputValue) {
    return;
  }
  page = 1;
  try {
    const response = await fetchData(inputValue);

    if (!response.hits.length) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    btnClassRemove();
    renderGallery(response.hits);
  } catch (error) {
    Notify.failure(error.message);
  }

  updateBtn();
};

refs.formSearch.addEventListener('submit', searchImg);

function renderGallery(array) {
  const markup = array
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
          <a href="${largeImageURL}" class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/>
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

refs.btnGallery.addEventListener('click', newPage);

async function newPage() {
  page += 1;
  updateBtn(true);

  try {
    const response = await fetchData(inputValue, page);

    renderGallery(response.hits);
    if (response.hits.length < 40) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      btnClassAdd();
    }
  } catch (error) {
    Notify.failure(error.message);
  }
  updateBtn();
}

function btnClassRemove() {
  refs.btnGallery.classList.remove('is-hidden');
}

function btnClassAdd() {
  refs.btnGallery.classList.add('is-hidden');
}

function updateBtn(toggle = false) {
  refs.btnGallery.disabled = toggle;
}
