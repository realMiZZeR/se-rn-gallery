# Окружение
При разработке приложения использовалось IDE от JetBrains `WebStorm`. <br/>
Для работы с react-native был загружен пакет [`@react-native-community/cli`](https://github.com/react-native-community/cli).
Также был настроен эмулятор на Android Studio, где были загружены следующие SDK:
- платформа Android API 34;
- инструменты Android SDK Build-Tools 34, Android Emulator и Android SDK Platform-Tools.
  
[Более подробно о настройке окружения написано на официальной документации во вкладке React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup).

> сразу хочется сказать, что на iOS у меня, к сожалению, нет возможности
> протестировать работоспособность в связи с отсутствием устройства с операционной системой iOS или macOS.

# Запуск приложения
## Шаг 1
После клонирования репозитория, для начала необходимо загрузить зависимости:
```bash
#npm
npm install

#yarn
yarn install
```

## Шаг 2
Для запуска приложения, необходимо запустить эмулятор, а после открыть терминал и выполнить следующую последовательность действий:
```bash
#npm
npm start

#yarn
yarn start
```
После успешного запуска, нажмите латинскую «a» для запуска приложения на андроид или «i» для ios.
Также можно ввести команду, которая сразу соберёт и откроет приложение на смартфоне:
```bash
#npm
npm run android
# или
npm run ios

#yarn
yarn andorid
# или
yarn ios
```

## Шаг 3
После выполнения вышеперечисленных действий, на эмуляторе откроется приложение с галереей изображений, взятых с API сайта [Unsplash Developers](https://unsplash.com/developers).

# Скриншоты приложения
> Главный экран
![Главный экран]('./readme_images/main.png')

> Полное изображение
![Полное изображение]('./readme_images/fullscreen-image.png')

> Без интернета
![Без интернета]('./readme_images/no-connection.png')

> Загрузка изображений
![Загрузка изображений]('./readme_images/gallery-loading.png')
