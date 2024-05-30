import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';
import FormularioPokemon from '../components/FormularioPokemon';

const WIDTH = Dimensions.get('window').width;
const numColumns = 3;

export default function PokemonAxios() {
  const [pokemon, setPokemon] = useState([]);
  const [nPokemon, setNPokemon]=useState(0); //La api comenzará mostrando solamente 25 pokemones
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPokemon(nPokemon);
  }, [nPokemon]);

  const getPokemon = async (nPokemon) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${nPokemon}`);
      const dataPokemon = response.data;
      setPokemon(dataPokemon.results);
      setLoading(false);
    } catch (error) {
      console.log("Hubo un error listando los pokemones", error);
      setLoading(false);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text>Número Pokedex: <Text style={styles.number}>{item.url.split('/')[6]}</Text></Text>
        <Image
          style={styles.image}
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text>Descripcion: <Text style={styles.description}>{item.url.split('/')[26]}</Text></Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FormularioPokemon
        tituloFormulario='Listado de Pokemones usando Fetch'
        labelInput='Ingrese la cantidad de pokemon a cargar: '
        placeHolderInput='20'
        valor={nPokemon}
        setValor={setNPokemon}
      />
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={pokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  number:{
    fontWeight:'bold'
  },
  loading: {
    marginTop: 20,
  },
});
