import GalleryStore from './GalleryStore';
import LoaderStore from './LoaderStore';

/**
 * Класс глобального хранилища.
 */
class RootStore {
  gallery = new GalleryStore();
  loader = new LoaderStore();
}

export default RootStore;
