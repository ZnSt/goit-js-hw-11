import axios from 'axios';
const API_KEY = '25755107-c5ecbaee54c3d5c87c2809c98';
const BASE_URL = 'https://pixabay.com/api/';

function fetchData(name) {
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
    )
    .then(response => {
      return response.data;
    });
}

export { fetchData };
