import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { scrollVariants } from './animation';

export function ScrollBar({
  className,
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, scrollVariants);
  return (
    <div className={cn('absolute inset-x-0 top-0 h-[3px] w-full bg-[#D9D9D9]', className)}>
      <motion.div
        className="h-full w-full origin-left bg-black"
        style={{
          scaleX,
        }}
      />
    </div>
  );
}
