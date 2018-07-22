import React from "react";
import sortByReleaseDate from "./helpers/sortByReleaseDate";

import Movie from "./Movie";
// ================================

class Movies extends React.Component {
  render() {
    const movies = sortByReleaseDate(this.props.movies).map(movie => (
      <Movie key={movie.id} movie={movie} />
    ));

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: "10px"
        }}
      >
        {movies}
      </div>
    );
  }
}

// ================================

export default Movies;
