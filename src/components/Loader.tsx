import React, {ReactNode} from 'react';
import {Image, StyleSheet, View} from 'react-native';

type LoaderProps = {
  children?: ReactNode;
};

/**
 * Компонент загрузки.
 * @constructor
 */
export const Loader = ({children}: LoaderProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/loader.gif')}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingVertical: 8,
  },
  image: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
});
