// Referencias a elementos del DOM
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const recordCount = document.getElementById('recordCount');
const csvFileName = document.getElementById('csvFileName');
const convertBtn = document.getElementById('convertBtn');
const status = document.getElementById('status');

let jsonData = null;

// Configurar eventos
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
convertBtn.addEventListener('click', convertToCSV);

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

// Prevenir comportamiento por defecto en toda la ventana
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => e.preventDefault());

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation(); // Evitar que suba al window
  uploadArea.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
});

// Manejar selección de archivo
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
}

// Procesar archivo
function handleFile(file) {
  if (!file.name.endsWith('.json')) {
    showStatus('Por favor, selecciona un archivo JSON válido', 'error');
    return;
  }

  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      jsonData = JSON.parse(content);
      
      // Verificar que sea un array
      if (!Array.isArray(jsonData)) {
        showStatus('El JSON debe contener un array de objetos', 'error');
        jsonData = null;
        return;
      }
      
      if (jsonData.length === 0) {
        showStatus('El array JSON está vacío', 'error');
        jsonData = null;
        return;
      }
      
      // Mostrar información del archivo
      fileName.textContent = file.name;
      recordCount.textContent = jsonData.length;
      fileInfo.style.display = 'block';
      convertBtn.disabled = false;
      
      // Sugerir nombre de archivo
      const suggestedName = file.name.replace('.json', '.csv');
      csvFileName.value = suggestedName;
      
      hideStatus();
      
    } catch (error) {
      showStatus('Error al leer el archivo JSON: ' + error.message, 'error');
      jsonData = null;
    }
  };
  
  reader.onerror = () => {
    showStatus('Error al leer el archivo', 'error');
    jsonData = null;
  };
  
  reader.readAsText(file);
}

// Convertir JSON a CSV
function convertToCSV() {
  if (!jsonData || jsonData.length === 0) {
    showStatus('No hay datos para convertir', 'error');
    return;
  }
  
  try {
    // Obtener todas las claves únicas del array de objetos
    const headers = getAllKeys(jsonData);
    
    // Crear el CSV
    let csv = headers.join(',') + '\n';
    
    // Procesar cada fila
    jsonData.forEach(obj => {
      const row = headers.map(header => {
        const value = getNestedValue(obj, header);
        return formatCSVValue(value);
      });
      csv += row.join(',') + '\n';
    });
    
    // Descargar el archivo
    downloadCSV(csv);
    
  } catch (error) {
    showStatus('Error al convertir: ' + error.message, 'error');
  }
}

// Obtener todas las claves únicas del array
function getAllKeys(array) {
  const keysSet = new Set();
  
  array.forEach(obj => {
    Object.keys(obj).forEach(key => keysSet.add(key));
  });
  
  return Array.from(keysSet);
}

// Obtener valor anidado por clave
function getNestedValue(obj, key) {
  return obj[key];
}

// Formatear valor para CSV
function formatCSVValue(value) {
  // Si el valor es undefined o null, retornar cadena vacía
  if (value === undefined || value === null) {
    return '""';
  }
  
  // Si el valor es un objeto o array, convertirlo a JSON string
  if (typeof value === 'object') {
    const jsonString = JSON.stringify(value);
    // Escapar comillas dobles duplicándolas
    const escaped = jsonString.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  
  // Si es un string que contiene comas, saltos de línea o comillas
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
    const escaped = stringValue.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  
  // Retornar el valor como string
  return stringValue;
}

// Descargar archivo CSV
function downloadCSV(csvContent) {
  const outputFileName = csvFileName.value.trim() || 'output.csv';
  
  // Crear blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Crear URL temporal
  const url = URL.createObjectURL(blob);
  
  // Crear elemento de descarga temporal
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', outputFileName);
  link.style.display = 'none';
  
  // Agregar al DOM, hacer clic y remover
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Limpiar URL temporal
  URL.revokeObjectURL(url);
  
  showStatus('¡CSV descargado exitosamente!', 'success');
}

// Mostrar mensaje de estado
function showStatus(message, type) {
  status.textContent = message;
  status.className = 'status ' + type;
  status.style.display = 'block';
}

// Ocultar mensaje de estado
function hideStatus() {
  status.style.display = 'none';
}
