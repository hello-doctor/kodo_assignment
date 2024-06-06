// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import store from "./store/store";
import {
  loadMovies,
  searchForMovies,
  setSearchQuery,
  incrementPage,
} from "./store/slices/movieSlice";

const MovieList = () => {
  const dispatch = useDispatch();
  const { list, loading, error, searchQuery, currentPage } = useSelector(
    (state) => state.movies,
  );

  useEffect(() => {
    dispatch(loadMovies(currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchForMovies({ query: searchQuery, page: 1 }));
    }
  };

  const loadMoreMovies = () => {
    dispatch(incrementPage());
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        style={{ marginBottom: 20, padding: 10, borderWidth: 1 }}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <MovieList />
  </Provider>
);

export default App;
