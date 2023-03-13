import React from "react"
import { db } from "../../lib/firebase"
import { collection, getDocs, getDoc, doc } from "firebase/firestore"
import { Box, Container, Grid, Image, Link, Text } from "@chakra-ui/react"

export default function IndivisualProject({ project }) {
  return (
    <Box bg="white.900">
      <Container maxW="container.lg" py={8}>
        <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} gap={20}>
          <Image src={project.imageAsset} alt={project.title} />
          <Box>
            <Text
              fontSize={{ sm: "3xl", md: "4xl" }}
              fontWeight="extrabold"
              mb={{ sm: 4, md: 8 }}
              lineHeight="shorter"
              textShadow="2px 2px #007aff"
              color="black"
            >
              {/* {title} */}
              {project.title}
            </Text>
            <Text fontSize="xl" mb={4} color="black">
              {/* {description} */}
              {project.description}
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2} color="black">
              Tech stack used:
            </Text>
            <Text fontSize="lg" mb={4} color="black">
              {/* {techStack} */}
              {project.techStack}
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2} color="black">
              GitHub link:
            </Text>
            <Link href={project.githubLink} isExternal>
              <Text fontSize="lg" mb={4} color="black">
                {project.githubLink}
              </Text>
            </Link>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

export const getStaticPaths = async () => {
  const ProjectCollectionRef = collection(db, "projects")
  const data = await getDocs(ProjectCollectionRef)
  const paths = data.docs.map((doc) => ({
    params: { id: doc.id },
  }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const docRef = doc(db, "projects", id)
  const docSnap = await getDoc(docRef)
  const project = docSnap.data()
  if (project.length !== 0) {
    return {
      props: {
        project,
      },
      revalidate: 5,
    }
  } else {
    return {
      notFound: true,
    }
  }
}
