const sortByReleaseDate = movies =>
  movies.sort(
    (a, b) =>
      !a.releaseDate
        ? 1
        : !b.releaseDate
          ? -1
          : a.releaseDate.localeCompare(b.releaseDate)
  );

// ================================

export default sortByReleaseDate;
