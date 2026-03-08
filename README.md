# Frontend E-commerce

Aplicación web de una tienda online construida con **React**, **Vite** y **TypeScript**. Consume la API del backend (universidad/backend-ecommerce) y permite registro, catálogo, carrito, checkout con **Mercado Pago (Checkout Pro)** e historial de pedidos. Incluye zona de administración (productos, pedidos, usuarios).

---

## ¿Qué hace este proyecto?

Interfaz de usuario del e-commerce que permite:

- **Usuarios:** registrarse, iniciar sesión, ver y filtrar catálogo, gestionar carrito, ir a checkout y ser redirigidos a Mercado Pago para pagar; ver historial de pedidos y páginas de éxito/fallo/pendiente tras el pago.
- **Administradores:** gestionar productos (CRUD), inventario y ver todos los pedidos y usuarios desde el panel `/admin`.

El frontend se comunica con el **backend-ecommerce** (NestJS) mediante REST. Los precios se muestran en COP con formato colombiano (ej. 129.990).

---

## Stack tecnológico

| Tecnología        | Uso                              |
|-------------------|----------------------------------|
| **React**         | UI y componentes                 |
| **Vite**          | Build y dev server               |
| **TypeScript**    | Lenguaje                         |
| **React Router**  | Rutas y navegación               |
| **Tailwind CSS**  | Estilos                          |
| **shadcn/ui**     | Componentes (Radix + Tailwind)   |
| **TanStack Query**| Cache y peticiones (opcional)     |
| **React Hook Form**| Formularios (login, registro, admin) |

---

## Arquitectura del código

```
src/
├── main.tsx                    # Entrada, providers (Query, Auth, Cart)
├── App.tsx                     # Rutas (MainLayout, AdminLayout)
├── components/
│   ├── layout/                 # MainLayout, AdminLayout, Header, Footer, CartDrawer
│   ├── ui/                     # Componentes shadcn (Button, Card, Input, etc.)
│   ├── ApiProductCard.tsx      # Card de producto en catálogo
│   ├── ProductImage.tsx        # Imagen de producto
│   ├── PrivateRoute.tsx        # Protección de rutas (JWT, rol admin)
│   └── NavLink.tsx
├── context/
│   ├── AuthContext.tsx         # Usuario, token, login/logout
│   └── CartContext.tsx         # Contador carrito, estado del drawer
├── data/
│   └── api/
│       ├── client.ts           # Cliente HTTP (fetch + token)
│       └── endpoints.ts        # URLs del backend
├── domain/
│   └── types.ts                # Tipos (Usuario, Producto, CarritoItem, Pedido, etc.)
├── hooks/                      # useToast, useMobile
├── pages/                      # Páginas por ruta (Catalog, Cart, Checkout, Admin*)
├── services/                   # Llamadas al backend (auth, productos, carrito, order, user)
└── utils/
    └── format.ts               # formatCop (precios COP)
```

- Las **páginas** renderizan la UI y usan **contextos** (Auth, Cart) y **servicios** para llamar al API.
- Los **servicios** usan el cliente HTTP y los **endpoints** definidos en `data/api`.
- Las rutas privadas y admin se protegen con **PrivateRoute** (JWT y rol).

### Estilo arquitectónico: por capas y modular

El frontend está organizado de forma **modular por funcionalidad** (páginas, servicios, contextos, componentes) y con una separación clara de responsabilidades:

1. **Presentación:** páginas y componentes de UI; muestran datos y disparan acciones (login, agregar al carrito, crear preferencia de pago).
2. **Lógica de aplicación / estado:** contextos (AuthContext, CartContext) y servicios que encapsulan las llamadas al backend y la lógica de negocio del cliente (token en cabecera, redirección a Mercado Pago tras crear preferencia).
3. **Datos e integraciones:** cliente HTTP (`data/api/client.ts`) y endpoints (`data/api/endpoints.ts`); el backend es la única fuente de datos persistente.

No se usa arquitectura hexagonal (puertos/adaptadores) ni Clean Architecture en sentido estricto; el objetivo es mantener una estructura clara y mantenible, con componentes reutilizables y servicios acotados por dominio (auth, productos, carrito, pedidos).

### Patrones de diseño utilizados

| Patrón | Dónde se usa | Para qué sirve |
|--------|----------------|----------------|
| **Context (Provider / Consumer)** | `AuthContext`, `CartContext` con `createContext` + `Provider` | Estado global (usuario, token, carrito) accesible desde cualquier componente sin prop drilling. |
| **Custom hooks** | `useAuth()`, `useCart()` y hooks de UI (`useToast`, `useMobile`) | Reutilizar lógica y acceso al contexto; la UI solo llama al hook. |
| **Servicio / Facade** | `authService`, `product.service`, `order.service`, `client` en `data/api/client` | Objetos que encapsulan las llamadas al backend; las páginas no conocen URLs ni detalles de `fetch`. |
| **Protección de rutas (Route Guard)** | `PrivateRoute` | Componente que envuelve rutas; si no hay usuario (o no es admin), redirige a login o home. |
| **Composición de layouts** | `MainLayout`, `AdminLayout` con `<Outlet />` | Definir estructura común (header, sidebar) y anidar rutas; evitar repetir la misma estructura en cada página. |
| **Separación contenedor / presentacional** | Páginas (Catalog, Cart, Checkout) vs componentes UI (Button, Card) | Páginas orquestan datos (context, servicios) y pasan props a componentes “tontos” reutilizables. |
| **Single responsibility** | `client.ts` (HTTP + token), `endpoints.ts` (URLs), `format.ts` (formato COP) | Un archivo o módulo con una responsabilidad clara; más fácil de mantener y testear. |

---

## Requisitos previos

- **Node.js** 18+ (recomendado 20+)
- **Yarn** o npm
- **Backend-ecommerce** en marcha (ver [backend-ecommerce](https://github.com/...) o el README del backend en el mismo monorepo/curso)

---

## Variables de entorno

Copia el ejemplo y ajusta:

```bash
cp .env.example .env
```

| Variable | Obligatorio | Descripción |
|----------|-------------|-------------|
| `VITE_API_URL` | Sí | URL base del backend (ej. `http://localhost:3000`) |
| `VITE_MERCADOPAGO_PUBLIC_KEY` | No | Public Key de Mercado Pago; solo si usas SDK de MP en el frontend (este proyecto usa Checkout Pro por redirección, no es obligatorio) |

En desarrollo suele bastar con `VITE_API_URL=http://localhost:3000`.

---

## Comandos

| Comando | Descripción |
|---------|-------------|
| `yarn install` | Instalar dependencias |
| `yarn dev` | Servidor de desarrollo (Vite) |
| `yarn build` | Build de producción |
| `yarn build:dev` | Build en modo development |
| `yarn preview` | Previsualizar el build de producción |
| `yarn lint` | Linter |
| `yarn test` | Tests (Vitest) |
| `yarn test:watch` | Tests en modo watch |

---

## Pasos para levantar el proyecto

### 1. Instalar dependencias

```bash
cd frontend-ecommerce
yarn install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y define `VITE_API_URL` con la URL de tu backend (ej. `http://localhost:3000`).

### 3. Tener el backend en ejecución

Asegúrate de que el [backend-ecommerce](https://github.com/...) esté levantado (por ejemplo `yarn start:dev` en el proyecto del backend) y que en `.env` del frontend apunte a ese backend.

### 4. Iniciar el frontend

```bash
yarn dev
```

La app quedará disponible en `http://localhost:5173` (o el puerto que indique Vite).

### 5. Usuarios de prueba

El frontend no crea usuarios; estos vienen del **backend**. Tras ejecutar el seed del backend (`yarn db:seed`), puedes iniciar sesión en esta app con:

| Rol     | Email                | Contraseña | Uso |
|---------|----------------------|------------|-----|
| Admin   | `admin@tienda.com`   | `admin123` | Acceso a `/admin` (productos, pedidos, usuarios). |
| Usuario | `maria@example.com`  | `user123`  | Compras, carrito, checkout, mis pedidos. |
| Usuario | `carlos@example.com`| `user123`  | Misma experiencia que María. |

---

## Rutas principales

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Inicio |
| `/catalog` | Público | Catálogo con filtros |
| `/product/:id` | Público | Detalle de producto |
| `/login` | Público | Inicio de sesión |
| `/registro` | Público | Registro de usuario |
| `/cart` | Usuario | Carrito |
| `/checkout` | Usuario | Checkout (botón “Pagar con Mercado Pago” → redirección a MP) |
| `/checkout/success` | Público | Página tras pago aprobado (redirección de MP) |
| `/checkout/failure` | Público | Página tras pago rechazado/cancelado |
| `/checkout/pending` | Público | Página tras pago pendiente |
| `/mis-pedidos` | Usuario | Historial de pedidos |
| `/admin` | Admin | Panel admin (productos, pedidos, usuarios) |

---

## Integración con el backend

Este frontend espera que el backend exponga al menos:

- **Auth:** `POST /api/auth/registro`, `POST /api/auth/login`
- **Productos:** `GET /api/productos`, `GET /api/productos/filtrar`, `GET /api/productos/:id`; admin: listar, crear, actualizar, eliminar, inventario
- **Carrito:** `GET /api/carrito`, `POST /api/carrito/agregar`, `PUT/DELETE` ítem
- **Pedidos:** `POST /api/pedidos/create-preference` (Checkout Pro), `GET /api/pedidos/mis-pedidos`, `GET /api/pedidos/:id`; admin: `GET /api/pedidos/admin`
- **Pagos:** `GET /api/pagos/detalle?payment_id=xxx` (para la página de fallo)

Las URLs se configuran en `src/data/api/endpoints.ts` usando `VITE_API_URL`.

---

## Licencia

Proyecto de uso educativo.
