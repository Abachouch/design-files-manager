module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {

        colors: {
            gray : {
                // light
                100 :"#F3F3F3" ,
                200 :"#E8E8E8" ,
                300 :"#DEDEDE" ,
                400 :"#ACACAC" ,
                // dark
                800 :"#363636" ,
                900 :"#2D2D2D" ,
            },
            white : "#ffffff" ,
            black : "#000000" , 

            blue :{
                100 : "#49548B",
                900 : "#232A4E"
            } ,


            transparent : "transparent" ,
            current : "current"
        }
        ,

        extend: {
            
        },
    },
    plugins: [],
};