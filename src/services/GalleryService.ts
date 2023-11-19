import axios from 'axios/index';
import {PhotoType} from '../types/UnsplashPhotoDTO';

/**
 * Класс для взаимодействия с API, предоставляющее коллекцию изображений.
 */
class GalleryService {
  // Ссылка на API и токен для авторизации в нём.
  private apiUrl = 'https://api.unsplash.com/';
  private token = 'V33D213X2CuiFEdsVKhq6xy8jSfHKxviZtH8ckDZD9A';

  /**
   * Запрашивает данные об изображениях.
   * @param page Страница для извлечения данных.
   * @param count Количество элементов, которые будут храниться на данной странице.
   */
  getPhotos = async (page: number, count: number) => {
    const response = await axios.get<PhotoType[]>(
      `${this.apiUrl}/photos?client_id=${this.token}&page=${page}&per_page=${count}`,
    );
    return response.data;
  };
}

export default GalleryService;
