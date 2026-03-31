import { useEffect } from 'react';

export const useCursorGlow = () => {
  useEffect(() => {
    const body = document.querySelector('body');
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    glow.style.position = 'fixed';
    glow.style.width = '400px';
    glow.style.height = '400px';
    glow.style.background = 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '100';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.mixBlendMode = 'screen';
    glow.style.transition = 'width 0.3s, height 0.3s';
    
    body.appendChild(glow);

    let requestId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!requestId) {
            requestId = requestAnimationFrame(updateGlow);
        }
    };

    const updateGlow = () => {
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
        requestId = null;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (glow.parentNode) {
        glow.parentNode.removeChild(glow);
      }
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, []);
};
