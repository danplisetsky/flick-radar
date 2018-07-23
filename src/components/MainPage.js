import React from "react";
import sdk from "flick-radar-sdk";

import Search from "./search/Search";
import SignUp from "./signup/SignUp";
import LogIn from "./login/LogIn";
import SearchResults from "./searchResults/SearchResults";
import DirectorPage from "./directorPage/DirectorPage";
import LoggedInPage from "./loggedInPage/LoggedInPage";

// ================================

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "welcome",
      foundDirectors: [],
      director: {
        id: "",
        image: "",
        name: "",
        movies: []
      },
      userId: "",
      userFavoriteDirectors: []
    };
  }

  handleSearchDirectors = async ({ event, query }) => {
    const result = await sdk.searchDirectors({
      query
    });

    this.setState({
      show: "searchResults",
      foundDirectors: result
    });
  };

  handleShowDirectorPage = async ({ event, director }) => {
    const movies =
      this.state.userId &&
      this.state.userFavoriteDirectors.find(
        d => d.id.toString() === director.id.toString()
      )
        ? await sdk.getFavoriteDirectorMovies({
            userId: this.state.userId,
            directorId: director.id
          })
        : await sdk.getMoviesByDirector({
            directorId: director.id
          });

    this.setState({
      show: "directorPage",
      director: Object.assign({}, director, {
        movies
      })
    });
  };

  handleAddToFavorites = async director => {
    await sdk.addDirectorToFavorites({
      userId: this.state.userId,
      directorId: director.id,
      directorName: director.name,
      directorImage: director.image
    });

    this.setState({
      userFavoriteDirectors: [...this.state.userFavoriteDirectors, director]
    });
  };

  handleLogin = async userId => {
    const favoriteDirectors = await sdk.getFavoriteDirectors(userId);

    this.setState({
      show: "loggedInPage",
      userId,
      userFavoriteDirectors: favoriteDirectors
    });
  };

  render() {
    const showMainElement = () => {
      switch (this.state.show) {
        case "welcome":
          return (
            <div>
              <SignUp />
              <LogIn onLogin={this.handleLogin} />
            </div>
          );
        case "searchResults":
          return (
            <SearchResults
              directors={this.state.foundDirectors}
              onShowDirectorPage={this.handleShowDirectorPage}
              userId={this.state.userId}
              onAddToFavorites={this.handleAddToFavorites}
            />
          );
        case "directorPage":
          return (
            <DirectorPage
              director={this.state.director}
              userId={this.state.userId}
            />
          );
        case "loggedInPage":
          return (
            <LoggedInPage
              userId={this.state.userId}
              directors={this.state.userFavoriteDirectors}
              onShowDirectorPage={this.handleShowDirectorPage}
            />
          );
        default:
          break;
      }
    };
    const mainElement = showMainElement();

    return (
      <div>
        <Search onSearchDirectors={this.handleSearchDirectors} />
        {mainElement}
      </div>
    );
  }
}

// ================================

export default MainPage;
