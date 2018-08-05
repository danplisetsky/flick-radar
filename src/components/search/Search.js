import React from "react";
import { Redirect } from "react-router-dom";

import "./search.css";

// ================================

class Search extends React.Component {
  state = {
    query: "",
    search: false
  };

  // ================================

  componentDidUpdate() {
    if (this.state.search)
      this.setState({
        search: false,
        query: ""
      });
  }

  // ================================

  handleChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    this.setState({
      search: true
    });
  };

  // ================================

  render() {
    if (this.state.search) {
      return (
        <Redirect
          push
          to={{
            pathname: "/search",
            search: `?query=${this.state.query.trim()}`
          }}
        />
      );
    }

    return (
      <form className="search-container" onSubmit={this.handleSubmitForm}>
        <input
          className="thin-border"
          type="search"
          required
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Director"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

// ================================

export default Search;
