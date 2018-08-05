import React from "react";
import { Link } from "react-router-dom";

import "./userMenu.css";

// ================================

class UserMenu extends React.Component {
  handleClick = _ => {
    this.props.setUserIdAndLogin({
      userId: undefined
    });
  };

  // ================================

  render() {
    const login = this.props.login;

    return (
      <div className="user-menu">
        {login ? <p className="greeting">Hi {login}</p> : undefined}
        <a href="/" className="home">
          Flick Radar
        </a>
        {login ? (
          <div className="user-links">
            <Link to="/loggedin" className="favorite-directors">
              Favorite Directors
            </Link>
            <button className="sign-out no-hover" onClick={this.handleClick}>
              Sign out
            </button>
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

// ================================

export default UserMenu;
