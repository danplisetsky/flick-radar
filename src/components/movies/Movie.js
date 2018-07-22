import React from "react";

// ================================

class Movie extends React.Component {
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
          marginRight: "20px"
        }}
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
