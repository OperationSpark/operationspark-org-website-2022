import { HTMLMotionProps, motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const MainContainer = ({ children, style }: HTMLMotionProps<'main'>) => {
  const { pathname } = useRouter();
  return (
    <AnimatePresence exitBeforeEnter key={pathname}>
      <motion.main
        style={style}
        initial={{
          opacity: 0,
          scaleX: 1.02,
          transformOrigin: 'top center',
        }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default MainContainer;
