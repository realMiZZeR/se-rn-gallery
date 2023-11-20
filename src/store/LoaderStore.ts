import {makeObservable, observable} from 'mobx';

/**
 * Хранилище для экрана загрузки.
 */
class LoaderStore {
  // Различные сообщения при загрузке галереи изображений.
  public GallerySplashes: Array<string>;
  constructor() {
    this.GallerySplashes = [];
    this.fillGallerySplashes();
    makeObservable(this, {
      GallerySplashes: observable,
    });
  }

  private fillGallerySplashes = () => {
    this.GallerySplashes = [
      'Загружаем изображения...',
      'Картинки уже на подходе!',
      'Ещё минуточку...',
    ];
  };
}

export default LoaderStore;
