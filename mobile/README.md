# Plataforma de Fidelización - Mobile App

Una aplicación móvil desarrollada con React Native, Expo y Tailwind CSS para la gestión de programas de fidelización.

## 🚀 Tecnologías Utilizadas

- **React Native** - Framework de desarrollo móvil multiplataforma
- **Expo** - Plataforma de desarrollo para React Native
- **Tailwind CSS v3.3.0** - Framework de utilidades CSS (versión estable)
- **NativeWind v2.0.11** - Implementación de Tailwind CSS para React Native (versión estable)
- **React Native Reanimated** - Librería de animaciones
- **React Native Safe Area Context** - Manejo de áreas seguras

## 📋 Requisitos Previos

Antes de instalar, asegúrate de tener:

- **Node.js** v18+ instalado
- **npm** o **yarn** como gestor de paquetes
- **Expo CLI** instalado globalmente:
  ```bash
  npm install -g @expo/cli
  ```

## 🛠️ Instalación

### 1. Navegar al directorio mobile
```bash
cd mobile/
```

### 2. Instalar dependencias principales
```bash
npm install
```

### 3. Instalar Tailwind CSS y NativeWind (versiones estables)
```bash
npm install --save-dev tailwindcss@3.3.0 nativewind@2.0.11
```

### 4. Instalar dependencias adicionales requeridas
```bash
npm install react-native-safe-area-context react-native-reanimated expo-linear-gradient
```

### 5. Generar configuración de Tailwind
```bash
npx tailwindcss init
```

> **Nota**: Los archivos `babel.config.js`, `tailwind.config.js` y `metro.config.js` ya están configurados correctamente para las versiones estables.

## ▶️ Comandos de Ejecución

### Desarrollo
```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web
```

### Producción
```bash
# Build para producción
npm run build
```

## ⚙️ Configuración de Tailwind

El proyecto utiliza **versiones estables compatibles**:
- **Tailwind CSS**: `v3.3.0`
- **NativeWind**: `v2.0.11`

### Archivos de configuración importantes:

#### `babel.config.js`
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel", "react-native-reanimated/plugin"],
  };
};
```

#### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📁 Estructura del Proyecto

```
mobile/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── screens/        # Pantallas de la aplicación
│   ├── services/       # Servicios para API calls
│   ├── utils/          # Utilidades y funciones helper
│   └── constants/      # Constantes de la aplicación
├── assets/             # Imágenes, iconos y recursos
├── App.js              # Componente principal
├── app.json            # Configuración de Expo
├── babel.config.js     # Configuración de Babel
├── metro.config.js     # Configuración de Metro bundler
├── tailwind.config.js  # Configuración de Tailwind CSS
├── package.json        # Dependencias y scripts
└── .gitignore          # Archivos ignorados por Git
```

## 📝 Gestión de Dependencias

### ¿Por qué no se incluyen las dependencias en Git?

Este proyecto utiliza un `.gitignore` que **excluye** las siguientes carpetas y archivos:

- `node_modules/` - Dependencias npm/yarn
- `.expo/` - Archivos temporales de Expo
- `*.log` - Archivos de log
- Archivos de configuración específicos del sistema

**Esto significa** que cuando clones el repositorio, necesitas instalar las dependencias manualmente.

### Primera vez configurando el proyecto

Si es la **primera vez** que trabajas con este proyecto después de clonarlo:

```bash
# 1. Navegar al directorio mobile
cd mobile/

# 2. Instalar todas las dependencias principales
npm install

# 3. Instalar versiones específicas de Tailwind (ya configuradas en package.json)
# No necesitas ejecutar nada adicional, npm install ya instaló todo

# 4. Verificar la instalación
npm list tailwindcss nativewind
```

### Comandos de Verificación

```bash
# Verificar que las versiones correctas estén instaladas
npm list tailwindcss nativewind

# Deberías ver:
# ├── tailwindcss@3.3.0
# └── nativewind@2.0.11
```

## ⚠️ Solución de Problemas Comunes

### Error: "nativewind/babel plugin not found"
```bash
# Reinstalar dependencias de desarrollo
npm install --save-dev tailwindcss@3.3.0 nativewind@2.0.11
```

### Error: "Metro bundler issues"
```bash
# Limpiar cache de Metro
npm start -- --clear
```

### Error: "React Native Reanimated"
```bash
# Reinstalar react-native-reanimated
npm install react-native-reanimated
```

### Versiones Incompatibles
Si tienes problemas con versiones más recientes, **mantén las versiones estables**:
- Tailwind CSS: `3.3.0`
- NativeWind: `2.0.11`

Estas versiones están probadas y funcionan correctamente juntas.

## � Flujo de Desarrollo para Nuevos Desarrolladores

1. **Clonar el repositorio principal**
2. **Navegar a mobile/**: `cd mobile/`
3. **Instalar dependencias**: `npm install`
4. **Iniciar desarrollo**: `npm start`
5. **Elegir plataforma**: Android, iOS o Web

## 📚 Recursos y Documentación

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [NativeWind v2 Docs](https://www.nativewind.dev/v2)
- [Tailwind CSS v3 Docs](https://tailwindcss.com/docs)

---

**Nota**: Las dependencias (`node_modules/`) no se incluyen en el repositorio para mantenerlo ligero. Siempre ejecuta `npm install` después de clonar.