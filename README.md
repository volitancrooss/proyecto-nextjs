# Portfolio y Gestor de Proyectos - Volitancrooss

¡Hola! Este es el repositorio de mi portafolio personal y panel de gestión. Básicamente, es una aplicación web `Full Stack` donde muestro quién soy y qué hago, pero también incluye una sección privada (Dashboard) totalmente funcional para administrar mis propios proyectos desde dentro.

## ¿De qué va el proyecto?

La aplicación tiene dos caras:

1.  **La parte pública:** Es mi carta de presentación al mundo. Aquí cuento mi experiencia, muestro los proyectos que he realizado y ofrezco formas de contacto. El diseño está pensado para ser limpio, moderno y con una estética "dark" que personalmente me encanta.

2.  **Dashboard Privado:** Este es mi centro de proyectos. Detrás de un login seguro, tengo un panel de control donde puedo:
    *   Ver estadísticas de mis proyectos en tiempo real.
    *   Crear nuevos proyectos definiendo su estado, categoría y progreso.
    *   Gestionar el estado de cada desarrollo (Activo, Pausado, Completado).
    *   Todo esto protegido mediante autenticación.

## Tecnologías que he usado

He utilizado un stack moderno centrado en rendimiento y escalabilidad:

*   **Next.js (App Router):** El núcleo de la aplicación. Aprovechando las últimas características de React para un renderizado rápido y eficiente.
*   **Tailwind CSS:** Para todo el estilizado. Me permite iterar rápido y crear diseños responsivos y bonitos sin pelearme con hojas de estilo gigantes.
*   **Firebase:**
    *   **Authentication:** Gestiona todo el sistema de usuarios (Login/Registro/Logout) y la protección de rutas privadas.
*   **Lucide React:** Para toda la iconografía de la interfaz.

## Funcionalidades Destacadas

*   ⚡ **Diseño Responsivo:** Se ve genial tanto en móvil como en escritorio.
*   🔒 **Rutas Protegidas:** Si intentas entrar a `/dashboard` sin loguearte, te mando al login. Seguridad ante todo.
*   📊 **Gestión de Estado:** El dashboard maneja el estado de la aplicación de forma fluida, con actualizaciones instantáneas al crear o borrar proyectos.
*   🎨 **UI/UX cuidada:** Uso de gradientes y transiciones suaves para una mejor experiencia de usuario.

## Cómo probarlo en local

Si quieres bajarte el codigo y probar:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/volitancrooss/portfolio-nextjs.git
    cd portfolio-nextjs
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura Firebase:**
    Necesitarás tus propias credenciales. Crea un archivo `.env.local` en la raíz y añade esto:
    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
    ```

4.  **Arranca el servidor en modo developer:**
    ```bash
    npm run dev
    ```
5. **Ponerlo en Producción:**
    ```bash
    npm run build
    ```

¡Y listo! Abre `http://localhost:3000` y deberías verlo funcionando.

---
Desarrollado con amor por **Alexander** para **Squaads**.
