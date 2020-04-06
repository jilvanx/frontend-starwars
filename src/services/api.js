import axios from 'axios';

export const apiPeople = axios.create({
  baseURL: 'https://swapi.co/api/people',
});

export const apiStarShips = axios.create({
  baseURL: '',
});

export const apiStarWarsImages = axios.create({
  baseURL: 'https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/all.json',
});
