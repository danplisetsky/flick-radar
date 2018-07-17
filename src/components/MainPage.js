import React from "react";
import sdk from "flick-radar-sdk";

import Search from "./search/Search";
import SignUp from "./signup/SignUp";
import LogIn from "./login/LogIn";
import SearchResults from "./searchResults/SearchResults";

// ================================

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "welcome",
      foundDirectors: []
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
          return <SearchResults directors={this.state.foundDirectors} />;
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
