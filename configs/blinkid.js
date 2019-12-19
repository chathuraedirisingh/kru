import Platform from 'react-native';

const licenseKey = Platform.select({
  ios: BLINK_IOS,
  android: BLINK_ANDROID,
});

export default licenseKey;
