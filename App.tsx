import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
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
      <SafeAreaView style={styles.container}>
        <Gallery />
        {/*<NotificationsWrapper />*/}
      </SafeAreaView>
    </RootStoreContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
