import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import {useCalculatorStore} from '../state/calculator-store';
import {calculate} from '../util/calculate';
import {formatUnits} from '../util/format-units';
import {detectDecimalSeparator} from '../util/detect-decimal-separator';
import {findNumber} from '../util/find-number';
import {isNumber} from './keyboard/keys';

export const Screen = () => {
  const [expression, setExpression] = useState('');
  const [position, setPosition] = useState({start: 0, end: 0});
  const [result, setResult] = useState('');
  let positionUpdate = useRef(0);

  const toCalculable = (value: string) => {
    const {unit} = detectDecimalSeparator();
    return `${value}`
      .replaceAll(unit, '')
      .replaceAll('x', '*')
      .replaceAll('÷', '/');
  };

  useEffect(() => {
    useCalculatorStore.subscribe(state => {
      setPosition(old => {
        setExpression(previous => {
          if (
            isNumber(state.currentKey.value) &&
            findNumber(previous, old.start).length >= 15
          ) {
            ToastAndroid.show('Maximum length', ToastAndroid.SHORT);
            return previous;
          }
          if (state.currentKey.value === '=') {
            setResult('');
            const calculated = formatUnits(
              `${calculate(toCalculable(previous))}`,
            );
            if (isNaN(Number(calculated.replace(',', '')))) {
              //ToastAndroid.show('Invalid!!', ToastAndroid.SHORT);
              return previous;
            }
            return calculated;
          } else {
            try {
              const newExpression = state.currentKey.action(
                previous,
                old.start,
              );
              const formattedExpression = formatUnits(newExpression);
              positionUpdate.current =
                formattedExpression.length - previous.length;
              const calculated = calculate(toCalculable(formattedExpression));
              if (state.currentKey.value === 'C') {
                setResult('');
                return '';
              }
              setResult(
                isNaN(calculated) ? '' : formatUnits(String(calculated)),
              );
              return formattedExpression;
            } catch (error: any) {
              //ToastAndroid.show('Invalid!!', ToastAndroid.SHORT);
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
        testID="expression-input"
        style={styles.input}
        multiline
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
      <Text testID="result" style={styles.result}>
        {result}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 0.35,
  },

  input: {
    fontSize: 24,
    height: '50%',
  },

  result: {
    fontSize: 16,
  },
});
