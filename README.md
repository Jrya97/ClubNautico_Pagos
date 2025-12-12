# Club Náutico — Informe del Aplicativo

Aplicativo web para la gestión del Club Náutico, construido con Next.js y Prisma sobre PostgreSQL. Incluye autenticación, administración de usuarios y roles, gestión de socios y postulantes, estado de cuenta, pagos y emisión de recibos.

## Tecnologías

- Next.js 16 (App Router) y React 19
- TypeScript
- Prisma ORM con `@prisma/adapter-pg` y `pg` (PostgreSQL)
- ESLint con configuración de Next.js
- Tailwind CSS 4 (postcss integrado)

## Arquitectura

- `app/`: rutas de la App Router de Next.js y endpoints HTTP.
  - `app/api/*/route.ts`: controladores de API (login, usuarios, roles, socios, postulantes, documentos de pago).
  - Páginas: `app/estado_cuenta/[id]/pagar/[id_documento]/page.tsx`, `app/estado_cuenta/[id]/recibo/[id_documento]/page.tsx`, `app/estado_cuenta/[id]/page.tsx`, `app/page.tsx`, `app/layout.tsx`.
- `components/`: componentes de interfaz (formularios, tablas, recibos, UI).
- `hooks/`: hooks reutilizables (por ejemplo, `useLogin`).
- `lib/prisma.ts`: cliente Prisma inicializado con `DATABASE_URL`.
- `prisma/schema.prisma`: modelo de datos del sistema.

## Requisitos

- Node.js 18+ LTS
- PNPM 8+
- PostgreSQL con una base de datos accesible
- Variables de entorno configuradas

## Configuración

Crear un archivo `.env` en la raíz del proyecto con:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/base_de_datos"
NODE_ENV="development"
```

Prisma utiliza `DATABASE_URL` en `lib/prisma.ts`.

## Instalación y ejecución

```bash
pnpm install
pnpm dev
```

Abrir `http://localhost:3000` en el navegador.

## Scripts disponibles

- `pnpm dev`: servidor de desarrollo.
- `pnpm build`: compilación para producción.
- `pnpm start`: iniciar en producción.
- `pnpm lint`: análisis estático con ESLint.
- `pnpm db:studio`: abrir Prisma Studio.
- `pnpm db:test`: script auxiliar para pruebas de base de datos.

## Endpoints principales (API)

- `POST /api/auth/login`
- `GET/POST /api/persona`, `GET/PUT/DELETE /api/persona/[id]`
- `GET/POST /api/postulante`, `GET/PUT/DELETE /api/postulante/[id]`
- `GET/POST /api/socio`, `GET/PUT/DELETE /api/socio/[id]`
- `GET/POST /api/usuario`, `GET/PUT/DELETE /api/usuario/[id]`
- `GET/POST /api/rol`, `GET/PUT/DELETE /api/rol/[id]`
- `GET/POST /api/usuario_rol`, `GET/PUT/DELETE /api/usuario_rol/[id_usuario]/[id_rol]`
- `GET/POST /api/documento_pago`, `GET/PUT/DELETE /api/documento_pago/[id]`

La semántica exacta de cada endpoint se define en sus respectivos `route.ts`.
 
## Directorios clave

- `app/estado_cuenta`: páginas para visualizar, pagar y emitir recibos de documentos.
- `components/estado_cuenta`: `AccountTable`, `SummaryCards`.
- `components/pagar`: `PaymentForm`, `PaymentSummary`.
- `components/receipt`: `PaymentReceipt`.
- `components/auth`: `LoginForm`.
- `components/ui`: componentes básicos (`Button`, `Card`, `Input`).

## Base de datos y Prisma

- Definir el esquema en `prisma/schema.prisma`.
- Generar y sincronizar el cliente y el esquema:
  ```bash
  pnpm exec prisma generate
  pnpm exec prisma db push
  # o, usando migraciones:
  pnpm exec prisma migrate dev --name init
  ```
- Explorar datos con Prisma Studio:
  ```bash
  pnpm db:studio
  ```

## Calidad y buenas prácticas

- Ejecutar `pnpm lint` antes de subir cambios.
- Mantener las credenciales fuera del repositorio y usar `.env`.
- No registrar datos sensibles en logs.

## Despliegue

- Construir con `pnpm build` y ejecutar `pnpm start`.
- Compatibilidad con plataformas como Vercel. Revisar la documentación de Next.js para despliegue en producción.

## Licencia

Proyecto privado del Club Náutico. Uso interno.
