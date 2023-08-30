import {detectDecimalSeparator} from '../../detect-decimal-separator';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en-US',
      AppleLanguages: ['fr-FR', 'en-US'],
    },
  };
  RN.NativeModules.I18nManager.localeIdentifier = 'en_US';
  return RN;
});

describe('detect decimal separator', () => {
  it('decimal is dot and unit is comma', () => {
    const {unit, decimal} = detectDecimalSeparator();
    expect(decimal).toBe('.');
    expect(unit).toBe(',');
  });
});
