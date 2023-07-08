import { ipcMain } from "electron";

const fileThumbnail = {
    img : '' ,
    filePath :'' ,
    fileName :''
}

ipcMain.handle('getThumbnail' , (filePath)=> {
    
})