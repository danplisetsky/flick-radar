import React from "react";
import { Redirect } from "react-router-dom";
import sdk from "flick-radar-sdk";

import SignUp from "./signup/SignUp";
import Login from "./login/LogIn";

import "./auth.css";

// ================================

class Auth extends React.Component {
  static _initialState = {
    loginOrEmail: "",
    loginPassword: "",
    errorLogIn: "",
    login: "",
    loginClass: "",
    email: "",
    emailClass: "",
    password: "",
    confirmedPassword: "",
    errorSignUp: "",
    submitting: false
  };

  _currentRequest = null;

  state = Auth._initialState;

  // ================================

  handleChange = (event, field) => {
    const additionalUpdateObject = this.state.hasOwnProperty(field + "Class")
      ? {
          [field + "Class"]: ""
        }
      : {};

    const additionalUpdateObject2 = this.state.errorLogIn
      ? {
          errorLogIn: ""
        }
      : {};

    this.setState({
      [field]: event.target.value,
      ...additionalUpdateObject,
      ...additionalUpdateObject2
    });
  };

  handleSubmitSignUp = async event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmedPassword) {
      this._currentRequest = this.state.login + this.state.password;
      this.setState({
        submitting: true
      });
      try {
        const { user, errorCode, duplicateFields } = await sdk.createUser({
          login: this.state.login,
          email: this.state.email,
          password: this.state.password
        });
        if (this._currentRequest === this.state.login + this.state.password) {
          this.setState({
            submitting: false
          });
          if (user) {
            this.props.setUserIdAndLogin({
              userId: user.id,
              userLogin: user.login
            });
          } else {
            if (errorCode === "u001") {
              const updateObject = duplicateFields.reduceRight(
                (prev, field) => ({
                  [field + "Class"]: "duplicate",
                  ...prev
                }),
                {}
              );
              this.setState({
                errorSignUp: "User with these credentials already exists",
                ...updateObject
              });
            }
          }
        }
      } catch (error) {
        this.setState({
          submitting: false
        });
        console.log("error in Auth: ", error);
      }
    }
  };

  handleSubmitLogIn = async event => {
    event.preventDefault();
    this.setState({
      submitting: true
    });
    this._currentRequest = this.state.loginOrEmail + this.state.loginPassword;
    try {
      const { id: userId, login: userLogin } = await sdk.login({
        loginOrEmail: this.state.loginOrEmail,
        password: this.state.loginPassword
      });
      if (
        this._currentRequest ===
        this.state.loginOrEmail + this.state.loginPassword
      ) {
        this.setState({
          submitting: false
        });
        this.props.setUserIdAndLogin({
          userId,
          userLogin
        });
      }
    } catch (error) {
      this.setState({
        submitting: false
      });
      if (error.message === "401") {
        this.setState({
          errorLogIn: "Couldn't find user with these credentials"
        });
      }
      console.log("error in Auth:", error);
    }
  };

  // ================================

  static getDerivedStateFromProps(props, state) {
    return state === Auth._initialState
      ? null
      : Object.entries(state).some(
          ([key, value]) => key.endsWith("Class") && value === "duplicate"
        )
        ? {
            errorSignUp: "User with these credentials already exists"
          }
        : state.password !== state.confirmedPassword
          ? {
              errorSignUp: "The passwords do not match"
            }
          : {
              errorSignUp: ""
            };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Object.entries(prevState).every(
        ([key, value]) => this.state[key] === value
      ) &&
      this.state !== Auth._initialState
    ) {
      this.setState(Auth._initialState);
    }
  }

  componentWillUnmount() {
    this._currentRequest = null;
  }

  // ================================

  render() {
    if (this.state.submitting) {
      return (
        <div className="auth">
          <div className="animation-loading" />
        </div>
      );
    } else if (this.props.userId) {
      return (
        <Redirect
          to={{
            pathname: "/loggedin"
          }}
        />
      );
    }
    return (
      <div className="auth">
        <SignUp
          login={this.state.login}
          email={this.state.email}
          password={this.state.password}
          confirmedPassword={this.state.confirmedPassword}
          loginClass={this.state.loginClass}
          emailClass={this.state.emailClass}
          onChange={this.handleChange}
          onSubmit={this.handleSubmitSignUp}
          error={this.state.errorSignUp}
        />
        <Login
          loginOrEmail={this.state.loginOrEmail}
          password={this.state.loginPassword}
          onChange={this.handleChange}
          onSubmit={this.handleSubmitLogIn}
          error={this.state.errorLogIn}
        />
      </div>
    );
  }
}

// ================================

export default Auth;
