import React from "react";

import "./directorInfo.css";
// ================================

class DirectorInfo extends React.Component {
  render() {
    const director = this.props.director;

    const img = director.image ? (
      <img
        className="image-director-info"
        src={director.image}
        alt={director.name}
      />
    ) : (
      <div className="no-image-director-info" />
    );

    const birthYear = director.birthday ? director.birthday.substr(0, 4) : "?";
    const deathYear = director.deathday ? director.deathday.substr(0, 4) : "";

    return (
      <div className="director-full-info">
        <div className="image-and-dates">
          {img}
          <p>
            {birthYear} - {deathYear}
          </p>
        </div>

        <div className="name-and-bio">
          <p>{director.name}</p>
          <p>{director.biography}</p>
        </div>
      </div>
    );
  }
}

// ================================

export default DirectorInfo;
