"use client"

import { ThemeProvider } from 'next-themes'


const Provider = ({ children } : any) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default Provider
