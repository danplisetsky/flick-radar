import React from "react";
import sdk from "flick-radar-sdk";

import UserContext from "../contexts/UserContext";
import FavoriteDirectorsContext from "../contexts/FavoriteDirectorsContext";

import Directors from "../directors/Directors";

import parseQuery from "../helpers/parseQuery";

import "./searchResults.css";

// ================================

class SearchResult extends React.Component {
  _currentQuery = undefined;

  state = {
    directors: undefined,
    prevQuery: "",
    error: false
  };

  // ================================

  async _searchDirectorsAsync(query) {
    this._currentQuery = query;

    try {
      const directors = await sdk.searchDirectors({ query });
      if (query === this._currentQuery) {
        this.setState({
          directors,
          error: false
        });
      }
    } catch (error) {
      console.log("Error in SearchResults: ", error.message);
      if (query === this._currentQuery) {
        this.setState({
          error: true
        });
      }
    }
  }

  // ================================

  static getDerivedStateFromProps(props, state) {
    const { query } = parseQuery(props.location.search);
    return query !== state.prevQuery
      ? {
          directors: undefined,
          prevQuery: query,
          error: false
        }
      : null;
  }

  async componentDidMount() {
    const { query } = parseQuery(this.props.location.search);
    await this._searchDirectorsAsync(query);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!this.state.directors && !this.state.error) {
      const { query } = parseQuery(this.props.location.search);
      await this._searchDirectorsAsync(query);
    }
  }

  componentWillUnmount() {
    this._currentQuery = undefined;
  }

  // ================================

  render() {
    const whatToRender = () => {
      const directors = this.state.directors;
      switch (true) {
        case this.state.error:
          return (
            <div className="search-bad-response">
              Something went wrong. Please try again.
            </div>
          );
        case !directors:
          return <div className="animation-loading" />;
        case directors.length === 0:
          return (
            <div className="search-bad-response">
              No results for "{this.state.prevQuery}"
            </div>
          );
        default:
          return (
            <UserContext.Consumer>
              {userId => (
                <FavoriteDirectorsContext.Consumer>
                  {favoriteDirectorsCtx => (
                    <Directors
                      directors={directors}
                      userId={userId}
                      favoriteDirectors={favoriteDirectorsCtx.favoriteDirectors}
                      setFavoriteDirectors={
                        favoriteDirectorsCtx.setFavoriteDirectors
                      }
                    />
                  )}
                </FavoriteDirectorsContext.Consumer>
              )}
            </UserContext.Consumer>
          );
      }
    };

    return (
      <div className="container-results search-results">{whatToRender()}</div>
    );
  }
}

// ================================

export default SearchResult;
