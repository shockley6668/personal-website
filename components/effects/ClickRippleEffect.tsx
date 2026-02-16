
import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ClickRippleEffectProps {
  children: React.ReactNode;
  rippleColor?: string;
  duration?: number; // in seconds
}

const ClickRippleEffect: React.FC<ClickRippleEffectProps> = ({ 
  children, 
  rippleColor = 'rgba(0, 0, 0, 0.1)', 
  duration = 0.6 
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    const wrapper = event.currentTarget;
    const rect = wrapper.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5; // Make ripple larger than the container

    let x, y;
    if ('clientX' in event) { // Mouse event
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else { // Keyboard event (center ripple)
      x = rect.width / 2;
      y = rect.height / 2;
    }

    const newRipple: Ripple = {
      id: Date.now(),
      x: x - size / 2, // Adjust for ripple center
      y: y - size / 2, // Adjust for ripple center
      size,
    };

    setRipples(prevRipples => [...prevRipples, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prevRipples => prevRipples.filter(r => r.id !== newRipple.id));
    }, duration * 1000);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    createRipple(event);
    // If the wrapped child has its own click handler, it should still fire.
    // If children is a single React element, we could potentially forward the click.
    // However, standard event bubbling should handle this if children are interactive.
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Prevent default space scroll if the element is focusable and "button"-like
      if(event.key === ' ') event.preventDefault();
      createRipple(event);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'block' }} // display: block ensures it takes space
      tabIndex={0} 
      role="button" 
      // Consider aria-pressed if the ripple indicates a state change, though likely not here.
      // For a purely decorative effect on a section, role="button" might be too strong if the section itself
      // isn't meant to be a single interactive button.
      // However, to capture clicks cleanly, this setup is common.
      // If sections have internal interactive elements, ensure this doesn't hinder them.
      // The ripple itself is pointer-events: none, so it won't block.
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              backgroundColor: rippleColor,
              pointerEvents: 'none', 
              transform: 'scale(0)', 
              opacity: 1,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickRippleEffect;
