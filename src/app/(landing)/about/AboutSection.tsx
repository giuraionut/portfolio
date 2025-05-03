import { getAboutSectionData } from '@/actions/dataFetch';
import AboutSectionUI from './AboutSectionUI';

export default async function AboutSection() {
  const { content, personalInfo } = await getAboutSectionData();

  return <AboutSectionUI content={content} personalInfo={personalInfo} />;
}
