import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link' // Import the Link component

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* Your page content goes here */}
      
      {/* Add a button that links to the /login page */}
      <Link href="/login" /*className = {styles.something} */>
          Go to Login
      </Link> 
    </>
  )
}
