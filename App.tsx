/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {View, StatusBar} from 'react-native';

import styles from './styles/styles';

import Home from './components/Home';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.app}>
        <Home />
      </View>
    </>
  );
};

export default App;
