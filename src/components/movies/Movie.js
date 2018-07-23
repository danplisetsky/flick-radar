import React from "react";

import sdk from "flick-radar-sdk";

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
      <img
        src={movie.image}
        alt={movie.name}
        style={{
          width: "100px",
          height: "100px"
        }}
      />
    ) : (
      undefined
    );

    return (
      <div
        style={{
          marginRight: "20px",
          backgroundColor: this.state.watched
            ? this.state.watched.isWatched
              ? "green"
              : "red"
            : "white"
        }}
        onClick={this.state.watched ? this.handleClick : undefined}
      >
        {image}
        <p>{movie.title}</p>
        <p>{movie.releaseDate}</p>
        {/* <p>{movie.overview}</p> */}
      </div>
    );
  }
}

// ================================

export default Movie;
