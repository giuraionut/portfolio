import { BRAND_COLORS } from '@/constants/brand-colors';
import MotionContainer from './MotionContainer';
import Link from 'next/link';
import { Badge } from './ui/badge';

export default function SkillBadge({
  name,
  website,
}: {
  name: string;
  website?: string;
}) {
  const brandColor = (
    BRAND_COLORS as Record<string, { bg: string; text: string }>
  )[name] || {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-200',
  };

  return (
    <Link href={website || ''} target='_blank' className='block'>
      <MotionContainer whileHover={{ x: 1.05 }} customTransition='spring'>
        <div>
          <Badge
            variant='secondary'
            className={`${brandColor.bg} ${brandColor.text} font-medium cursor-pointer relative z-10`}
          >
            {name}
          </Badge>
        </div>
      </MotionContainer>
    </Link>
  );
}
