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
//import { decodeJpeg, decodePng, decodeImage } from '@tensorflow/tfjs-react-native'
import { decodeJpeg, tensor } from '@tensorflow/tfjs-react-native'
//import { FileSystem } from 'expo-file-system'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'
import { resizeBilinear, cast } from '@tensorflow/tfjs-core'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import { decode } from 'base64-arraybuffer'
//import { FileSystem } from 'expo'
import axios from 'axios'

//import loadModel from '../Helper/ModelLoader'
import loadModel from '../Helper/ModelLoader'
import itsafuckingimage from '../assets/09.png'

export default function Prediction({ route, navigation }) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelData, setModelData] = useState()
  const { image } = route.params

  useEffect(() => {
    const loadImageClassificationModel = async () => {
      try {
        const model = await loadModel()
        setModelData(model)
        setModelLoaded(true)
      } catch (error) {
        console.error('Error loading or using TensorFlow model:', error)
      }
    }

    loadImageClassificationModel()
  }, [])

  const loadUserImage = async (imageFile) => {
    console.log('preprocessing function: preprocessing is working')
    // Load the image data from the URI
    const imageUri = imageFile
    const response = await axios.get(
      imageUri,
      { responseType: 'arraybuffer' },
      { isBinary: true }
    )
    const imageDataArrayBuffer = await response.data
    const imageData = new Uint8Array(imageDataArrayBuffer)
    const imageTensor = decodeJpeg(imageData)

    // Resize and normalize the image
    const desiredWidth = 224
    const desiredHeight = 224
    const resizedTensor = tf.image.resizeBilinear(imageTensor, [
      desiredHeight,
      desiredWidth,
    ])
    const normalizedTensor = tf.div(resizedTensor, 255)
    const expandedTensor = normalizedTensor.expandDims(0)
    console.log('finally done loadUser Image')
    return expandedTensor
  }

  const predict = async (imageFile) => {
    try {
      //const preprocessingImage = await preprocessImage(imageFile, imageDims)
      //const userImage = loadUserImage(imageFile)
      console.log('Prediction function: preprocessing is working')
      const inputData = await loadUserImage(imageFile)
      console.log('prediction is working')
      const predictions = await modelData.predict(inputData)
      console.log('prediction finished, waiting for output', predictions)

      const articleTypeLabels = [
        'label1',
        'label2',
        'label3',
        'label4',
        'label5',
        'label6',
        'label7',
      ]
      const genderLabels = [
        'label1',
        'label2',
        'label3',
        'label4',
        'label5',
        'label6',
        'label7',
      ]
      const baseColourLabels = [
        'label1',
        'label2',
        'label3',
        'label4',
        'label5',
        'label6',
        'label7',
      ]
      const seasonLabels = [
        'label1',
        'label2',
        'label3',
        'label4',
        'label5',
        'label6',
        'label7',
      ]
      const usageLabels = [
        'label1',
        'label2',
        'label3',
        'label4',
        'label5',
        'label6',
        'label7',
      ]

      const articleTypeIndex = tf.argMax(predictions[0], 1).dataSync()[0]
      const genderIndex = tf.argMax(predictions[1], 1).dataSync()[0]
      const baseColourIndex = tf.argMax(predictions[2], 1).dataSync()[0]
      const seasonIndex = tf.argMax(predictions[3], 1).dataSync()[0]
      const usageIndex = tf.argMax(predictions[4], 1).dataSync()[0]

      const articleType = articleTypeLabels[articleTypeIndex]
      const gender = genderLabels[genderIndex]
      const baseColour = baseColourLabels[baseColourIndex]
      const season = seasonLabels[seasonIndex]
      const usage = usageLabels[usageIndex]

      console.log('Article Type:', articleType)
      console.log('Gender:', gender)
      console.log('Base Colour:', baseColour)
      console.log('Season:', season)
      console.log('Usage:', usage)
    } catch (error) {
      console.error('Error predicting with the TensorFlow.js model:', error)
      return null
    }
  }

  return (
    <View style={styles.container}>
      <Text>
        {modelLoaded ? 'Model loaded successfully' : 'Loading model...'}
      </Text>
      <Button title="Preprocess image" onPress={() => predict(image.uri)} />

      <Button title="Preprocess 1.0" onPress={() => loadUserImage(image.uri)} />
      <Text>in a few seconds you see the prediction</Text>
      <Image
        style={{
          width: 300,
          height: 500,
          borderWidth: 1,
          borderColor: 'red',
        }}
        source={{ uri: image.uri }}
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
