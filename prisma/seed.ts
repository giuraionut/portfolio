// prisma/seed.ts

import { PrismaClient, Project, SkillCategory } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Predefined skills with category, website, and brand color.
 */
const SKILLS = [
  { name: 'TypeScript', category: SkillCategory.FRONTEND, website: 'https://www.typescriptlang.org/', color: '#3178C6' },
  { name: 'Next.js', category: SkillCategory.FRONTEND, website: 'https://nextjs.org/', color: '#000000' },
  { name: 'React', category: SkillCategory.FRONTEND, website: 'https://reactjs.org/', color: '#61DAFB' },
  { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, website: 'https://tailwindcss.com/', color: '#38B2AC' },
  { name: 'Framer Motion', category: SkillCategory.FRONTEND, website: 'https://www.framer.com/motion/', color: '#F24E1E' },
  { name: 'Node.js', category: SkillCategory.BACKEND, website: 'https://nodejs.org/', color: '#339933' },
  { name: 'Express', category: SkillCategory.BACKEND, website: 'https://expressjs.com/', color: '#000000' },
  { name: 'GraphQL', category: SkillCategory.BACKEND, website: 'https://graphql.org/', color: '#E10098' },
  { name: 'MongoDB', category: SkillCategory.DATABASE, website: 'https://www.mongodb.com/', color: '#47A248' },
  { name: 'PostgreSQL', category: SkillCategory.DATABASE, website: 'https://www.postgresql.org/', color: '#336791' },
  { name: 'Supabase', category: SkillCategory.DATABASE, website: 'https://supabase.com/', color: '#3ECF8E' },
  { name: 'Docker', category: SkillCategory.DEVOPS, website: 'https://www.docker.com/', color: '#2496ED' },
  { name: 'Figma', category: SkillCategory.OTHER, website: 'https://www.figma.com/', color: '#F24E1E' },
  { name: 'Adobe XD', category: SkillCategory.OTHER, website: 'https://www.adobe.com/products/xd.html', color: '#FF61F6' },
  { name: 'UI/UX Design', category: SkillCategory.OTHER, color: '#FFB000' },
  { name: 'Responsive Design', category: SkillCategory.OTHER, color: '#FF6F61' },
  { name: 'Accessibility', category: SkillCategory.OTHER, color: '#625DB0' },
];

const PROJECTS: Array<Pick<Project, 'slug' | 'title' | 'description' | 'imageUrl' | 'liveUrl' | 'githubUrl' | 'featured' | 'order'>> = [
  { slug: 'project-alpha', title: 'Project Alpha', description: 'First featured project', imageUrl: '/images/avatar.png', liveUrl: 'https://alpha.example.com', githubUrl: 'https://github.com/you/alpha', featured: true, order: 1 },
  { slug: 'project-beta', title: 'Project Beta', description: 'Second featured project', imageUrl: '/images/avatar.png', liveUrl: 'https://beta.example.com', githubUrl: 'https://github.com/you/beta', featured: true, order: 2 },
  { slug: 'project-gamma', title: 'Project Gamma', description: 'Third featured project', imageUrl: '/images/avatar.png', liveUrl: 'https://gamma.example.com', githubUrl: 'https://github.com/you/gamma', featured: true, order: 3 },
  { slug: 'project-delta', title: 'Project Delta', description: 'Fourth project', imageUrl: '/images/avatar.png', liveUrl: 'https://delta.example.com', githubUrl: 'https://github.com/you/delta', featured: false, order: 4 },
  { slug: 'project-epsilon', title: 'Project Epsilon', description: 'Fifth project', imageUrl: '/images/avatar.png', liveUrl: 'https://epsilon.example.com', githubUrl: 'https://github.com/you/epsilon', featured: false, order: 5 },
  { slug: 'project-zeta', title: 'Project Zeta', description: 'Sixth project', imageUrl: '/images/avatar.png', liveUrl: 'https://zeta.example.com', githubUrl: 'https://github.com/you/zeta', featured: false, order: 6 },
  { slug: 'project-eta', title: 'Project Eta', description: 'Seventh project', imageUrl: '/images/avatar.png', liveUrl: 'https://eta.example.com', githubUrl: 'https://github.com/you/eta', featured: false, order: 7 },
  { slug: 'project-theta', title: 'Project Theta', description: 'Eighth project', imageUrl: '/images/avatar.png', liveUrl: 'https://theta.example.com', githubUrl: 'https://github.com/you/theta', featured: false, order: 8 },
  { slug: 'project-iota', title: 'Project Iota', description: 'Ninth project', imageUrl: '/images/avatar.png', liveUrl: 'https://iota.example.com', githubUrl: 'https://github.com/you/iota', featured: false, order: 9 },
  { slug: 'project-kappa', title: 'Project Kappa', description: 'Tenth project', imageUrl: '/images/avatar.png', liveUrl: 'https://kappa.example.com', githubUrl: 'https://github.com/you/kappa', featured: false, order: 10 },
];

async function main() {
  const personal = await prisma.personalInfo.upsert({
    where: { email: 'dev@example.com' },
    update: {},
    create: {
      name: 'Giura Ionut',
      title: 'Fullstack Developer',
      email: 'dev@example.com',
      location: 'New York, NY',
      avatarUrl: '/images/avatar.png',
      resumeUrl: 'https://example.com/resume.pdf',
    },
  });

  const socialLinks = await Promise.all([
    prisma.socialLink.upsert({ where: { name: 'github' }, create: { name: 'github', url: 'https://github.com/giuraionut' }, update: {} }),
    prisma.socialLink.upsert({ where: { name: 'linkedin' }, create: { name: 'linkedin', url: 'https://linkedin.com/in/ionut-emanuel-giura-753256215' }, update: {} }),
    prisma.socialLink.upsert({ where: { name: 'email' }, create: { name: 'email', url: 'mailto:giuraionut98@gmail.com' }, update: {} }),
  ]);

  await prisma.contentSection.createMany({
    data: [
      { ownerId: personal.id, sectionType: 'HERO', title: 'Welcome', shortDescription: 'Hi, my name is', bodies: ['Hi, I’m John — a Fullstack Developer with a passion for building scalable web apps.'] },
      { ownerId: personal.id, sectionType: 'ABOUT', title: 'About Me', shortDescription: 'Get to know me', bodies: ['Passionate about clean code.', 'Modern JS frameworks enthusiast.'] },
      { ownerId: personal.id, sectionType: 'CONTACT', title: 'Get In Touch', shortDescription: 'Get in touch', bodies: ['Reach out via email or use the form below to connect with me.'] },
      { ownerId: personal.id, sectionType: 'PROJECTS', title: 'Projects', shortDescription: 'Some of my projects', bodies: ['Here are some things I’ve built using my diverse skill set.'] },
      { ownerId: personal.id, sectionType: 'SKILLS', title: 'Skills', shortDescription: 'Some of my skills', bodies: [] },
    ],
    skipDuplicates: true,
  });

  const createdSkills = await prisma.$transaction(
    SKILLS.map(skill => prisma.skill.upsert({ where: { name: skill.name }, create: skill, update: skill }))
  );

  const createdProjects = await prisma.$transaction(
    PROJECTS.map(proj => prisma.project.upsert({ where: { slug: proj.slug }, create: proj, update: proj }))
  );

  // Connect all relations
  await prisma.personalInfo.update({
    where: { id: personal.id },
    data: {
      socialLinks: { connect: socialLinks.map(sl => ({ id: sl.id })) },
      skills:      { connect: createdSkills.map(sk => ({ id: sk.id })) },
      projects:    { connect: createdProjects.map(pj => ({ id: pj.id })) }
    }
  });

  const projectSkillMap: Record<string, string[]> = {
    'project-alpha': ['React', 'Next.js', 'TypeScript'],
    'project-beta': ['Node.js', 'Express', 'GraphQL'],
    'project-gamma': ['React', 'Tailwind CSS', 'Framer Motion'],
    'project-delta': ['MongoDB', 'Node.js'],
    'project-epsilon': ['PostgreSQL', 'Supabase'],
    'project-zeta': ['Docker', 'Node.js'],
    'project-eta': ['Figma', 'Adobe XD'],
    'project-theta': ['UI/UX Design', 'Responsive Design'],
    'project-iota': ['Accessibility', 'Tailwind CSS'],
    'project-kappa': ['GraphQL', 'MongoDB', 'Supabase'],
  };

  await Promise.all(
    createdProjects.map(proj =>
      prisma.project.update({
        where: { id: proj.id },
        data: { skills: { connect: projectSkillMap[proj.slug].map(name => ({ name })) } }
      })
    )
  );

  console.log(`✅ Seeded ${SKILLS.length} skills and ${PROJECTS.length} projects with all connections.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
