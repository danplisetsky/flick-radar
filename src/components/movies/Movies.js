import React from "react";
import sortByReleaseDate from "./helpers/sortByReleaseDate";

import UserContext from "../contexts/UserContext";
import MovieContext from "../contexts/MovieContext";

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
      <UserContext.Consumer key={movie.id}>
        {userId => (
          <MovieContext.Consumer>
            {movieCtx => (
              <Movie
                movie={movie}
                userId={userId}
                director={movieCtx.director}
                toggleMovieWatchedStatus={movieCtx.toggleMovieWatchedStatus}
              />
            )}
          </MovieContext.Consumer>
        )}
      </UserContext.Consumer>
    ));

    return <div className="movies">{movies}</div>;
  }
}

// ================================

export default Movies;
