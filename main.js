const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    },
    fullscreen: true, // Abre la ventana en pantalla completa
    autoHideMenuBar: true // Opcional: oculta la barra de menú
  });

  // Carga la URL inicial de tu sistema.
  win.loadURL('https://softwareparanegociosformosa.com/stock/');

  // Elimina la barra de menú (si no deseas que se muestre, incluso temporalmente)
  win.setMenu(null);

  // Ajusta esta función para permitir navegación solo dentro de tu dominio
  win.webContents.on('will-navigate', function (e, url) {
    if (!url.startsWith('https://softwareparanegociosformosa.com/')) {
      e.preventDefault();
    }
  });

  // Opción para no permitir abrir nuevas ventanas
  win.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
