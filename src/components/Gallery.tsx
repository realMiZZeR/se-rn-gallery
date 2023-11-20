import React, {useEffect, useState} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {GalleryImage} from './GalleryImage';
import {useStores} from '../providers/RootStoreContext';
import {Loader} from './Loader';
import {FullscreenImage} from './FullscreenImage';
import {UnsplashPhotoDTO} from '../types/UnsplashPhotoDTO';
import {getRandomItem} from '../scripts/getRandomItem';

/**
 * Компонент для вывода изображений в сетку.
 */
export const Gallery = observer(() => {
  const {gallery, loader} = useStores();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashPhotoDTO | null>(
    null,
  );

  const [imageSize, setImageSize] = useState(0);

  // Обработчик, устанавливающий размер изображения по ширине экрана.
  const onRootLayout = (event: LayoutChangeEvent) => {
    setImageSize(event.nativeEvent.layout.width / 3);
  };

  // Количество загружаемых страниц.
  const fillCount = 3;

  // Заполнение галереи изображениями на первый рендер компонента.
  useEffect(() => {
    gallery.fill(fillCount, undefined, () => {
      setIsFirstLoad(false);
    });
  }, []);

  // Загрузка новых изображений при приближении к концу списка.
  const onEndReached = () => {
    if (isFirstLoad) {
      return;
    }
    gallery.fill(fillCount, undefined);
  };

  // Обработчик для очистки всех изображений из списка и загрузка их с начала.
  const onRefresh = () => {
    setIsRefresh(true);
    gallery.clear();
    gallery.fill(fillCount, undefined, () => {
      setIsRefresh(false);
    });
  };

  // Обработчик для нажатия на компонент изображения.
  const onPhotoPress = (id: string) => {
    const photo = gallery.getPhoto(id);
    if (!photo) {
      console.log(`Фото с id ${id} не существует в сторе.`);
      return;
    }
    setSelectedImage(photo);
  };

  // Обработчик для закрытия изображения, отображённого на весь экран.
  const onCloseFullscreenImage = () => {
    setSelectedImage(null);
  };

  // Скорее всего, это костыль, используется для загрузки первых изображений в список.
  // Если этого не сделать, то список будет считать, что уже долистан до конца,
  // и ещё раз запустит загрузку новых изображений, но на самом деле он просто пуст.
  if (isFirstLoad) {
    return (
      <Loader>
        <Text>{getRandomItem<string>(loader.GallerySplashes)}</Text>
      </Loader>
    );
  }

  return (
    <View onLayout={onRootLayout}>
      <FlatList
        data={gallery.photos}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <GalleryImage
            id={item.id}
            uri={item.urls.small_s3}
            width={imageSize}
            height={imageSize}
            onPress={onPhotoPress}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
        initialNumToRender={30}
        numColumns={3}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
        ListFooterComponent={Loader}
      />
      {selectedImage && (
        <FullscreenImage
          uri={selectedImage.urls.regular}
          onClose={onCloseFullscreenImage}
        />
      )}
    </View>
  );
});
