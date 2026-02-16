import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { ABOUT_DATA, getText } from '../constants';

const About: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
  };

  const textContentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
    }
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const galleryItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.85, rotateY: 0 }, // Start straight
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 0.9, // Default scale in carousel
      rotateY: 15, // Default tilt (degrees) in carousel
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  // Determine animation duration based on number of images.
  // Multiplier adjusted for faster speed (e.g., 5 images * 5 = 25s).
  const numOriginalImages = ABOUT_DATA.galleryImages?.length || 1;
  const galleryAnimationDuration = `${numOriginalImages * 5}s`; 

  return (
    <motion.section 
      id="about" 
      className="py-16 md:py-24 bg-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="border-b-4 border-sky-500 pb-2">{getText(ABOUT_DATA.title, language)}</span>
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-12 md:mb-16">
          <motion.div 
            className="md:w-1/3 flex justify-center"
            variants={imageVariants}
          >
            <img 
              src={ABOUT_DATA.imageUrl}
              alt={getText(ABOUT_DATA.title, language)} 
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl border-4 border-slate-200" 
            />
          </motion.div>
          <motion.div 
            className="md:w-2/3 text-lg text-slate-700 space-y-5"
            variants={textContentVariants}
          >
            {ABOUT_DATA.paragraphs.map((p, index) => (
              <motion.p key={index} variants={paragraphVariants}>
                {getText(p, language)}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {ABOUT_DATA.galleryImages && ABOUT_DATA.galleryImages.length > 0 && (
          <motion.div
            className="mt-10 md:mt-12 gallery-autoscroll-container"
            role="region"
            aria-label={getText({ zh: "机器人竞赛照片墙", en: "Robotics Competition Photo Gallery" }, language)}
            initial="hidden" // Parent container doesn't need complex variants if children handle their own
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ visible: { transition: { delayChildren: 0.3, staggerChildren: 0.05 }}}} // Stagger children for entry
          >
            <div 
              className="gallery-scrolling-track"
              style={{ animationDuration: galleryAnimationDuration }}
            >
              {[...ABOUT_DATA.galleryImages, ...ABOUT_DATA.galleryImages].map((src, index) => (
                <motion.div
                  key={`gallery-img-${index}-${src}`}
                  className="flex-shrink-0 w-48 h-36 md:w-64 md:h-48 mx-3 my-2" // Added margin for spacing
                  variants={galleryItemVariants} // Animates into the tilted state
                  style={{ transformOrigin: 'center center' }}
                  whileHover={{
                    scale: 1, // Enlarge and straighten
                    rotateY: 0,
                    zIndex: 10, // Bring to front
                    boxShadow: '0px 10px 25px rgba(0,0,0,0.25)', // Enhanced shadow on hover
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Springy hover effect
                >
                  <img 
                    src={src} 
                    alt={`${getText({zh:"机器人竞赛照片", en:"Robotics Competition Photo"}, language)} ${index % ABOUT_DATA.galleryImages.length + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md border-2 border-slate-200"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default About;