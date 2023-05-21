import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'

import loadModel from '../Helper/ModelLoader';

export default function Prediction({ navigation }) {
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const loadImageClassificationModel = async () => {
      try {
        await loadModel();
        setModelLoaded(true);
      } catch (error) {
        console.error('Error loading or using TensorFlow model:', error);
      }
    };

    loadImageClassificationModel();
  }, []);

  return (
    <View style={styles.container}>
       <Text>{modelLoaded ? 'Model loaded successfully' : 'Loading model...'}</Text>
  

      <Text>in a few seconds you see the prediction</Text>
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
