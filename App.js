import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './views/Splash';
import Login from './views/Login';
import Documento from './views/Documento';
import CodigoSMS from './views/CodigoSMS';
import NombreUsuario from './views/NombreUsuario';
import EmailTemporal from './views/EmailTemporal';
import CambiarContraseña from './views/CambiarContraseña';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  }
}


const App = () => {

  useEffect(() => {
    const datosMutual = async () => {
      try {
        await AsyncStorage.setItem('id_mutual', '6');
        await AsyncStorage.setItem('id_sucursal', '1');
        await AsyncStorage.setItem('url_traductor', 'https://traductor.gruponeosistemas.com/n_hbconfig');
        await AsyncStorage.setItem('url_sms', 'https://billetera.gruponeosistemas.com/sms');
      }
      catch {
        console.error(error);
      }
    }
    datosMutual();
  }, [])

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"

        >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              headerLeft: null
            }}
          />
          <Stack.Screen
            name="Documento"
            component={Documento}
            options={{
              headerStyle: {
                backgroundColor: '#ddede7'
              },
              headerBackTitle: 'Atrás',
              headerTitle: '',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24
              }
            }}
          />
          <Stack.Screen
            name="CodigoSMS"
            component={CodigoSMS}
            options={{
              headerStyle: {
                backgroundColor: '#ddede7'
              },
              headerBackTitle: 'Atrás',
              headerTitle: '',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24
              }
            }}
          />
          <Stack.Screen
            name="NombreUsuario"
            component={NombreUsuario}
          />
          <Stack.Screen
            name="EmailTemporal"
            component={EmailTemporal}
          />
          <Stack.Screen
            name="CambiarContraseña"
            component={CambiarContraseña}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
