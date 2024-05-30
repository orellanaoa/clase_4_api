// Hooks de React
import { useEffect, useState } from 'react';
// Utilidades de React Navigation
import { NavigationContainer } from '@react-navigation/native';

import BottomTab from './src/navegation/BottonTab';
import NavStack from './src/navegation/NavStack';

//Componente principal
export default function App() {

  // appIsReady: Variable para indicar si la aplicación ya está lista
  // setAppIsReady: Función para actualizar la variable appIsReady
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect: Hook que, de forma predeterminada, se ejecuta después del primer renderizado 
  // y después de cada actualización
  useEffect(() => {
    // Función asíncrona que simula la inicialización de la aplicación
    async function inicia() {
      try {
        // Retrasar el lanzamiento de la aplicación por 4 segundos
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (e) {
        // Mostrar error en caso de existir
        console.warn(e);
      } finally {
        // Cambiar valor de la variable para indicar que la aplicación está lista
        setAppIsReady(true); 
      }
    }

    // Llamar a la función inicia
    inicia();
  }, []); // El segundo argumento vacío [] asegura que el efecto se ejecute solo una vez después del primer renderizado

  // Retorna el contenedor de navegación
  return (
    <NavigationContainer>
      {appIsReady ?
        // Si la aplicación está lista, muestra el componente BottomTab
        <BottomTab />
        :
        // Si la aplicación no está lista, muestra el componente NavStack
        <NavStack />
      }
    </NavigationContainer>
  );
}
