import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Button, HelperText, Snackbar, Text, TextInput } from 'react-native-paper'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const NombreUsuario = ({ navigation }) => {


  const [datos, setDatos] = useState('');
  const [urlUsuario, setUrlUsuario] = useState('');
  const [urlEmail, setUrlEmail] = useState('');
  const [idMutual, setIdMutual] = useState('');
  const [idSucursal, setIdSucursal] = useState('');
  const [nombre, setNombre] = useState('');
  const [nroPersona, setNroPersona] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [animacionboton] = useState(new Animated.Value(1));
  const [mostrarSnackLongitud, setMostrarSnackLongitud] = useState(false);
  const [mostrarSnackExistente, setMostrarSnackExistente] = useState(false);
  const [vistaSpinner, setVistaSpinner] = useState(false);
  const [claveTemporal, setClaveTemporal] = useState('');
  const [llamado, setLlamado] = useState(false);


  useEffect(() => {
    const getData = async () => {
      try {
        const datos_persona = await AsyncStorage.getItem('datos_persona');
        const url_usuario = await AsyncStorage.getItem('url_usuario');
        const id_mutual = await AsyncStorage.getItem('id_mutual');
        const id_sucursal = await AsyncStorage.getItem('id_sucursal');
        const url_email = await AsyncStorage.getItem('url_email');

        if (datos_persona !== null) {
          const parsedDatos = JSON.parse(datos_persona);
          setDatos(parsedDatos);
          setNombre(parsedDatos.data.nombre);
          setNroPersona(parsedDatos.data.nro_persona);
          setCorreo(parsedDatos.data.email);

          setUrlUsuario(url_usuario);
          setUrlEmail(url_email);
          setIdMutual(id_mutual);
          setIdSucursal(id_sucursal);
        }

      } catch (error) {
        console.error(error);
      }

    }
    getData();
  }, [])


  const validarUsuario = async () => {
    try {
      spinnerStart();
      const response = await axios.post(urlUsuario, {
        'encriptado': 'NEOPOSTMAN',
        'id_mutual': `${idMutual}`,
        'id_sucursal': `${idSucursal}`,
        'usuario': `${usuario}`,
        'nro_persona': `${nroPersona}`,
        'correo': `${correo}`,
      })
      if (!response.data.error) {
        const response2 = await axios.post(urlEmail, {
          'Mutual_nombre': 'Billetera Mutual Central SC',
          'Mutual_logo': 'https://billetera.gruponeosistemas.com/logos/logoLoginSanCarlos.png',
          'Mutual_sender': 'billetera@mutualcentral.com.ar',
          'Plantilla_color': '#C14F5B',
          'Socio_nombre': `${nombre}`,
          'Socio_mail': `${correo}`,
          'Asunto_mail': 'Registro de Usuario BILLETERA Mutual Central SC',
          'Titulo': 'Clave de Acceso Provisoria',
          'Link': '',
          'Text1': 'Su nombre de usuario es',
          'Contenido1': `${usuario}`,
          'Text2': 'La clave provisoria es',
          'Contenido2': `${claveTemporal}`,
          'Text3': '',
          'Contenido3': '',
          'Text4': '',
          'Contenido4': '',
          'tipo': '1',
          'id_mutual': `${idMutual}`,
          'id_sucursal': `${idSucursal}`,
        })
        console.log(claveTemporal);
        if (JSON.stringify(response2.data.success) === 'true') {
          navigation.navigate('EmailTemporal', { usuario, urlEmail, claveTemporal, correo, nombre, idMutual, idSucursal });
        }
        spinnerStop();
      } else if (response.data.error.substring(0, 30) === 'Usuario ya existe en la Mutual') {
        snackHandlerExistente();
      }
      spinnerStop();
    } catch (error) {
      console.error("Hubo un error. ", error);
      spinnerStop();
    }
  }

  useEffect(() => {
    if(claveTemporal !== ''){
      console.log("effect");
      validarUsuario(); 
    }
  }, [claveTemporal])

  const generarCodigo = () => {
    const min = 100000;
    const max = 999999;
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
  };

  const handleSiguiente = () => {
    if (usuario.trim().length < 8) {
      snackHandlerLongitud();
    } else {
      setClaveTemporal(generarCodigo());
      // validarUsuario();
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


  const estiloAnimacionInicio = {
    transform: [{ scale: animacionboton }]
  }


  const snackHandlerLongitud = () => {
    setMostrarSnackLongitud(true);
    setTimeout(() => {
      setMostrarSnackLongitud(false);
    }, 2000);
  };

  const snackHandlerExistente = () => {
    setMostrarSnackExistente(true);
    setTimeout(() => {
      setMostrarSnackExistente(false);
    }, 2000);
  };

  const spinnerStart = () => {
    setVistaSpinner(true);
  };

  const spinnerStop = () => {
    setVistaSpinner(false);
  };


  return (
    <View style={styles.contenedor}>
      <Spinner
        visible={vistaSpinner}
      />
      <View>
        <Text variant='headlineMedium' style={styles.titulo}>Hola {nombre}!</Text>
        <View>
          <Text variant='headlineSmall' style={styles.texto}>Elegí un nombre de usuario:</Text>
        </View>
      </View>
      <View style={styles.vista}>
        <TextInput
          style={styles.input}
          placeholder='Ej. nombre'
          label={'Usuario'}
          value={usuario}
          onChangeText={(texto) => setUsuario(texto.trim())}
          // onBlur={handleErrorDocumento}
          mode='outlined'
        />
        <View style={[styles.vista, { flexDirection: 'row', alignItems: 'center' }]}>
          <Text style={{ marginVertical: 5 }}>Debe tener más de 8 caracteres</Text>
        </View>
        <HelperText type="error" visible={false}>
          Este campo es obligatorio
        </HelperText>

      </View>
      <Animated.View style={[styles.vista, estiloAnimacionInicio]}>
        <Button
          onPress={handleSiguiente}
          onPressIn={pressBtn}
          onPressOut={soltarBtn}
          mode='elevated'
          style={styles.boton}
        >
          <Text style={styles.botonTexto}>Siguiente</Text>
        </Button>
      </Animated.View>

      <Snackbar
        visible={mostrarSnackLongitud}
      >
        El nombre de usuario debe tener al menos 8 caracteres.
      </Snackbar>
      <Snackbar
        visible={mostrarSnackExistente}
      >
        El nombre de usuario ya existe.
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
  input: {
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  countdownView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,

  }
})

export default NombreUsuario