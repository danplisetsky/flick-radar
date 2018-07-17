import React from "react";
import sdk from "flick-radar-sdk";

// ================================

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  searchDirectors = async event => {
    const result = await sdk.searchDirectors({
      query: this.state.query
    });

    console.log("result :", result);
  };

  handleChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  render() {
    return (
      <div>
        <input
          type="search"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.searchDirectors}>
          Search
        </button>
      </div>
    );
  }
}

// ================================

export default Search;
