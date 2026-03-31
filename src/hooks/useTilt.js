import { useEffect, useRef } from 'react';

export const useTilt = (options = { max: 12, scale: 1.02, speed: 400 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -options.max; 
      const rotateY = ((x - centerX) / centerX) * options.max;
      
      element.style.transition = 'none';
      element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options.scale}, ${options.scale}, ${options.scale})`;
    };
    
    const handleMouseLeave = () => {
      element.style.transition = `transform ${options.speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      element.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };
    
    const handleMouseEnter = () => {
        element.style.transition = `transform ${options.speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    };

    element.style.transformStyle = 'preserve-3d';
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [options.max, options.scale, options.speed]);

  return ref;
};
