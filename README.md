<div align="center">
  <img src="public/logo-512x512.png" alt="NexoFit Logo" width="200"/>
  
  # NexoFit Frontend
  
  Frontend de la aplicación NexoFit construido con Astro y TailwindCSS.
</div>

## Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Funcionalidades](#funcionalidades)
- [API](#api)
- [Licencia](#licencia)

## Descripción

NexoFit Frontend es la interfaz de usuario para la plataforma de gestión de gimnasios NexoFit. Proporciona una experiencia moderna y responsiva para la gestión de clases, reservas, categorías y modalidades deportivas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 18 o superior)
- npm (normalmente viene con Node.js)
- El backend de NexoFit ejecutándose

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd NexoFit-Frontend
```

2. Instala las dependencias:

```bash
npm install
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PUBLIC_API_URL=http://localhost:8080/api
```

#### Descripción de Variables

| Variable | Descripción | Valor por Defecto | Requerido |
|----------|-------------|-------------------|-----------|
| `PUBLIC_API_URL` | URL del API backend | `http://localhost:8080/api` | No |

**Nota:** Las variables con prefijo `PUBLIC_` son accesibles desde el navegador.

### Ejemplo para Producción

```env
PUBLIC_API_URL=https://api.tudominio.com/api
```

## Uso

### Modo Desarrollo

Inicia el servidor de desarrollo con hot-reload:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4321`

### Construcción para Producción

Genera los archivos estáticos optimizados:

```bash
npm run build
```

Los archivos se generarán en el directorio `./dist/`

### Vista Previa de Producción

Previsualiza la versión de producción localmente:

```bash
npm run preview
```

### Otros Comandos

```bash
# Ejecutar comandos de Astro CLI
npm run astro <comando>

# Obtener ayuda de Astro
npm run astro -- --help
```

## Estructura del Proyecto

```
NexoFit-Frontend/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── assets/            # Recursos como imágenes e iconos
│   ├── components/        # Componentes reutilizables
│   │   ├── Modal.astro
│   │   ├── Navbar.astro
│   │   └── Toaster.astro
│   ├── layouts/           # Layouts de página
│   │   └── Layout.astro
│   ├── lib/               # Utilidades y funciones auxiliares
│   │   ├── api.js         # Cliente HTTP para el API
│   │   └── auth.js        # Funciones de autenticación
│   ├── pages/             # Páginas de la aplicación (rutas)
│   │   ├── index.astro
│   │   ├── login.astro
│   │   ├── register.astro
│   │   ├── dashboard.astro
│   │   ├── perfil.astro
│   │   ├── categorias.astro
│   │   └── modalidades/
│   │       └── [id].astro
│   └── styles/            # Estilos globales
│       └── global.css
├── .env                   # Variables de entorno (no incluir en git)
├── .env.example           # Ejemplo de variables de entorno
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias y scripts
└── README.md             # Este archivo
```

## Tecnologías

- **[Astro](https://astro.build/)** - Framework web de alto rendimiento
- **[TailwindCSS](https://tailwindcss.com/)** - Framework de CSS utility-first
- **JavaScript** - Lenguaje de programación

## Funcionalidades

### Autenticación

- Inicio de sesión de usuarios
- Registro de nuevos usuarios
- Gestión de tokens JWT (access y refresh tokens)
- Almacenamiento seguro en localStorage

### Páginas Principales

- **Inicio** (`/`) - Página principal de la aplicación
- **Login** (`/login`) - Inicio de sesión
- **Registro** (`/register`) - Registro de usuarios
- **Dashboard** (`/dashboard`) - Panel de control del usuario (requiere autenticación)
- **Perfil** (`/perfil`) - Gestión del perfil de usuario (requiere autenticación)
- **Categorías** (`/categorias`) - Listado de categorías deportivas
- **Modalidades** (`/modalidades/[id]`) - Detalles de modalidades específicas

### Gestión de Estado

La aplicación utiliza `localStorage` para mantener el estado de autenticación:

- `accessToken` - Token de acceso para peticiones autenticadas
- `refreshToken` - Token para renovar la sesión

## API

El frontend se comunica con el backend de NexoFit a través de una API REST. El cliente HTTP está implementado en `src/lib/api.js` y gestiona:

- Autenticación automática mediante tokens JWT
- Manejo de errores HTTP
- Formateo de respuestas

### Endpoints Utilizados

La aplicación consume los siguientes endpoints del backend:

- `POST /auth/login` - Autenticación de usuarios
- `POST /auth/register` - Registro de usuarios
- `GET /categories` - Listado de categorías
- `GET /modalities` - Listado de modalidades
- `GET /classes` - Listado de clases
- `POST /bookings` - Crear reservas

## Licencia

Este proyecto es privado y está destinado únicamente para uso interno de NexoFit.
