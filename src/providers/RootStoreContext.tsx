import {createContext, useContext} from 'react';
import RootStore from '../store/RootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

/**
 * Хук для извлечения сторов из глобального стора.
 */
export const useStores = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new Error('Контекст для глобального стора не проинициализирован.');
  }

  return context;
};
