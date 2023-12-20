import { fetchCatByBreed, fetchBreeds } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// ===================================================================
refs.select.addEventListener('change', onSearchCatbyBreed);
refs.loader.classList.add('loader');
refs.select.classList.add('visually-hidden');
refs.error.classList.add('visually-hidden');
// ===================================================================

function onSearchCatbyBreed(e) {
  const targetOption = e.target.value;
  refs.loader.classList.remove('visually-hidden');
  refs.catInfo.classList.add('visually-hidden');

  fetchCatByBreed(targetOption)
    .then(data => {
      cardMarkup(data);
      setTimeout(() => {
        refs.catInfo.classList.remove('visually-hidden');
      }, 300);
    })
    .catch(err => {
      refs.catInfo.innerHTML = '';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try choose another breed!'
      );
      console.log(err);
    })
    .finally(refs.loader.classList.add('visually-hidden'));
}

fetchBreeds()
  .then(data => {
    refs.loader.classList.add('visually-hidden'),
      refs.select.classList.remove('visually-hidden'),
      refs.select.insertAdjacentHTML('beforeend', optionsMarkup(data));
    new SlimSelect({
      select: refs.select,
    });
    setTimeout(() => {
      refs.select.classList.remove('visually-hidden');
    }, 500);
    return data;
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );

    refs.loader.classList.add('visually-hidden');
    refs.select.classList.remove('visually-hidden');
    console.log(err);
  })
  .finally(refs.loader.classList.replace('loaderl', 'visually-hidden'));

function optionsMarkup(arr) {
  return arr
    .map(el => `<option value="${el.reference_image_id}">${el.name}</option>`)
    .join('');
}

function cardMarkup(data) {
  refs.loader.classList.remove('visually-hidden');
  const {
    url,
    breeds: [{ name, description, temperament }],
  } = data;

  refs.catInfo.classList.add('visually-hidden');

  refs.catInfo.innerHTML = `
  <img class="cat-img" src="${url}" alt="${name}" width='500'/>
    <div class="cat-card">
    <h2 class="cat-title">Cat Breed</h2>
    <p class="cat-characteristics">${name}</p>
    <h2 class="cat-title">Description</h2>
    <p class="cat-characteristics">${description}</p>
    <h2 class="cat-title">Temperament</h2>
    <p class="cat-characteristics">${temperament}</p>
    </div>
    `;
  refs.loader.classList.add('visually-hidden');
  refs.catInfo.classList.remove('visually-hiden');
}
