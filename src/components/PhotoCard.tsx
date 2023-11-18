import React, { memo } from "react";
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

// Тип объекта пропсов для PhotoCard.
type PhotoCardProps = {
  uri: string;
};

/**
 * Компонент изображения.
 * @param uri Ссылка на изображение.
 * @constructor
 */
export const PhotoCard = memo(({uri}: PhotoCardProps) => {
  // Обработчик для нажатия на изображение.
  const pressHandler = () => {
    console.log('pressed');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressHandler}>
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
