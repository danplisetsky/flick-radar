import React from "react";
import Search from "./search/Search";
import SignUp from "./signup/SignUp";
import LogIn from "./login/LogIn";

// ================================

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Search />
        <SignUp />
        <LogIn />
      </div>
    );
  }
}

// ================================

export default MainPage;
