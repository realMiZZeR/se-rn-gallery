import {makeObservable, observable, runInAction} from 'mobx';
import GalleryService from '../services/GalleryService';
import {UnsplashPhotoDTO} from '../types/UnsplashPhotoDTO';

/**
 * Класс, хранящий изображения и методы для работы с их данными.
 */
export default class GalleryStore {
  private readonly _galleryService: GalleryService;
  private readonly _startPage: number;
  public photos: Array<UnsplashPhotoDTO>;
  public currentPage: number;
  public isLoading: boolean;

  constructor(startPage = 1) {
    this._galleryService = new GalleryService();
    this._startPage = startPage;
    this.currentPage = this._startPage;
    this.photos = [];
    this.isLoading = false;

    makeObservable(this, {
      photos: observable,
      isLoading: observable,
    });
  }

  /**
   * Возвращает данные об изображении.
   * @param id ID изображения.
   */
  getPhoto = (id: string) => {
    return this.photos.find(photo => photo.id === id);
  };

  /**
   * Заполняет массив данными, запрашивая их с сервера.
   * @param pagesCount Количество запрашиваемых страниц.
   * @param itemsCount Количество элементов на странице.
   * @param callback Функция, которая вызовется после завершения запроса.
   */
  fill = async (pagesCount: number, itemsCount = 30, callback = () => {}) => {
    try {
      // todo: add queue
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;

      for (let i = 0; i < pagesCount; i++) {
        console.log(this.currentPage);
        await this.loadPage(this.currentPage, itemsCount);
        this.currentPage++;
      }

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    } finally {
      callback();
    }
  };

  /**
   * Устанавилвает указатель в начало, а также очищает массив с изображениями.
   */
  clear = () => {
    this.photos.length = 0;
    this.currentPage = this._startPage;
  };

  // Асинхронное извлечение данных изображений.
  private loadPage = async (
    page: number,
    itemsCount: number,
    callback?: Function,
  ) => {
    try {
      const response = await this._galleryService.getPhotos(page, itemsCount);
      runInAction(() => {
        this.photos = [...this.photos, ...response];
        callback && callback();
      });
    } catch (error) {
      console.error(error);
    }
  };
}
