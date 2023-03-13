import React from "react"
import AddProjectForm from "../components/AddProjectForm"
import { Box, Center, Heading } from "@chakra-ui/react"

export default function add() {
  return (
    <Box m={4}>
      <Center>
        <Heading>Add Project Now 🚀</Heading>
      </Center>
      <AddProjectForm />
    </Box>
  )
}
