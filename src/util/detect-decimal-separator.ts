import {NativeModules, Platform} from 'react-native';

/**
 * @author Leonardo Carvalho
 * @description Check which decimal place/unit separator character the system language uses
 * @returns - { "unit": "." | ",", "decimal": "." | ","}
 */
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
