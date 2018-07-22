import React from "react";
import sdk from "flick-radar-sdk";

// ================================

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOrEmail: "",
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
        method="get"
        style={{
          width: "200px"
        }}
        onSubmit={async event => {
          event.preventDefault();
          const userId = await sdk.login({
            loginOrEmail: this.state.loginOrEmail,
            password: this.state.password
          });

          await this.props.onLogin(userId);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <input
            type="text"
            placeholder="login or email"
            required
            onChange={event =>
              this.handleChange({ event, field: "loginOrEmail" })
            }
          />
          <input
            type="password"
            placeholder="password"
            required
            onChange={event => this.handleChange({ event, field: "password" })}
          />
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

// ================================

export default LogIn;
