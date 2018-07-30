import React from "react";
import { Redirect } from "react-router-dom";

import "./directors.css";

// ================================

class Directors extends React.Component {
  state = {
    showDirectorPage: false,
    directorId: undefined
  };

  // ================================

  componentDidUpdate() {
    if (this.state.showDirectorPage) {
      this.setState({
        showDirectorPage: false,
        directorId: undefined
      });
    }
  }

  // ================================

  handleClick = directorId => {
    this.setState({
      showDirectorPage: true,
      directorId
    });
  };

  // ================================

  render() {
    if (this.state.showDirectorPage) {
      return (
        <Redirect
          push
          to={{
            pathname: "director",
            search: `?directorId=${this.state.directorId}`
          }}
        />
      );
    }

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
          <div
            className="director-info"
            onClick={_ => this.handleClick(director.id)}
          >
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
