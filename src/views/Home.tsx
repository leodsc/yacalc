import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Key} from '../components/keyboard/Key';
import {Screen} from '../components/Screen';
import {Keyboard} from '../components/keyboard/Keyboard';

export const Calculator = () => {
  return (
    <View style={styles.wrapper}>
      <Screen />
      <Keyboard />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
