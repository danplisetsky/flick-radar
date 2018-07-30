import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./mainPage.css";

import Search from "./search/Search";
import SearchResults from "./searchResults/SearchResults";
import Auth from "./auth/Auth";
import DirectorPage from "./directorPage/DirectorPage";
import LoggedInPage from "./loggedInPage/LoggedInPage";
import UserMenu from "./userMenu/UserMenu";

// ================================

class MainPage extends React.Component {
  state = {
    userId: undefined
  };

  // ================================

  setUserId = userId => {
    this.setState({
      userId
    });
  };

  // ================================

  render() {
    const homeLink = this.state.userId ? (
      <Link to="/loggedin" replace className="home">
        Flick Radar
      </Link>
    ) : (
      <a href="/" className="home">
        Flick Radar
      </a>
    );

    return (
      <Router>
        <div className="container">
          {homeLink}
          <Route path="/loggedin" component={UserMenu} />
          <Search />
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
            <Route path="/search" component={SearchResults} />
            <Route path="/director" component={DirectorPage} />
            <Route path="/loggedin" component={LoggedInPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// ================================

export default MainPage;
