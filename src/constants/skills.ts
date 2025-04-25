// src/data/skills.ts

/**
 * Represents a single technology or skill item.
 */
export interface SkillItem {
    /** Display name of the skill */
    name: string;
    /** Optional URL to the official website or docs */
    website?: string;
    /** Optional Tailwind background color class override */
    color?: string;
    /** Optional Tailwind text color class override */
    textColor?: string;
    /** Category type for grouping skills */
    type: 'Frontend' | 'Backend' | 'Design';
  }
  
  /**
   * Flat list of all known skills.
   */
  export const SKILLS: SkillItem[] = [
    { name: 'React', website: 'https://reactjs.org/', type: 'Frontend' },
    { name: 'Next.js', website: 'https://nextjs.org/', type: 'Frontend' },
    { name: 'TypeScript', website: 'https://www.typescriptlang.org/', type: 'Frontend' },
    { name: 'TailwindCSS', website: 'https://tailwindcss.com/', type: 'Frontend' },
    { name: 'Framer Motion', website: 'https://www.framer.com/motion/', type: 'Frontend' },
    { name: 'Redux', website: 'https://redux.js.org/', type: 'Frontend' },
  
    { name: 'Node.js', website: 'https://nodejs.org/', type: 'Backend' },
    { name: 'Express', website: 'https://expressjs.com/', type: 'Backend' },
    { name: 'GraphQL', website: 'https://graphql.org/', type: 'Backend' },
    { name: 'MongoDB', website: 'https://www.mongodb.com/', type: 'Backend' },
    { name: 'PostgreSQL', website: 'https://www.postgresql.org/', type: 'Backend' },
    { name: 'AWS', website: 'https://aws.amazon.com/', type: 'Backend' },
    { name: 'Docker', website: 'https://www.docker.com/', type: 'Backend' },
  
    { name: 'Figma', website: 'https://www.figma.com/', type: 'Design' },
    { name: 'Adobe XD', website: 'https://www.adobe.com/products/xd.html', type: 'Design' },
    { name: 'UI/UX Design', website: 'https://en.wikipedia.org/wiki/User_experience_design', type: 'Design' },
    { name: 'Responsive Design', website: 'https://en.wikipedia.org/wiki/Responsive_web_design', type: 'Design' },
    { name: 'Accessibility', website: 'https://www.w3.org/WAI/', type: 'Design' },
  ];