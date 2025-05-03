import { getSkillsSectionData } from '@/actions/dataFetch';
import SkillsSectionUI from './SkillsSectionUI';

export default async function SkillsSection() {
  const { content, skills } = await getSkillsSectionData();

  return <SkillsSectionUI content={content} skills={skills} />;
}
