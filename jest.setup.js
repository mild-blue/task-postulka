const React = require('react');
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
try {
  require('react-native-gesture-handler/jestSetup');
} catch {}

// make the useFocusEffect behave like useEffect for tests purposes
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (cb) => {
      const React = require('react');
      React.useEffect(cb, []); // run once
    },
  };
});

// mock the vector icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  const Icon = ({ name = 'icon' }) => <Text>{name}</Text>;
  return { Ionicons: Icon };
});
