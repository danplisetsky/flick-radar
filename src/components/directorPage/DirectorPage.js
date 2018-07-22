import React from "react";

import Movies from "../movies/Movies";

// ================================

class DirectorPage extends React.Component {
  render() {
    const director = this.props.director;
    const image = director.image ? (
      <img
        src={director.image}
        alt={director.name}
        style={{
          width: "100px",
          height: "100px"
        }}
      />
    ) : (
      undefined
    );

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          {image}
          <p>{director.name}</p>
        </div>
        <Movies movies={director.movies} />
        {/* <DirectorInfo />
        <AllMovies /> */}
      </div>
    );
  }
}

// ================================

export default DirectorPage;
