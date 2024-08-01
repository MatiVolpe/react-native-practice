import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const NombreUsuario = () => {

  const [datos, setDatos] = useState('');

  useEffect(() => {
    const setDatos = async () => {
      const datos_persona = await AsyncStorage.getItem('datos_persona');
      setDatos(datos_persona);
    }
  }, [])

  const handleSiguiente = () =>{
    console.log(JSON.stringify(AsyncStorage.getItem('datos_persona')));
  }

  return (
    <View>
      <Text>NombreUsuario</Text>
      <Button
        onPress={handleSiguiente}
      >
        <Text>Siguiente</Text>
      </Button>
    </View>
  )
}

export default NombreUsuario