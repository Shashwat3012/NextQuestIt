import React, { useState } from "react"
import {
  Button,
  Box,
  SimpleGrid,
  GridItem,
  chakra,
  Stack,
  Input,
  Textarea,
  FormHelperText,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Center,
} from "@chakra-ui/react"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../lib/firebase"

export default function AddProjectForm() {
  const [title, setTitle] = useState("")
  const [techStack, settechStack] = useState("")
  const [description, setDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [imageAsset, setImageAsset] = useState("")
  const [formdata, setFormData] = useState({
    title: "",
    techStack: "",
    description: "",
    githubLink: "",
    imageAsset: "",
  })
  const router = useRouter()
  const ProjectCollectionRef = collection(db, "projects")
  const uploadImage = (e) => {
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)

    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL)
          console.log("File available at", downloadURL)
        })
      }
    )
  }
  function addProject(e) {
    e.preventDefault()
    const docRef = addDoc(ProjectCollectionRef, {
      title: title,
      techStack: techStack,
      description: description,
      githubLink: `https://github.com/${githubLink}`,
      imageAsset: imageAsset,
    })
    router.push("/projects")
  }

  return (
    <div>
      <Box
        _dark={{
          bg: "#111",
        }}
        p={10}
      >
        <Box w="100">
          <SimpleGrid
            display={{
              base: "initial",
              md: "grid",
            }}
            columns={{
              md: 3,
            }}
            spacing={{
              md: 6,
            }}
          >
            <GridItem
              mt={[5, null, 0]}
              colSpan={{
                md: 2,
              }}
            >
              <chakra.form
                shadow="base"
                rounded={[null, "md"]}
                overflow={{
                  sm: "hidden",
                }}
              >
                <Stack
                  px={4}
                  py={5}
                  bg="white"
                  _dark={{
                    bg: "#141517",
                  }}
                  spacing={6}
                  p={{
                    sm: 6,
                  }}
                >
                  <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Project Name
                      </FormLabel>
                      <Input
                        type="tel"
                        placeholder="Enter suitable Project title"
                        focusBorderColor="brand.400"
                        rounded="md"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                  </SimpleGrid>
                  <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Github Link
                      </FormLabel>
                      <InputGroup size="sm">
                        <InputLeftAddon
                          bg="gray.50"
                          _dark={{
                            bg: "gray.800",
                          }}
                          color="gray.500"
                          rounded="md"
                        >
                          http://github.com/
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          placeholder="SarveshLimaye/buzzpod"
                          focusBorderColor="brand.400"
                          rounded="md"
                          onChange={(e) => setGithubLink(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Tech Stack Used
                      </FormLabel>
                      <Input
                        type="tel"
                        placeholder="Enter tech stack used"
                        focusBorderColor="brand.400"
                        rounded="md"
                        onChange={(e) => settechStack(e.target.value)}
                      />
                    </FormControl>
                  </SimpleGrid>

                  <div>
                    <FormControl id="email" mt={1}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                        placeholder="Enter description of project"
                      >
                        Description
                      </FormLabel>
                      <Textarea
                        placeholder=" Ex - This is a decentralized voting platform .."
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                          sm: "sm",
                        }}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <FormHelperText>
                        Brief description for your project
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <FormLabel
                    fontSize="md"
                    fontWeight="lg"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                    width="50%"
                  >
                    Upload cover image
                  </FormLabel>

                  <input type="file" onChange={uploadImage} />
                </Stack>
                <Box
                  px={{
                    base: 4,
                    sm: 6,
                  }}
                  py={3}
                  _dark={{
                    bg: "#121212",
                  }}
                  textAlign="right"
                >
                  <Button
                    type="submit"
                    bg="gray.800"
                    color="white"
                    fontWeight="md"
                    onClick={addProject}
                  >
                    Submit
                  </Button>
                </Box>
              </chakra.form>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </div>
  )
}