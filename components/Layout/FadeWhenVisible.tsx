import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { fadeInUpSlower } from "config/animations";

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInWhenVisible = ({
  children,
  delay = 0,
}: FadeInWhenVisibleProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.07,
  });

  const variants = {
    ...fadeInUpSlower,
    animate: {
      ...fadeInUpSlower.animate,
      transition: {
        ...fadeInUpSlower.animate.transition,
        delay,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.div
      style={{ margin: 0 }}
      ref={ref}
      animate={controls}
      initial="initial"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
