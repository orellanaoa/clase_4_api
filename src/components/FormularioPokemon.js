

import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';

const FormularioPokemon = ({tituloFormulario, labelInput, placeHolderInput, valor, valor2, setValor2, setValor}) => {
    return (
        <View>
            <Text style={styles.header}>{tituloFormulario}</Text>
            <View>
            <Text style={styles.descripcion}>{labelInput}</Text>
                <TextInput
                style={styles.Input}
                    placeholder={placeHolderInput}
                    onChangeText={text => setValor(parseInt(text) || 0)}
                    value={valor}
                />
                <TextInput
                style={styles.Input}
                    placeholder={placeHolderInput}
                    onChangeText={text => setValor2(parseInt(text) || 0)}
                    value={valor2}
                />
            </View>
        </View>
    );
}

export default FormularioPokemon;


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
      textAlign: 'center'
    },
    Input:{
        width:'70%',
        backgroundColor:'#dfd7d7', 
        height:50, 
        fontWeight:'900', 
        borderRadius:5, 
        margin:5, 
        fontSize:18
    },
    descripcion: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'justify',
        marginTop: 10,
      },

  });
  