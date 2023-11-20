import React, {useEffect} from 'react';
import {BackHandler, Image, StyleSheet, View} from 'react-native';

type FullscreenImageProps = {
  uri: string;
  onClose: () => void;
};

export const FullscreenImage = ({uri, onClose}: FullscreenImageProps) => {
  useEffect(() => {
    const backAction = () => {
      onClose();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    objectFit: 'contain',
  },
});
