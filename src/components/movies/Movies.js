import React from "react";
import sortByReleaseDate from "./helpers/sortByReleaseDate";

import Movie from "./Movie";

import "./movies.css";
// ================================

class Movies extends React.Component {
  render() {
    if (this.props.movies.length === 0) {
      return (
        <div className="no-movies">
          Looks like this person hasn't directed a single movie yet. Too bad.
        </div>
      );
    }
    const movies = sortByReleaseDate(this.props.movies).map(movie => (
      <Movie
        key={movie.id}
        movie={movie}
        directorId={this.props.directorId}
        userId={this.props.userId}
      />
    ));

    return <div className="movies">{movies}</div>;
  }
}

// ================================

export default Movies;
