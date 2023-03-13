import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
} from "@chakra-ui/react"

export default function ProjectCard({
  title,
  techStack,
  description,
  githubLink,
  imageAsset,
  id,
}) {
  const router = useRouter()
  console.log(imageAsset)
  return (
    <Center py={6}>
      <Box
        h={"500px"}
        w={"500px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={imageAsset} layout={"fill"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {techStack}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>{description}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Button onClick={() => router.push(`projects/${id}`)}>
            View Project
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}
