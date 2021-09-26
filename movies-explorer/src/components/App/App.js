import React from "react";
import "./App.css";
import Main from "../Main/Main";
import { Route, Switch } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function App() {
  const [isBurgerMenuOpened, setBurgerMenuOpen] = React.useState(false);

  function handleBurgerMenuClick() {
    setBurgerMenuOpen(true);
  }

  function handleBurgerPopUpClose() {
    setBurgerMenuOpen(false);
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies handleBurgerMenuClick={handleBurgerMenuClick} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies handleBurgerMenuClick={handleBurgerMenuClick} />
        </Route>
        <Route path="/profile">
          <Profile handleBurgerMenuClick={handleBurgerMenuClick} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <BurgerMenu isOpened={isBurgerMenuOpened} handleBurgerPopUpClose={handleBurgerPopUpClose} />
    </div>
  );
}

export default App;
