import React, { useEffect, useState }  from "react"

export function FileTeaser( {filePath , fileName} ){

    const [thumbnail , setThumbnail] = useState('') ; 
useEffect(()=> {

    async function fetchThumbnail(){
        const thumb = await window.api.getFileThumbnail(filePath) ; 
        if(thumb)
            setThumbnail(thumb) ;

        console.log(thumb)
    }

    fetchThumbnail()

} , [filePath])

    return (
        <figure className="mb-4 ">
            <div className="overflow-hidden h-40 rounded-md shadow-md" >
                <img className="object-cover " src={"data:image/bmp;base64,"+thumbnail}/>
            </div>
            <figcaption className="text-sm mt-3 break-words text-gray-400 "> {fileName} </figcaption>
        </figure>
    )
}