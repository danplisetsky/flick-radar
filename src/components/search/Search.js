import React from "react";

// ================================

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

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
        <button
          type="submit"
          onClick={async event =>
            await this.props.onSearchDirectors({
              event,
              query: this.state.query
            })
          }
        >
          Search
        </button>
      </div>
    );
  }
}

// ================================

export default Search;
