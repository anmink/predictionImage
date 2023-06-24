import * as tf from '@tensorflow/tfjs'
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'

// Function to load the model
async function loadModel() {
  await tf.ready()
  const modelJson = require('../assets/model/model.json')
  const modelWeights = [
    require('../assets/model/weights1.bin'),
    require('../assets/model/weights2.bin'),
    require('../assets/model/weights3.bin'),
    require('../assets/model/weights4.bin'),
    require('../assets/model/weights5.bin'),
    require('../assets/model/weights6.bin'),
    require('../assets/model/weights7.bin'),
  ]

  const model = await tf.loadGraphModel(
    bundleResourceIO(modelJson, modelWeights)
  )
  return model
}

export default loadModel
