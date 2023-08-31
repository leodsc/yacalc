import {formatUnits} from '../format-units';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'pt-BR',
      AppleLanguages: ['fr-FR', 'en-US'],
    },
  };
  RN.NativeModules.I18nManager.localeIdentifier = 'en_US';
  return RN;
});

describe('format units function', () => {
  it('10000+500 should be 10.000+500', () => {
    expect(formatUnits('10000+500')).toBe('10.000+500');
  });

  it('0,16 should be 0,16', () => {
    expect(formatUnits('0,16')).toBe('0,16');
  });

  it('0,16+1000 should be 0,16+1.000', () => {
    expect(formatUnits('0,16+1000')).toBe('0,16+1.000');
  });

  it('-8+2 should be -8+2', () => {
    expect(formatUnits('-8+2')).toBe('-8+2');
  });
});
