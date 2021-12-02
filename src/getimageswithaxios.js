const axios = require('axios').default;
import Notiflix from 'notiflix';

export async function getImagesWithAxios(name) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=24632076-61665c6939d01412ec2d82576&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=2`);
        const dataImages = response.data.hits;
        console.log(dataImages);
        console.log(dataImages.length);
        if (dataImages.length === 0) {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');    
        }
       
        return dataImages;

  } catch (error) {
    console.log(error);
  }
}



