import React from "react";

// ================================

class LoggedInPage extends React.Component {
  render() {
    const directors = this.props.directors.map(director => {
      return (
        <li
          key={director.id}
          onClick={async event =>
            await this.props.onShowDirectorPage({
              director
            })
          }
        >
          {director.name}
        </li>
      );
    });

    return <ul>{directors}</ul>;
  }
}

// ================================

export default LoggedInPage;
