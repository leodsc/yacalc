import {NativeModules, Platform} from 'react-native';

export const detectDecimalSeparator = () => {
  const language: string = Platform.select({
    ios: NativeModules.SettingsManager?.settings?.AppleLocale,
    android: NativeModules.I18nManager?.localeIdentifier,
  });
  const value = Intl.NumberFormat(language.replace('_', '-')).format(128.5);
  return {
    decimal: value.includes('.') ? '.' : ',',
    unit: value.includes(',') ? '.' : ',',
  } as const;
};
