import React, { useEffect, useState } from "react";
import { CgTab, CgOptions, CgSearch } from "react-icons/cg";

export default function SideBar( {selectFolder}) {

    const [folders, setFolders] = useState([])

    useEffect(() => {
        async function fetchFolders() {
            setFolders(await window.api.getFolders())
        }
        fetchFolders()
    }, [])

    return (
        <aside className="w-60  flex flex-col border-x-gray-200 border-x border-solid" >
            <header className="p-4 border-b-gray-200 border-b border-solid" >
                <h1 className="text-blue-100 font-semibold mb-1">XD Files</h1>
                <p className="text-gray-400 text-sm font-light" >Organize your XD files with ease</p>
                <div className="inline-flex justify-center my-6 ">
                    <input type="search" placeholder="Search" className="py-1 px-5 rounded-md text-sm font-light text-gray-200" />
                    <button className="-translate-x-6"> <CgSearch className="text-gray-200" /> </button>
                </div>
            </header>
            <ul className="sidebar__list flex-grow flex flex-col p-4 ">
                {
                    folders.map((folder, index) =>
                    (
                        <li key={index} >
                            <button onClick={()=> {

                                selectFolder(folder)
                                // window.api.getFilesFromFolder(folder.folderPath).then( data => {
                                //     console.log(data)
                                // })
                            }} className="hover:text-gray-800 text-gray-400 py-1 text-left text-sm "> {folder.folderName} </button>
                        </li>
                    )
                    )
                }
            </ul>
            <button onClick={() => {
                console.log('oezkok')
                window.api.addFolder().then((newFolders) => {
                    if (newFolders)
                        setFolders([...folders, ...newFolders])
                })
            }} className=" bg-blue-100 mx-4 px-4 py-2 rounded-md  text-white text-sm font-medium">Add Folder</button>
            <button className="text-left text-gray-400  flex items-center px-4 py-1  my-2 "> <CgOptions className="mr-4"></CgOptions> <span className="text-sm" > Settings</span> </button>
        </aside>
    )
}