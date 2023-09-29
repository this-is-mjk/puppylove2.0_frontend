"use client"
import { BsFillSunFill, BsMoonFill } from "react-icons/bs"
import { useTheme } from 'next-themes'
import "../app/globals.css"


const ThemeButton = () => {

    const { theme, setTheme } = useTheme();
    return (
        <div className='theme-icon'>
            {theme == "dark" ? (<BsMoonFill size={20} onClick={() => setTheme("light")} />) :
                (<BsFillSunFill size={20} onClick={() => setTheme("dark")} />)}

        </div>
    )
}

export default ThemeButton;
