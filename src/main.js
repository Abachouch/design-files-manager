const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Datastore = require('nedb-promises');
const { copyFileSync } = require('fs');
const { FileHound, create } = require('filehound');
const foldersCollection = Datastore.create(path.join(app.getPath('appData'), 'savedFolders.db'));
const AdmZip = require('adm-zip');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

class FolderResponse {

  _folderName = "";
  _folderPath = "";

  constructor(folderPath) {
    this._folderName = path.basename(folderPath);
    this._folderPath = folderPath;
  }

  toObject() {
    return { folderPath: this._folderPath, folderName: this._folderName }
  }
}







const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();
  //
  ipcMain.handle('getFolders', async () => {
    const folders = await foldersCollection.find({})
    return folders;
  })
  //
  ipcMain.handle('addFolder', async () => {
    const selection = await dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] });
    if (selection.canceled)
      return [];
    const selectedFolders = selection.filePaths.map(se => {
      return {
        folderPath: se,
        folderName: path.basename(se)
      };
    });
    const folders = await foldersCollection.insertMany(selectedFolders);
    return folders;
  })
  //
  ipcMain.handle('getFilesFromFolder', async (event, folderPath) => {
    const files = await create().path(folderPath).ext('xd').find().then()
    return files.map(file => {
      return {
        fileName: path.basename(file),
        filePath: file
      }
    });
  })
  //
  // ipcMain.handle('getFileThumbnail' , async(event , filePath) => {
  //   const zip =new AdmZip(filePath) ;
    
  //   const entry = zip.getEntry('preview.png').getDataAsync((buffer)=> {
    
      
      

  //     if(buffer)
  //      return  buffer.toString('base64');

  //   })
    
  // })



  ipcMain.handle('getFileThumbnail' , async(event , filePath) => {
    const zip =new AdmZip(filePath) ;
    const entry = zip.getEntry('preview.png').getData();
    return entry.toString('base64') ;
    
  })

})