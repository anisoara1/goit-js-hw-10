const API_KEY = 'live_NTwcpF7oQyZl9mhP4wPz9CvBwPutkEr1VAWW1hgaM3xu99pNa4vQ2odTddrxp3y4';

const fetchBreeds = () => {
    return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => response.json());
}

const fetchCatByBreed = (id) => {
    return fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${id}`)
        .then(response => response.json());
}

export { fetchBreeds, fetchCatByBreed };