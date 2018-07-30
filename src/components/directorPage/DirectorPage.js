import React from "react";
import sdk from "flick-radar-sdk";

import parseQuery from "../helpers/parseQuery";

import DirectorInfo from "../directorInfo/DirectorInfo";
import Movies from "../movies/Movies";

import "./directorPage.css";

// ================================

class DirectorPage extends React.Component {
  _currentId = undefined;

  state = {
    directorInfo: undefined,
    movies: undefined,
    prevId: "",
    error: false
  };

  // ================================

  async _getDirectorInfoAsync(directorId) {
    this._currentId = directorId;

    try {
      const directorInfoPromise = sdk.getDirectorInfo({ directorId });
      const moviesPromise = sdk.getMoviesByDirector({ directorId });

      const [directorInfo, movies] = await Promise.all([
        directorInfoPromise,
        moviesPromise
      ]);

      if (directorId === this._currentId) {
        this.setState({
          directorInfo,
          movies,
          error: false
        });
      }
    } catch (error) {
      console.log("error in DirectorPage: ", error.message);
      if (directorId === this._currentId) {
        this.setState({
          error: true
        });
      }
    }
  }

  // ================================

  static getDerivedStateFromProps(props, state) {
    const { directorId } = parseQuery(props.location.search);
    return directorId !== state.prevId
      ? {
          directorInfo: undefined,
          prevId: directorId,
          error: false
        }
      : null;
  }

  async componentDidMount() {
    const { directorId } = parseQuery(this.props.location.search);
    await this._getDirectorInfoAsync(directorId);
  }

  async componentDidUpdate(prevProps) {
    if (!this.state.directorInfo && !this.state.error) {
      const { directorId } = parseQuery(this.props.location.search);
      await this._getDirectorInfoAsync(directorId);
    }
  }

  componentWillUnmount() {
    this._currentId = undefined;
  }

  // ================================

  render() {
    const whatToRender = () => {
      const directorInfo = this.state.directorInfo;
      switch (true) {
        case this.state.error:
          return (
            <div className="director-page-bad-response">
              Something went wrong. Please try again.
            </div>
          );
        case !directorInfo:
          return <div className="animation-loading" />;

        default:
          return (
            <React.Fragment>
              <DirectorInfo director={directorInfo} />
              <div className="horizontal-rule" />
              <Movies movies={this.state.movies} directorId={directorInfo.id} />
            </React.Fragment>
          );
      }
    };

    return (
      <div className="container-results container-director">
        {whatToRender()}
      </div>
    );
  }
}

// ================================

export default DirectorPage;
