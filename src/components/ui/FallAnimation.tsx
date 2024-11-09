import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FallAnimationProps {
  children: ReactNode;
  isFalling: boolean;
}

const FallAnimation = ({ children, isFalling }: FallAnimationProps) => {
  const fallVariants = {
    hidden: {
      y: 0,
      x: 0,
      opacity: 1,
    },
    visible: {
      y: 400,
      x: Math.random() * 45,

      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 180,
      },
    },
  };

  return (
    <motion.div
      className="falling-box"
      variants={fallVariants}
      initial="hidden"
      animate={isFalling ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default FallAnimation;
