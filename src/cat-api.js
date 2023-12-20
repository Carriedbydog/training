import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_mU3SNdxCHQzy1Vuwa2KAVzcMfJZ5JvURdt1ylUd57xO3bcWYtOlsSWtEv367nzD5';

const BREEDS_URL = `https://api.thecatapi.com/v1/breeds`;
const IMAGES_URL = `https://api.thecatapi.com/v1/images`;

function fetchBreeds() {
  return fetch(BREEDS_URL).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

function fetchCatByBreed(breedId) {
  const urlCatBreeds = `${IMAGES_URL}/${breedId}`;
  return fetch(urlCatBreeds).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
