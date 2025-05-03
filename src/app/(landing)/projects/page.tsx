import { getPersonalInfo } from '@/actions/dataFetch';
import ProjectCard from '@/app/components/ProjectCard';
import React from 'react';

const ProjectsPage = async () => {
  const { projects } = await getPersonalInfo();
  return projects.map((project) => (
    <ProjectCard key={project.id} project={project} cardStyle='compact' />
  ));
};

export default ProjectsPage;
