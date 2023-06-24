import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'

import loadModel from '../Helper/ModelLoader'

export default function Home({ navigation }) {
  const [modelLoaded, setModelLoaded] = useState(false)
  useEffect(() => {
    const loadImageClassificationModel = async () => {
      //console.log('logged in prediction (photo):', image.base64)
      try {
        const model = await loadModel()
        setModelLoaded(true)
      } catch (error) {
        console.error('Error loading or using TensorFlow model:', error)
      }
    }

    loadImageClassificationModel()
  }, [])
  return (
    <View style={styles.container}>
      <Text>
        {modelLoaded ? 'Model loaded successfully' : 'Loading model...'}
      </Text>
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
