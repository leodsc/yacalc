import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, ToastAndroid, View} from 'react-native';
import {useCalculatorStore} from '../state/calculator-store';
import {calculate} from '../util/calculate';
import {formatUnits} from '../util/format-units';
import {detectDecimalSeparator} from '../util/detect-decimal-separator';

export const Screen = () => {
  const [expression, setExpression] = useState('');
  const [position, setPosition] = useState({start: 0, end: 0});
  let positionUpdate = useRef(1);

  useEffect(() => {
    useCalculatorStore.subscribe(state => {
      setPosition(old => {
        setExpression(previous => {
          if (state.currentKey.value === '=') {
            const {unit} = detectDecimalSeparator();
            return formatUnits(
              `${calculate(
                previous
                  .replaceAll(unit, '')
                  .replaceAll('x', '*')
                  .replaceAll('÷', '/'),
              )}`,
            );
          } else {
            try {
              const newExpression = state.currentKey.action(
                previous,
                old.start,
              );
              const formattedExpression = formatUnits(newExpression);
              positionUpdate.current =
                formattedExpression.length - previous.length;
              return formattedExpression;
            } catch (error: any) {
              ToastAndroid.show('Invalid!!', ToastAndroid.SHORT);
              return previous;
            }
          }
        });
        return old;
      });
    });
  }, []);

  useEffect(() => {
    setPosition(old => {
      return {
        start: old.start + positionUpdate.current,
        end: old.end + positionUpdate.current,
      };
    });
  }, [expression]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        selection={position}
        autoFocus
        cursorColor="black"
        onSelectionChange={e => {
          const {start, end} = e.nativeEvent.selection;
          setPosition({
            start,
            end,
          });

          if (start !== end) {
            // ERASE SELECTED TOKENS
          }
        }}
        showSoftInputOnFocus={false}
        value={expression}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 0.25,
  },

  input: {
    fontSize: 24,
  },
});
