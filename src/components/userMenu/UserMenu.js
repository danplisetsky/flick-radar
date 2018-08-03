import React from "react";
import { NavLink } from "react-router-dom";

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
      <div className="userMenu">
        <p>Hi, {login}</p>
        <NavLink to="/loggedin">Favorite Directors</NavLink>
        <button onClick={this.handleClick}>Sign out</button>
      </div>
    );
  }
}

// ================================

export default UserMenu;
