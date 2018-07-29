import queryString from "query-string";

// ================================

const parseQuery = query => queryString.parse(query).query;

// ================================

export default parseQuery;
