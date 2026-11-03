# Todo App – Frontend

<p>
  <img src="https://skillicons.dev/icons?i=react,ts,tailwind,vite" alt="React, TypeScript, Tailwind CSS, Vite" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" height="48" />
</p>

A simple Kanban-style todo board built with React, TypeScript and Tailwind CSS. It talks to a Spring Boot REST API via Axios.

![Todo app screenshot](docs/screenshot.png)

## Features

- Three columns: **Open**, **In Progress**, **Done**
- Create, edit and delete todos (with confirmation)
- Move todos forward and back between columns
- Loading and error states for fetching and saving

## Tech stack

| | |
|---|---|
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| HTTP | Axios |
| Build | Vite |
| Backend | Spring Boot REST API (`/api/todo`) |

## Getting started

```bash
npm install
npm run dev
```

The backend must be running. Requests to `/api` are proxied to it by the Vite dev server.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run format` | Format code with Prettier |