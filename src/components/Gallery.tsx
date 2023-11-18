import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {PhotoCard} from './PhotoCard';
import {useStores} from '../providers/RootStoreContext';
import {Loader} from './Loader';

/**
 * Компонент, хранящий логику и вывод изображений в сетку.
 */
export const Gallery = observer(() => {
  const {gallery} = useStores();

  const loadNextPage = () => {
    gallery.nextPage();
  };

  return (
    <FlatList
      data={gallery.photos}
      keyExtractor={item => item?.id}
      renderItem={({item}) => <PhotoCard uri={item.urls.small_s3} />}
      numColumns={3}
      onEndReachedThreshold={0.9}
      onEndReached={loadNextPage}
      ListFooterComponent={Loader}
    />
  );
});

const styles = StyleSheet.create({});
