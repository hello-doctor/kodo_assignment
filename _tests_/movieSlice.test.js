// __tests__/movieSlice.test.js
import movieReducer, {
  loadMovies,
  searchForMovies,
  setSearchQuery,
  incrementPage,
} from "../store/slices/movieSlice";

describe("movieSlice reducer", () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
  };

  it("should handle initial state", () => {
    expect(movieReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setSearchQuery", () => {
    expect(movieReducer(initialState, setSearchQuery("query"))).toEqual({
      ...initialState,
      searchQuery: "query",
    });
  });

  it("should handle incrementPage", () => {
    expect(movieReducer(initialState, incrementPage())).toEqual({
      ...initialState,
      currentPage: 2,
    });
  });

  // Add tests for loadMovies and searchForMovies async thunks...
});
