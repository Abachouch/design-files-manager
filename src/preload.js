const { contextBridge, ipcMain, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('api'  , {
    getFolders : ()=> ipcRenderer.invoke('getFolders') ,
    addFolder : ()=> ipcRenderer.invoke('addFolder') ,
    getFilesFromFolder  : (folderPath)=> ipcRenderer.invoke('getFilesFromFolder' , folderPath) ,
    getFileThumbnail : (filePath) => ipcRenderer.invoke('getFileThumbnail' , filePath)
})