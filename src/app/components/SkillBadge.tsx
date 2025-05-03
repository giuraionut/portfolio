import MotionContainer from './MotionContainer';
import Link from 'next/link';
import { Skill } from '@prisma/client';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';

export default function SkillBadge({ skill }: { skill: Skill }) {
  if (!skill) return null;
  const textColor = skill.color!;
  return (
    <Link href={skill.website || ''} target='_blank' className='block'>
      <MotionContainer whileHover={{ x: 1.05 }} customTransition='spring'>
        <div>
          <Badge
            variant='outline'
            className={cn(`font-medium cursor-pointer relative z-10`)}
            style={{
              color: textColor,
            }}
          >
            {skill.name}
          </Badge>
        </div>
      </MotionContainer>
    </Link>
  );
}
