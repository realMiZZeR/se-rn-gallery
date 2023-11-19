import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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
  const [selectedImage, setSelectedImage] = useState<UnsplashPhotoDTO | null>(
    null,
  );

  const loadNextPage = () => {
    gallery.nextPage();
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
        numColumns={3}
        onEndReachedThreshold={0.9}
        onEndReached={loadNextPage}
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
