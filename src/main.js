import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
// import "simplelightbox/dist/simple-lightbox.min.css";

import errorIcon from '/img/izi-toast-svg/error-icon.svg';
// import successIcon from '/img/izi-toast-svg/success-icon.svg';

import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const formEl = document.querySelector('.js-form');
const inputEl = document.querySelector('.js-form-input');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const onFormSubmit = event => {
  event.preventDefault();

  const searchedQuery = inputEl.value.trim();

  event.target.reset();

  if (!searchedQuery) {
    iziToast.error({
      message: `Search query can't be empty`,
      messageSize: '16',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      closeOnClick: true,
      timeout: 3500,
      close: false,
      iconUrl: errorIcon,
    });

    return;
  }
  
  galleryEl.innerHTML = '';
  loaderEl.classList.remove('hidden');
  
  fetchPhotos(searchedQuery)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          messageSize: '16',
          messageColor: '#ffffff',
          backgroundColor: '#ef4040',
          position: 'topRight',
          maxWidth: '432',
          closeOnClick: true,
          timeout: 3500,
          close: false,
          iconUrl: errorIcon,
        });

        return;
      }

      galleryEl.innerHTML = createGalleryCardTemplate(hits);

      simplelightbox.refresh();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loaderEl.classList.add('hidden');
    });
};

const simplelightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

formEl.addEventListener('submit', onFormSubmit);