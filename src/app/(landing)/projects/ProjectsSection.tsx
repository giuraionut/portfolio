import { getProjectsSectionData } from '@/actions/dataFetch';
import ProjectsSectionUI from './ProjectsSectionUI';

export default async function ProjectsSection() {
  const { content, projects } = await getProjectsSectionData();

  return <ProjectsSectionUI content={content} projects={projects} />;
}
