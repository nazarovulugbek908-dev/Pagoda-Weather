const translations = {
  uz: {
    appName: 'PAGODA WEATHER',
    tagline: "O'zbekiston va dunyo ob-havosi",

    nav: {
      home: 'Bosh sahifa',
      map: 'Xarita',
    },

    search: {
      placeholder: 'Shahar yoki hududni qidiring...',
      searching: 'Qidirilmoqda...',
      noResults: 'Hech qanday shahar topilmadi',
      recentSearches: "So'nggi qidiruvlar",
      clearAll: 'Tozalash',
      typeMinChars: 'Kamida 2 ta belgi kiriting',
    },

    weather: {
      currentWeather: 'Hozirgi ob-havo',
      feelsLike: 'His qilinadi',
      humidity: 'Namlik',
      windSpeed: 'Shamol',
      visibility: "Ko'rinish masofasi",
      pressure: 'Bosim',
      dewPoint: 'Shudring nuqtasi',
      uvIndex: 'UV indeksi',
      sunrise: 'Quyosh chiqishi',
      sunset: 'Quyosh botishi',
      daylight: 'Kun uzunligi',
      high: 'Maks',
      low: 'Min',
      precipitation: 'Yog\'ingarchilik',
      windDirection: 'Shamol yo\'nalishi',
    },

    forecast: {
      hourly: '24 soatlik prognoz',
      daily: '7 kunlik ob-havo',
      today: 'Bugun',
      tomorrow: 'Ertaga',
    },

    chart: {
      temperature: 'Harorat',
      precipitation: 'Yog\'ingarchilik',
      wind: 'Shamol',
      humidity: 'Namlik',
      hourlyTemp: 'Soatlik harorat grafigi',
      legend: 'Ko\'rsatkich',
    },

    map: {
      title: 'Interaktiv ob-havo xaritasi',
      selectCity: 'Shahar tanlang',
      clickToSelect: 'Ob-havoni ko\'rish uchun xaritaning istalgan nuqtasiga bosing',
      currentLocation: 'Tanlangan shahar',
    },

    settings: {
      title: 'Sozlamalar',
      theme: 'Mavzu',
      units: "O'lchov birligi",
      celsius: 'Selsiy (°C)',
      fahrenheit: 'Farengeyt (°F)',
      dark: 'Qorong\'u',
      light: 'Yorug\'',
    },

    language: {
      title: 'Til',
      uz: "O'zbekcha",
      en: 'English',
      ru: 'Русский',
    },

    loading: {
      weather: "Ob-havo ma'lumotlari yuklanmoqda...",
      searching: 'Qidirilmoqda...',
    },

    error: {
      fetchFailed: "Ma'lumotlarni yuklab bo'lmadi",
      locationNotFound: 'Joylashuv topilmadi',
      noData: "Ma'lumotlar mavjud emas",
      retry: 'Qayta urinish',
      network: 'Internet bilan aloqa uzildi',
    },

    empty: {
      noCity: 'Shahar tanlanmagan',
      selectPrompt: "Ob-havoni ko'rish uchun yuqoridagi qidiruvdan foydalaning",
    },

    time: {
      now: 'Hozir',
      today: 'Bugun',
    },

    uvLevels: {
      low: 'Past',
      moderate: "O'rtacha",
      high: 'Yuqori',
      veryHigh: 'Juda yuqori',
      extreme: 'Xavfli',
    },

    windDirections: {
      N: 'Shm',
      NNE: 'Shm-Shq-Shm',
      NE: 'Shm-Shq',
      ENE: 'Shq-Shm-Shq',
      E: 'Shq',
      ESE: 'Shq-Jan-Shq',
      SE: 'Jan-Shq',
      SSE: 'Jan-Jan-Shq',
      S: 'Jan',
      SSW: 'Jan-Jan-G\'arb',
      SW: 'Jan-G\'arb',
      WSW: 'G\'arb-Jan-G\'arb',
      W: 'G\'arb',
      WNW: 'G\'arb-Shm-G\'arb',
      NW: 'Shm-G\'arb',
      NNW: 'Shm-Shm-G\'arb',
    },

    footer: {
      dataBy: "Ma'lumotlar manbasi:",
      rights: 'Barcha huquqlar himoyalangan',
    },

    a11y: {
      toggleTheme: "Mavzuni o'zgartirish",
      selectLanguage: 'Tilni tanlash',
      searchCity: 'Shahar qidirish',
      toggleUnits: "Harorat o'lchov birligini o'zgartirish",
    },

    wmo: {
      0: 'Mussaffo osmon',
      1: 'Asosan ochiq',
      2: 'Qisman bulutli',
      3: 'Bulutli',
      45: 'Tuman',
      48: 'Qirovli tuman',
      51: 'Mayin shivalama',
      53: "O'rtacha shivalama",
      55: 'Kuchli shivalama',
      56: 'Muzlama shivalama',
      57: 'Kuchli muzlama shivalama',
      61: 'Biroz yomg\'ir',
      63: "O'rtacha yomg'ir",
      65: 'Kuchli yomg\'ir',
      66: 'Muzlagan yomg\'ir',
      67: 'Kuchli muzlagan yomg\'ir',
      71: 'Yengil qor',
      73: "O'rtacha qor",
      75: 'Kuchli qor bo\'roni',
      77: 'Mayda donador qor',
      80: 'Yengil yomg\'ir jalasi',
      81: 'Jala yomg\'ir',
      82: 'Kuchli jala',
      85: 'Yengil qor jalasi',
      86: 'Kuchli qor jalasi',
      95: 'Momaqaldiroq',
      96: 'Do\'lli momaqaldiroq',
      99: 'Kuchli do\'l va chaqmoq',
    },
  },

  en: {
    appName: 'PAGODA WEATHER',
    tagline: 'Global atmospheric intelligence',

    nav: {
      home: 'Overview',
      map: 'Interactive Map',
    },

    search: {
      placeholder: 'Search city or region...',
      searching: 'Searching...',
      noResults: 'No locations found',
      recentSearches: 'Recent Searches',
      clearAll: 'Clear',
      typeMinChars: 'Type at least 2 characters',
    },

    weather: {
      currentWeather: 'Current Weather',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      windSpeed: 'Wind speed',
      visibility: 'Visibility',
      pressure: 'Pressure',
      dewPoint: 'Dew point',
      uvIndex: 'UV Index',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      daylight: 'Daylight',
      high: 'High',
      low: 'Low',
      precipitation: 'Precipitation',
      windDirection: 'Wind direction',
    },

    forecast: {
      hourly: '24-Hour Forecast',
      daily: '7-Day Outlook',
      today: 'Today',
      tomorrow: 'Tomorrow',
    },

    chart: {
      temperature: 'Temperature',
      precipitation: 'Precipitation',
      wind: 'Wind',
      humidity: 'Humidity',
      hourlyTemp: 'Hourly Temperature',
      legend: 'Legend',
    },

    map: {
      title: 'Global Weather Map',
      selectCity: 'Select Location',
      clickToSelect: 'Click anywhere on the map to inspect location weather',
      currentLocation: 'Selected location',
    },

    settings: {
      title: 'Settings',
      theme: 'Theme',
      units: 'Units',
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      dark: 'Dark',
      light: 'Light',
    },

    language: {
      title: 'Language',
      uz: "O'zbekcha",
      en: 'English',
      ru: 'Русский',
    },

    loading: {
      weather: 'Retrieving meteorological telemetry...',
      searching: 'Searching locations...',
    },

    error: {
      fetchFailed: 'Failed to retrieve weather data',
      locationNotFound: 'Location could not be resolved',
      noData: 'No meteorological data available',
      retry: 'Retry request',
      network: 'Network connection issue',
    },

    empty: {
      noCity: 'No City Selected',
      selectPrompt: 'Search for a city above to inspect atmospheric conditions',
    },

    time: {
      now: 'Now',
      today: 'Today',
    },

    uvLevels: {
      low: 'Low',
      moderate: 'Moderate',
      high: 'High',
      veryHigh: 'Very High',
      extreme: 'Extreme',
    },

    windDirections: {
      N: 'N',
      NNE: 'NNE',
      NE: 'NE',
      ENE: 'ENE',
      E: 'E',
      ESE: 'ESE',
      SE: 'SE',
      SSE: 'SSE',
      S: 'S',
      SSW: 'SSW',
      SW: 'SW',
      WSW: 'WSW',
      W: 'W',
      WNW: 'WNW',
      NW: 'NW',
      NNW: 'NNW',
    },

    footer: {
      dataBy: 'Data supplied by',
      rights: 'All rights reserved',
    },

    a11y: {
      toggleTheme: 'Toggle color scheme',
      selectLanguage: 'Change application language',
      searchCity: 'Search cities',
      toggleUnits: 'Toggle temperature unit',
    },

    wmo: {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snowfall',
      73: 'Moderate snowfall',
      75: 'Heavy snowfall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    },
  },

  ru: {
    appName: 'PAGODA WEATHER',
    tagline: 'Метеорологические данные в реальном времени',

    nav: {
      home: 'Обзор',
      map: 'Карта',
    },

    search: {
      placeholder: 'Поиск города или региона...',
      searching: 'Поиск...',
      noResults: 'Населенные пункты не найдены',
      recentSearches: 'Недавние запросы',
      clearAll: 'Очистить',
      typeMinChars: 'Введите минимум 2 символа',
    },

    weather: {
      currentWeather: 'Текущая погода',
      feelsLike: 'Ощущается как',
      humidity: 'Влажность',
      windSpeed: 'Скорость ветра',
      visibility: 'Видимость',
      pressure: 'Давление',
      dewPoint: 'Точка росы',
      uvIndex: 'УФ-индекс',
      sunrise: 'Восход солнца',
      sunset: 'Закат солнца',
      daylight: 'Световой день',
      high: 'Макс',
      low: 'Мин',
      precipitation: 'Осадки',
      windDirection: 'Направление ветра',
    },

    forecast: {
      hourly: 'Прогноз на 24 часа',
      daily: 'Прогноз на 7 дней',
      today: 'Сегодня',
      tomorrow: 'Завтра',
    },

    chart: {
      temperature: 'Температура',
      precipitation: 'Осадки',
      wind: 'Ветер',
      humidity: 'Влажность',
      hourlyTemp: 'Почасовой график температуры',
      legend: 'Показатели',
    },

    map: {
      title: 'Интерактивная карта погоды',
      selectCity: 'Выбрать город',
      clickToSelect: 'Нажмите в любой точке карты, чтобы просмотреть погоду',
      currentLocation: 'Выбранный город',
    },

    settings: {
      title: 'Настройки',
      theme: 'Тема',
      units: 'Единицы измерения',
      celsius: 'Цельсий (°C)',
      fahrenheit: 'Фаренгейт (°F)',
      dark: 'Тёмная',
      light: 'Светлая',
    },

    language: {
      title: 'Язык',
      uz: "O'zbekcha",
      en: 'English',
      ru: 'Русский',
    },

    loading: {
      weather: 'Загрузка метеоданных...',
      searching: 'Поиск...',
    },

    error: {
      fetchFailed: 'Ошибка загрузки данных погоды',
      locationNotFound: 'Местоположение не найдено',
      noData: 'Нет доступных данных',
      retry: 'Повторить попытку',
      network: 'Ошибка сетевого соединения',
    },

    empty: {
      noCity: 'Город не выбран',
      selectPrompt: 'Введите название города в строке поиска для просмотра прогноза',
    },

    time: {
      now: 'Сейчас',
      today: 'Сегодня',
    },

    uvLevels: {
      low: 'Низкий',
      moderate: 'Умеренный',
      high: 'Высокий',
      veryHigh: 'Очень высокий',
      extreme: 'Экстремальный',
    },

    windDirections: {
      N: 'С',
      NNE: 'ССВ',
      NE: 'СВ',
      ENE: 'ВСВ',
      E: 'В',
      ESE: 'ВЮВ',
      SE: 'ЮВ',
      SSE: 'ЮЮВ',
      S: 'Ю',
      SSW: 'ЮЮЗ',
      SW: 'ЮЗ',
      WSW: 'ЗЮЗ',
      W: 'З',
      WNW: 'ЗСЗ',
      NW: 'СЗ',
      NNW: 'ССЗ',
    },

    footer: {
      dataBy: 'Данные предоставлены',
      rights: 'Все права защищены',
    },

    a11y: {
      toggleTheme: 'Переключить тему оформления',
      selectLanguage: 'Выбрать язык',
      searchCity: 'Поиск города',
      toggleUnits: 'Сменить единицу температуры',
    },

    wmo: {
      0: 'Ясно',
      1: 'Преимущественно ясно',
      2: 'Переменная облачность',
      3: 'Пасмурно',
      45: 'Туман',
      48: 'Изморозь с туманом',
      51: 'Лёгкая морось',
      53: 'Умеренная морось',
      55: 'Плотная морось',
      56: 'Ледяная морось',
      57: 'Сильная ледяная морось',
      61: 'Небольшой дождь',
      63: 'Умеренный дождь',
      65: 'Сильный дождь',
      66: 'Ледяной дождь',
      67: 'Сильный ледяной дождь',
      71: 'Небольшой снегопад',
      73: 'Умеренный снегопад',
      75: 'Сильный снегопад',
      77: 'Снежные зерна',
      80: 'Кратковременный дождь',
      81: 'Ливневый дождь',
      82: 'Сильный ливень',
      85: 'Небольшой снежный заряд',
      86: 'Сильный снежный заряд',
      95: 'Гроза',
      96: 'Гроза с небольшим градом',
      99: 'Гроза с сильным градом',
    },
  },
}

export default translations
