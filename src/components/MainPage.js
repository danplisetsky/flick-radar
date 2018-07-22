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
      user: {
        id: "",
        favoriteDirectors: []
      }
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
      this.state.user.id &&
      this.state.user.favoriteDirectors.find(d => d.id === director.id)
        ? await sdk.getFavoriteDirectorMovies({
            userId: this.state.user.id,
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

  handleLogin = async userId => {
    const favoriteDirectors = await sdk.getFavoriteDirectors(userId);

    this.setState({
      show: "loggedInPage",
      user: {
        id: userId,
        favoriteDirectors
      }
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
              userId={this.state.user.id}
            />
          );
        case "directorPage":
          return <DirectorPage director={this.state.director} />;
        case "loggedInPage":
          return (
            <LoggedInPage
              userId={this.state.user.id}
              directors={this.state.user.favoriteDirectors}
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
