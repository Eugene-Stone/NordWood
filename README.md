# NordWood

Проект NordWood — это современное веб-приложение на базе React с отдельной CMS-панелью на Strapi.

Frontend отвечает за отображение интерфейса, клиентскую маршрутизацию, визуальные компоненты и работу с контентом. Backend реализован на Strapi и предоставляет API для управления страницами, новостями, галереями и другими структурированными данными.

## Демо

https://eugene-stone.github.io/NordWood/

## Структура проекта

- `frontend/` — React + Vite фронтенд
- `backend/` — Strapi CMS бэкенд
- `data.db` — локальная SQLite база данных Strapi
- `_add/`, `gen/`, `terminal/` — вспомогательные заметки, генерация и файлы проекта

## О проекте

Frontend:
- SPA на React 19 с Vite
- TypeScript для типизации
- Sass для стилизации
- React Router для маршрутизации
- адаптивный интерфейс и лайтбокс для галерей
- работа с HTML/Markdown-контентом
- динамические страницы и секции, управляемые через CMS

Backend:
- Strapi 5.50.0 как headless CMS
- SQLite (`better-sqlite3`) для локального хранения данных
- Strapi-плагины для документации, пользователей и прав доступа, электронной почты, CKEditor, предпросмотра, схем и геолокации
- структура данных Strapi позволяет легко менять содержимое сайта без правки фронтенда

## Технологии

### Frontend
- React 19
- Vite
- TypeScript
- Sass
- `react-router` / `react-router-dom`
- `react-helmet-async`
- `react-hook-form`
- `swiper`
- `react-markdown`
- `dompurify`
- `masonry-layout`
- `imagesloaded`
- `yet-another-react-lightbox`

### Backend
- Strapi 5.50.0
- `@strapi/plugin-documentation`
- `@strapi/plugin-users-permissions`
- `@strapi/plugin-cloud`
- `@strapi/provider-email-nodemailer`
- `@_sh/strapi-plugin-ckeditor`
- `strapi-plugin-preview-button`
- `strapi-plugin-schemas-to-ts`
- `strapi-location-picker`
- `better-sqlite3`
- `pg` (возможна поддержка PostgreSQL)

## Установка

### Фронтенд

```bash
cd frontend
npm install
npm run dev
```

### Бэкенд

```bash
cd backend
npm install
npm run develop
```

`npm run develop` выполняет `node generate-barrels.js && strapi develop`, чтобы сгенерировать необходимые файлы и запустить Strapi в режиме разработки.

## Сборка

### Фронтенд

```bash
cd frontend
npm run build
```

После сборки автоматически создаётся `dist/404.html` из `dist/index.html` за счёт скрипта `postbuild`, что важно для статических хостингов и GitHub Pages.

### Бэкенд

```bash
cd backend
npm run build
```

## Запуск в продакшене

### Фронтенд

Сборка фронтенда размещается как статический сайт на любом хостинге.

### Бэкенд

```bash
cd backend
npm run start
```

## Локальная разработка

Рекомендуется запускать frontend и backend в двух терминалах:

```bash
cd frontend
npm run dev
```

```bash
cd backend
npm run develop
```
