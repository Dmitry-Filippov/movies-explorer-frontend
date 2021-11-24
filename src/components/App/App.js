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
import { register, authorize, getContent } from "../../utils/MainApi";
import { useHistory } from "react-router";
import { getMovies } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const history = useHistory();
  const [isBurgerMenuOpened, setBurgerMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [matchedMovies, setMatchedMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [isMoreButtonActive, setMoreButtonActive] = React.useState(false);
  const [nothingMatched, setNothingMatched] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoaderActive, setLoaderActive] = React.useState(false);
  const token = localStorage.getItem("token");
  const [isRegisterWrong, setRegisterWrong] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
    getContent(token).then((res) => {
      console.log(res);
      setCurrentUser(res);
    });
    if (localStorage.getItem("matchedMovies")) {
      handleMoviesToRender(JSON.parse(localStorage.getItem("matchedMovies")));
    }
  }, []);

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
        history.push("/signin");
      })
      .catch((err) => {
        setRegisterWrong(true);
      });
  }

  function handleLogIn(email, password) {
    authorize(email, password).then((res) => {
      localStorage.setItem("token", res.token);
      setLoggedIn(true);
      tokenCheck();
    });
  }

  function handleLogOut() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("matchedMovies");
      setMatchedMovies([]);
      setLoggedIn(false);
      history.push("/signin");
    }
  }

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      getContent(token).then((res) => {
        console.log(res);
        setLoggedIn(true);
        setCurrentUser(res);
        history.push("/movies");
      });
    }
  }

  function handleMoviesSearch(text) {
    setMatchedMovies([]);
    setMoviesToRender([]);
    setNothingMatched(false);
    setLoaderActive(true);
    let isMatch = false;
    let moviesArr = [];
    getMovies()
      .then((res) => {
        res.forEach((item) => {
          if (
            item.nameRU.indexOf(text) !== -1 ||
            (item.nameEN && item.nameEN.indexOf(text) !== -1)
          ) {
            console.log(item);
            moviesArr.push(item);
            isMatch = true;
          }
        });
      })
      .then((res) => {
        // setMatchedMovies(moviesArr);
        localStorage.setItem("matchedMovies", JSON.stringify(moviesArr));
        handleMoviesToRender(moviesArr);
        setLoaderActive(false);
        if (!isMatch) {
          console.log("совпадений не найдено!");
          setNothingMatched(true);
        }
      });
  }

  function handleMoviesToRender(moviesArr) {
    console.log(moviesArr);
    if (moviesArr.length > 3) {
      let newMoviesArr = [];
      moviesToRender.push(moviesArr[0], moviesArr[1], moviesArr[2]);
      moviesArr.forEach((movie) => {
        if (
          movie.id !== moviesArr[0].id &&
          movie.id !== moviesArr[1].id &&
          movie.id !== moviesArr[2].id
        ) {
          newMoviesArr.push(movie);
        }
      });
      console.log(newMoviesArr);
      setMoviesToRender(moviesToRender);
      setMatchedMovies(newMoviesArr);
      setMoreButtonActive(true);
    } else {
      setMoviesToRender(moviesArr);
      setMatchedMovies(moviesArr);
      setMoreButtonActive(false);
    }
  }

  function handleMoreButtonClick() {
    console.log("morebutton");
    handleMoviesToRender(matchedMovies);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            handleBurgerMenuClick={handleBurgerMenuClick}
            movies={moviesToRender}
            handleMoviesSearch={handleMoviesSearch}
            isLoaderActive={isLoaderActive}
            nothingMatched={nothingMatched}
            isMoreButtonActive={isMoreButtonActive}
            handleMoreButtonClick={handleMoreButtonClick}
            component={Movies}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            handleBurgerMenuClick={handleBurgerMenuClick}
            movies={matchedMovies}
            handleMoviesSearch={handleMoviesSearch}
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
            />
          </Route>
          <Route path="/signin">
            <Login handleLogIn={handleLogIn} tokenCheck={tokenCheck} />
          </Route>
          <Route path="/preloader">
            <Preloader />
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
}

export default App;
