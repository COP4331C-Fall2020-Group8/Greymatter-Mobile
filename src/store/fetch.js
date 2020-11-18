const baseURL = 'https://grey-matter-backend.herokuapp.com/api';

export function _fetch (path) {
  return fetch({
    method: 'GET',
    url: `${baseURL}/${path}`
  })
  .then((response) => response.json());
}