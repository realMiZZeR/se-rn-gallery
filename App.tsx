import React from 'react';
import { SafeAreaView, StyleSheet, View } from "react-native";
import {RootStoreContext} from './src/providers/RootStoreContext';
import RootStore from './src/store/RootStore';
import {Gallery} from './src/components/Gallery';

/**
 * Точка входа в приложение.
 * @constructor
 */
export const App = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <View style={styles.container}>
        <Gallery />
      </View>
    </RootStoreContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
