# Менеджер учетных записей

![Vue](https://img.shields.io/badge/Vue-3.3-4FC08D?logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite)
![Vuetify](https://img.shields.io/badge/Vuetify-3.3-1867C0?logo=vuetify)

Приложение для управления учетными записями с поддержкой разных типов аутентификации.

## 📋 Основные возможности

- **Управление учетными записями**

  - Добавление/удаление учетных записей
  - Два типа учетных записей: LDAP и Локальная
  - Валидация полей с подсветкой ошибок
  - Переключение видимости пароля
  - Автосохранение в localStorage

- **Технические особенности**
  - Composition API с TypeScript
  - Компоненты Vuetify 3 (Material Design)
  - Управление состоянием через Pinia
  - Клиентская валидация данных
  - Адаптивный дизайн

## 📂 Структура проекта

```
src/
├── stores/         # Хранилища Pinia
│   └── accounts.ts # Хранилище учетных записей
├── components/     # Vue компоненты
│   └── AccountForm.vue # Основная форма
├── styles/         # Глобальные стили
├── App.vue         # Корневой компонент
└── main.ts         # Точка входа
```

## 🚀 Быстрый старт

### Установка

```bash
git clone git@github.com:fenrirheimr/SaaSoft-test.git
cd SaaSoft-test
npm install
```

### Запуск разработческого сервера

```
npm run dev
```

### Сборка для production

```
npm run build
```

### Просмотр собранного проекта

```
npm run preview
```

## 🛠 Технологический стек

Vue 3 (Composition API)

TypeScript - строгая типизация

Vite - сборка и dev-сервер

Pinia - управление состоянием

Vuetify 3 - UI компоненты

Persisted State - сохранение данных
