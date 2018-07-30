import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./mainPage.css";

import Search from "./search/Search";
import SearchResults from "./searchResults/SearchResults";
import Auth from "./auth/Auth";
import DirectorPage from "./directorPage/DirectorPage";

// ================================

class MainPage extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Link to="/" className="home">
            Flick Radar
          </Link>
          <Search />
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/search" component={SearchResults} />
            <Route path="/director" component={DirectorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// ================================

export default MainPage;
