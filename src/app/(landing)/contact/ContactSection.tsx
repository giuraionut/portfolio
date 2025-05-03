import { getContactSectionData } from '@/actions/dataFetch';
import ContactSectionUI from './ContactSectionUI';

export default async function ContactSection() {
  const { content, socialLinks } = await getContactSectionData();

  return <ContactSectionUI content={content} socialLinks={socialLinks} />;
}
