import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from './IconButton';

export const Toolbar = () => {
  return (
    <View style={styles.container}>
      <IconButton
        layout={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          backgroundColor: '#FFF',
        }}
        imageSrc={require('../assets/images/search.png')}
        onPress={() => console.log('press')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  input: {
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
  },
});
