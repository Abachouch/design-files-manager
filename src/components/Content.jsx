import React, { useEffect, useState } from "react";
import {FileTeaser} from './FileTeaser.jsx' ;
export default function Content( {selectedFolder}){

    const [files , setFiles] = useState([])  ;
    useEffect(()=> {
        async function fetchFiles() {
            const folderFiles = await window.api.getFilesFromFolder(selectedFolder.folderPath)  ; 
            console.log(folderFiles)
            if(folderFiles)
                setFiles(folderFiles)  
        }
        if(selectedFolder.folderPath)
        fetchFiles()
    } , [selectedFolder])
    return(
        <main className="overflow-auto" >
            <ul className="grid grid-cols-3 m-auto gap-6">
                {
                    files.map(
                        (file , index) => (
                            <li key={index} >
                                <FileTeaser fileName={file.fileName} filePath={file.filePath} ></FileTeaser>
                            </li>
                        )
                    )
                }
            </ul>
        </main>
    )
}