import {makeObservable, observable, action, runInAction} from 'mobx';
import GalleryService from '../services/GalleryService';
import {PhotoType} from '../types/PhotoType';

/**
 * Класс, хранящий изображения и методы для работы с их данными.
 */
export default class GalleryStore {
  private _galleryService: GalleryService;
  public currentPage: number;
  public photos: PhotoType[];
  public isLoading: boolean;

  constructor(page = 1) {
    this._galleryService = new GalleryService();
    this.currentPage = page;
    this.photos = [];
    this.isLoading = false;
    makeObservable(this, {
      photos: observable,
      isLoading: observable,
      nextPage: action,
    });
  }

  /**
   * Загружает следующую страницу, дополняя массив новыми данными.
   */
  nextPage = () => {
    if (this.isLoading) {
      return;
    }

    this.currentPage++;
    this.loadData();
  };

  // Асинхронное извлечение данных изображений.
  private loadData = async () => {
    try {
      this.isLoading = true;
      const response = await this._galleryService.getPhotos(
        this.currentPage,
        30,
      );
      runInAction(() => {
        this.photos = [...this.photos, ...response];
        this.isLoading = false;
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  };
}
