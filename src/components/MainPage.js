import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserContext from "./contexts/UserContext";
import FavoriteDirectorsContext from "./contexts/FavoriteDirectorsContext";
import MovieContext from "./contexts/MovieContext";

import Search from "./search/Search";
import SearchResults from "./searchResults/SearchResults";
import Auth from "./auth/Auth";
import DirectorPage from "./directorPage/DirectorPage";
import LoggedInPage from "./loggedInPage/LoggedInPage";
import UserMenu from "./userMenu/UserMenu";

import parseQuery from "./helpers/parseQuery";

import "./mainPage.css";

// ================================

class MainPage extends React.Component {
  state = {
    userId: undefined,
    favoriteDirectors: undefined
  };

  // ================================

  setUserId = userId => {
    this.setState({
      userId
    });
  };

  setFavoriteDirectors = favoriteDirectors => {
    this.setState({
      favoriteDirectors
    });
  };

  toggleMovieWatchedStatus = ({ directorId, movieId, newWatchedStatus }) => {
    const director = this.state.favoriteDirectors.find(
      fd => fd.id === directorId
    );
    director.movies.find(
      movie => movie.id === movieId
    ).watched = newWatchedStatus;

    this.setState({
      favoriteDirectors: [
        ...this.state.favoriteDirectors.filter(fd => fd.id !== directorId),
        director
      ]
    });
  };

  // ================================

  render() {
    const userMenu = this.state.userId ? <UserMenu /> : undefined;

    return (
      <Router>
        <div className="container">
          <a href="/" className="home">
            Flick Radar
          </a>
          {userMenu}
          <Route component={Search} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Auth
                  {...props}
                  setUserId={this.setUserId}
                  userId={this.state.userId}
                />
              )}
            />
            <Route
              path="/search"
              render={props => (
                <UserContext.Provider value={this.state.userId}>
                  <FavoriteDirectorsContext.Provider
                    value={{
                      favoriteDirectors: this.state.favoriteDirectors,
                      setFavoriteDirectors: this.setFavoriteDirectors
                    }}
                  >
                    <SearchResults {...props} />
                  </FavoriteDirectorsContext.Provider>
                </UserContext.Provider>
              )}
            />
            <Route
              path="/director"
              render={props => (
                <UserContext.Provider value={this.state.userId}>
                  <MovieContext.Provider
                    value={{
                      director: this.state.favoriteDirectors
                        ? this.state.favoriteDirectors.find(fd => {
                            const { directorId } = parseQuery(
                              props.location.search
                            );
                            return fd.id === directorId;
                          })
                        : undefined,
                      toggleMovieWatchedStatus: this.state.userId
                        ? this.toggleMovieWatchedStatus
                        : undefined
                    }}
                  >
                    <DirectorPage {...props} />
                  </MovieContext.Provider>
                </UserContext.Provider>
              )}
            />
            <Route
              path="/loggedin"
              exact
              render={props => (
                <LoggedInPage
                  {...props}
                  userId={this.state.userId}
                  favoriteDirectors={this.state.favoriteDirectors}
                  setFavoriteDirectors={this.setFavoriteDirectors}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

// ================================

export default MainPage;
