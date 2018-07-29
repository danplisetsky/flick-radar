import React from "react";

import "./directors.css";
// ================================

class Directors extends React.Component {
  render() {
    const directors = this.props.directors.map(director => {
      const img = director.image ? (
        <img
          className="image-director"
          src={director.image}
          alt={director.name}
        />
      ) : (
        <div className="no-image-director" />
      );
      return (
        <li className="director" key={director.id}>
          <div className="director-info">
            {img}
            <p className="director-name">{director.name}</p>
          </div>
        </li>
      );
    });

    return <div className="directors">{directors}</div>;
  }
}

// ================================

export default Directors;
