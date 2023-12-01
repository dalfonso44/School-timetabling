import { app, BrowserWindow, nativeTheme, nativeImage } from 'electron';
import { initialize, enable } from '@electron/remote/main';
import path from 'path';
import os from 'os';

initialize();

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  console.log(
    " path.resolve(__dirname, 'icons/icon.ico') ",
    path.resolve(__dirname, 'icons/icon.ico')
  );
  mainWindow = new BrowserWindow({
    icon: nativeImage.createFromPath(path.resolve(__dirname, 'icons/icon.png')), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    // skipTaskbar: true,
    // maximizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  });
  // mainWindow.setThumbarButtons([
  //   {
  //     // icon: nativeImage.createFromPath(path.join(__dirname, 'icons/icon.png')),
  //     click() {
  //       console.log('button1 clicked');
  //     }
  //   }
  // ]);

  enable(mainWindow.webContents);

  mainWindow.loadURL(process.env.APP_URL);
  mainWindow.maximize();

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
