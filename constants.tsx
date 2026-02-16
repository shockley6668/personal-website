import React from 'react';
import {
  NavLink, ProfileInfo, AboutContent, EducationEntry, InternshipEntry,
  Project, ResearchEntry, AwardEntry, SkillCategory, Skill, SocialLink,
  ContactContent, FooterContent, BilingualString, Language, PublicationInfo
} from './types';

// Helper to get text based on language
export const getText = (content: BilingualString, lang: Language): string => {
  return content[lang] || content.en; // Default to English if a specific language string is missing
};

// Set the default language to English
export const INITIAL_LANGUAGE: Language = 'en';

export const PROFILE_DATA: ProfileInfo = {
  name: { zh: '黄树坤', en: 'Shukun Huang' },
  title: { zh: '机器人工程师 | 嵌入式开发 & AI 爱好者', en: 'Robotic Engineer | Embedded Development & AI Enthusiast' },
  avatarUrl: './profile_image_mt_fuji.jpg', // Path relative to index.html
  heroTitle: { zh: '你好，我是黄树坤', en: 'Hello, I\'m Shukun Huang' },
  heroSubtitle: { zh: '专注于机器人技术、嵌入式系统和人工智能的工程师，热衷于将创新想法转化为实际解决方案。', en: 'A robotics engineer focused on embedded systems and AI, passionate about turning innovative ideas into real-world solutions.' },
  heroButton: { zh: '了解更多', en: 'Learn More' },
};

export const NAV_LINKS_DATA: NavLink[] = [
  { name: { zh: '关于我', en: 'About Me' }, href: '#about' },
  { name: { zh: '教育背景', en: 'Education' }, href: '#education' },
  { name: { zh: '实习经历', en: 'Internships' }, href: '#internships' },
  { name: { zh: '项目经验', en: 'Projects' }, href: '#projects' },
  { name: { zh: '研究经历', en: 'Research' }, href: '#research' },
  { name: { zh: '荣誉奖项', en: 'Awards' }, href: '#awards' },
  { name: { zh: '技能栈', en: 'Skills' }, href: '#skills' },
  { name: { zh: '联系我', en: 'Contact' }, href: '#contact' },
];

export const ABOUT_DATA: AboutContent = {
  title: { zh: '关于我', en: 'About Me' },
  imageUrl: './profile_image_mt_fuji.jpg', // Corrected path relative to index.html
  paragraphs: [
    {
      zh: '从高中期间参与VEX、RoboMaster夏令营等机器人比赛起，就开始对机器人技术充满热情。在大学期间，通过参与各类机器人竞赛、电子设计比赛以及项目，深化了对机器人控制、嵌入式开发及深度学习等核心技术的理解与实践。',
      en: 'My passion for robotics was ignited in high school through participation in competitions like VEX and RoboMaster Summer Camp. During university, I deepened my practical understanding and theoretical knowledge of core technologies such as robot control, embedded development, and deep learning through various hands-on projects and competitions.'
    },
    {
      zh: '曾担任RoboMaster机器人战队电控组组长，负责机器人整体设计与开发，锻炼了优秀的团队协作与问题解决能力。',
      en: 'As the leader of the RoboMaster team\'s electrical control group, I was responsible for the overall robot design and development, which greatly honed my teamwork and problem-solving skills.'
    },
    {
      zh: '具备良好的沟通能力和团队合作精神，能快速适应新环境与新技术。拥有较强的学习与自主学习能力，对机器人和嵌入式领域充满追求。',
      en: 'I thrive in dynamic environments, bringing strong communication and teamwork skills, and a knack for quickly adapting to new technologies. My deep motivation in robotics fuels a constant drive for learning and innovation.'
    },
  ],
  galleryTitle: { zh: '机器人竞赛精彩瞬间', en: 'Robotics Competition Highlights' },
  galleryImages: [
    './photos/IMG_0115大.jpeg',
    './photos/IMG_0369.jpeg',
    './photos/IMG_0370.jpeg',
    './photos/IMG_1469中.jpeg',
    './photos/pq.png',
    './photos/图片 1.png',
    './photos/图片 2.png',
    './photos/图片 3.png',
    './photos/图片 4.png',
    './photos/robomaster.jpg',
  ],
};

export const EDUCATION_DATA: EducationEntry[] = [
  {
    id: 'waterloo',
    institution: { zh: '滑铁卢大学', en: 'University of Waterloo' },
    degree: { zh: '硕士', en: 'Master\'s Degree' },
    major: { zh: '系统设计工程（Systems Design Engineering）', en: 'Systems Design Engineering' },
    period: { zh: '2026.09 - 2028.01', en: 'Sep 2026 - Jan 2028' },
    details: [
      { zh: '状态：待入学 (2026年秋季入学)', en: 'Incoming Student (Fall 2026 Intake)' }
    ],
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/200px-University_of_Waterloo_seal.svg.png',
  },
  {
    id: 'sztu',
    institution: { zh: '深圳技术大学', en: 'Shenzhen Technology University' },
    degree: { zh: '本科', en: 'Bachelor\'s Degree' },
    major: { zh: '计算机科学与技术', en: 'Computer Science and Technology' },
    period: { zh: '2022.09 - 至今', en: 'Sep 2022 - Present' },
    gpa: { zh: 'GPA: 3.58/4.50 (前20%)', en: 'GPA: 3.58/4.50 (Top 20%)' },
    courses: [
      { zh: '计算机组成原理', en: 'Computer Organization' },
      { zh: '数据结构与算法', en: 'Data Structures and Algorithms' },
      { zh: '操作系统', en: 'Operating Systems' },
      { zh: '单片机与嵌入式系统', en: 'Microcontroller and Embedded Systems' },
      { zh: '机器学习', en: 'Machine Learning' },
    ],
    logoUrl: './photos/sztu_logo.png',
  },
];

export const INTERNSHIPS_DATA: InternshipEntry[] = [
  {
    id: 'hitachi',
    role: { zh: '机器人工程师', en: 'Robotic Engineer' },
    company: { zh: '日立（中国）研发有限公司', en: 'Hitachi China Research Laboratory' },
    period: { zh: '2025.10 - 2025.11', en: 'Oct 2025 - Nov 2025' },
    responsibilities: [
      {
        zh: '负责架构和集成日立自主电梯检测机器人的整个嵌入式生态系统，涵盖从底层PCB设计和低级电气系统驱动开发到高级主机软件及机械臂精密控制算法的全栈技术。',
        en: "Responsible for architecting and integrating the entire embedded ecosystem for Hitachi's autonomous elevator inspection robot, encompassing the full technology stack from ground-up PCB design and low-level electrical system driver development to the high-level host computer software and precision control algorithms for the robotic arm."
      },
    ],
  },
  {
    id: 'digua',
    role: { zh: '机器人应用工程师', en: 'Robotics Application Engineer' },
    company: { zh: '深圳地瓜机器人', en: 'D-Robotics' },
    period: { zh: '2025.01 - 2025.07', en: 'Jan 2025 - Jul 2025' },
    responsibilities: [
      {
        zh: '负责基于搭载地平线Sunrise芯片的RDK边缘计算平台的巨身智能大模型应用开发，涵盖从模型的训练到量化压缩，算子转化，实现Lerobot的rdk生态搭建，完成了ACT、Diffusion policy等端到端VLA大模型的端侧部署。',
        en: 'Responsible for developing large model applications for Embodied-AI on the RDK edge computing platform (Horizon Sunrise chip), including model training, quantization, operator conversion and deployment of end-to-end VLA models like ACT and Diffusion Policy on the edge.'
      },
      {
        zh: '负责构建RDK Module Zoo S100仓库中的模型转换，包括paddleOCr，LaneNet等。',
        en: 'Responsible for model conversion in the RDK Module Zoo S100 repository, including PaddleOCR, LaneNet, etc.'
      },
      {
        zh: '负责运营维护RDK全球生态，在discord等社区回复开发者问题。',
        en: 'Responsible for operating and maintaining the global RDK ecosystem, responding to developer queries in communities like Discord.'
      },
    ],
  },
  {
    id: 'dji',
    role: { zh: '嵌入式助教', en: 'Embedded Systems Teaching Assistant' },
    company: { zh: '深圳大疆创新科技有限公司', en: 'SZ DJI Technology Co., Ltd.' },
    period: { zh: '2022.06 - 2022.08', en: 'Jun 2022 - Aug 2022' },
    responsibilities: [
      { zh: '参与一个超过100人的STEM机器人夏令营计划的筹划，包括机器人课程设计，营期安排组织等。', en: 'Planned and organized multiple STEAM robotics summer/winter camps for over 100 high school students.' },
      { zh: '开发用于控制RoboMaster EP机器人的 ROS 功能包，实现话题发送和服务功能。', en: 'Developed ROS packages for controlling RoboMaster EP robots, implementing topic publishing and service functionalities.' },
      { zh: '利用AprilTag算法为RoboMaster EP机器人实现精确室内定位系统，通过识别AprilTags及TF变换实现实时定位。', en: 'Implemented precise indoor localization for RoboMaster EP robots using AprilTag algorithm and TF transformations for real-time positioning.' },
      { zh: '开发路径规划算法，使用Cubic Spline算法实现RoboMaster EP机器人的灵活精确运动控制。', en: 'Developed path planning algorithms using Cubic Spline for flexible and precise motion control of RoboMaster EP robots.' },
    ],
  },
  {
    id: 'sast',
    role: { zh: '机器人工程师', en: 'Robotics Engineer' },
    company: { zh: '深圳科创学院', en: 'Shenzhen Innox' },
    period: { zh: '2024.01 - 2024.02', en: 'Jan 2024 - Feb 2024' },
    responsibilities: [
      { zh: '开发并优化用于控制DJI教育套件机器人的ROS功能包，涵盖从STM32底层驱动到机器人导航定位。', en: 'Developed and optimized ROS packages for DJI education kit robots, covering from STM32 low-level drivers to robot navigation and localization.' },
      { zh: '成功实现了机器人在多种复杂环境下的稳定运行。', en: 'Successfully enabled stable robot operation in various complex environments.' },
    ],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'bipedalRobot',
    title: { zh: 'NVIDIA 迪士尼双足机器人复现', en: 'NVIDIA Disney-style Bipedal Robot Replication' },
    period: { zh: '2025.12 - 至今', en: 'Dec 2025 - Present' },
    description: { zh: '复现并优化受 NVIDIA 迪士尼机器人启发的双足机器人平台，专注于表现力丰富的运动和稳定的步态控制。', en: 'Replicating and optimizing a bipedal robot platform inspired by NVIDIA\'s Disney robots, focusing on expressive locomotion and stable gait control.' },
    responsibilities: [
      { zh: '架构基于 STM32 H7 系列 MCU 和 HAL 库的嵌入式软件框架，实现高速 USB 虚拟串口通信，确保机器人与上位机之间的高效数据交换。', en: 'Architected the embedded software framework based on STM32 H7 series MCU and HAL library, implementing high-speed USB Virtual COM Port communication to ensure efficient data exchange between the robot and host computer.' },
      { zh: '设计并调试 PPO 强化学习的奖励函数（Reward Functions），以增强行走稳定性并实现多种步态状态。', en: 'Designed and tuned Reward Functions for PPO reinforcement learning to enhance walking stability and enable multiple gait states.' },
      { zh: '在 RDK X5 上进行 Sim2Real 部署，涉及模型量化和压缩，以确保边缘硬件上的实时推理。', en: 'Conducted Sim2Real deployment on RDK X5, involving model quantization and compression to ensure real-time inference on edge hardware.' },
      { zh: '通过优化领域随机化（Domain Randomization）和系统辨识（System Identification）解决 Sim2Real 差距，在真实世界环境中实现稳健运动。', en: 'Addressed the Sim2Real gap by optimizing domain randomization and system identification to achieve robust locomotion in real-world environments.' },
    ],
    achievements: [
      { zh: '成功在物理双足机器人上部署了强化学习策略。', en: 'Successfully deployed the reinforcement learning policy on a physical bipedal robot.' },
    ],
    tags: [{ zh: '强化学习', en: 'RL' }, { zh: 'STM32 H7', en: 'STM32 H7' }, { zh: 'RDK X5', en: 'RDK X5' }, { zh: 'Sim2Real', en: 'Sim2Real' }, { zh: '机器人学', en: 'Robotics' }],
    imageUrl: './photos/IMG_0369.jpeg',
    galleryImages: [
      './photos/IMG_0369.jpeg',
      './photos/IMG_0370.jpeg',
      './photos/IMG_0115大.jpeg',
    ],
  },
  {
    id: 'cathayHackathon',
    title: { zh: '国泰航空 2025 黑客松', en: 'Cathay Hackathon 2025' },
    period: { zh: '2025.10 - 2025.11', en: 'Oct 2025 - Nov 2025' },
    description: { zh: '设计并开发 "Captain Milo"——一款为无人陪伴未成年人打造的 AI 驱动飞行伙伴。', en: 'Designing and developing "Captain Milo", an AI-powered Companion for Unaccompanied Minors in flight.' },
    responsibilities: [
      { zh: '设计产品和系统架构，在集成 IMU 和生物传感器的 RDK X5 边缘硬件上部署离线大语言模型（LLM），实现实时情绪识别。', en: 'Designed product and system architecture, deploying an offline LLM on RDK X5 edge hardware integrated with IMU and biosensors for real-time emotion recognition.' },
      { zh: '设计连接边缘设备、云端 Agent、家长端 App 和机组人员看板的端到端数据流，确保安全透明度和无缝通信。', en: 'Engineered the end-to-end data flow connecting the edge device, Cloud Agent, Parent App, and Crew Dashboard to ensure safety transparency and seamless communication.' },
      { zh: '应用从 AWS、Google Cloud 和微软大师班学到的生成式 AI 和云计算方法，增强方案的可行性和扩展性。', en: 'Applied GenAI and cloud-computing methodologies learned from AWS, Google Cloud, and Microsoft masterclasses to strengthen the feasibility and scalability of solutions.' },
    ],
    achievements: [
      { zh: '带领团队通过初赛和初次路演，入围决赛（总计 400-500 支队伍中前 38 强），是唯一一支来自中国内地的队伍。', en: 'Led the team through the Initial Submission and First Pitch evaluations and ultimately reached the Final Stage (Top 38 out of 400-500 teams) as the only team from Mainland China.' },
    ],
    tags: [{ zh: '大语言模型', en: 'LLM' }, { zh: 'RDK X5', en: 'RDK X5' }, { zh: '生成式 AI', en: 'GenAI' }, { zh: '云计算', en: 'Cloud Computing' }],
    imageUrl: './photos/cathay5.png',
    galleryImages: [
      './photos/cathay5.png',
      './photos/cathay.png',
      './photos/cathay2.png',
      './photos/cathay3.png',
      './photos/cathay4.png',
    ],
  },
  {
    id: 'stm32hal',
    title: { zh: '基于STM32 HAL库的机器人控制中间层库开发', en: 'Robot Control Middleware Dev based on STM32 HAL' },
    period: { zh: '2023.10 - 2024.04', en: 'Oct 2023 - Apr 2024' },
    description: { zh: '开发了一个基于STM32 HAL库的机器人控制中间层库，用于帮助团队在RoboMaster机器人比赛中更好地表现。', en: 'Developed middleware for robot control based on STM32 HAL library to enhance team performance in RoboMaster competitions.' },
    responsibilities: [
      { zh: '设计嵌入式中间层库，实现多场景控制算法（PID、运动卡尔曼滤波、Mecanum轮底盘解算）。', en: 'Designed embedded middleware with multi-scenario control algorithms (PID, motion Kalman filter, Mecanum wheel kinematics).' },
      { zh: '封装各种库，如电机、IMU、CAN总线、SPI和PC通信UART协议。', en: 'Encapsulated libraries for motors, IMU, CAN bus, SPI, and PC UART communication protocols.' },
      { zh: '设计并整合自动瞄准系统的运动控制系统代码。', en: 'Designed and integrated motion control system code for an auto-aiming system.' },
    ],
    achievements: [
      { zh: '提高了机器人运动控制精度，使机器人在RoboMaster比赛中的表现有明显提升。', en: 'Improved robot motion control precision, significantly enhancing performance in RoboMaster competitions.' },
    ],
    tags: [{ zh: 'STM32', en: 'STM32' }, { zh: 'HAL', en: 'HAL' }, { zh: 'RoboMaster', en: 'RoboMaster' }, { zh: 'C++', en: 'C++' }, { zh: 'PID', en: 'PID' }],
    imageUrl: './photos/rm.jpg',
  },
  {
    id: '3dlidar',
    title: { zh: '基于3D LiDAR的半自主移动机器人 SLAM 与路径规划', en: '3D LiDAR-based Semi-Autonomous Mobile Robot SLAM & Path Planning' },
    period: { zh: '2023.05 - 2024.03', en: 'May 2023 - Mar 2024' },
    description: { zh: '参与基于3D LiDAR的半自主移动机器人SLAM和路径规划研究，担任项目负责人。', en: 'Led research on SLAM and path planning for a semi-autonomous mobile robot using 3D LiDAR.' },
    responsibilities: [
      { zh: '搭建导航框架：PointLio算法定位，Dijkstra全局路径规划，TEB局部路径规划。', en: 'Built navigation framework: PointLio for localization, Dijkstra for global planning, TEB for local planning.' },
      { zh: '基于Gazebo搭建机器人仿真平台，在没有真实机器人的情况下实现算法调试。', en: 'Developed a Gazebo simulation platform for algorithm debugging without a physical robot.' },
      { zh: '搭建上下位机串口通信框架及协议，实现CRC校验、看门狗掉线自动检测，实现ROS与嵌入式开发板稳定通信。', en: 'Established serial communication between upper and lower MCUs with CRC, watchdog, ensuring stable ROS-embedded board communication.' },
      { zh: '利用行为树和状态机进行机器人行为规划和自主决策。', en: 'Used behavior trees and state machines for robot behavior planning and autonomous decision-making.' },
      { zh: '采用PID对二自由度云台控制，使用卡尔曼滤波对控制指令数据过滤，实现云台在外界干扰下的稳定自瞄。', en: 'Implemented PID for 2-DOF gimbal control with Kalman filtering for stable auto-aiming under external disturbances.' },
    ],
    achievements: [
      { zh: '该项目的机器人获得了全国大学生机器人大赛RoboMaster机甲大师高校联盟赛哨兵机器人组一等奖。', en: 'The robot from this project won First Prize in the Sentry Robot Group at the RoboMaster University League.' },
    ],
    tags: [{ zh: '3D LiDAR', en: '3D LiDAR' }, { zh: 'SLAM', en: 'SLAM' }, { zh: 'ROS', en: 'ROS' }, { zh: 'Gazebo', en: 'Gazebo' }, { zh: 'PID', en: 'PID' }, { zh: 'Behavior Trees', en: 'Behavior Trees' }],
    imageUrl: './sentry.jpg',
  },
  {
    id: 'stemed',
    title: { zh: 'STEM 教育机器人套件开发', en: 'STEM Education Robot Kit Development' },
    period: { zh: '2024.08 - 2026.01', en: 'Aug 2024 - Jan 2026' },
    description: { zh: '开发基于 Arduino、ESP32、RDK X3 的麦轮小车，实现巡线、AprilTag 识别及自主导航功能。', en: 'Developing a Mecanum wheel car (Arduino, ESP32, RDK X3) for line following, AprilTag-based localization, and autonomous navigation.' },
    responsibilities: [
      { zh: '选型与测试市面现有电机和传感器。', en: 'Selected and tested existing motors and sensors.' },
      { zh: '小车控制板 PCB 电路设计，集成电机驱动、IMU、STM32 控制核心等。', en: 'Designed PCB for control board (motor driver, IMU, STM32).' },
      { zh: '在 STM32 上实现闭环控制，并打包速度指令发送至 ESP32。', en: 'Implemented closed-loop control on STM32, sending speed commands to ESP32.' },
      { zh: '封装 ESP32 底盘运动学函数库和舵机步进电机函数库。', en: 'Encapsulated ESP32 chassis kinematics and servo/stepper motor libraries.' },
      { zh: '利用 RDK X3 进行 AprilTag 识别，实现精确的室内定位和导航。', en: 'Utilized RDK X3 for AprilTag recognition, implementing precise indoor localization and navigation.' },
      { zh: '使用 Blockly 对上述功能进行图形化编程环境搭建。', en: 'Used Blockly for graphical programming of functions.' },
    ],
    achievements: [
      { zh: '该机器人套件在大湾区中小学得到广泛应用，不仅助力学生在机器人竞赛中取得佳绩，还成功完成了 95% 的指定任务，包括自主导航和物体识别。', en: 'This robot kit, widely adopted in primary and secondary schools across the Greater Bay Area, not only fuels students\' success in robotics competitions but has also proven its efficacy by successfully completing 95% of designated tasks, including autonomous navigation and object recognition.' },
    ],
    tags: [{ zh: 'Arduino', en: 'Arduino' }, { zh: 'ESP32', en: 'ESP32' }, { zh: 'RDK X3', en: 'RDK X3' }, { zh: 'Blockly', en: 'Blockly' }, { zh: 'STEM', en: 'STEM' }],
    imageUrl: './photos/IMG_0070大.jpeg',
  },
  {
    id: 'dexterousHandControl',
    title: { zh: '灵巧手遥操作控制系统开发', en: 'Dexterous Hand Teleoperation Control System Development' },
    period: { zh: '2024年09月 - 2024年12月', en: '09/2024 – 12/2024' },
    description: { zh: '开发一种用于灵巧手的遥操作系统，以增强其在复杂环境中的操作灵活性和精确度。', en: 'Developing a Teleoperation control system for a dexterous hand to enhance operational flexibility and precision in complex environments.' },
    responsibilities: [
      { zh: '负责手指关节的正/逆向运动学计算。', en: 'Responsible for forward/inverse kinematics calculations of finger joints.' },
      { zh: '应用优化算法，有效地将人手关节运动映射到灵巧手关节。', en: 'Applied optimization algorithms to map human hand joint movements to dexterous hand joints effectively.' }
    ],
    achievements: [
      { zh: '在仿真和真实环境中成功实现了灵巧手模仿人手运动。', en: 'Successfully achieved dexterous hand mimicking human hand movements in simulation and real environments.' }
    ],
    tags: [{ zh: '遥操作', en: 'Teleoperation' }, { zh: '灵巧手', en: 'Dexterous Hand' }, { zh: '机器人学', en: 'Robotics' }, { zh: '运动学', en: 'Kinematics' }, { zh: '控制系统', en: 'Control Systems' }],
    imageUrl: './photos/图片 3.png',
  },
];

export const RESEARCH_DATA: ResearchEntry[] = [
  {
    id: 'dexhandeval',
    title: { zh: '基于遥操作的灵巧手设计与性能评估', en: 'Designing of a Dexterous Hand and Performance Evaluation Based on Teleoperation' },
    period: { zh: '2024.06 - 2024.12', en: 'Jun 2024 - Dec 2024' },
    role: { zh: '第一作者', en: 'First Author' },
    description: { zh: '设计一种新型灵巧手，并通过遥操作方式对其性能进行评估。', en: 'Designing a novel dexterous hand and evaluating its performance through teleoperation.' },
    publication: {
      text: { zh: 'EI 核心会议论文 (已录用)。发表于 IRAC。', en: 'EI Core Conference Paper (Accepted). Published at IRAC.' },
      url: 'https://ieeexplore.ieee.org/document/10871387'
    }
  },
];

export const AWARDS_DATA: AwardEntry[] = [
  {
    id: 'award1',
    name: { zh: '全国大学生电子设计大赛广东省一等奖', en: 'National Undergraduate Electronics Design Contest(Guangdong) - First Prize' },
    certificateImageUrl: './prize1.jpg',
  },
  {
    id: 'award2',
    name: { zh: '全国大学生机器人大赛 RoboMaster 三等奖', en: 'RoboMaster National University Robot Competition - Third Prize' },
    certificateImageUrl: './prize2.jpg',
  },
  {
    id: 'award3',
    name: { zh: 'RoboMaster 联盟赛哨兵机器人一等奖', en: 'RoboMaster League Sentry Robot First Prize' },
    certificateImageUrl: './prize3.jpg',
  },
  {
    id: 'award4',
    name: { zh: 'ICRA Agilex Sim2Real 挑战赛一等奖', en: 'ICRA Agilex Sim2Real Challenge First Prize' },
    certificateImageUrl: './prize4.jpg',
  },
  {
    id: 'award5',
    name: { zh: 'ICRA RoboMaster Sim2Real 挑战赛二等奖', en: 'ICRA RoboMaster Sim2Real Challenge Second Prize' },
    certificateImageUrl: './prize5.jpg'
  },
  {
    id: 'award6',
    name: { zh: 'ICRA Sim2Real 挑战赛二等奖', en: 'IEEE ICRA 2025 Sim2Real Challenge Second Prize' },
    certificateImageUrl: './prize6.jpg'
  },
];

export const SKILL_CATEGORIES_DATA: SkillCategory[] = [
  {
    name: { zh: '编程语言', en: 'Programming Languages' },
    skills: [
      { name: { zh: 'C/C++', en: 'C/C++' }, icon: <i className="devicon-cplusplus-plain"></i>, level: 5 },
      { name: { zh: 'Python', en: 'Python' }, icon: <i className="devicon-python-plain"></i>, level: 4 },
      { name: { zh: 'JavaScript/TypeScript', en: 'JavaScript/TypeScript' }, icon: <i className="devicon-typescript-plain"></i>, level: 3 },
      { name: { zh: 'MATLAB', en: 'MATLAB' }, icon: <i className="devicon-matlab-plain"></i>, level: 3 },
    ]
  },
  {
    name: { zh: '机器人与嵌入式', en: 'Robotics & Embedded' },
    skills: [
      { name: { zh: 'ROS/ROS2', en: 'ROS/ROS2' }, icon: <i className="fas fa-robot"></i>, level: 5 },
      { name: { zh: 'STM32 (HAL/LL)', en: 'STM32 (HAL/LL)' }, icon: <i className="fas fa-microchip"></i>, level: 5 },
      { name: { zh: 'Linux嵌入式开发', en: 'Linux Embedded Dev' }, icon: <i className="devicon-linux-plain"></i>, level: 4 },
      { name: { zh: 'Gazebo仿真', en: 'Gazebo Simulation' }, icon: <i className="fas fa-cube"></i>, level: 4 },
      { name: { zh: 'FreeRTOS', en: 'FreeRTOS' }, icon: <i className="fas fa-cogs"></i>, level: 3 },
      { name: { zh: 'Arduino/ESP32', en: 'Arduino/ESP32' }, icon: <i className="fas fa-laptop-code"></i>, level: 4 },
    ]
  },
  {
    name: { zh: 'AI与机器学习', en: 'AI & Machine Learning' },
    skills: [
      { name: { zh: '强化学习 (PPO)', en: 'Reinforcement Learning (PPO)' }, icon: <i className="fas fa-running"></i>, level: 4 },
      { name: { zh: '大语言模型 (LLM)', en: 'Large Language Models (LLM)' }, icon: <i className="fas fa-comments"></i>, level: 3 },
      { name: { zh: 'PyTorch', en: 'PyTorch' }, icon: <i className="devicon-pytorch-original"></i>, level: 4 },
      { name: { zh: '深度学习', en: 'Deep Learning' }, icon: <i className="fas fa-brain"></i>, level: 4 },
      { name: { zh: '模型部署', en: 'Edge AI Model Deployment' }, icon: <i className="fas fa-rocket"></i>, level: 4 },
      { name: { zh: 'OpenCV', en: 'OpenCV' }, icon: <i className="fas fa-camera-retro"></i>, level: 4 },
    ]
  },
  {
    name: { zh: '其他技术', en: 'Other Technologies' },
    skills: [
      { name: { zh: 'Git版本控制', en: 'Git Version Control' }, icon: <i className="devicon-git-plain"></i>, level: 4 },
      { name: { zh: 'React', en: 'React' }, icon: <i className="devicon-react-original"></i>, level: 3 },
      { name: { zh: 'Tailwind CSS', en: 'Tailwind CSS' }, icon: <i className="devicon-tailwindcss-plain"></i>, level: 3 },
      { name: { zh: 'Docker', en: 'Docker' }, icon: <i className="devicon-docker-plain"></i>, level: 2 },
      { name: { zh: 'PCB设计 (Altium)', en: 'PCB Design (Altium)' }, icon: <i className="fas fa-drafting-compass"></i>, level: 3 },
    ]
  },
];

export const SOCIAL_LINKS_DATA: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/shockley6668', icon: <i className="fab fa-github"></i>, label: { zh: '我的 GitHub', en: 'My GitHub' } },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shukun-huang-04378231a/', icon: <i className="fab fa-linkedin"></i>, label: { zh: '我的领英', en: 'My LinkedIn' } },
  { name: 'Email', url: 'mailto:2933151428@qq.com', icon: <i className="fas fa-envelope"></i>, label: { zh: '发送邮件给我', en: 'Send me an Email' } },
  { name: 'Phone', url: 'tel:+8615024220891', icon: <i className="fas fa-phone"></i>, label: { zh: '拨打电话', en: 'Call me' } },
];

export const CONTACT_STRINGS: ContactContent = {
  title: { zh: '保持联系', en: 'Get In Touch' },
  intro: { zh: '我对新的机遇和挑战总是充满热情。如果您有任何问题、项目合作或只是想打个招呼，请随时与我联系！', en: 'I\'m always excited about new opportunities and challenges. Feel free to reach out if you have any questions, project collaborations, or just want to say hi!' },
  cta: { zh: '期待您的来信！', en: 'Looking forward to hearing from you!' },
};

export const FOOTER_STRINGS: FooterContent = {
  copyrightName: { zh: '黄树坤', en: 'Shukun Huang' },
  rights: { zh: '版权所有', en: 'All rights reserved' },
  builtWith: { zh: '本站使用', en: 'Built with' },
};