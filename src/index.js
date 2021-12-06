import { getImagesWithAxios } from './getimageswithaxios.js'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';



const config = {
          
          url: 'http://pixabay.com/api',
          params: {
            key: '24632076-61665c6939d01412ec2d82576',
            q: '',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: '40',
            page: 1,
          }
        };

const refs = {
  searchForm: document.querySelector('.search-form'),
  imagesGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let iterationSearch = 0;


function onSearch(e) {
  e.preventDefault();

  clearImagesGallery();

  config.params.q = e.currentTarget.elements.searchQuery.value;
  config.params.page = 1;
  iterationSearch += 1;

  getImagesWithAxios(config,iterationSearch).then(dataImages => {

    clearImagesGallery();
    appendImagesGalleryMarkup(dataImages);
    refs.loadMoreBtn.classList.remove('is-hidden');

    
  });
  
}

function onLoadMore() {
  config.params.page += 1;

  getImagesWithAxios(config).then(dataImages => {
    if (!dataImages) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }
    appendImagesGalleryMarkup(dataImages);

    const gallery = new SimpleLightbox('.gallery a', {
    widthRatio: 0.95,
    heightRatio: 0.85,
    captionsData: "title",
    captionDelay: 250,
    });
    
    gallery.refresh();

    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 3,
  behavior: "smooth",
});
  });
 
}

function imagesGalleryMarkup(dataImages) {
    return dataImages
        .map((dataImage) => {
            return  `
  <div class="photo-card">
  <a class="gallery__item" href="${dataImage.largeImageURL}">
  <img class="gallery__image"
  src="${dataImage.webformatURL}"
  data-source="${dataImage.largeImageURL}"
  alt="${dataImage.tags}"
  loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <b class="info-namber">${dataImage.likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <b class="info-namber">${dataImage.views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <b class="info-namber">${dataImage.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <b class="info-namber">${dataImage.downloads}</b>
    </p>
  </div>
</div>
`;
})
.join("");    
}
 
function appendImagesGalleryMarkup(dataImages) {
  refs.imagesGallery.insertAdjacentHTML('beforeend', imagesGalleryMarkup(dataImages));
}

function clearImagesGallery () {
  refs.imagesGallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  
}

refs.imagesGallery.addEventListener("click", onGalleryContainerClick);

function onGalleryContainerClick(evt) {
    evt.preventDefault();
    const isGalleryImageEl = evt.target.classList.contains("gallery__image");

    if (!isGalleryImageEl) {
        return;
    }

    const urlBigImageEl = evt.target.getAttribute("data-source");
  const gallery = new SimpleLightbox('.gallery a', {
    widthRatio: 0.95,
    heightRatio: 0.85,
    captionsData: "title",
    captionDelay: 250,
    });
    gallery.on('show.simplelightbox');
    
    gallery.on('error.simplelightbox', function (e) {
    
      console.log(e);
      
});   
}


