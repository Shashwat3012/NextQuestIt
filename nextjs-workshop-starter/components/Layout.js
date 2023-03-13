import { Box } from "@chakra-ui/react"
import Head from "next/head"
import Navbar from "./Navbar"
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Project Showcase</title>
      </Head>
      <Box m="auto">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </Box>
    </>
  )
}
