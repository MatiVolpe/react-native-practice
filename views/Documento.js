import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown';

const Documento = () => {

  const [documento, setDocumento] = useState('');
  const [socio, setSocio] = useState('');
  const [errorDocuento, setErrorDocumento] = useState(false);
  const [errorSocio, setErrorSocio] = useState(false);
  const [animacionboton] = useState(new Animated.Value(1));
  const [tipoDoc, setTipoDoc] = useState(1); //1 si es dni o 2 si es cuit


  useEffect(() => {
    const setIds = async () => {
      const idMutual = await AsyncStorage.getItem('id_mutual');
      const idSucursal = await AsyncStorage.getItem('id_sucursal');
      const urlTraductor = await AsyncStorage.getItem('url_traductor');
    }
    const validar_doc = async () => {
      try {
        await axios.post(urlTraductor, {
          dir_url: `http://201.216.239.83`,
          dir_puerto: `7846`,
          dir_api: `/homebanking/n_homebanking.asmx?WSDL`,
          metodo: 'validar_documento',
          data: `{"enpresa": "NEOPOSTMAN", "tipodoc": ${tipoDoc}, "nrodoc": ${documento}}`
        })
      }
      catch {
        console.error("error")
      }
    }
    setIds();
    validar_doc();
  }, [])

  useEffect(() => {
    
  }, [])

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

  const handleErrorDocumento = () => {
    if (documento.length > 0) {
      setErrorDocumento(false)
    } else {
      setErrorDocumento(true)
    }
  }

  const handleErrorSocio = () => {
    if (socio.length > 0) {
      setErrorSocio(false)
    } else {
      setErrorSocio(true)
    }
  }

  const estiloAnimacionInicio = {
    transform: [{ scale: animacionboton }]
  }

  const handleBotonSMS = () => {
    if (documento.trim() === "" || socio.trim() === "") {

    }
  }


  return (
    <View style={styles.contenedor}>

      <View>
        <Text variant='headlineLarge' style={styles.titulo}>Registro de usuario</Text>
      </View>

      <View style={styles.vista}>
        <Text style={styles.texto} variant='titleLarge'>Seleccione  tipo de documento</Text>
        <View style={styles.dropdown}>
          <Dropdown
            mode='outlined'
            label="Tipo de documento"
            placeholder="Elija documento o CUIT"
            options={[
              { label: 'DNI', value: 1 },
              { label: 'CUIT', value: 2 }
            ]}
            value={tipoDoc}
            onSelect={setTipoDoc}
          />
        </View>
      </View>
      <View style={styles.vista}>
        <Text style={styles.texto} variant='titleLarge'>Ingrese su {tipoDoc === 1 ? "documento" : "CUIT"}</Text>
        <TextInput
          style={styles.input}
          placeholder='Nombre de usuario'
          label={'Usuario'}
          value={documento}
          onChangeText={(texto) => setDocumento(texto)}
          onBlur={handleErrorDocumento}
          mode='outlined'
        />
        <HelperText type="error" visible={errorDocuento}>
          Este campo es obligatorio
        </HelperText>
      </View>

      <View style={styles.vista}>
        <Text style={styles.texto} variant='titleLarge'>Ingrese el número de socio</Text>
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          label={'Contraseña'}
          value={socio}
          onChangeText={(texto) => setSocio(texto)}
          onBlur={handleErrorSocio}
          secureTextEntry
          mode='outlined'

        >
        </TextInput>
        <HelperText type="error" visible={errorSocio}>
          Este campo es obligatorio
        </HelperText>
      </View>


      <Animated.View style={estiloAnimacionInicio}>
        <Button
          mode='elevated'
          style={styles.boton}
          onPressIn={() => pressBtn()}
          onPressOut={() => soltarBtn()}
          onPress={() => handleBotonSMS()}
        >
          <Text style={styles.botonTexto} variant='labelMedium'>
            Enviar SMS
          </Text>
        </Button>
      </Animated.View>
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
  },
  dropdown: {
    marginTop: 20,
    marginBottom: 10
  },
})

export default Documento