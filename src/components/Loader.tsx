import React from 'react';
import {Text, View} from 'react-native';

/**
 * Компонент для отображения загрузки какого-либо контента.
 * @constructor
 */
export const Loader = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};
