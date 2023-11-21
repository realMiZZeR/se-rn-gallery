import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Image, Text, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

// Пропсы для компонента.
type NetworkProviderProps = {
  children: ReactNode;
};

// Хранящиеся значения в контексте.
type NetworkContextValue = {
  hasConnection: boolean;
};

const NetworkContext = createContext<NetworkContextValue | null>(null);

/**
 * Хук для использования контекста компонента сети.
 */
export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === null) {
    throw new Error('Контекст для Network не был создан.');
  }
  return context;
};

/**
 * Отслеживает подключение к Интернету, и если оно отсутствует, то дочерние компоненты пропадают из рендера.
 * @param children Дочерние компоненты.
 * @constructor
 */
export const NetworkProvider = ({children}: NetworkProviderProps) => {
  const netInfo = useNetInfo();
  const [hasConnection, setHasConnection] = useState(false);

  // Метод для проверки подключения к Интернету.
  const checkConnection = () => {
    if (netInfo === null) {
      return;
    }
    let isConnected = netInfo.isConnected ?? false;
    let isInternetReachable = netInfo.isInternetReachable ?? false;
    setHasConnection(isConnected && isInternetReachable);
  };

  // Запускает механизм проверки соединения с интернетом.
  useEffect(() => {
    const checkConnectionInterval = setInterval(checkConnection, 5000);
    return () => clearInterval(checkConnectionInterval);
  }, []);

  // При отсутствии подключения, будет выводиться соответствующий экран,
  // а при его наличии - все дочерние компоненты.
  if (!hasConnection) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 50, height: 50, marginBottom: 8}}
          source={require('../assets/images/no-connection.png')}
        />
        <Text style={{color: '#4d4d4d'}}>
          Отсутствует подключение к интернету.
        </Text>
      </View>
    );
  }

  return (
    <NetworkContext.Provider value={null}>{children}</NetworkContext.Provider>
  );
};
