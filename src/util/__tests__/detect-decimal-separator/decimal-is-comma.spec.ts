import {detectDecimalSeparator} from '../../detect-decimal-separator';

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

describe('detect decimal separator', () => {
  it('decimal is comma and unit is dot', () => {
    const {unit, decimal} = detectDecimalSeparator();
    expect(unit).toBe('.');
    expect(decimal).toBe(',');
  });
});
