import React, {useEffect} from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {UnsplashPhotoDTO} from '../types/UnsplashPhotoDTO';

type FullscreenImageProps = {
  data: UnsplashPhotoDTO;
  onClose: () => void;
};

export const FullscreenImage = ({data, onClose}: FullscreenImageProps) => {
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
          uri: data.urls?.regular,
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
