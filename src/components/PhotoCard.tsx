import React, {memo, useEffect} from 'react';
import {Animated, StyleSheet, Easing, Image, Pressable} from 'react-native';

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
  const animatedValue = new Animated.Value(0);

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

  const onPressImage = () => {
    onPress(id);
  };

  const scale = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View
      style={{
        transform: [{scale}],
        width: 120,
        height: 120,
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
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
