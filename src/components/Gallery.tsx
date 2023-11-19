import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {PhotoCard} from './PhotoCard';
import {useStores} from '../providers/RootStoreContext';
import {Loader} from './Loader';
import {FullscreenImage} from './FullscreenImage';
import {UnsplashPhotoDTO} from '../types/UnsplashPhotoDTO';

/**
 * Компонент, хранящий логику и вывод изображений в сетку.
 */
export const Gallery = observer(() => {
  const {gallery} = useStores();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashPhotoDTO | null>(
    null,
  );

  const fillCount = 3;

  useEffect(() => {
    gallery.fill(fillCount, undefined, () => {
      setIsFirstLoad(false);
    });
  }, []);

  const onEndReached = () => {
    if (isFirstLoad) {
      return;
    }
    gallery.fill(fillCount, undefined);
  };

  const onRefresh = () => {
    setIsRefresh(true);
    gallery.clear();
    gallery.fill(fillCount, undefined, () => {
      setIsRefresh(false);
    });
  };

  const onPhotoPress = (id: string) => {
    const photo = gallery.getPhoto(id);
    if (!photo) {
      console.log(`Фото с id ${id} не существует в сторе.`);
      return;
    }
    setSelectedImage(photo);
  };

  const onCloseFullscreenImage = () => {
    setSelectedImage(null);
  };

  if (isFirstLoad) {
    return <Loader />;
  }

  return (
    <View>
      <FlatList
        data={gallery.photos}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <PhotoCard
            id={item.id}
            uri={item.urls.small_s3}
            onPress={onPhotoPress}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
        initialNumToRender={30}
        numColumns={3}
        onEndReachedThreshold={2}
        onEndReached={onEndReached}
        ListFooterComponent={Loader}
      />
      {selectedImage && (
        <FullscreenImage
          data={selectedImage}
          onClose={onCloseFullscreenImage}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({});
