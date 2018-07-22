import React from "react";
import sdk from "flick-radar-sdk";

import Search from "./search/Search";
import SignUp from "./signup/SignUp";
import LogIn from "./login/LogIn";
import SearchResults from "./searchResults/SearchResults";
import DirectorPage from "./directorPage/DirectorPage";

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

    console.log("result :", result);
  };

  handleShowDirectorPage = async ({ event, director }) => {
    const movies = await sdk.getMoviesByDirector({
      directorId: director.id
    });

    this.setState({
      show: "directorPage",
      director: Object.assign({}, director, {
        movies
      })
    });
  };

  render() {
    const showMainElement = () => {
      switch (this.state.show) {
        case "welcome":
          return (
            <div>
              <SignUp />
              <LogIn />
            </div>
          );
        case "searchResults":
          return (
            <SearchResults
              directors={this.state.foundDirectors}
              onShowDirectorPage={this.handleShowDirectorPage}
            />
          );
        case "directorPage":
          return <DirectorPage director={this.state.director} />;
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
