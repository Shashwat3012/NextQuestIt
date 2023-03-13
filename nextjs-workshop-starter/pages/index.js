import Head from "next/head"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
import Hero from "../components/Hero"

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
