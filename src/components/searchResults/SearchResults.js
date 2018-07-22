import React from "react";
import sdk from "flick-radar-sdk";
// ================================

class SearchResults extends React.Component {
  render() {
    const directors = this.props.directors.map(({ id, image, name }) => {
      const img =
        image ||
        "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5NiA0OTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5NiA0OTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NTkuMDc2LDM4Ny44MDhjLTcuNTItMzUuNzItMzUuNjQ4LTYyLjY3Mi03MS42NDgtNjguNjcybC04My40MzItMTMuOTEydi0xMi4wNDhjNTYuMTUyLTIyLjM2LDk2LTc3LjE1Miw5Ni0xNDEuMTc2ICAgIGMwLTgzLjgxNi02OC4xODQtMTUyLTE1Mi0xNTJzLTE1Miw2OC4xODQtMTUyLDE1MmMwLDY0LjAyNCwzOS44NDgsMTE4LjgxNiw5NiwxNDEuMTc2djEyLjA0OGwtODMuNDQsMTMuOTEyICAgIGMtMzYsNi02NC4xMiwzMi45NTItNzEuNjQ4LDY4LjY3MkwxNC4xNCw0OTZoNDY3LjcyTDQ1OS4wNzYsMzg3LjgwOHogTTMzMy40NDQsMzI2LjM1MmwtMjUuMjMyLDc1LjcwNEwyNTkuNywzNTkuNjA4bDM5LjA0LTM5LjA0ICAgIEwzMzMuNDQ0LDMyNi4zNTJ6IE0yNDcuOTk2LDM0OC42ODhsLTQwLTQwVjI5OC40OGMxMi43NjgsMy40OTYsMjYuMTM2LDUuNTIsNDAsNS41MmMxMy44NjQsMCwyNy4yMzItMi4wMjQsNDAtNS41MnYxMC4yMDggICAgTDI0Ny45OTYsMzQ4LjY4OHogTTExMS45OTYsMTUyYzAtNzQuOTkyLDYxLjAwOC0xMzYsMTM2LTEzNnMxMzYsNjEuMDA4LDEzNiwxMzZzLTYxLjAwOCwxMzYtMTM2LDEzNlMxMTEuOTk2LDIyNi45OTIsMTExLjk5NiwxNTIgICAgeiBNMTk3LjI1MiwzMjAuNTY4bDM5LjA0LDM5LjA0bC00OC41MTIsNDIuNDQ4bC0yNS4yMzItNzUuNzA0TDE5Ny4yNTIsMzIwLjU2OHogTTIwOS45NjQsNDgwSDk2LjkzMmw3LjAxNi02My4xMmwtMTUuODk2LTEuNzY4ICAgIEw4MC44MzYsNDgwSDMzLjg1MmwxOC43Mi04OC44OTZjNi4xNi0yOS4yMjQsMjkuMTY4LTUxLjI4LDU4LjYyNC01Ni4xODRsMzUuMzc2LTUuODk2bDMzLjY0LDEwMC45MjhsMjQuMzA0LTIxLjI2NGwxOC42OTYsMjQuOTQ0ICAgIEwyMDkuOTY0LDQ4MHogTTIyNi41OTYsNDgwbDE0LjE4NC00OS42MjRsLTI0LjItMzIuMjU2bDMxLjA1Ni0yNy4xNjhsMC4zNiwwLjM2bDAuMzYtMC4zNmwzMS4wNDgsMjcuMTY4bC0yNC4yLDMyLjI1NiAgICBMMjY5LjM4OCw0ODBIMjI2LjU5NnogTTQwNy45NDgsNDE1LjEybC0xNS44OTYsMS43NjhMMzk5LjA2LDQ4MEgyODYuMDI4bC0xMy4yNDgtNDYuMzc2bDE4LjY5Ni0yNC45NDRsMjQuMzA0LDIxLjI2NCAgICBsMzMuNjQtMTAwLjkyOGwzNS4zNzYsNS44OTZjMjkuNDY0LDQuOTEyLDUyLjQ3MiwyNi45Niw1OC42MjQsNTYuMTkyTDQ2Mi4xNCw0ODBoLTQ2Ljk4NEw0MDcuOTQ4LDQxNS4xMnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yNDMuOTk2LDQ4Yy0yNC4yNjQsMC00NCwxOS43NDQtNDQsNDR2NGgxNnYtNGMwLTE1LjQ0LDEyLjU2LTI4LDI4LTI4czI4LDEyLjU2LDI4LDI4djUuMDg4ICAgIGMwLDcuNDgtMi45MTIsMTQuNTA0LTguMiwxOS44MDhsLTIzLjgsMjMuNzkyVjE4NGgxNnYtMzYuNjg4bDE5LjEyLTE5LjExMmM4LjMxMi04LjMyLDEyLjg4LTE5LjM2OCwxMi44OC0zMS4xMlY5MiAgICBDMjg3Ljk5Niw2Ny43NDQsMjY4LjI2LDQ4LDI0My45OTYsNDh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjQ3Ljk5NiwyMDhjLTEzLjIzMiwwLTI0LDEwLjc2OC0yNCwyNHMxMC43NjgsMjQsMjQsMjRjMTMuMjMyLDAsMjQtMTAuNzY4LDI0LTI0UzI2MS4yMjgsMjA4LDI0Ny45OTYsMjA4eiBNMjQ3Ljk5NiwyNDAgICAgYy00LjQwOCwwLTgtMy41ODQtOC04czMuNTkyLTgsOC04czgsMy41ODQsOCw4UzI1Mi40MDQsMjQwLDI0Ny45OTYsMjQweiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
      const addToFavorites = this.props.userId ? (
        <button
          onClick={async event => {
            event.stopPropagation();
            await sdk.addDirectorToFavorites({
              userId: this.props.userId,
              directorId: id,
              directorName: name,
              directorImage: image
            });
          }}
        >
          Add To Favorites
        </button>
      ) : (
        undefined
      );

      return (
        <li
          key={id}
          onClick={async event =>
            await this.props.onShowDirectorPage({
              event,
              director: {
                id,
                image,
                name
              }
            })
          }
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <img
            src={img}
            alt={name}
            style={{
              width: "100px",
              height: "100px"
            }}
          />
          <p>{name}</p>
          {addToFavorites}
        </li>
      );
    });

    return (
      <div>
        <ul
          style={{
            paddingLeft: 0
          }}
        >
          {directors}
        </ul>
      </div>
    );
  }
}

// ================================

export default SearchResults;
