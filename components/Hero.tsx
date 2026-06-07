import React, { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { LanguageContext } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate all text elements fading in and floating up
      tl.fromTo('.hero-text-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
      );

      // ScrollTrigger for the text color change
      gsap.to('.apple-gradient-text', {
        backgroundPosition: '100% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=800', // Pin for 800px of scrolling while coloring
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  const [timeStr, setTimeStr] = React.useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute:'2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen pointer-events-none z-10 px-8 py-10 md:px-16 md:py-16 text-white overflow-hidden">
      
      {/* Top Left: Name & Status */}
      <div className="hero-text-anim absolute top-24 left-8 md:top-20 md:left-16 flex flex-col font-mono-space text-xs md:text-sm text-gray-300">
        <span className="mb-2 uppercase font-bold tracking-widest text-white">Shukun Huang</span>
        <span>{language === 'en' ? 'Available for work:' : '求职状态:'}</span>
        <a href="mailto:2933151428@qq.com" className="underline underline-offset-4 hover:text-white pointer-events-auto">2933151428@qq.com</a>
      </div>

      {/* Top Right: Skills / Links */}
      <div className="hero-text-anim absolute top-24 right-8 md:top-20 md:right-16 flex flex-col font-mono-space text-xs md:text-sm text-gray-300 text-right">
        <span className="mb-2 uppercase font-bold tracking-widest text-white">Core Focus</span>
        <span>Embedded Systems</span>
        <span>Sim2Real RL</span>
        <span>Autonomous Robots</span>
      </div>

      {/* Main Title: Center Left */}
      <div className="hero-text-anim absolute top-1/2 left-8 md:left-16 -translate-y-1/2 flex flex-col pointer-events-auto w-full">
        <span className="font-script text-[22vw] md:text-[12vw] leading-[0.8] apple-gradient-text">Robotics</span>
        <span className="font-bold text-[18vw] md:text-[9.5vw] leading-[0.85] tracking-tighter uppercase apple-gradient-text mt-2">Engineer.</span>
      </div>

      {/* Bottom Left: Time & Links */}
      <div className="hero-text-anim absolute bottom-12 left-8 md:bottom-16 md:left-16 flex flex-col font-mono-space text-xs md:text-sm text-gray-300">
        <span>Local time</span>
        <span className="uppercase text-white mb-4">{timeStr}</span>
        <div className="flex gap-4 pointer-events-auto uppercase text-xs">
          <a href="https://github.com/shockley6668" target="_blank" rel="noreferrer" className="hover:text-white">Github</a>
          <a href="https://www.linkedin.com/in/shukun-huang-04378231a/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
        </div>
      </div>

      {/* Bottom Right: Intro text */}
      <div className="hero-text-anim absolute bottom-12 right-8 md:bottom-16 md:right-16 max-w-[280px] md:max-w-[320px] font-mono-space text-xs md:text-sm text-gray-300 text-left pointer-events-auto">
        <p className="mb-4">
          {language === 'en' ? 
            "Hi! I'm Shukun Huang, a passionate robotics engineer." :
            "你好！我是黄树坤，一名对机器人充满热忱的工程师。"}
        </p>
        <p>
          {language === 'en' ?
            "I focus on bringing complex robotic concepts from simulation into reality." :
            "我专注于将复杂的机器人算法从仿真环境落地到真实世界。"}
        </p>
      </div>

    </section>
  );
};

export default Hero;
