const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Se necessário
      nodeIntegration: true,
      contextIsolation: false, // Ative isto com cuidado
    },
  });

  // Carrega seu projeto (index.html)
  mainWindow.loadFile('index.html');

  // Abre as ferramentas de desenvolvedor (opcional)
  // mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
