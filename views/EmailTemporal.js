import React, { useState } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import axios from 'axios'


const EmailTemporal = ({ navigation, route }) => {

  const { usuario } = route.params;
  const [animacionboton] = useState(new Animated.Value(1));
  const [animacionboton2] = useState(new Animated.Value(1));


  const handleInicio = () => {
    navigation.navigate('Login');
  }

  const pressBtn = () => {
    Animated.spring(animacionboton, {
      toValue: 0.8,
      useNativeDriver: true
    }).start();
  }

  const soltarBtn = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  }

  const enviarDeNuevo = async () => {
    try {
      const response = await axios.post(urlEmail, opciones)
      console.log(response);
    } catch (error) {
      console.log("Error", error)
    }
  }

  const estiloAnimacionInicio = {
    transform: [{ scale: animacionboton }]
  }

  const pressBtn2 = () => {
    Animated.spring(animacionboton2, {
      toValue: 0.8,
      useNativeDriver: true
    }).start();
  }

  const soltarBtn2 = () => {
    Animated.spring(animacionboton2, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  }

  const estiloAnimacionInicio2 = {
    transform: [{ scale: animacionboton2 }]
  }

  return (
    <View style={styles.contenedor}>
      <View>
        <View>
          <Text variant='headlineMedium' style={styles.titulo}>Usuario confirmado!</Text>
        </View>
        <View>
          <Text variant='headlineSmall' style={styles.texto}>Tu nombre de usuario es:</Text>
        </View>
        <View>
          <Text variant='headlineSmall' style={[styles.titulo, style = { color: '#663399' }]}>{usuario}</Text>
        </View>
        <Text variant='headlineSmall' style={styles.texto}>Te enviamos tu clave provisoria para iniciar sesion a tu casilla de correo</Text>
      </View>

      <Animated.View style={[styles.vista, estiloAnimacionInicio]}>
        <Button
          onPress={handleInicio}
          onPressIn={pressBtn}
          onPressOut={soltarBtn}
          mode='elevated'
          style={styles.boton}
        >
          <Text style={styles.botonTexto}>Iniciar Sesión</Text>
        </Button>
      </Animated.View>


      <View style={{ alignContent: 'center', marginTop: 20 }}>
        <Text style={{fontSize: 20}}>¿No recibiste el correo?</Text>

        <Animated.View style={estiloAnimacionInicio2}>
          <Pressable 
            style={{borderWidth: 1, borderRadius: 10, padding: 5, margin: 5, backgroundColor: '#FFF'}}
            onPress={enviarDeNuevo}
            onPressIn={pressBtn2}
            onPressOut={soltarBtn2}
          >
            <Text style={{ color: 'blue100', textAlign:'center', fontSize: 20 }}>Volver a enviar</Text>
          </Pressable>
        </Animated.View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#ddede7',
    alignItems: 'center',
    padding: 20,
  },
  vista: {
    width: '100%',

  },
  titulo: {
    marginVertical: 40,
    fontWeight: '700',
    textAlign: 'center',

  },
  texto: {
    fontWeight: '700',
  },
  boton: {
    marginVertical: 30,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  botonTexto: {
    marginVertical: 10,
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

})


export default EmailTemporal