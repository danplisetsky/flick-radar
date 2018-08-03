import React from "react";

// ================================

const MovieContext = React.createContext({
  director: undefined,
  toggleMovieWatchedStatus: undefined
});

// ================================

export default MovieContext;
