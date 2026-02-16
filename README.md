# JSON to CSV Converter - Extensión de Chrome

Esta extensión te permite convertir archivos JSON (arrays de objetos) a formato CSV de manera rápida y sencilla.

## 📋 Características

- ✅ Convierte arrays de objetos JSON a CSV
- ✅ Maneja objetos anidados (los convierte a JSON strings escapados)
- ✅ Interfaz de usuario intuitiva con drag & drop
- ✅ Descarga automática del archivo CSV
- ✅ Personaliza el nombre del archivo de salida

## 🚀 Instalación

### Chrome / Edge / Brave

1. Descarga o clona este repositorio
2. Abre tu navegador y ve a:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
3. Activa el "Modo de desarrollador" (toggle en la esquina superior derecha)
4. Haz clic en "Cargar extensión sin empaquetar"
5. Selecciona la carpeta `json-to-csv-extension`
6. ¡Listo! La extensión aparecerá en tu barra de herramientas

## 💡 Uso

1. Haz clic en el icono de la extensión en tu navegador
2. Arrastra tu archivo JSON o haz clic para seleccionarlo
3. (Opcional) Cambia el nombre del archivo CSV de salida
4. Haz clic en "Convertir a CSV"
5. El archivo se descargará automáticamente

## 📝 Formato de Entrada

La extensión espera un archivo JSON con un array de objetos:

```json
[
  {
    "origin": {"url": "https://example.com"},
    "store": {"countryCode": "BR", "extra": {"currency": "BRL"}}
  },
  {
    "origin": {"url": "https://another.com"},
    "store": {"countryCode": "US", "extra": {"currency": "USD"}}
  }
]
```

## 📤 Formato de Salida

Los objetos anidados se convierten a JSON strings escapados, como en tu ejemplo:

```csv
origin,store
"{""url"":""https://example.com""}","{""countryCode"":""BR"",""extra"":{""currency"":""BRL""}}"
"{""url"":""https://another.com""}","{""countryCode"":""US"",""extra"":{""currency"":""USD""}}"
```

## 🛠️ Archivos del Proyecto

```
json-to-csv-extension/
├── manifest.json      # Configuración de la extensión
├── popup.html         # Interfaz de usuario
├── popup.js           # Lógica de conversión
├── styles.css         # Estilos
├── images/icon.png    # Icono
└── README.md          # Este archivo
```

## 🔧 Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla)
- Chrome Extension Manifest V3

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún bug o tienes alguna sugerencia, por favor abre un issue.

---

Hecho con ❤️ para facilitar la conversión de JSON a CSV
