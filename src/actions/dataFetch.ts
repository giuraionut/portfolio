// components/SkillsSection/skillsData.ts
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';


export async function getPersonalInfo() {
    const full = await prisma.personalInfo.findFirst({
        include: {
            sections: true,
            projects: { include: { skills: true } },
            socialLinks: true,
            skills: true,
        },
    });
    if (!full) notFound();

    // split off relations
    const { sections, projects, socialLinks, skills, ...profile } = full;
    return { profile: { ...profile, sections }, projects, socialLinks, skills };
}


export async function getSkillsSectionData() {
    const { profile, skills } = await getPersonalInfo();
    const skillsSection = profile.sections.find(s => s.sectionType === 'SKILLS');
    if (!skillsSection) notFound();
    return { content: skillsSection, skills };
}

export async function getProjectsSectionData() {
    const { profile, projects } = await getPersonalInfo();
    const projectsSection = profile.sections.find(s => s.sectionType === 'PROJECTS');
    if (!projectsSection) notFound();
    return { content: projectsSection, projects };
}

export async function getContactSectionData() {
    const { profile, socialLinks } = await getPersonalInfo();
    const contactSection = profile.sections.find(s => s.sectionType === 'CONTACT');
    if (!contactSection) notFound();
    return { content: contactSection, socialLinks };
}

export async function getHeroSectionData() {
    const { profile, skills, socialLinks } = await getPersonalInfo();
    const heroSection = profile.sections.find(s => s.sectionType === 'HERO');
    if (!heroSection) notFound();
    return {
        name: profile.name,
        avatarUrl: profile.avatarUrl ?? '',
        content: heroSection,
        keywords: skills.map(s => s.name),
        socialLinks,
    };
}

export async function getAboutSectionData() {
    const { profile } = await getPersonalInfo();
    const aboutSection = profile.sections.find(s => s.sectionType === 'ABOUT');
    if (!aboutSection) notFound();
    return { content: aboutSection, personalInfo: profile };
}