import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Створення HTML для однієї картки
export const createGalleryCardTemplate = cardsArr =>
  cardsArr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="gallery-card">
  <a href="${largeImageURL}">
    <div class="card-top-part">
      <img class="card-img" src="${webformatURL}" alt="${tags}" />
    </div>
    <ul class="card-bottom-part">
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Likes</h3>
        <p class="card-bottom-numbers">${likes}</p>
      </li>
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Views</h3>
        <p class="card-bottom-numbers">${views}</p>
      </li>
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Comments</h3>
        <p class="card-bottom-numbers">${comments}</p>
      </li>
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Downloads</h3>
        <p class="card-bottom-numbers">${downloads}</p>
      </li>
    </ul>
  </a>
</li>
`
    )
    .join('');

// Рендер галереї
export function renderGallery(cardsArr) {
  const markup = createGalleryCardTemplate(cardsArr);
  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // оновлення для SimpleLightbox
}

// Очищення галереї
export function clearGallery() {
  galleryRef.innerHTML = '';
}

// Функції для керування лоадером (якщо він є в HTML)
const loader = document.querySelector('.loader');

export function showLoader() {
  loader?.classList.remove('is-hidden');
}

export function hideLoader() {
  loader?.classList.add('is-hidden');
}