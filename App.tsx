import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RootStoreContext} from './src/providers/RootStoreContext';
import RootStore from './src/store/RootStore';
import {Gallery} from './src/components/Gallery';
import {Toolbar} from './src/components/Toolbar';

/**
 * Точка входа в приложение.
 * @constructor
 */
export const App = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <SafeAreaView style={styles.container}>
        <Gallery />
        {/*<Toolbar />*/}
      </SafeAreaView>
    </RootStoreContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
