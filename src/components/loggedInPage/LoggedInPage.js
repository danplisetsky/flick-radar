import React from "react";

// ================================

class LoggedInPage extends React.Component {
  render() {
    return <div>the current user's id is {this.props.userId}</div>;
  }
}

// ================================

export default LoggedInPage;
