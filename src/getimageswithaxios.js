import axios from 'axios';
import Notiflix from 'notiflix';



export async function getImagesWithAxios(config,iterationSearch) {
    try {
      const response = await axios(config);
      const dataImages = response.data.hits;
        
        if (dataImages.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;  
      }
      
      if (iterationSearch > 1 && response.data.totalHits) {
       Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`); 
      }

      if (config.params.page > (response.data.totalHits / 40) && response.data.totalHits ) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        return;
    }

        return dataImages;

  } catch (error) {
    console.log(error);
  }
}



