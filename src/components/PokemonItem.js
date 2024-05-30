import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 3;

const PokemonItem = React.memo(({ item }) => {
  const [abilityDescription, setAbilityDescription] = useState(null);

  useEffect(() => {
    const fetchAbilityDescription = async () => {
      try {
        // Obtener detalles del Pokémon
        const response = await fetch(item.url);
        const data = await response.json();
        
        // Obtener la primera habilidad del Pokémon
        const firstAbilityUrl = data.abilities[0]?.ability?.url;

        if (firstAbilityUrl) {
          // Obtener detalles de la habilidad
          const abilityResponse = await fetch(firstAbilityUrl);
          const abilityData = await abilityResponse.json();

          // Filtrar los textos en inglés
          const englishFlavorTextEntries = abilityData.flavor_text_entries.filter(entry => entry.language.name === 'es');
          
          // Obtener el "flavor text" en la posición 26 si existe
          if (englishFlavorTextEntries.length > 21) {
            const flavorTextEntry = englishFlavorTextEntries[21]?.flavor_text;
            if (flavorTextEntry) {
              setAbilityDescription(flavorTextEntry);
            }
          } else if (englishFlavorTextEntries.length > 0) {
            // Si no hay 26 entradas, usar la última disponible
            const flavorTextEntry = englishFlavorTextEntries[englishFlavorTextEntries.length - 1]?.flavor_text;
            if (flavorTextEntry) {
              setAbilityDescription(flavorTextEntry);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching ability description:', error);
      }
    };
    
    fetchAbilityDescription();
  }, [item.url]);

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
      />
      <Text style={styles.title}>{item.name}</Text>
      {abilityDescription && <Text style={styles.ability}>{`Habilidad: ${abilityDescription}`}</Text>}
    </View>
  );
});

export default PokemonItem;

const styles = StyleSheet.create({
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
  ability: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    color: 'gray',
  },
  image: {
    width: 80,
    height: 80,
  },
});
