# Publicar el blog en GitHub Pages

Guía para personalizar el blog, añadir entradas y desplegar automáticamente en GitHub Pages.

---

## 1. Personalizar el blog

### Título y descripción del sitio

Edita **`src/consts.ts`**:

```ts
export const SITE_TITLE = 'Tu nombre o título del blog';
export const SITE_DESCRIPTION = 'Una breve descripción para buscadores y redes sociales.';
```

Estos valores se usan en la portada, en el listado del blog y en las etiquetas `<title>` y meta description.

### Página de inicio

- **`src/pages/index.astro`** — Contenido de la página principal (tu “home”).
- Puedes cambiar textos, enlaces y secciones a tu gusto.

### Página “Sobre” y “Contacto”

- **`src/pages/about.astro`** — Página “Sobre mí” o “Sobre el blog”.
- **`src/pages/contact.astro`** — Página de contacto (incluye integración con Fabform si la usas).

### Cabecera y pie

- **`src/components/Header.astro`** — Menú y enlaces del header.
- **`src/components/Footer.astro`** — Pie de página.

### Diseño de cada entrada

- **`src/layouts/BlogPost.astro`** — Layout de una entrada (título, fecha, imagen, cuerpo del post).

### URL del sitio (importante para GitHub Pages)

En **`astro.config.mjs`** debes dejar configurado tu usuario y repositorio:

```js
site: 'https://TU_USUARIO.github.io',
base: '/NOMBRE_DEL_REPO',
```

- Si tu repo se llama `blog`, usa `base: '/blog'`.
- La URL final del blog será: `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

---

## 2. Dónde agregar tus entradas (posts)

Todas las entradas del blog van en:

**`src/content/blog/`**

Cada entrada es un archivo **Markdown** (`.md`) o **MDX** (`.mdx`).

### Estructura de un post

Al inicio del archivo va el **frontmatter** (entre `---`). Luego el contenido en Markdown.

Ejemplo **`src/content/blog/mi-primera-entrada.md`**:

```md
---
title: "Título del post"
description: "Breve descripción para el listado y SEO."
pubDate: "2026-03-03"
updatedDate: "2026-03-04"
heroImage: "../../assets/mi-imagen.jpg"
---

Aquí va el contenido en **Markdown**. Puedes usar encabezados, listas, enlaces, etc.
```

### Campos del frontmatter

| Campo          | Obligatorio | Descripción |
|----------------|-------------|-------------|
| `title`        | Sí          | Título del post. |
| `description`  | Sí          | Resumen; se usa en el listado y en meta. |
| `pubDate`      | Sí          | Fecha de publicación (ej. `"2026-03-03"` o `"Mar 3 2026"`). |
| `updatedDate`  | No          | Fecha de última actualización. |
| `heroImage`    | No          | Imagen destacada; ruta relativa a la carpeta del contenido o desde `src/assets`. |

### Orden de los posts

El listado del blog ordena por **fecha de publicación** (más recientes primero). No hace falta tocar nada más: al añadir un nuevo `.md` o `.mdx` en `src/content/blog/`, aparecerá automáticamente en la lista y tendrá su página en `/blog/nombre-del-archivo/`.

### Imágenes en las entradas

- Puedes poner imágenes en **`src/assets/`** y referenciarlas en `heroImage` (por ejemplo `../../assets/mi-foto.jpg`).
- También puedes usar imágenes en el propio Markdown del cuerpo del post.

---

## 3. Flujo automático: commit → re-renderizado en GitHub Pages

Cada vez que haces **push a la rama `main`**, GitHub Actions:

1. Instala dependencias (`npm ci`).
2. Ejecuta **`npm run build`** (Astro genera el sitio estático incluyendo todos los `.md`/`.mdx` de `src/content/blog/`).
3. Sube el resultado y lo publica en GitHub Pages.

Por tanto:

- **Añades un nuevo archivo** (por ejemplo `src/content/blog/nuevo-post.md`).
- **Haces commit y push** a `main`.
- El workflow **`.github/workflows/deploy.yml`** se ejecuta y **vuelve a renderizar todo el sitio** con el post nuevo.
- En unos minutos el cambio se ve en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

No hace falta hacer nada más: no hay “publicar” aparte del push.

### Activar GitHub Pages en el repo

1. En GitHub: **Settings** del repositorio → **Pages**.
2. En **Build and deployment**:
   - **Source**: elige **GitHub Actions** (no “Deploy from a branch”).
3. Guarda. La primera vez que el workflow termine correctamente, la web quedará publicada.

### Comprobar que el deploy funciona

- Pestaña **Actions** del repo: verás el workflow “Deploy to GitHub Pages” en cada push a `main`.
- Si falla, abre la ejecución y revisa los logs del job **build** o **deploy**.

---

## Resumen rápido

| Qué quieres hacer        | Dónde / Cómo |
|--------------------------|--------------|
| Cambiar título/descripción del sitio | `src/consts.ts` |
| Cambiar portada          | `src/pages/index.astro` |
| Añadir o editar una entrada | Nuevo o editar `.md`/`.mdx` en `src/content/blog/` |
| Que el sitio se actualice en GitHub Pages | Hacer commit y push a `main` (el workflow hace el build y deploy). |
| Configurar la URL del blog | `astro.config.mjs` → `site` y `base` con tu usuario y nombre del repo. |
