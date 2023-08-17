// components/FadeIn.jsx
import React from "react";
import { useInView } from "react-intersection-observer";

const FadeIn = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjust this value to control when the animation starts (0 to 1)
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-2000 ease-in ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
