const URL = "https://api.nomoreparties.co/beatfilm-movies";

function _getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } else { return res.json() }
}

export function getMovies() {
  return fetch(URL, {
    method: "GET",
  } ).then((res) => {
    console.log(res)
    return _getResponseData(res);
  });
}
