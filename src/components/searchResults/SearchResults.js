import React from "react";
import sdk from "flick-radar-sdk";

import parseQuery from "./helpers/parseQuery";

import "./searchResults.css";
import Directors from "../directors/Directors";

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
    const parsedQuery = parseQuery(props.location.search);
    return parsedQuery !== state.prevQuery
      ? {
          directors: undefined,
          prevQuery: parsedQuery,
          error: false
        }
      : null;
  }

  async componentDidMount() {
    const parsedQuery = parseQuery(this.props.location.search);
    await this._searchDirectorsAsync(parsedQuery);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!this.state.directors && !this.state.error) {
      const parsedQuery = parseQuery(this.props.location.search);
      await this._searchDirectorsAsync(parsedQuery);
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
          return <Directors directors={directors} />;
      }
    };

    return <div className="search-results">{whatToRender()}</div>;
  }
}

// ================================

export default SearchResult;
