
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

const CyberpunkParkourAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resizeCanvas();

    // Color palette - cyberpunk/tech theme
    const colors = [
      '#00d4ff', // cyan
      '#0099ff', // blue
      '#7b61ff', // purple
      '#ff6ec7', // pink
      '#00ff88', // green
      '#ffaa00', // amber
    ];

    // Initialize particles
    const particleCount = Math.min(Math.floor((width * height) / 8000), 150);
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Spawn shooting star
    const spawnShootingStar = () => {
      const side = Math.random();
      let x: number, y: number, vx: number, vy: number;
      const speed = Math.random() * 4 + 3;

      if (side < 0.5) {
        // From top
        x = Math.random() * width;
        y = -10;
        const angle = Math.random() * 0.6 + 0.3; // 0.3 to 0.9 rad
        vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
        vy = Math.sin(angle) * speed;
      } else {
        // From sides
        x = Math.random() > 0.5 ? -10 : width + 10;
        y = Math.random() * height * 0.5;
        vx = x < 0 ? speed : -speed;
        vy = (Math.random() - 0.3) * speed * 0.5;
      }

      shootingStarsRef.current.push({
        x, y, vx, vy,
        length: Math.random() * 60 + 40,
        alpha: 1,
        color: colors[Math.floor(Math.random() * 3)], // Use first 3 cooler colors
        life: 0,
        maxLife: Math.random() * 80 + 60,
      });
    };

    // Connection distance
    const connectionDistance = Math.min(width, height) * 0.15;
    const mouseRadius = 200;

    const gameLoop = () => {
      animationFrameId.current = requestAnimationFrame(gameLoop);
      timeRef.current += 1;

      // Background with subtle gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#050a18');
      bgGrad.addColorStop(0.5, '#0a1628');
      bgGrad.addColorStop(1, '#0d1f3c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid pattern
      ctx.strokeStyle = 'rgba(0, 150, 255, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let gx = 0; gx < width; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // Spawn shooting stars occasionally
      if (Math.random() < 0.015) {
        spawnShootingStar();
      }

      // Update and draw shooting stars
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const star = shootingStarsRef.current[i];
        star.x += star.vx;
        star.y += star.vy;
        star.life++;
        star.alpha = Math.max(0, 1 - star.life / star.maxLife);

        if (star.alpha <= 0 || star.x < -100 || star.x > width + 100 || star.y > height + 100) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        // Draw shooting star trail
        const trailLength = star.length;
        const speedMag = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
        const nx = -star.vx / speedMag;
        const ny = -star.vy / speedMag;

        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x + nx * trailLength, star.y + ny * trailLength
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.3, star.color + '80');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + nx * trailLength, star.y + ny * trailLength);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.globalAlpha = star.alpha;
        ctx.stroke();

        // Glow at head
        const glowGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 8);
        glowGrad.addColorStop(0, star.color);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction - gentle attraction
        const dmx = mouse.x - p.x;
        const dmy = mouse.y - p.y;
        const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
        if (distMouse < mouseRadius && distMouse > 0) {
          const force = (mouseRadius - distMouse) / mouseRadius * 0.008;
          p.vx += dmx / distMouse * force;
          p.vy += dmy / distMouse * force;
        }

        // Damping
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Wrap around edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Pulse alpha
        p.alpha = 0.3 + 0.4 * Math.sin(timeRef.current * p.pulseSpeed + p.pulsePhase);
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.25;

            // Create gradient line between two particles
            const lineGrad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            lineGrad.addColorStop(0, particles[i].color);
            lineGrad.addColorStop(1, particles[j].color);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineGrad;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw mouse connections
      if (mouse.x > 0 && mouse.y > 0) {
        for (const p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const opacity = (1 - dist / mouseRadius) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Mouse glow
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseRadius * 0.3);
        mouseGlow.addColorStop(0, 'rgba(0, 180, 255, 0.08)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw particles
      for (const p of particles) {
        // Outer glow
        const glowRadius = p.radius * 4;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, p.color + '40');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha + 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      // Draw floating hexagons (circuit board feel)
      const hexCount = 5;
      for (let h = 0; h < hexCount; h++) {
        const hx = ((timeRef.current * 0.15 + h * (width / hexCount)) % (width + 200)) - 100;
        const hy = height * 0.2 + Math.sin(timeRef.current * 0.008 + h * 1.5) * height * 0.15;
        const hexSize = 20 + h * 8;
        const hexAlpha = 0.04 + 0.02 * Math.sin(timeRef.current * 0.015 + h);

        ctx.strokeStyle = colors[h % colors.length];
        ctx.globalAlpha = hexAlpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let s = 0; s < 6; s++) {
          const angle = (Math.PI / 3) * s - Math.PI / 6 + timeRef.current * 0.002;
          const sx = hx + hexSize * Math.cos(angle);
          const sy = hy + hexSize * Math.sin(angle);
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Top vignette for text readability
      const topVignette = ctx.createLinearGradient(0, 0, 0, height * 0.3);
      topVignette.addColorStop(0, 'rgba(5, 10, 24, 0.4)');
      topVignette.addColorStop(1, 'transparent');
      ctx.fillStyle = topVignette;
      ctx.fillRect(0, 0, width, height * 0.3);

      // Bottom vignette
      const bottomVignette = ctx.createLinearGradient(0, height * 0.7, 0, height);
      bottomVignette.addColorStop(0, 'transparent');
      bottomVignette.addColorStop(1, 'rgba(5, 10, 24, 0.5)');
      ctx.fillStyle = bottomVignette;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-screen"
      style={{ backgroundColor: '#050a18' }}
      aria-hidden="true"
    />
  );
};

export default CyberpunkParkourAnimation;
