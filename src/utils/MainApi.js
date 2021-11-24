export const BASE_URL = "http://api.filippov-diploma.nomoredomains.club";

function __getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
    }),
  }).then((res) => {
    return __getResponseData(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      'password': password,
      'email': email,
    }),
  }).then((res) => {
    return __getResponseData(res);
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  }).then((res) => {
    return __getResponseData(res);
  });
};

export const patchUser = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
		body: JSON.stringify({
      "name": name,
			"email": email
    }),
  }).then((res) => {
    return __getResponseData(res);
  });
};

export const saveMovie = (movie, token, owner) => {
	return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
		body: JSON.stringify({
      'country': movie.country,
      'director': movie.director,
			'duration': movie.duration,
			'year': movie.year,
			'description': movie.description,
			'image': `https://api.nomoreparties.co${movie.image.url}`,
			'trailer': movie.trailerLink,
			'nameRU': movie.nameRU,
			'nameEN': movie.nameEN,
			'thumbnail': `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
			'movieId': movie.id + "",
			'owner': owner,
    }),
  }).then((res) => {
    return __getResponseData(res);
  });
}

export const delMovie = (movieId, token) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  }).then((res) => {
		console.log(res)
    return __getResponseData(res);
  });
};

export const getSavedMovies = (token) => {
	return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  }).then((res) => {
    return __getResponseData(res);
  });
}

