/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

import { contextBridge } from 'electron';
import { BrowserWindow } from '@electron/remote';

contextBridge.exposeInMainWorld('myWindowAPI', {
  print(name: string, handler: () => void) {
    console.log('hi !!!!!!!', BrowserWindow.getFocusedWindow()?.webContents);
    if (BrowserWindow != null) {
      BrowserWindow.getFocusedWindow()
        ?.webContents.printToPDF({
          printBackground: true,
          pageSize: 'Tabloid',
          margins: {
            marginType: 'none'
          },
          landscape: true
        })
        .then((value) => {
          console.log(value);
          const filename = decodeURI(`${name}.pdf`);
          const url = window.URL.createObjectURL(new Blob([value]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
          handler();
        });
    }
  }
});
