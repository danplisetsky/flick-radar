import React from "react";

import sdk from "flick-radar-sdk";

import "./movie.css";
// ================================

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watched: this.props.movie.hasOwnProperty("watched")
        ? {
            isWatched: this.props.movie.watched
          }
        : false
    };
  }

  handleClick = async event => {
    const result = await sdk.toggleMovieWatched({
      userId: this.props.userId,
      directorId: this.props.directorId,
      movieId: this.props.movie.id
    });

    this.setState({
      watched: {
        isWatched: result.watched
      }
    });
  };

  render() {
    const movie = this.props.movie;

    const image = movie.image ? (
      <img src={movie.image} alt={movie.name} />
    ) : (
      <div className="no-image-movie" />
    );

    const releaseDate = movie.releaseDate || "?";

    return (
      <div
        className="movie"
        /* style={{
          marginRight: "20px",
          backgroundColor: this.state.watched
            ? this.state.watched.isWatched
              ? "green"
              : "red"
            : "white"
        }}
        onClick={this.state.watched ? this.handleClick : undefined} */
      >
        <div className="movie-info">
          {image}
          <div className="title-and-overview">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
          </div>

          <p>{releaseDate}</p>
        </div>

        <div className="watched-icon" />
      </div>
    );
  }
}

// ================================

export default Movie;
