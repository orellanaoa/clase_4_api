import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 1;

const ChuckNorrisJokeItem = React.memo(({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.joke}>{item.value}</Text>
    </View>
  );
});

export default function ChuckNorrisJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          Array(10).fill().map(() => fetch('https://api.chucknorris.io/jokes/random?category=dev'))
        );
        const data = await Promise.all(responses.map(response => response.json()));
        setJokes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jokes:', error);
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={jokes}
          renderItem={({ item }) => <ChuckNorrisJokeItem item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    margin: 5,
    width: WIDTH / numColumns - 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  joke: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});
