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
  avatarUrl: './about/profile_image_mt_fuji.jpg', // Path relative to index.html
  heroTitle: { zh: '你好，我是黄树坤', en: 'Hello, I\'m Shukun Huang' },
  heroSubtitle: { zh: '专注于机器人技术、嵌入式系统和人工智能的工程师，热衷于将创新想法转化为实际解决方案。', en: 'A robotics engineer focused on embedded systems and AI, passionate about turning innovative ideas into real-world solutions.' },
  heroButton: { zh: '了解更多', en: 'Learn More' },
  downloadResume: { zh: '下载简历', en: 'Download Resume' },
};

export const NAV_LINKS_DATA: NavLink[] = [
  { name: { zh: '关于我', en: 'About Me' }, href: '#about' },
  { name: { zh: '教育背景', en: 'Education' }, href: '#education' },
  { name: { zh: '实习经历', en: 'Internships' }, href: '#internships' },
  { name: { zh: '项目经验', en: 'Projects' }, href: '#projects' },
  { name: { zh: '荣誉奖项', en: 'Awards' }, href: '#awards' },
  { name: { zh: '技能栈', en: 'Skills' }, href: '#skills' },
  { name: { zh: '学术成果', en: 'Publications' }, href: '#research' },
  { name: { zh: '联系我', en: 'Contact' }, href: '#contact' },
];

export const ABOUT_DATA: AboutContent = {
  title: { zh: '关于我', en: 'About Me' },
  imageUrl: './about/profile_photo.jpg',
  paragraphs: [
    {
      zh: '机器人应用工程师，现就职于深圳地瓜机器人（D-Robotics），主攻 RDK 边缘计算平台上的具身智能系统研发与落地。即将入读加拿大滑铁卢大学 ECE 系硕士（2026 年秋），本科就读于深圳技术大学计算机科学与技术专业，以专业前 15% 成绩毕业。',
      en: 'Robotics engineer at D-Robotics, building embodied intelligence systems on the RDK edge computing platform. Incoming M.Eng. at the University of Waterloo (ECE, Fall 2026). B.Eng. in Computer Science from Shenzhen Technology University, graduating top 15% of class.'
    },
    {
      zh: '从 RoboMaster 战队电控组长，到日立中国研究院、香港科技大学（广州），再到地瓜机器人——技术版图横跨裸机嵌入式（STM32/FreeRTOS）、3D LiDAR SLAM、Sim2Real 强化学习，以及端侧 VLA 大模型部署。曾从零设计并落地 10-DOF 双足机器人，斩获 ICRA Sim2Real 挑战赛一等奖、全国电子设计大赛广东省一等奖。',
      en: 'My path runs through RoboMaster team leadership, R&D at Hitachi China Research Lab, a teaching assistantship at HKUST(GZ), and applied AI at D-Robotics — across bare-metal firmware (STM32/FreeRTOS), 3D LiDAR SLAM, Sim2Real RL, and on-device VLA model deployment. Built a 10-DOF bipedal robot from the ground up. First Prize at ICRA Sim2Real Challenge; First Prize at the National Electronics Design Contest (Guangdong).'
    },
    {
      zh: '研究方向聚焦于具身智能——从机器人硬件设计到感知、决策与控制软件的全栈打通，让机器人真正理解并作用于物理世界。相信 Physical AI 是下一个十年最值得投入的方向。',
      en: 'My focus is embodied intelligence — bridging robot hardware and the full software stack of perception, decision-making, and control, so that machines can genuinely understand and act in the physical world. I believe Physical AI is the most important frontier of the next decade.'
    },
  ],
  galleryTitle: { zh: '机器人竞赛精彩瞬间', en: 'Robotics Competition Highlights' },
  galleryImages: [
    './about/gallery/IMG_0115大.jpeg',
    './about/gallery/IMG_0369.jpeg',
    './about/gallery/IMG_0370.jpeg',
    './about/gallery/IMG_1469中.jpeg',
    './about/gallery/pq.png',
    './about/gallery/图片 1.png',
    './about/gallery/图片 2.png',
    './about/gallery/图片 3.png',
    './about/gallery/图片 4.png',
    './about/gallery/robomaster.jpg',
  ],
};

export const EDUCATION_DATA: EducationEntry[] = [
  {
    id: 'waterloo',
    institution: { zh: '滑铁卢大学', en: 'University of Waterloo' },
    degree: { zh: '硕士', en: 'Master\'s Degree' },
    major: { zh: '电子与计算机工程 (ECE)', en: 'Electrical and Computer Engineering (ECE)' },
    period: { zh: '2026.09 - 2028.01', en: 'Sep 2026 - Jan 2028' },
    details: [
      { zh: '状态：待入学 (2026年秋季入学)', en: 'Incoming Student (Fall 2026 Intake)' }
    ],
    logoUrl: './education/waterloo_logo.png',
  },
  {
    id: 'sztu',
    institution: { zh: '深圳技术大学', en: 'Shenzhen Technology University' },
    degree: { zh: '本科', en: 'Bachelor\'s Degree' },
    major: { zh: '计算机科学与技术', en: 'Computer Science and Technology' },
    period: { zh: '2022.09 - 至今', en: 'Sep 2022 - Present' },
    gpa: { zh: 'GPA: 3.66/4.50 (专业前 15%, 28/200)', en: 'GPA: 3.66/4.50 (Ranked 28/200, Top 15%)' },
    courses: [
      { zh: '计算机组成原理', en: 'Computer Organization' },
      { zh: '数据结构与算法', en: 'Data Structures and Algorithms' },
      { zh: '操作系统', en: 'Operating Systems' },
      { zh: '单片机与嵌入式系统', en: 'Microcontroller and Embedded Systems' },
      { zh: '机器学习', en: 'Machine Learning' },
    ],
    logoUrl: './education/sztu_logo.png',
  },
];

export const INTERNSHIPS_DATA: InternshipEntry[] = [
  {
    id: 'digua2',
    role: { zh: '机器人应用工程师', en: 'Robotics Application Engineer' },
    company: { zh: '深圳地瓜机器人', en: 'D-Robotics' },
    period: { zh: '2026.04 - 至今', en: 'Apr 2026 - Present' },
    responsibilities: [
      {
        zh: '隶属生态部门，负责基于 RDK 平台的机器人 Demo 开发与展示，面向开发者和合作伙伴呈现地瓜机器人生态的核心能力。',
        en: 'Part of the Ecosystem Department, responsible for developing and showcasing robot demos based on the RDK platform, demonstrating core capabilities of the D-Robotics ecosystem to developers and partners.'
      },
      {
        zh: '开发各类机器人应用 Demo，涵盖感知、控制、具身智能等方向，助力推动 RDK 开发者生态建设。',
        en: 'Developed various robot application demos covering perception, control, and embodied intelligence, contributing to the growth of the RDK developer ecosystem.'
      },
    ],
  },
  {
    id: 'hkustgz',
    role: { zh: '工程创新教学助理（副校长·教学办公室）', en: 'Engineering Innovation Teaching Assistant · Office of VP for Academic Affairs' },
    company: { zh: '香港科技大学（广州）', en: 'The Hong Kong University of Science and Technology (Guangzhou)' },
    period: { zh: '2026.01 - 2026.03', en: 'Jan 2026 - Mar 2026' },
    responsibilities: [
      {
        zh: '受香港科技大学（广州）副校长（教学）办公室委任，担任卡丁车创造营工程实践课程核心教学助理，将机械结构、电气系统与嵌入式控制整合为系统化项目制课程，各组均在规定时间内完成整车调试并通过性能测试。',
        en: 'Appointed by the Office of the Vice-President for Academic Affairs at HKUST(GZ) as a core teaching assistant for the Go-Kart Creation Camp, integrating mechanical, electrical, and embedded control systems into a structured project-based curriculum; achieved 100% team completion within the project timeline.'
      },
      {
        zh: '将复杂机电一体化概念转化为面向不同背景学员的模块化教学内容，指导跨学科团队在高强度周期内完成从零到一的工程设计闭环，获学员与主办方一致好评。',
        en: 'Translated complex mechatronics concepts into accessible, modular instructional content; mentored cross-disciplinary teams through the full engineering design cycle under tight deadlines, receiving commendation from both participants and program organizers.'
      },
    ],
  },
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
    id: 'sast',
    role: { zh: '机器人工程师', en: 'Robotics Engineer' },
    company: { zh: '深圳科创学院', en: 'Shenzhen Innox' },
    period: { zh: '2024.01 - 2024.02', en: 'Jan 2024 - Feb 2024' },
    responsibilities: [
      { zh: '开发并优化用于控制DJI教育套件机器人的ROS功能包，涵盖从STM32底层驱动到机器人导航定位。', en: 'Developed and optimized ROS packages for DJI education kit robots, covering from STM32 low-level drivers to robot navigation and localization.' },
      { zh: '成功实现了机器人在多种复杂环境下的稳定运行。', en: 'Successfully enabled stable robot operation in various complex environments.' },
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
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'bipedalRobot',
    title: { zh: 'NVIDIA BDX 双足机器人复现', en: 'NVIDIA BDX Bipedal Robot Replication' },
    period: { zh: '2025.12 - 至今', en: 'Dec 2025 - Present' },
    description: { zh: '开源低成本 10-DOF 双足机器人方案，采用 RDK X5 + STM32H7 深度硬件解耦架构，完整覆盖 Isaac Gym 强化学习训练、MuJoCo 跨引擎验证到边缘端 Sim2Real 部署的全栈流程。', en: 'An open-source, low-cost 10-DOF bipedal robot solution with a deep hardware-software decoupled architecture (RDK X5 + STM32H7), covering the full stack from Isaac Gym RL training and MuJoCo cross-engine validation to edge-side Sim2Real deployment.' },
    responsibilities: [
      { zh: '设计 RDK X5（大脑）+ STM32H7（小脑）深度解耦架构：RDK X5 运行 ROS 2 以 50Hz 完成神经网络推理，STM32H7 基于 FreeRTOS 专注高频 PD 闭环电机控制与 IMU 姿态解算。', en: 'Designed a deep hardware-software decoupled architecture: RDK X5 (Brain) runs ROS 2 for 50Hz neural network inference, while STM32H7 (Cerebellum) runs FreeRTOS for high-frequency PD closed-loop motor control and IMU attitude solving.' },
      { zh: '采用 MAVLink 协议替代标准串口，通过全双工 USB 虚拟串口传输，利用 X.25 CRC 校验彻底消除粘包和丢帧问题，实现零丢包通信。', en: 'Replaced standard serial with MAVLink protocol over full-duplex USB virtual serial port, leveraging X.25 CRC checks to completely eliminate packet sticking and frame drop, achieving zero-packet-loss communication.' },
      { zh: '机械设计采用倒置质量分布（电池、主控板集中在腰部），配合 CNC 铝合金 + 碳纤维 + 3D 打印混合制造工艺，整机重量控制在 8kg 以内。', en: 'Mechanical design uses inverted mass distribution (battery and boards packed in waist/torso) with hybrid CNC aluminum + carbon fiber + 3D printing manufacturing, keeping total weight under 8kg.' },
      { zh: '在 NVIDIA Isaac Gym 中进行大规模并行 PPO 强化学习训练，结合 MuJoCo 跨引擎验证，通过领域随机化优化 Sim2Real 迁移效果。', en: 'Conducted massive parallel PPO RL training in NVIDIA Isaac Gym, combined with MuJoCo cross-engine validation, and optimized Sim2Real transfer through domain randomization.' },
      { zh: '将训练好的策略导出为 ONNX 格式，部署至 RDK X5 边缘端进行实时推理，最终实现机器人在真实世界中的稳健步行。', en: 'Exported trained policies to ONNX format and deployed to RDK X5 for real-time edge inference, achieving robust real-world locomotion.' },
    ],
    achievements: [
      { zh: '成功在物理双足机器人上部署强化学习策略，机器人可响应手柄速度指令稳定行走，并具备一定抗外部干扰能力。', en: 'Successfully deployed RL policy on a physical bipedal robot; the robot tracks joystick velocity commands stably and handles minor external disturbances.' },
      { zh: '相关毕业论文荣获学校优秀毕业论文。', en: 'The related graduation thesis was awarded Outstanding Graduation Thesis by the university.' },
      { zh: '在地瓜机器人社区发布开源教程，完整开放硬件设计、嵌入式代码与 RL 训练代码。', en: 'Published an open-source tutorial on D-Robotics community, fully open-sourcing hardware design, embedded code, and RL training code.' },
    ],
    tags: [{ zh: '强化学习', en: 'RL' }, { zh: 'STM32 H7', en: 'STM32 H7' }, { zh: 'RDK X5', en: 'RDK X5' }, { zh: 'Sim2Real', en: 'Sim2Real' }, { zh: 'Isaac Gym', en: 'Isaac Gym' }, { zh: 'ROS 2', en: 'ROS 2' }, { zh: '机器人学', en: 'Robotics' }],
    imageUrl: './projects/bdx/bdx_walk.gif',
    galleryImages: [
      './projects/bdx/bdx_walk.gif',
      './projects/bdx/bdx_robot.jpeg',
      './projects/bdx/bdx_mech.jpeg',
      './projects/bdx/bdx_arch.jpeg',
      './projects/bdx/bdx_train1.jpeg',
      './projects/bdx/bdx_train2.jpeg',
    ],
    liveUrl: 'https://forum-en.d-robotics.cc/t/zero-to-one-the-guide-to-building-a-bipedal-robot-with-the-rdk-x5/484',
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
    imageUrl: './projects/cathay/cathay5.png',
    galleryImages: [
      './projects/cathay/cathay5.png',
      './projects/cathay/cathay.png',
      './projects/cathay/cathay2.png',
      './projects/cathay/cathay3.png',
      './projects/cathay/cathay4.png',
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
    imageUrl: './projects/stm32hal/rm.jpg',
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
    imageUrl: './projects/3dlidar/sentry.jpg',
    galleryImages: [
      './projects/3dlidar/sentry.jpg',
      './projects/3dlidar/sentry_desc.png',
      './projects/3dlidar/sentry_group.jpg',
    ],
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
    imageUrl: './projects/stemed/stemed.jpeg',
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
    imageUrl: './projects/hand/hand.png',
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
    certificateImageUrl: '/awards/prize1.jpg',
  },
  {
    id: 'award2',
    name: { zh: '全国大学生机器人大赛 RoboMaster 三等奖', en: 'RoboMaster National University Robot Competition - Third Prize' },
    certificateImageUrl: '/awards/prize2.jpg',
  },
  {
    id: 'award3',
    name: { zh: 'RoboMaster 联盟赛哨兵机器人一等奖', en: 'RoboMaster League Sentry Robot First Prize' },
    certificateImageUrl: '/awards/prize3.jpg',
  },
  {
    id: 'award4',
    name: { zh: 'ICRA Agilex Sim2Real 挑战赛一等奖', en: 'ICRA Agilex Sim2Real Challenge First Prize' },
    certificateImageUrl: '/awards/prize4.jpg',
  },
  {
    id: 'award5',
    name: { zh: 'ICRA RoboMaster Sim2Real 挑战赛二等奖', en: 'ICRA RoboMaster Sim2Real Challenge Second Prize' },
    certificateImageUrl: '/awards/prize5.jpg'
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
  { name: 'Email', url: 'mailto:shukun.huang.robotics@gmail.com', icon: <i className="fas fa-envelope"></i>, label: { zh: '发送邮件给我', en: 'Send me an Email' } },
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