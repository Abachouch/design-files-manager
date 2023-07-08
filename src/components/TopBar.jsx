import React from "react"

import { CgSearch  } from "react-icons/cg";

export default function TopBar({selectedFolder} ){
    return (
        <header className="my-4 flex ">
            <h2 className="text-gray-400" > {selectedFolder.folderName || '' } </h2>
        </header>
    )
}