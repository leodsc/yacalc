import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyComponent} from './Key';
import {keys} from './keys';

export const Keyboard = () => {
  return (
    <View style={styles.wrapper}>
      {keys.map(key => (
        <KeyComponent calcKey={key} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.75,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});
