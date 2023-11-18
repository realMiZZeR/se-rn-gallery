import GalleryStore from './GalleryStore';

/**
 * Класс глобального хранилища.
 */
class RootStore {
  gallery = new GalleryStore();
}

export default RootStore;
