# Aplicación de E-commerce

Una aplicación full-stack de comercio electrónico construida con Node.js, React, TypeScript y SQL Server.

## Estructura del Proyecto

```
.
├── backend/           # Backend con Node.js + Express + TypeScript
├── frontend/         # Frontend con React + TypeScript
└── README.md
```

## Características

- Gestión de Productos y Categorías (operaciones CRUD)
- Funcionalidad de Carrito de Compras
- Gestión de Usuarios
- Carga Masiva de Usuarios mediante CSV
- Gestión de Estado con Redux Toolkit
- Interfaz Moderna con Tailwind CSS

## Requisitos Previos

- Node.js (v14 o superior)
- SQL Server
- npm o yarn

## Instrucciones de Configuración

### Configuración del Backend

1. Navegar al directorio backend:
   ```bash
   cd backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Actualizar los detalles de conexión a la base de datos

4. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Configuración del Frontend

1. Navegar al directorio frontend:
   ```bash
   cd frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Documentación de la API

La documentación de la API estará disponible en `http://localhost:3000/api-docs` cuando el servidor backend esté en ejecución.

## Tecnologías Utilizadas

- Backend:
  - Node.js
  - Express
  - TypeScript
  - SQL Server
  - TypeORM

- Frontend:
  - React
  - TypeScript
  - Redux Toolkit
  - Tailwind CSS
  - React Router 