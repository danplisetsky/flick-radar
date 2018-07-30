import React from "react";

import "./signUp.css";

// ================================

class SignUp extends React.Component {
  render() {
    return (
      <form onSubmit={async event => await this.props.onSubmit(event)}>
        <fieldset className="signup">
          <legend>Sign Up</legend>
          <input
            className={`${this.props.loginClass}`}
            type="text"
            placeholder="Login"
            autoComplete="username"
            onChange={event => this.props.onChange(event, "login")}
            value={this.props.login}
            required
          />
          <input
            className={`${this.props.emailClass}`}
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={event => this.props.onChange(event, "email")}
            value={this.props.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={event => this.props.onChange(event, "password")}
            value={this.props.password}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            onChange={event => this.props.onChange(event, "confirmedPassword")}
            value={this.props.confirmedPassword}
            required
          />
          <div className="signup button-and-error">
            <button type="submit">Sign Up</button>
            <div className="signup-error">{this.props.error}</div>
          </div>
        </fieldset>
      </form>
    );
  }
}

// ================================

export default SignUp;
