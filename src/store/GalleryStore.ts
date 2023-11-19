import {makeObservable, observable, action, runInAction} from 'mobx';
import GalleryService from '../services/GalleryService';
import {UnsplashPhotoDTO} from '../types/UnsplashPhotoDTO';

/**
 * Класс, хранящий изображения и методы для работы с их данными.
 */
export default class GalleryStore {
  private _galleryService: GalleryService;
  public currentPage: number;
  public photos: Array<UnsplashPhotoDTO>;
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

  getPhoto = (id: string) => {
    return this.photos.find(photo => photo.id === id);
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
