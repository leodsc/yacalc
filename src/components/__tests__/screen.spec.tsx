import React from 'react';
import {Calculator} from '../../views/Home';
import {act, render, screen, userEvent} from '@testing-library/react-native';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en_US',
      AppleLanguages: ['fr-FR', 'en-US'],
    },
  };
  RN.NativeModules.I18nManager.localeIdentifier = 'en_US';
  return RN;
});

describe('screen tests', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  it('given a screen without any values, add 33+2 and the result should be 35', async () => {
    const user = userEvent.setup();
    const numberTreeKey = screen.getByTestId('key-3');
    const numberTwoKey = screen.getByTestId('key-2');
    const plusKey = screen.getByTestId('key-plus');
    await act(async () => {
      await user.press(numberTreeKey);
    });
    await act(async () => {
      await user.press(numberTreeKey);
    });
    await act(async () => {
      await user.press(plusKey);
    });
    await act(async () => {
      await user.press(numberTwoKey);
    });
    await screen.findByText('35');
  });

  it('given a screen without any values, evaluate (100-20)*2 and the result should be 160', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const parenthesisKey = screen.getByTestId('key-()');
    const one = screen.getByTestId('key-1');
    const zero = screen.getByTestId('key-0');
    const times = screen.getByTestId('key-x');
    const two = screen.getByTestId('key-2');
    const minus = screen.getByTestId('key--');

    await act(async () => {
      await user.press(parenthesisKey);
      await user.press(one);
      await user.press(zero);
      await user.press(zero);
      await user.press(minus);
      await user.press(two);
      await user.press(zero);
      await user.press(parenthesisKey);
      await user.press(times);
      await user.press(two);
    });
    await screen.findByText('160');
  });

  it('given a screen without any values, evaluate 8%2 and the result should be 0.16', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const eight = screen.getByTestId('key-8');
    const percentage = screen.getByTestId('key-%');
    const two = screen.getByTestId('key-2');

    await act(async () => {
      await user.press(eight);
      await user.press(percentage);
      await user.press(two);
    });
    await screen.findByText('0.16');
  });

  it('given a screen without any values, writing 8-2- then typing x should change - to x', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const eight = screen.getByTestId('key-8');
    const minus = screen.getByTestId('key--');
    const two = screen.getByTestId('key-2');
    const times = screen.getByTestId('key-x');

    await act(async () => {
      await user.press(eight);
      await user.press(minus);
      await user.press(two);
      await user.press(minus);
      await user.press(times);
    });
    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('8-2x');
  });

  it('given a screen without any values, writing -8+2 should be valid and evaluate -6', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const clear = screen.getByTestId('key-C');
    const minus = screen.getByTestId('key--');
    const eight = screen.getByTestId('key-8');
    const plus = screen.getByTestId('key-plus');
    const two = screen.getByTestId('key-2');

    await act(async () => {
      await user.press(clear); // need clear, for some reason when reredering it doesnt clear the app state
      await user.press(clear);
      await user.press(minus);
      await user.press(eight);
      await user.press(plus);
      await user.press(two);
    });
    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('-8+2');
    screen.getByText('-6');
  });

  it('given a screen without any values, writing % should not be valid', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const percentage = screen.getByTestId('key-%');

    await act(async () => {
      await user.press(percentage);
    });
    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('');
  });

  it('given a screen without any values, writing 8+2 then B should show 8+', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const eight = screen.getByTestId('key-8');
    const plus = screen.getByTestId('key-plus');
    const two = screen.getByTestId('key-2');
    const eraseLastCharacter = screen.getByTestId('key-B');

    await act(async () => {
      await user.press(eight);
      await user.press(plus);
      await user.press(two);
      await user.press(eraseLastCharacter);
    });
    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('8+');
  });

  it('given a screen without any values, typing B should show nothing', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const eraseLastCharacter = screen.getByTestId('key-B');

    await act(async () => {
      await user.press(eraseLastCharacter);
    });
    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('');
  });

  it('given a screen without any values, typing C should show nothing', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const clear = screen.getByTestId('key-C');

    await act(async () => {
      await user.press(clear);
    });
    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('');
  });

  it('given a screen without any values, typing (8) and then C should show nothing', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const clear = screen.getByTestId('key-C');
    const parenthesis = screen.getByTestId('key-()');
    const eight = screen.getByTestId('key-8');

    await act(async () => {
      await user.press(parenthesis);
      await user.press(eight);
      await user.press(parenthesis);
      await user.press(clear);
    });

    const expressionInput = screen.getByTestId('expression-input');
    const result = screen.getByTestId('result');
    expect(expressionInput.props.value).toBe('');
    expect(result.props.children).toBe('');
  });

  it('given a screen without any values, typing 88+10-55x100 and then C should show nothing', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const clear = screen.getByTestId('key-C');
    const eight = screen.getByTestId('key-8');
    const plus = screen.getByTestId('key-plus');
    const minus = screen.getByTestId('key--');
    const times = screen.getByTestId('key-x');
    const zero = screen.getByTestId('key-0');
    const five = screen.getByTestId('key-5');
    const one = screen.getByTestId('key-1');

    await act(async () => {
      await user.press(eight);
      await user.press(eight);
      await user.press(plus);
      await user.press(one);
      await user.press(zero);
      await user.press(minus);
      await user.press(five);
      await user.press(five);
      await user.press(times);
      await user.press(one);
      await user.press(zero);
      await user.press(zero);
      await user.press(clear);
    });

    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('');
  });

  it('given a screen without any values, typing 100.101 should be valid', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const comma = screen.getByTestId('key-.');
    const one = screen.getByTestId('key-1');
    const zero = screen.getByTestId('key-0');

    await act(async () => {
      await user.press(one);
      await user.press(zero);
      await user.press(zero);
      await user.press(comma);
      await user.press(one);
      await user.press(zero);
      await user.press(one);
    });

    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('100.101');
  });

  it('given a screen without any values, typing "," should not be valid', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const comma = screen.getByTestId('key-.');

    await act(async () => {
      await user.press(comma);
    });

    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('');
  });

  it('given a screen without any values, typing 100+100 and then "=" should erase old expression and replace by 200', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const one = screen.getByTestId('key-1');
    const zero = screen.getByTestId('key-0');
    const plus = screen.getByTestId('key-plus');
    const equals = screen.getByTestId('key-=');

    await act(async () => {
      await user.press(one);
      await user.press(zero);
      await user.press(zero);
      await user.press(plus);
      await user.press(one);
      await user.press(zero);
      await user.press(zero);
      await user.press(equals);
    });

    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('200');
  });

  it('given a screen without any values, typing 167-600x should show nothing', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const zero = screen.getByTestId('key-0');
    const one = screen.getByTestId('key-1');
    const six = screen.getByTestId('key-6');
    const seven = screen.getByTestId('key-7');
    const times = screen.getByTestId('key-x');
    const minus = screen.getByTestId('key--');

    await act(async () => {
      await user.press(one);
      await user.press(six);
      await user.press(seven);
      await user.press(minus);
      await user.press(six);
      await user.press(zero);
      await user.press(zero);
      await user.press(times);
    });

    const result = screen.getByTestId('result');
    expect(result.props.children).toBe('-433');
  });

  it('given a screen without any values, typing 167-600x2+10 and then "=" should erase old expression and replace by -1023', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const zero = screen.getByTestId('key-0');
    const one = screen.getByTestId('key-1');
    const two = screen.getByTestId('key-2');
    const six = screen.getByTestId('key-6');
    const seven = screen.getByTestId('key-7');
    const plus = screen.getByTestId('key-plus');
    const times = screen.getByTestId('key-x');
    const minus = screen.getByTestId('key--');
    const equals = screen.getByTestId('key-=');

    await act(async () => {
      await user.press(one);
      await user.press(six);
      await user.press(seven);
      await user.press(minus);
      await user.press(six);
      await user.press(zero);
      await user.press(zero);
      await user.press(times);
      await user.press(two);
      await user.press(plus);
      await user.press(one);
      await user.press(zero);
      await user.press(equals);
    });

    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('-1,023');
  });

  it('given a screen without any values, typing (2.0+2/2)*4.2*3(4-2)/5.3 should evaluate 14.264150943396 run this pls', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const zero = screen.getByTestId('key-0');
    const two = screen.getByTestId('key-2');
    const three = screen.getByTestId('key-3');
    const four = screen.getByTestId('key-4');
    const five = screen.getByTestId('key-5');
    const times = screen.getByTestId('key-x');
    const plus = screen.getByTestId('key-plus');
    const divide = screen.getByTestId('key-divide');
    const parenthesis = screen.getByTestId('key-()');
    const dot = screen.getByTestId('key-.');
    const minus = screen.getByTestId('key--');

    await act(async () => {
      await user.press(parenthesis);
      await user.press(two);
      await user.press(dot);
      await user.press(zero);
      await user.press(plus);
      await user.press(two);
      await user.press(divide);
      await user.press(two);
      await user.press(parenthesis);
      await user.press(times);
      await user.press(four);
      await user.press(dot);
      await user.press(two);
      await user.press(times);
      await user.press(three);
      await user.press(parenthesis);
      await user.press(four);
      await user.press(minus);
      await user.press(two);
      await user.press(parenthesis);
      await user.press(divide);
      await user.press(five);
      await user.press(dot);
      await user.press(three);
    });

    const expressionInput = screen.getByTestId('expression-input');
    screen.getByText('14.264150943');
    expect(expressionInput.props.value).toBe('(2.0+2÷2)x4.2x3x(4-2)÷5.3');
  });

  it('given a screen without any values, typing (+8) should evaluate 8', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const eight = screen.getByTestId('key-8');
    const plus = screen.getByTestId('key-plus');
    const parenthesis = screen.getByTestId('key-()');

    await act(async () => {
      await user.press(parenthesis);
      await user.press(plus);
      await user.press(eight);
      await user.press(parenthesis);
    });

    const expressionInput = screen.getByTestId('expression-input');
    const result = screen.getByTestId('result');
    expect(expressionInput.props.value).toBe('(+8)');
    expect(result.props.children).toBe('8');
  });

  it.skip('given a screen without any values, typing 88, selecting the cursor to the first digit and type - should evaluate -88', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const eight = screen.getByTestId('key-8');
    const minus = screen.getByTestId('key--');

    await act(async () => {
      await user.press(eight);
      await user.press(eight);
      console.log(screen.getByTestId('expression-input').props.selection);
      await user.press(minus);
    });

    const result = screen.getByTestId('result');
    const expressionInput = screen.getByTestId('expression-input');
    expect(expressionInput.props.value).toBe('-88');
    expect(result.props.children).toBe('-88');
  });
});
