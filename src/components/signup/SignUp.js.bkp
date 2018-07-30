import React from "react";
import sdk from "flick-radar-sdk";
// ================================

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      email: "",
      password: ""
    };
  }

  handleChange = ({ event, field }) => {
    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    return (
      <form
        action=""
        method="post"
        style={{
          width: "200px"
        }}
        onSubmit={async event => {
          event.preventDefault();
          const result = await sdk.createUser({
            login: this.state.login,
            email: this.state.email,
            password: this.state.password
          });

          console.log("result :", result);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder="login"
            required
            onChange={event => this.handleChange({ event, field: "login" })}
          />
          <input
            type="email"
            placeholder="email"
            required
            autoComplete="email"
            onChange={event => this.handleChange({ event, field: "email" })}
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="password"
            required
            onChange={event => this.handleChange({ event, field: "password" })}
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="confirm password"
            required
          />
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    );
  }
}

// ================================

export default SignUp;
