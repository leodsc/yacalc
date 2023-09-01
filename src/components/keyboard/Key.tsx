import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {useCalculatorStore} from '../../state/calculator-store';
import {IKey} from './cutom-key';

type KeyProps = {
  calcKey: IKey;
};

export const KeyComponent = ({calcKey}: KeyProps) => {
  const {width} = Dimensions.get('window');
  const calculatorStore = useCalculatorStore();

  const styles = StyleSheet.create({
    key: {
      width: '25%',
      backgroundColor: '#709176',
      height: '20%',
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
    },

    text: {
      textAlign: 'center',
      fontSize: width / 14,
    },
  });

  const addKey = () => {
    calculatorStore.sendKey(calcKey);
  };

  return (
    <TouchableHighlight
      testID={calcKey.testID}
      onPress={addKey}
      underlayColor="#AAAAAA"
      activeOpacity={0.5}
      style={styles.key}>
      <Text style={styles.text}>{calcKey.value}</Text>
    </TouchableHighlight>
  );
};
