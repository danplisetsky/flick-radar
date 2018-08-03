import React from "react";

// ================================

class Login extends React.Component {
  render() {
    return (
      <form onSubmit={async event => await this.props.onSubmit(event)}>
        <fieldset className="login">
          <legend>Log In</legend>
          <input
            type="text"
            placeholder="Login or Email"
            onChange={event => this.props.onChange(event, "loginOrEmail")}
            value={this.props.loginOrEmail}
            required
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={event => this.props.onChange(event, "loginPassword")}
            value={this.props.password}
            required
          />
          <div className="login button-and-error">
            <button type="submit">Log In</button>
            <div className="login-error">{this.props.error}</div>
          </div>
        </fieldset>
      </form>
    );
  }
}

// ================================

export default Login;
