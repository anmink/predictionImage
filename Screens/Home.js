import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'

import loadModel from '../Helper/ModelLoader'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home sweet home</Text>

      <Button
        title="Go to Upload"
        onPress={() => navigation.navigate('Upload')}
      />
      <Button
        title="Go to Prediction"
        onPress={() => navigation.navigate('Prediction')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
