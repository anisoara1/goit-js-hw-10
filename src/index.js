import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderMessage = document.querySelector('.loader');

Notify.init({  
  failure: {
    notiflixIconColor: 'white',
  }
});

breedSelect.style.display = 'none';
fetchBreeds()
    .then(cats => {
        loaderMessage.style.display = 'none';
        breedSelect.style.display = 'block';
        
        const markup = cats.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
        breedSelect.insertAdjacentHTML('beforeend', markup);
    })
    .catch(() => Notify.failure('Oops! Something went wrong! Try reloading the page!'));


breedSelect.addEventListener('input', (e) => {
    loaderMessage.style.display = 'block';

    const prevCat = document.querySelector('.cat-box');
    if (prevCat)
        prevCat.remove();

    const option = breedSelect.options[breedSelect.selectedIndex].value;
    fetchCatByBreed(option)
        .then(cats => {
            loaderMessage.style.display = 'none';

            const markup = cats.map(cat =>
                `<div class="cat-box">
                    <img src="${cat.url}" width="360" />
                    <div class="info">
                        <h1>${cat.breeds[0].name}</h1>
                        <p>${cat.breeds[0].description}</p>
                        <p><b>Temperament: </b>${cat.breeds[0].temperament}</p>   
                    </div>
                </div>`
            ).join('');
            catInfo.insertAdjacentHTML('beforeend', markup);
        })
        .catch(() => Notify.failure('Oops! Something went wrong! Try reloading the page!'));
});
