import React, {memo, useEffect} from 'react';
import {Animated, StyleSheet, Easing, Image, Pressable} from 'react-native';

type GalleryImageProps = {
  id: string;
  uri: string;
  width: number;
  height: number;
  onPress: (id: string) => void;
};

/**
 * Мемоизированный компонент изображения для галереи.
 */
export const GalleryImage = memo(
  ({id, uri, width, height, onPress}: GalleryImageProps) => {
    const animatedValue = new Animated.Value(0);

    // Bounce анимация для появления изображения на первый рендер.
    useEffect(() => {
      const appear = Animated.timing(animatedValue, {
        toValue: 100,
        useNativeDriver: true,
        duration: 1000,
        easing: Easing.bounce,
        isInteraction: true,
      });

      appear.start();

      return () => {
        appear.stop();
        appear.reset();
      };
    }, []);

    // Обработчик для нажатия на изображение.
    const onPressImage = () => {
      onPress(id);
    };

    // Поле для анимации масштабирования изображения.
    const scale = animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0.8, 1],
    });

    return (
      <Animated.View
        style={{
          transform: [{scale}],
          width,
          height,
        }}>
        <Pressable onPress={onPressImage}>
          <Image
            style={styles.image}
            source={{
              uri,
            }}
            resizeMode={'cover'}
          />
        </Pressable>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
