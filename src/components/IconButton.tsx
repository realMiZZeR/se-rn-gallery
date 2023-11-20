import React, {useState} from 'react';
import {
  DimensionValue,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
} from 'react-native';

type Layout = {
  width: DimensionValue;
  height: DimensionValue;
  backgroundColor: string;
  borderRadius: number;
};

type IconButtonProps = {
  layout: Layout;
  imageSrc: ImageSourcePropType;
  onPress: () => void;
};

/**
 * Компонент кнопки с картинкой.
 * @param layout Стили для кнопки.
 * @param imageSrc Путь к изображению через require.
 * @param onPress Функция, обрабатывающая нажатие по кнопке.
 * @constructor
 */
export const IconButton = ({layout, imageSrc, onPress}: IconButtonProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
    setHeight(event.nativeEvent.layout.height);
  };
  return (
    <Pressable
      onLayout={onLayout}
      style={{
        width: layout.width,
        height: layout.height,
        backgroundColor: layout.backgroundColor,
        borderRadius: layout.borderRadius,
        paddingHorizontal: width * 0.3,
        paddingVertical: height * 0.3,
      }}
      onPress={onPress}>
      <Image
        style={{width: '100%', height: '100%', objectFit: 'contain'}}
        source={imageSrc}
      />
    </Pressable>
  );
};
