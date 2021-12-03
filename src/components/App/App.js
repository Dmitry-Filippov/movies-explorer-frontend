import React from "react";
import "./App.css";
import Main from "../Main/Main";
import { Route, Switch } from "react-router-dom";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  register,
  authorize,
  getContent,
  getSavedMovies,
} from "../../utils/MainApi";
import { useHistory } from "react-router";
import { getMovies } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const history = useHistory();
  const [render, setRender] = React.useState(false);
  const [isBurgerMenuOpened, setBurgerMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [matchedMovies, setMatchedMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [mySavedMovies, setMySavedMovies] = React.useState([]);
  const [nothingMatched, setNothingMatched] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoaderActive, setLoaderActive] = React.useState(false);
  const token = localStorage.getItem("token");
  const [isRegisterWrong, setRegisterWrong] = React.useState(false);
  const [isLogInWrong, setLogInWrong] = React.useState(false);
  const [isCheckboxActive, setCheckboxActive] = React.useState(false);
  const [savedMatchedMovies, setSavedMatchedMovies] = React.useState([]);
  const [nothingMatchedSaved, setNothingMatchedSaved] = React.useState(false);
  const [keyWord, setKeyWord] = React.useState("");

  React.useEffect(() => {
    setCheckboxActive(false);
    tokenCheck();
    if (localStorage.getItem("matchedMovies")) {
      const matchedItems = JSON.parse(localStorage.getItem("matchedMovies"));
      likedMoviesCheck(matchedItems);
      console.log(matchedItems, mySavedMovies);
      setMatchedMovies(matchedItems);
      // setMatchedMovies(JSON.parse(localStorage.getItem("matchedMovies")));
    }
    if (localStorage.getItem("allMovies")) {
      setAllMovies(JSON.parse(localStorage.getItem("allMovies")));
    }
  }, []);

  React.useEffect(() => {
    likedMoviesCheck(matchedMovies);
  });

  React.useEffect(() => {
    likedMoviesCheck(matchedMovies);
  }, [matchedMovies]);

  React.useEffect(() => {
    likedMoviesCheck(allMovies);
  }, [allMovies]);

  React.useEffect(() => {
    mySavedMovies.forEach((movie) => {
      movie.isLiked = true;
    });
    console.log(mySavedMovies);
  }, [mySavedMovies]);

  React.useEffect(() => {
    Promise.all([getMovies(), getSavedMovies(token)]).then(
      ([movies, savedMovies]) => {
        if (currentUser) {
          setMySavedMovies(
            savedMovies.filter((movie) =>
              movie.owner === currentUser._id ? true : false
            )
          );
          setAllMovies(movies);
          localStorage.setItem("allMovies", JSON.stringify(movies));
        }
      }
    );
  }, [currentUser]);

  function likedMoviesCheck(arr) {
    arr.forEach((movie) => {
      movie.isLiked = false;
    });
    arr.forEach((movie) => {
      mySavedMovies.forEach((savedMovie) => {
        if (
          (movie.nameEN &&
            savedMovie.nameEN &&
            movie.nameEN === savedMovie.nameEN) ||
          (movie.nameRU &&
            savedMovie.nameRU &&
            movie.nameRU === savedMovie.nameRU)
        ) {
          movie.isLiked = true;
          movie._id = savedMovie._id;
        }
      });
    });
  }

  function handleBurgerMenuClick() {
    setBurgerMenuOpen(true);
  }

  function handleBurgerPopUpClose() {
    setBurgerMenuOpen(false);
  }

  function handleRegister(name, email, password) {
    register(name, email, password)
      .then((res) => {
        setRegisterWrong(false);
        handleLogIn(email, password);
      })
      .catch((err) => {
        setRegisterWrong(true);
      });
  }

  function handleLogIn(email, password) {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLogInWrong(false);
        tokenCheck();
        history.push("/movies");
      })
      .catch((err) => {
        setLogInWrong(true);
      });
  }

  function handleLogOut() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("matchedMovies");
      localStorage.removeItem("allMovies");
      setMatchedMovies([]);
      setLoggedIn(false);
      history.push("/signin");
    }
  }

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRender(true);
    }
  }

  function handleSavedMoviesSearch(text) {
    setNothingMatchedSaved(false);
    setKeyWord(text);
    const matchedItems = mySavedMovies.filter((movie) =>
      (movie.nameRU &&
        movie.nameRU.toLowerCase().includes(text.toLowerCase())) ||
      (movie.nameEN && movie.nameEN.toLowerCase().includes(text.toLowerCase()))
        ? true
        : false
    );
    if (!matchedItems[0]) {
      setNothingMatchedSaved(true);
    } else {
      setSavedMatchedMovies(matchedItems);
    }
  }

  function localLikesCheck() {
    localStorage.removeItem("matchedMovies");
    localStorage.setItem("matchedMovies", JSON.stringify(matchedMovies));
  }

  function handleMoviesSearch(text) {
    setLoaderActive(true);
    matchedMovies.length = 0;
    setNothingMatched(false);
    const matchedItems = allMovies.filter(
      (movie) =>
        (movie.nameRU &&
          movie.nameRU.toLowerCase().includes(text.toLowerCase())) ||
        (movie.nameEN &&
          movie.nameEN.toLowerCase().includes(text.toLowerCase()))
    );
    setMatchedMovies(matchedItems);
    localStorage.setItem("matchedMovies", JSON.stringify(matchedItems));
    if (!matchedItems[0]) {
      setNothingMatched(true);
    }
    setTimeout(() => {
      setLoaderActive(false);
    }, 500);
  }

  function handleCheckboxClick() {
    if (!isCheckboxActive) {
      setCheckboxActive(true);
    } else {
      setCheckboxActive(false);
    }
  }

  if (true) {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Main loggedIn={loggedIn} />
            </Route>
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              handleBurgerMenuClick={handleBurgerMenuClick}
              movies={
                isCheckboxActive
                  ? matchedMovies.filter((movie) => movie.duration <= 40)
                  : matchedMovies
              }
              savedMovies={mySavedMovies}
              setSavedMovies={setMySavedMovies}
              handleMoviesSearch={handleMoviesSearch}
              isLoaderActive={isLoaderActive}
              nothingMatched={nothingMatched}
              handleCheckboxClick={handleCheckboxClick}
              isCheckboxActive={isCheckboxActive}
              setLoaderActive={setLoaderActive}
              likedMoviesCheck={likedMoviesCheck}
              localLikesCheck={localLikesCheck}
              component={Movies}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              handleBurgerMenuClick={handleBurgerMenuClick}
              movies={
                savedMatchedMovies[0]
                  ? mySavedMovies.filter(
                      (movie) =>
                        (movie.nameRU &&
                          movie.nameRU
                            .toLowerCase()
                            .includes(keyWord.toLowerCase())) ||
                        (movie.nameEN &&
                          movie.nameEN
                            .toLowerCase()
                            .includes(keyWord.toLowerCase()))
                    )
                  : nothingMatchedSaved
                  ? nothingMatchedSaved
                  : mySavedMovies
              }
              savedMatchedMovies={savedMatchedMovies}
              savedMovies={mySavedMovies}
              setSavedMatchedMovies={setSavedMatchedMovies}
              setSavedMovies={setMySavedMovies}
              nothingMatchedSaved={nothingMatchedSaved}
              handleMoviesSearch={handleSavedMoviesSearch}
              handleCheckboxClick={handleCheckboxClick}
              isCheckboxActive={isCheckboxActive}
              likedMoviesCheck={likedMoviesCheck}
              matchedMovies={matchedMovies}
              localLikesCheck={localLikesCheck}
              component={SavedMovies}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              handleBurgerMenuClick={handleBurgerMenuClick}
              handleLogOut={handleLogOut}
            />
            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
                isRegisterWrong={isRegisterWrong}
                loggedIn={loggedIn}
              />
            </Route>
            <Route path="/signin">
              <Login
                handleLogIn={handleLogIn}
                isLogInWrong={isLogInWrong}
                loggedIn={loggedIn}
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <BurgerMenu
            isOpened={isBurgerMenuOpened}
            handleBurgerPopUpClose={handleBurgerPopUpClose}
          />
        </div>
      </CurrentUserContext.Provider>
    );
  } else {
    return (
      <div className="app">
        <div className="app__preloader">
          <Preloader />
        </div>
      </div>
    );
  }
}

export default App;
