import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLandscape: {
    backgroundColor: 'skyblue',
  },
  box: {
    backgroundColor: 'red',
    height: 100,
  },
});

const screen = Dimensions.get('screen');

export default () => {
  const isLandscape = screen.width > screen.height;
  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <View style={[styles.box, { width: screen.width / 2 }]} />
    </View>
  );
};