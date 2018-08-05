import React from "react";
import { Redirect } from "react-router-dom";
import sdk from "flick-radar-sdk";

import "./directors.css";

// ================================

class Directors extends React.Component {
  state = {
    showDirectorPage: false,
    directorId: undefined,
    waiting: false
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

  handleAddToFavorites = async ({
    directorId,
    directorName,
    directorImage,
    userId
  }) => {
    this.setState({
      waiting: true
    });
    try {
      const director = await sdk.addDirectorToFavorites({
        directorId,
        directorName,
        directorImage,
        userId
      });
      this.props.setFavoriteDirectors([
        ...this.props.favoriteDirectors,
        director
      ]);
      this.setState({
        waiting: false
      });
    } catch (error) {
      console.log("error in Directors: ", error);
      this.setState({
        waiting: false
      });
    }
  };

  handleRemoveFromFavorites = async ({ directorId, userId }) => {
    try {
      this.props.setFavoriteDirectors(
        this.props.favoriteDirectors.filter(({ id }) => id !== directorId)
      );
      await sdk.removeFromFavorites({
        directorId,
        userId
      });
    } catch (error) {
      console.log("error in Directors: ", error);
    }
  };

  // ================================

  render() {
    const userId = this.props.userId;
    const directors = this.props.directors;
    const favoriteDirectors = this.props.favoriteDirectors;

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

    const directorsToRender = directors.map(director => {
      const img = director.image ? (
        <img
          className="image-director icon"
          src={director.image}
          alt={director.name}
        />
      ) : (
        <div className="no-image-director icon background-icon" />
      );

      const unwatchedMovies =
        userId && favoriteDirectors.find(({ id }) => director.id === id) ? (
          <div className="movies-to-watch icon background-icon">
            {
              favoriteDirectors
                .find(({ id }) => director.id === id)
                .movies.filter(movie => !movie.watched).length
            }
          </div>
        ) : (
          undefined
        );

      const favoriteIcon = userId ? (
        favoriteDirectors.find(({ id }) => director.id === id) ? (
          <div
            className="remove-from-favorites icon background-icon"
            onClick={async _ =>
              await this.handleRemoveFromFavorites({
                directorId: director.id,
                userId
              })
            }
          />
        ) : (
          <div
            className={`add-to-favorites icon background-icon ${
              this.state.waiting ? "waiting" : ""
            }`}
            onClick={async _ =>
              await this.handleAddToFavorites({
                directorId: director.id,
                directorImage: director.image,
                directorName: director.name,
                userId
              })
            }
          />
        )
      ) : (
        undefined
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
          {unwatchedMovies}
          {favoriteIcon}
        </li>
      );
    });

    return <div className="directors">{directorsToRender}</div>;
  }
}

// ================================

export default Directors;
