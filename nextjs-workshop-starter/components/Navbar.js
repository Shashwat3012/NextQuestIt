import React, { useState, useEffect } from "react"
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Avatar,
  Link,
} from "@chakra-ui/react"
import { AiOutlineMenu } from "react-icons/ai"
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../lib/firebase"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [loggedin, setLoggedin] = useState()
  const mobileNav = useDisclosure()
  const router = useRouter()
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("isAuth")
    setLoggedin(item)
  }, [])

  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
      localStorage.setItem("isAuth", true)
      setLoggedin(true)
      router.push("/")
    })
  }

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setLoggedin(false)
      router.push("/")
    })
  }
  return (
    <React.Fragment>
      <chakra.header
        bg={"gray.800"}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={6}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              {/* <Logo /> */}
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <Link href="/">
              <chakra.h1
                fontSize="xl"
                fontWeight="medium"
                ml="2"
                color={"white"}
              >
                Project Showcase
              </chakra.h1>
            </Link>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <Link href="/projects">
                <Button colorScheme="brand" size="md">
                  Projects
                </Button>
              </Link>
              {loggedin ? (
                <Link href="/add">
                  <Button colorScheme="brand" size="md">
                    Add Project
                  </Button>
                </Link>
              ) : null}
              {loggedin ? (
                <Button colorScheme="brand" size="md" onClick={logout}>
                  Log Out
                </Button>
              ) : (
                <Button
                  colorScheme="brand"
                  size="md"
                  onClick={SignInWithGoogle}
                >
                  Sign In
                </Button>
              )}
            </HStack>
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
                colors="white"
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={"white"}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Button w="full" colorScheme="brand" variant="ghost">
                  Add Project
                </Button>
                <Button w="full" colorScheme="brand" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  )
}
