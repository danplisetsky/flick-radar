import React from "react";

import sdk from "flick-radar-sdk";

import "./movie.css";

// ================================

class Movie extends React.Component {
  state = {
    watched: this.props.director
      ? this.props.director.movies.find(({ id }) => id === this.props.movie.id)
          .watched
      : undefined,
    waiting: false
  };

  // ================================

  handleToggleWatched = async ({ userId, directorId, movieId }) => {
    try {
      this.setState({
        waiting: true
      });
      const newWatchedStatus = await sdk.toggleMovieWatched({
        userId,
        directorId,
        movieId
      });
      this.props.toggleMovieWatchedStatus({
        directorId,
        movieId,
        newWatchedStatus
      });
      this.setState({
        waiting: false
      });
    } catch (error) {
      console.log("error in Movie: ", error);
    }
  };

  // ================================

  componentDidUpdate(prevProps, prevState) {
    const newWatchedStatus = this.props.director
      ? this.props.director.movies.find(({ id }) => id === this.props.movie.id)
          .watched
      : undefined;
    if (prevState.watched !== newWatchedStatus) {
      this.setState({
        watched: newWatchedStatus
      });
    }
  }

  // ================================

  render() {
    const movie = this.props.movie;
    const userId = this.props.userId;
    const director = this.props.director;

    const image = movie.image ? (
      <img src={movie.image} alt={movie.name} />
    ) : (
      <div className="no-image-movie" />
    );

    const releaseDate = movie.releaseDate || "?";

    const onClickToggleWatched = async _ => {
      this.handleToggleWatched({
        userId,
        directorId: director.id,
        movieId: movie.id
      });
    };

    const toggleWatchedIcon =
      userId && new Date(releaseDate) < Date.now() ? (
        this.state.watched ? (
          <div
            className={`toggle-watched ${this.state.waiting ? "waiting" : ""}`}
            onClick={onClickToggleWatched}
          />
        ) : (
          <div
            className={`toggle-not-watched ${
              this.state.waiting ? "waiting" : ""
            }`}
            onClick={onClickToggleWatched}
          />
        )
      ) : (
        undefined
      );

    return (
      <div className="movie">
        <div className="movie-info">
          {image}
          <div className="title-and-overview">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
          </div>

          <p>{releaseDate}</p>
        </div>

        {toggleWatchedIcon}
      </div>
    );
  }
}

// ================================

export default Movie;
