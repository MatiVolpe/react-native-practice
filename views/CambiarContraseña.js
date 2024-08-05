import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Animated, Image } from 'react-native'
import { Button, HelperText, Snackbar, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const CambiarContraseña = ({ navigation, route }) => {

  // const { nroPersona, usuario } = route.params;
  const [contraseña, setContraseña] = useState('');
  const [contraseñaRepetir, setContraseñaRepetir] = useState('');
  const [animacionboton] = useState(new Animated.Value(1));
  const [errorContra, setErrorContra] = useState(false);
  const [errorContraRepetir, setErrorContraRepetir] = useState(false);
  const [mostrarSnack, setMostrarSnack] = useState(false);
  const [mostrarSnackDistinto, setMostrarSnackDistinto] = useState(false);
  const [urlTraductor, setUrlTraductor] = useState('');
  const [urlDir, setUrlDir] = useState('');
  const [urlPuerto, setUrlPuerto] = useState('');
  const [errorLongitud, setErrorLongitud] = useState('');         //Debe contener al menos 8 caracteres
  const [errorEspeciales, setErrorEspeciales] = useState('');     //No contener caracteres especiales
  const [errorMayusculas, setErrorMayusculas] = useState('');     //Contener Mayúsculas y Minúsculas
  const [errorNumeros, setErrorNumeros] = useState('');           //Contener Letras y Números
  const [errorRepetidos, setErrorRepetidos] = useState('');       //Sin caracteres repetidos
  const [errorCorrelativos, setErrorCorrelativos] = useState(''); //Sin números repetidos
  const [errorPassRepetida, setErrorPassRepetida] = useState(''); //No repetir últimas 3 claves


  useEffect(() => {
    const setUrl = async () => {
      const url_traductor = await AsyncStorage.getItem('url_traductor');
      const url_dir = await AsyncStorage.getItem('url_dir');
      const url_puerto = await AsyncStorage.getItem('url_puerto');
      setUrlTraductor(url_traductor);
      setUrlDir(url_dir);
      setUrlPuerto(url_puerto);
    }
    setUrl();
  }, [])

  const cambiar = async () => {
    try {
      const response = await axios.post(urlTraductor, {
        dir_url: `${urlDir}`,
        dir_puerto: `${urlPuerto}`,
        dir_api: '/homebanking/n_homebanking.asmx?WSDL',
        metodo: 'login_reingreso',
        data: `{"empresa": "NEOPOSTMAN", "nro_persona": ${nroPersona}, "usuario": "${usuario}", "password": "${contraseña}", "cant_pass_controla": "3"}`
      })
      console.log(response);
      if(response.data.success === "TRUE" && response.data.error === ""){
        setErrorLongitud(response.data.errorLongitud);
        setErrorEspeciales(response.data.errorEspeciales);
        setErrorMayusculas(response.data.errorMayusculas);
        setErrorNumeros(response.data.errorNumeros);
        setErrorRepetidos(response.data.errorRepetidos);
        setErrorCorrelativos(response.data.errorCorrelativos);
        setErrorPassRepetida(response.data.errorPassRepetida);
      }
    } catch (error) {
      console.error(error);
    }
  }


  const main = async () => {


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


  const handleInicio = () => {
    if (contraseña.trim() === "" || contraseñaRepetir.trim() === "") {
      snackHandler();
    } else if(contraseña !== contraseñaRepetir){
      snackHandlerDistinto();
    } else {
      main();
    }
  }

  const snackHandler = () => {
    setMostrarSnack(true);
    setTimeout(() => {
      setMostrarSnack(false);
    }, 2000);
  };

  const snackHandlerDistinto = () => {
    setMostrarSnackDistinto(true);
    setTimeout(() => {
      setMostrarSnackDistinto(false);
    }, 2000);
  };


  const handleErrorContra = () => {
    if (contraseña.length > 0) {
      setErrorContra(false)
    } else {
      setErrorContra(true)
    }
  }

  const handleErrorContraRepetir = () => {
    if (contraseñaRepetir.length > 0) {
      setErrorContraRepetir(false)
    } else {
      setErrorContraRepetir(true)
    }
  }

  const estiloAnimacionInicio = {
    transform: [{ scale: animacionboton }]
  }

  return (
    <ScrollView style={styles.contenedor}>

      <View style={styles.vistaAclaracion}>
        <Text style={styles.textoAclaracionTitulo} variant='headlineSmall'>Elija su nueva clave para iniciar sesión, recuerde que la clave debe cumplir con los siguientes requisitos: </Text>
        <Text style={styles.textoAclaracion} variant='titleMedium'>- Debe contener al menos 8 caracteres </Text>
        <Text style={styles.textoAclaracion} variant='titleMedium'>- No contener caracteres especiales </Text>
        <Text style={styles.textoAclaracion} variant='titleMedium'>- Contener Mayúsculas y Minúsculas </Text>
        <Text style={styles.textoAclaracion} variant='titleMedium'>- Contener Letras y Números </Text>
        <Text style={styles.textoAclaracion} variant='titleMedium'>- Sin caracteres repetidos </Text>
        <Text style={styles.textoAclaracion} variant='titleMedium'>- Sin números repetidos </Text>
        <Text style={styles.textoAclaracion} variant='titleMedium'>- No repetir últimas 3 claves </Text>
      </View>

      <View style={styles.vista}>
        <Text style={styles.texto} variant='titleLarge'>Nueva contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder='1234'
          label={'Nueva contraseña'}
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




      <View style={styles.vistaAclaracion}>
        <Text style={styles.texto} variant='titleLarge'>Repetir nueva contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder='1234'
          label={'Repetir contraseña'}
          value={contraseñaRepetir}
          onChangeText={(texto) => setContraseñaRepetir(texto)}
          onBlur={handleErrorContraRepetir}
          secureTextEntry
          mode='outlined'

        >
        </TextInput>
        <HelperText type="error" visible={errorContraRepetir}>
          Este campo es obligatorio
        </HelperText>
      </View>

      <View style={styles.vistaAclaracion}>
        <Animated.View style={estiloAnimacionInicio}>
          <Button
            mode='elevated'
            style={styles.boton}
            onPressIn={() => pressBtn()}
            onPressOut={() => soltarBtn()}
            onPress={() => handleInicio()}
          >
            <Text style={styles.botonTexto} variant='labelMedium'>
              Cambiar contraseña
            </Text>
          </Button>
        </Animated.View>
      </View>


      <Snackbar
        visible={mostrarSnack}
      >
        No puede haber campos vacios.
      </Snackbar>
      <Snackbar
        visible={mostrarSnackDistinto}
      >
        Las contraseñas no coinciden.
      </Snackbar>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#ddede7',
    padding: 20,
    paddingLeft: 30,
  },
  vistaTitulo: {
    width: '100%',
    height: '100%',
    maxHeight: 250,
  },
  vista: {
    width: '90%',
    marginBottom: 10,
    marginVertical: 20,
  },
  vistaAclaracion: {
    width: '90%',
    marginBottom: 10,
  },
  titulo: {
    marginVertical: 40,
    fontWeight: '700',
    textAlign: 'center'

  },
  texto: {
    fontWeight: '700',
  },
  textoAclaracionTitulo: {
    fontWeight: '700',
    color: '#545454',
  },
  textoAclaracion: {
    fontWeight: '700',
    color: '#545454',
    fontStyle: 'italic'
  },
  boton: {
    marginBottom: 60,
    borderWidth: 1,
    width: '100%',
    height: 70,
    justifyContent: 'center',
  },
  botonTexto: {
    fontSize: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    height: '100%',
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


export default CambiarContraseña