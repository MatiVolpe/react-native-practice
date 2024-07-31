import React, { useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'

const Login = ({navigation}) => {

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [animacionboton] = useState(new Animated.Value(1));
  const [errorUsuario, setErrorUsuario] = useState(false);
  const [errorContra, setErrorContra] = useState(false);
  const [animacionRegistro] = useState(new Animated.Value(1));


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

    }
  }

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
        <Text style={styles.titulo} variant="headlineMedium">Iniciar Sesión</Text>
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
    width: '90%',
    marginTop: 20,
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
    marginTop: 10,
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
  }
}
)


export default Login