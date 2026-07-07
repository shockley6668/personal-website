import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export interface HighlightItem {
  id: string;
  category: string;
  categoryColor?: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  imageUrls?: string[];
  imageEmoji?: string;
  link?: string;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  MAKER: 'var(--cat-maker)',
  ROBOTICS: 'var(--cat-robotics)',
  'OPEN SOURCE': 'var(--cat-opensource)',
  AI: 'var(--cat-ai)',
  RESEARCH: 'var(--cat-research)',
  COMMUNITY: 'var(--cat-community)',
  VISIT: 'var(--cat-community)',
  HACKATHON: 'var(--cat-opensource)',
  PROJECT: 'var(--cat-maker)',
  'SUMMER CAMP': 'var(--cat-maker)',
};

const DEFAULT_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'icra-sim2real',
    category: 'RESEARCH',
    title: 'ICRA Sim2Real Challenge (Yokohama)',
    description: 'First Prize at Agilex Sim2Real + Second Prize at RoboMaster Sim2Real challenges at ICRA 2024 in Yokohama, Japan. Developed and validated robust Sim2Real reinforcement learning policies for wheeled mobile robots.',
    date: 'May 2024',
    imageUrls: [
      './pics/icra_team.jpg',
      './pics/icra_setup.jpg',
      './pics/icra_expo.jpg'
    ],
    featured: true,
  },
  {
    id: 'bdx-robot',
    category: 'ROBOTICS',
    title: 'BDX Bipedal Robot',
    description: 'Open-source 10-DOF bipedal robot — Isaac Gym RL training, MuJoCo validation, RDK X5 edge Sim2Real deployment. Recipient of the Outstanding Undergraduate Graduation Project award.',
    date: 'Dec 2025',
    imageUrl: './projects/bdx/bdx_walk.gif',
    link: 'https://forum-en.d-robotics.cc/t/zero-to-one-the-guide-to-building-a-bipedal-robot-with-the-rdk-x5/484',
    featured: true,
  },
  {
    id: 'hkust-visit',
    category: 'SUMMER CAMP',
    title: 'HKUST InnoBay Bootcamp',
    description: 'HKUST InnoBay Venture Building Bootcamp — A highly selective hardtech innovation program initiated by Prof. Zexiang Li (mentor behind DJI & XbotPark). Applied advanced design thinking methodologies to engineer "STRIKE CAM", a novel smart hardware solution tackling critical industry pain points. Successfully pitched the functional prototype to prominent venture capitalists, executive panels, and academic advisors.',
    date: 'Jul 2025',
    imageUrls: [
      './pics/hkust_badge.jpg',
      './pics/hkust_strikecam.jpg',
      './pics/hkust_group.jpg',
      './pics/hkust_visit.jpg'
    ],
    link: 'https://isd.hkust.edu.hk/news/5/',
    featured: true,
  },
  {
    id: 'cursor-meetup',
    category: 'COMMUNITY',
    title: 'Cursor Meetup',
    description: 'Group photo from the Cursor community gathering in Shenzhen — swapping AI coding workflows with builders.',
    date: 'Jun 2026',
    imageUrl: './pics/cursor_meetup.jpg',
  },
  {
    id: 'nus-visit',
    category: 'VISIT',
    title: 'NUS',
    description: 'Campus visit to the National University of Singapore.',
    date: 'Apr 2026',
    imageUrl: './pics/nus_visit.jpg',
  },
  {
    id: 'ntu-visit',
    category: 'VISIT',
    title: 'NTU',
    description: 'Touring Nanyang Technological University and its robotics research labs.',
    date: 'Apr 2026',
    imageUrl: './pics/ntu_visit.jpg',
  },
  {
    id: 'hkustgz-ta',
    category: 'COMMUNITY',
    title: 'HKUST(GZ) Go-Kart Camp TA',
    description: 'Engineering Innovation Teaching Assistant — Appointed by the Office of the VP for Academic Affairs at The Hong Kong University of Science and Technology (Guangzhou) as a core TA for the Go-Kart Camp. Developed curriculum and mentored cross-disciplinary student teams in integrating mechanical, electrical, and embedded control systems to build functional go-karts.',
    date: 'Jan 2026',
    imageUrls: [
      './pics/hkustgz_kart_camp.jpg',
      './pics/hkustgz_karts.jpg',
      './pics/hkustgz_cert.jpg'
    ],
  },
  {
    id: 'robio-2025',
    category: 'RESEARCH',
    title: 'IEEE ROBIO 2025',
    description: 'Attended the IEEE International Conference on Robotics and Biomimetics in Chengdu, China. Engaged in technical sessions on biomimetic robotics, dexterous manipulation, and robot learning, and connected with global researchers.',
    date: 'Dec 2025',
    imageUrl: './pics/robio_2025.jpg',
  },
  {
    id: 'cathay-hackathon',
    category: 'HACKATHON',
    title: 'Cathay Pacific Hackathon',
    description: 'Cathay Pacific Hackathon — 48-hour aviation innovation sprint. Teamed up to build and pitch our aviation solutions, capturing highlights from kickoff to the final demo day presentation.',
    date: 'Nov 2025',
    imageUrls: [
      './pics/cathay_group.jpg',
      './pics/cathay_demo_day.jpg',
      './pics/cathay_team.jpg',
      './pics/cathay_kickoff.jpg'
    ],
  },
  {
    id: 'google-campus',
    category: 'VISIT',
    title: 'Google Campus',
    description: 'Google Campus Seminar — Attended a technical workshop at Google, focusing on the latest advancements in LLM Agentic Workflows. Discussed design patterns for AI agents, including autonomous planning, reflection, tool usage, and multi-agent coordination, with Google\'s research and engineering teams.',
    date: 'Oct 2025',
    imageUrls: [
      './pics/google_me.jpg',
      './pics/google_campus.jpg'
    ],
  },
  {
    id: 'aws-visit',
    category: 'VISIT',
    title: 'AWS',
    description: 'AWS office visit — cloud infrastructure for robotics data pipelines.',
    date: 'Oct 2025',
    imageUrls: [
      './pics/aws_lab.jpg',
      './pics/aws_visit.jpg'
    ],
  },
  {
    id: 'stm32-middleware',
    category: 'OPEN SOURCE',
    title: 'STM32 Robot Control Middleware',
    description: 'HAL-based middleware with PID, Kalman filter, Mecanum kinematics, and auto-aim integration for RoboMaster.',
    date: 'Apr 2024',
    imageEmoji: '⚙️',
  },
  {
    id: 'robomaster-sentry',
    category: 'ROBOTICS',
    title: 'RoboMaster Sentry Robot',
    description: '3D LiDAR SLAM + autonomous navigation — won First Prize at RoboMaster University League.',
    date: 'Mar 2024',
    imageUrl: './projects/3dlidar/sentry.jpg',
  },
];

function loadHighlights(): HighlightItem[] {
  try {
    const hasInitializedNewDefaults = localStorage.getItem('highlights_v18_initialized');
    if (!hasInitializedNewDefaults) {
      localStorage.setItem('highlights_data', JSON.stringify(DEFAULT_HIGHLIGHTS));
      localStorage.setItem('highlights_v18_initialized', 'true');
      return DEFAULT_HIGHLIGHTS;
    }

    const raw = localStorage.getItem('highlights_data');
    if (raw) {
      const parsed = JSON.parse(raw) as HighlightItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_HIGHLIGHTS;
}

const Highlights: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [items, setItems] = useState<HighlightItem[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    setItems(loadHighlights());

    // Listen for admin updates
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'highlights_data') setItems(loadHighlights());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (items.length === 0) return null;

  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <section id="highlights" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'Recent Highlights' : '精彩时刻'}
      </h2>

      <div className="highlights-feed">
        {visibleItems.map((item) => {
          const color = item.categoryColor || CATEGORY_COLORS[item.category] || 'var(--text-muted)';
          
          return (
            <div key={item.id} className="highlight-post">
              {/* Post Header — simplified to keep only date and category tag */}
              <div className="highlight-post-header-simple">
                <span className="highlight-post-date">{item.date}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.featured && (
                    <span className="highlight-post-featured-badge">
                      <i className="fas fa-star" style={{ marginRight: '4px', color: '#eab308' }} />
                      {language === 'en' ? 'Featured' : '精选'}
                    </span>
                  )}
                  <span className="highlight-post-tag-simple" style={{ color }}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Post Body */}
              <div className="highlight-post-body">
                <h4 className="highlight-post-title">{item.title}</h4>
                <p>{item.description}</p>
              </div>

              {/* Post Media (Supports Multiple or Single Image) */}
              {item.imageUrls && item.imageUrls.length > 0 ? (
                <div className="highlight-post-media-scroll">
                  {item.imageUrls.map((url, i) => (
                    item.link ? (
                      <a key={i} href={item.link} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
                        <img
                          src={url}
                          alt={`${item.title} ${i + 1}`}
                          className="highlight-post-gallery-img"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <img
                        key={i}
                        src={url}
                        alt={`${item.title} ${i + 1}`}
                        className="highlight-post-gallery-img"
                        loading="lazy"
                      />
                    )
                  ))}
                </div>
              ) : (
                item.imageUrl && (
                  <div className="highlight-post-media">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" style={{ width: '100%' }}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="highlight-post-img"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="highlight-post-img"
                        loading="lazy"
                      />
                    )}
                  </div>
                )
              )}

              {/* Link button if no image, or as action */}
              {item.link && !item.imageUrl && (!item.imageUrls || item.imageUrls.length === 0) && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="highlight-post-link"
                >
                  {language === 'en' ? '→ View Reference' : '→ 查看链接'}
                </a>
              )}
            </div>
          );
        })}
      </div>

      {items.length > 3 && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button 
            className="highlights-toggle-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded 
              ? (language === 'en' ? 'Show Less ↑' : '收起 ↑') 
              : (language === 'en' ? `Show More (${items.length - 3} more) ↓` : `展开更多 (还有 ${items.length - 3} 个) ↓`)
            }
          </button>
        </div>
      )}
    </section>
  );
};

export default Highlights;
export { DEFAULT_HIGHLIGHTS };
