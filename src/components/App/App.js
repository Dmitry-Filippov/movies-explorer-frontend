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
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [newMoviesArr, setNewMoviesArr] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [mySavedMovies, setMySavedMovies] = React.useState([]);
  const [isMoreButtonActive, setMoreButtonActive] = React.useState(false);
  const [nothingMatched, setNothingMatched] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoaderActive, setLoaderActive] = React.useState(false);
  const token = localStorage.getItem("token");
  const [isRegisterWrong, setRegisterWrong] = React.useState(false);
  const [isLogInWrong, setLogInWrong] = React.useState(false);
  const [isCheckboxActive, setCheckboxActive] = React.useState(false);
  const [savedMatchedMovies, setSavedMatchedMovies] = React.useState([]);
  const [nothingMatchedSaved, setNothingMatchedSaved] = React.useState(false);
  const [noSavedMovies, setNoSavedMovies] = React.useState(false);

  React.useEffect(() => {
    if (!savedMovies[0]) {
      setNoSavedMovies(true);
    } else {
      setNoSavedMovies(false);
    }
  }, [savedMovies]);

  React.useEffect(() => {
    setCheckboxActive(false);
    tokenCheck();
    if (localStorage.getItem("matchedMovies")) {
      setMatchedMovies(JSON.parse(localStorage.getItem("matchedMovies")));
      handleMoviesToRender(JSON.parse(localStorage.getItem("matchedMovies")));
    }
  }, []);

  React.useEffect(() => {
    Promise.all([getMovies(), getSavedMovies(token)])
      .then(([movies, savedMovies]) => {
        const mySavedMovies = savedMovies.filter((movie) => {
          if (movie.owner === currentUser._id) {
            return true;
          } else {
            return false;
          }
        });
        movies.forEach((movie) => {
          mySavedMovies.forEach((savedMovie) => {
            if (
              (savedMovie.nameEN &&
                movie.nameEN &&
                savedMovie.nameEN === movie.nameEN) ||
              (savedMovie.nameRU &&
                movie.nameRU &&
                savedMovie.nameRU === movie.nameRU)
            ) {
              movie.isLiked = true;
              movie._id = savedMovie._id;
              savedMovie.isLiked = true;
            }
          });
        });
        setAllMovies(movies);
        setSavedMovies(mySavedMovies);
      })
      .then((res) => {
        setRender(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  React.useEffect(() => {
    moviesToRender.forEach((movie) => {
      savedMovies.forEach((savedMovie) => {
        if (
          (savedMovie.nameEN &&
            movie.nameEN &&
            savedMovie.nameEN === movie.nameEN) ||
          (savedMovie.nameRU &&
            movie.nameRU &&
            savedMovie.nameRU === movie.nameRU)
        ) {
          movie.isLiked = true;
          movie._id = savedMovie._id;
          savedMovie.isLiked = true;
        }
      });
    });
  }, [moviesToRender, savedMovies]);

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
      })
      .catch((err) => {
        setLogInWrong(true);
      });
  }

  function handleLogOut() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("matchedMovies");
      setMatchedMovies([]);
      setMoviesToRender([]);
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

  function handleMoviesToZero() {
    return new Promise((resolve, reject) => {
      moviesToRender.length = 0;
      matchedMovies.length = 0;
      // newMoviesArr.length = 0;
      resolve(true);
    });
  }

  function handleSavedMoviesSearch(text) {
    setNothingMatchedSaved(false);
    console.log(text);
    const matchedItems = allMovies
      .filter((movie) => (movie.isLiked ? true : false))
      .filter((movie) =>
        (movie.nameRU &&
          movie.nameRU.toLowerCase().includes(text.toLowerCase())) ||
        (movie.nameEN &&
          movie.nameEN.toLowerCase().includes(text.toLowerCase()))
          ? true
          : false
      );
    if (!matchedItems[0]) {
      setNothingMatchedSaved(true);
    } else {
      setSavedMatchedMovies(matchedItems);
    }
  }

  function handleMoviesSearch(text) {
    handleMoviesToZero().then((res) => {
      setLoaderActive(true);
      setNewMoviesArr([]);
      setNothingMatched(false);
      localStorage.removeItem("matchedMovies");
      const matchedItems = allMovies.filter((movie) => {
        if (
          (movie.nameRU &&
            movie.nameRU.toLowerCase().includes(text.toLowerCase())) ||
          (movie.nameEN &&
            movie.nameEN.toLowerCase().includes(text.toLowerCase()))
        ) {
          return true;
        } else return false;
      });
      if (matchedItems.length === 0) {
        setNothingMatched(true);
      } else {
        matchedMovies.forEach((movie) => {
          matchedMovies.push(movie);
        });
        // setMatchedMovies(matchedItems);
        matchedMovies.push(...matchedItems);
        console.log(matchedMovies);
        localStorage.setItem("matchedMovies", JSON.stringify(matchedItems));
        handleMoviesToRender(matchedMovies);
      }
    });
    // setLoaderActive(true);
    // setNewMoviesArr([]);
    // setMatchedMovies([]);
    // setNothingMatched(false);
    // localStorage.removeItem("matchedMovies");
    // const matchedItems = allMovies.filter((movie) => {
    //   if (
    //     (movie.nameRU &&
    //       movie.nameRU.toLowerCase().includes(text.toLowerCase())) ||
    //     (movie.nameEN &&
    //       movie.nameEN.toLowerCase().includes(text.toLowerCase()))
    //   ) {
    //     return true;
    //   } else return false;
    // });
    // if (matchedItems.length === 0) {
    //   setNothingMatched(true);
    // } else {
    //   setMatchedMovies(matchedItems);
    //   localStorage.setItem("matchedMovies", JSON.stringify(matchedItems));
    //   setMoviesToRender([]);
    //   handleMoviesToRender(matchedItems);
    // }
  }

  function handleCheckboxClick() {
    if (!isCheckboxActive) {
      setCheckboxActive(true);
    } else {
      setCheckboxActive(false);
    }
  }

  function likedMoviesCheck(arr1, arr2) {
    if (!currentUser) {
      getContent()
        .then((res) => {
          setCurrentUser(res);
        })
        .then((res) => {
          likedMoviesCheck(arr1, arr2);
        });
    } else {
      const mySavedMovies = arr2.filter(
        (movie) => movie.ownerr === currentUser._id
      );
      console.log(arr2);
      arr1.forEach((movie) => {
        arr2.forEach((savedMovie) => {
          if (
            (savedMovie.nameEN &&
              movie.nameEN &&
              savedMovie.nameEN === movie.nameEN) ||
            (savedMovie.nameRU &&
              movie.nameRU &&
              savedMovie.nameRU === movie.nameRU)
          ) {
            movie.isLiked = true;
            movie._id = savedMovie._id;
            savedMovie.isLiked = true;
          }
        });
      });
    }
  }

  function handleCardSaveDelCheck() {
    moviesToRender.forEach((movie) => {
      savedMovies.forEach((savedMovie) => {
        if (
          (savedMovie.nameEN &&
            movie.nameEN &&
            !savedMovie.isLiked &&
            savedMovie.nameEN === movie.nameEN) ||
          (savedMovie.nameRU &&
            movie.nameRU &&
            !savedMovie.isLiked &&
            savedMovie.nameRU === movie.nameRU)
        ) {
          console.log("fuck eah");
          movie.isLiked = false;
        }
      });
    });
  }

  function handleMoviesToRender(moviesArr) {
    console.log(moviesArr, moviesToRender);
    getSavedMovies(token).then((res) => {
      likedMoviesCheck(moviesArr, res);
      if (moviesArr.length <= 3) {
        setMoreButtonActive(false);
        moviesToRender.push(...matchedMovies);
      } else {
        setMoreButtonActive(true);
        const newArr = moviesArr.filter((movie) => {
          if (
            movie.nameRU === moviesArr[0].nameRU ||
            movie.nameRU === moviesArr[1].nameRU ||
            movie.nameRU === moviesArr[2].nameRU
          ) {
            return true;
          } else {
            return false;
          }
        });
        const newMoviesArr = moviesArr.filter((movie) => {
          if (
            movie.nameRU === moviesArr[0].nameRU ||
            movie.nameRU === moviesArr[1].nameRU ||
            movie.nameRU === moviesArr[2].nameRU
          ) {
            return false;
          } else {
            return true;
          }
        });
        moviesToRender.push(...newArr);
        setNewMoviesArr(newMoviesArr);
      }
      setLoaderActive(false);
    });
  }

  // function handleMoviesToRender(moviesArr) {
  //   console.log(moviesArr, moviesToRender);
  //   getSavedMovies(token).then((res) => {
  //     likedMoviesCheck(moviesArr, res);
  //     if (moviesArr.length <= 3) {
  //       setMoreButtonActive(false);
  //       console.log(matchedMovies);
  //       setMoviesToRender(matchedMovies);
  //     } else {
  //       setMoreButtonActive(true);
  //       const newArr = moviesArr.filter((movie) => {
  //         if (
  //           movie.nameRU === moviesArr[0].nameRU ||
  //           movie.nameRU === moviesArr[1].nameRU ||
  //           movie.nameRU === moviesArr[2].nameRU
  //         ) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //       const newMoviesArr = moviesArr.filter((movie) => {
  //         if (
  //           movie.nameRU === moviesArr[0].nameRU ||
  //           movie.nameRU === moviesArr[1].nameRU ||
  //           movie.nameRU === moviesArr[2].nameRU
  //         ) {
  //           return false;
  //         } else {
  //           return true;
  //         }
  //       });
  //       if (moviesToRender[0] && !isMoviesToRenderReset) {
  //         moviesToRender.length = 0;
  //         const arr = [...moviesToRender, ...newArr];
  //         setMoviesToRender(arr);
  //         // moviesToRender.push(...newArr)
  //         setNewMoviesArr(newMoviesArr);
  //         setMoviesToRenderReset(true);
  //       } else {
  //         const arr = [...moviesToRender, ...newArr];
  //         setMoviesToRender(arr);
  //         // moviesToRender.push(...newArr)
  //         setNewMoviesArr(newMoviesArr);
  //       }
  //       // const arr = [...moviesToRender, ...newArr];
  //       // setMoviesToRender(arr);
  //       // // moviesToRender.push(...newArr)
  //       // setNewMoviesArr(newMoviesArr);
  //     }
  //     setLoaderActive(false);
  //   });
  // }

  function handleMoreButtonClick() {
    handleMoviesToRender(newMoviesArr);
  }

  if (render) {
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
              movies={moviesToRender}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              handleMoviesSearch={handleMoviesSearch}
              isLoaderActive={isLoaderActive}
              nothingMatched={nothingMatched}
              isMoreButtonActive={isMoreButtonActive}
              handleMoreButtonClick={handleMoreButtonClick}
              handleCheckboxClick={handleCheckboxClick}
              isCheckboxActive={isCheckboxActive}
              component={Movies}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              handleBurgerMenuClick={handleBurgerMenuClick}
              movies={savedMatchedMovies[0] ? savedMatchedMovies : savedMovies}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              nothingMatchedSaved={nothingMatchedSaved}
              handleMoviesSearch={handleSavedMoviesSearch}
              handleCheckboxClick={handleCheckboxClick}
              isCheckboxActive={isCheckboxActive}
              noSavedMovies={noSavedMovies}
              handleCardSaveDelCheck={handleCardSaveDelCheck}
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
              <Login
                handleLogIn={handleLogIn}
                tokenCheck={tokenCheck}
                isLogInWrong={isLogInWrong}
              />
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
