import { getHeroSectionData } from '@/actions/dataFetch';
import HeroSectionUI from './HeroSectionUI';

export default async function HeroSection() {
  const { content, name, avatarUrl, keywords, socialLinks } =
    await getHeroSectionData();

  return (
    <HeroSectionUI
      name={name}
      avatarUrl={avatarUrl}
      content={content}
      keywords={keywords}
      socialLinks={socialLinks}
    />
  );
}
