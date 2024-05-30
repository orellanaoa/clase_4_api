// Utilidades de React Navigation
import { createStackNavigator } from '@react-navigation/stack';


// Pantalla de Inicio o Bienvenida
import SplashScreen from '../screens/SplashScreen';


// Navegador Stack
const Stack = createStackNavigator();

export default function NavStack (){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
