import React, { useState } from "react";

import TopBar from "./components/TopBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Content from "./components/Content.jsx";

export function Index() {

    const [selectedFolder, selectFolder] = useState({})

    return (
        <>
            <SideBar selectFolder={selectFolder} ></SideBar>
            <div className="p-4 grow">
                <TopBar selectedFolder={selectedFolder} ></TopBar>
                <Content selectedFolder={selectedFolder} ></Content>
            </div>
        </>
    )
}   