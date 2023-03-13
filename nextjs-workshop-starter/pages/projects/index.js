import React, { useState, useEffect } from "react"
import { db } from "../../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { SimpleGrid, Box, Text, Center } from "@chakra-ui/react"
import ProjectCard from "../../components/ProjectCard"

export default function Project({ projects }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
      {projects.map((project) => (
        <Box m={2} p={{ sm: 3 }}>
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            techStack={project.techStack}
            description={project.description}
            githubLink={project.githubLink}
            imageAsset={project.imageAsset}
          />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export async function getStaticProps() {
  const ProjectCollectionRef = collection(db, "projects")
  const data = await getDocs(ProjectCollectionRef)
  const projects = data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return {
    props: {
      projects,
    },
    revalidate: 5,
  }
}
