import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Animated, Image } from 'react-native'
import { Button, HelperText, Snackbar, Text, TextInput } from 'react-native-paper'

const Login = ({navigation}) => {

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [animacionboton] = useState(new Animated.Value(1));
  const [errorUsuario, setErrorUsuario] = useState(false);
  const [errorContra, setErrorContra] = useState(false);
  const [animacionRegistro] = useState(new Animated.Value(1));
  const [mostrarSnack, setMostrarSnack] = useState(false);
  const [urlLogin, setUrlLogin] = useState('');

  useEffect(() => {
    const setUrl = async () => {
      const url_login = await AsyncStorage.getItem('url_login');
      setUrlLogin(url_login);
    }
    setUrl();
  }, [])


  const inicioSesion = async () => {
    try {
      const response = await axios.post(urlLogin, {
        
      })
      console.log(response);
    } catch(error) {

    }
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


  const pressBtnReg = () => {
    Animated.spring(animacionRegistro, {
      toValue: 0.8,
      useNativeDriver: true
    }).start();
  }

  const soltarBtnReg = () => {
    Animated.spring(animacionRegistro, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  }
  const handleInicio = () => {
    if (usuario.trim() === "" || contraseña.trim() === "") {
      snackHandler();
    } else {
      inicioSesion();
    }
  }

  const snackHandler = () => {
    setMostrarSnack(true);
    setTimeout(() => {
      setMostrarSnack(false);
    }, 2000);
  };

  const handleRegistro = () => {
    navigation.navigate("Documento")
  }

  const handleErrorUsuario = () => {
    if (usuario.length > 0) {
      setErrorUsuario(false)
    } else {
      setErrorUsuario(true)
    }
  }

  const handleErrorContra = () => {
    if (contraseña.length > 0) {
      setErrorContra(false)
    } else {
      setErrorContra(true)
    }
  }

  const estiloAnimacionInicio = {
    transform: [{ scale: animacionboton }]
  }


  const estiloAnimacionRegistro = {
    transform: [{ scale: animacionRegistro }]
  }

  return (
    <View style={styles.contenedor}>

      <View style={styles.vistaTitulo}>
        <Image 
          source={require('../logoLogin.png')}
          style={styles.imagen}
        />
      </View>


      <View style={styles.vista}>
        <Text style={styles.texto} variant='titleLarge'>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          placeholder='Nombre de usuario'
          label={'Usuario'}
          value={usuario}
          onChangeText={(texto) => setUsuario(texto)}
          onBlur={handleErrorUsuario}
          mode='outlined'
        />
        <HelperText type="error" visible={errorUsuario}>
          Este campo es obligatorio
        </HelperText>
      </View>

      <View style={styles.vista}>
        <Text style={styles.texto} variant='titleLarge'>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          label={'Contraseña'}
          value={contraseña}
          onChangeText={(texto) => setContraseña(texto)}
          onBlur={handleErrorContra}
          secureTextEntry
          mode='outlined'

        >
        </TextInput>
        <HelperText type="error" visible={errorContra}>
          Este campo es obligatorio
        </HelperText>
      </View>

      <View style={styles.vista}>
        <Animated.View style={estiloAnimacionInicio}>
          <Button
            mode='elevated'
            style={styles.boton}
            onPressIn={() => pressBtn()}
            onPressOut={() => soltarBtn()}
            onPress={() => handleInicio()}
          >
            <Text style={styles.botonTexto} variant='labelMedium'>
              Ingresar
            </Text>
          </Button>
        </Animated.View>
      </View>

      <View style={styles.vista}>
        <Text style={styles.texto} variant='titleMedium'>¿No estás registrado?</Text>
        <Animated.View style={estiloAnimacionRegistro}>
          <Button
            mode='elevated'
            style={styles.boton}
            onPressIn={() => pressBtnReg()}
            onPressOut={() => soltarBtnReg()}
            onPress={() => handleRegistro()}
          >
            <Text style={styles.botonTexto} variant='labelMedium'>
              Registrarse
            </Text>
          </Button>
        </Animated.View>
      </View>
      <Snackbar
          visible={mostrarSnack}
        >
          No puede haber campos vacios.
        </Snackbar>
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
  vistaTitulo: {
    width: '100%',
    height: '100%',
    maxHeight: 250,
  },
  vista: {
    width: '90%',
  },
  titulo: {
    marginVertical: 40,
    fontWeight: '700',
    textAlign: 'center'

  },
  texto: {
    
    fontWeight: '700',
  },
  boton: {
    marginVertical: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    padding: 10,
    width: '100%'
  },
  botonTexto: {
    marginVertical: 20,
    fontSize: 15,
    textAlign: 'center',
    textTransform: 'uppercase',

  },
  input: {
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  imagen: {
    width: '100%',
    resizeMode: 'contain',
    flex: 1,
},
}
)


export default Login