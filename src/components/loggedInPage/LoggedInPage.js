import React from "react";
import { Redirect } from "react-router-dom";
import sdk from "flick-radar-sdk";

import Directors from "../directors/Directors";

// ================================

class LoggedInPage extends React.Component {
  async componentDidMount() {
    try {
      const favoriteDirectors = await sdk.getFavoriteDirectors(
        this.props.userId
      );
      this.props.setFavoriteDirectors(favoriteDirectors);
    } catch (error) {
      console.log("error in LoggedInPage: ", error);
    }
  }

  // ================================

  render() {
    const userId = this.props.userId;
    const favoriteDirectors = this.props.favoriteDirectors;

    if (!userId) {
      return <Redirect to="/" />;
    }

    const whatToRender = () => {
      switch (true) {
        case !favoriteDirectors:
          return <div className="animation-loading" />;
        case favoriteDirectors.length === 0:
          return (
            <div className="result">
              Looks like you haven't added a single director to your favorites.
              Do it now by searching for one!
            </div>
          );
        default:
          return (
            <Directors
              userId={userId}
              directors={favoriteDirectors}
              favoriteDirectors={favoriteDirectors}
              setFavoriteDirectors={this.props.setFavoriteDirectors}
            />
          );
      }
    };

    return (
      <fieldset className="favorite-directors container-results">
        <legend>Favorite Directors</legend>
        {whatToRender()}
      </fieldset>
    );
  }
}

// ================================

export default LoggedInPage;
