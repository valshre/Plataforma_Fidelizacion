# Plataforma de Fidelización - Mobile App

Una aplicación móvil desarrollada con React Native, Expo y Tailwind CSS para la gestión de programas de fidelización.

## 🚀 Tecnologías Utilizadas

- **React Native** - Framework de desarrollo móvil multiplataforma
- **Expo** - Plataforma de desarrollo para React Native
- **NativeWind** - Implementación de Tailwind CSS para React Native
- **Tailwind CSS** - Framework de utilidades CSS

## 📁 Estructura del Proyecto

```
mobile/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── screens/        # Pantallas de la aplicación
│   ├── services/       # Servicios para API calls
│   ├── utils/          # Utilidades y funciones helper
│   └── constants/      # Constantes de la aplicación
├── assets/             # Recursos estáticos (imágenes, fuentes, etc.)
├── App.js              # Componente principal
├── app.json            # Configuración de Expo
├── babel.config.js     # Configuración de Babel
├── metro.config.js     # Configuración de Metro bundler
├── tailwind.config.js  # Configuración de Tailwind CSS
└── global.css          # Estilos globales de Tailwind
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI (se instala automáticamente con npx)

### Pasos de Instalación

1. **Navegar al directorio mobile:**
   ```bash
   cd mobile
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```

4. **Ejecutar en diferentes plataformas:**
   - Android: `npm run android`
   - iOS: `npm run ios` (requiere macOS)
   - Web: `npm run web`

## 📱 Desarrollo

### Comandos Disponibles

- `npm start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Ejecuta la app en un emulador/dispositivo Android
- `npm run ios` - Ejecuta la app en un simulador/dispositivo iOS
- `npm run web` - Ejecuta la app en el navegador web

### Usando Tailwind CSS

Este proyecto usa **NativeWind** para implementar Tailwind CSS en React Native. Puedes usar las clases de Tailwind directamente en tus componentes:

```jsx
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 bg-blue-500 items-center justify-center">
      <Text className="text-white text-lg font-bold">
        ¡Hola Mundo!
      </Text>
    </View>
  );
}
```

### Componentes de Ejemplo

El proyecto incluye componentes de ejemplo en `src/components/`:

- **Card**: Componente de tarjeta reutilizable con diferentes variantes
- Más componentes se pueden agregar según las necesidades del proyecto

## 🎨 Personalización

### Colores y Tema

Los colores del tema se pueden personalizar en:
- `src/constants/index.js` - Constantes de colores
- `tailwind.config.js` - Configuración extendida de Tailwind

### Agregando Nuevos Componentes

1. Crear el archivo del componente en `src/components/`
2. Usar las clases de Tailwind para el diseño
3. Exportar el componente desde `src/components/index.js`

## 🔧 Configuración de NativeWind

El proyecto está configurado con:

- **tailwind.config.js**: Configuración de rutas de contenido y preset de NativeWind
- **babel.config.js**: Plugin de NativeWind para transformación de clases
- **metro.config.js**: Configuración de Metro con soporte para NativeWind
- **global.css**: Importación de directivas base de Tailwind

## 📚 Recursos Útiles

- [Documentación de React Native](https://reactnative.dev/)
- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de NativeWind](https://www.nativewind.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)

## 🚀 Próximos Pasos

1. Implementar navegación con React Navigation
2. Conectar con la API del backend
3. Agregar funcionalidades específicas de fidelización
4. Implementar autenticación de usuarios
5. Configurar notificaciones push

---

**Nota**: Este proyecto está configurado con las versiones más recientes de todas las dependencias para evitar problemas de compatibilidad.