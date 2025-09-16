jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
try { require('react-native-gesture-handler/jestSetup'); } catch {}
jest.mock('expo-router', () => require('expo-router/jest'));