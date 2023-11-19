import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

// Тип объекта пропсов для PhotoCard.
type PhotoCardProps = {
  id: string;
  uri: string;
  onPress: (id: string) => void;
};

/**
 * Компонент изображения.
 * @param uri Ссылка на изображение.
 * @constructor
 */
export const PhotoCard = memo(({id, uri, onPress}: PhotoCardProps) => {
  const onPressImage = () => {
    onPress(id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressImage}>
        <Image
          style={styles.image}
          source={{
            uri,
          }}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
