import axios from 'axios';
const API_KEY = '25755107-c5ecbaee54c3d5c87c2809c98';
const BASE_URL = 'https://pixabay.com/api/';

// function fetchData(name, page = 1) {
//   return axios
//     .get(
//       `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
//     )
//     .then(response => {
//       return response.data;
//     });
// }

const fetchData = async (name, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
  );
  return response.data;
};
export { fetchData };
