import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HomeScreen = () => {
    return ( 
        <View style={styles.container}>
        <Text style={styles.title}>
            Consumo de apis externas
        </Text>
        <Text style={styles.descripcion}>
            Ejemplo de consumo de API externa utilizando la función <Text style={styles.negrita}>FETCH</Text> nativa de JavaScript y <Text style={styles.negrita}>AXIOS</Text> que es una biblioteca de JavaScript utilizada para hacer solicitudes HTTP
        </Text>
        </View>
     );
}
 
export default HomeScreen;


// Estilos para los componentes.
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 20,
      paddingHorizontal:15
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
      textTransform: 'uppercase',
    },
    descripcion: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'justify',
        marginTop: 10,
      },
      negrita:{
        fontWeight:'bold'
      }
  });
  