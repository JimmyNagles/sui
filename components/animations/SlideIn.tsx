// components/SlideIn.jsx
import React, { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const SlideIn = ({ children, direction = "right" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const slideInVariants = {
    hidden: {
      x: direction === "right" ? 200 : direction === "left" ? -200 : 0,
      y: direction === "top" ? -200 : direction === "bottom" ? 200 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={slideInVariants}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
