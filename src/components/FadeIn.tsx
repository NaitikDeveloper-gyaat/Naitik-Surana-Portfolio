import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap | string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
  style,
}) => {
  // Use motion.create for dynamic element types as per specification
  const Component = React.useMemo(() => {
    // If motion.create is available (Motion v12)
    if (typeof (motion as any).create === 'function') {
      return (motion as any).create(as as any);
    }
    // Fallback to motion(tag) or motion.div
    if (typeof (motion as any)[as as any] !== 'undefined') {
      return (motion as any)[as as any];
    }
    return (motion as any)(as as any);
  }, [as]);

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};
