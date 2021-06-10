import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App({step = 0} = {}) {
  return (
    <View style={styles.container}>
      <Text style={styles.center}>{step} reload steps has performed!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  center: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});
