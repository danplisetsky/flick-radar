import React from "react";

// ================================

const FavoriteDirectorsContext = React.createContext({
  favoriteDirectors: [],
  setFavoriteDirectors: undefined
});

// ================================

export default FavoriteDirectorsContext;
