import React from 'react';

export type Language = 'zh' | 'en';

export interface BilingualString {
  zh: string;
  en: string;
}

export interface NavLink {
  name: BilingualString;
  href: string;
}

export interface ProfileInfo {
  name: BilingualString;
  title: BilingualString;
  avatarUrl: string;
  heroTitle: BilingualString;
  heroSubtitle: BilingualString;
  heroButton: BilingualString;
}

export interface AboutContent {
  title: BilingualString;
  paragraphs: BilingualString[];
  imageUrl: string;
  galleryImages?: string[]; // Added for photo gallery
  galleryTitle?: BilingualString; // Added for photo gallery title
}

export interface EducationEntry {
  id: string;
  degree: BilingualString;
  major: BilingualString;
  institution: BilingualString;
  period: BilingualString;
  details?: BilingualString[];
  gpa?: BilingualString; // Support bilingual GPA display
  courses?: BilingualString[];
  logoUrl?: string; // Optional: for university logo/crest
}

export interface InternshipEntry {
  id: string;
  role: BilingualString;
  company: BilingualString;
  department?: BilingualString;
  period: BilingualString;
  responsibilities: BilingualString[];
  logoUrl?: string; // Optional: for company logo
}

export interface Project {
  id: string;
  title: BilingualString;
  description: BilingualString;
  period: BilingualString;
  responsibilities?: BilingualString[];
  achievements?: BilingualString[];
  tags: BilingualString[];
  imageUrl?: string; // Optional, can use generic or specific
  imageAspectRatio?: string; // Optional: e.g., "16/9" or "1833/1170"
  galleryImages?: string[]; // Optional: multiple images for gallery display
  liveUrl?: string;
  sourceUrl?: string;
}

export interface PublicationInfo {
  text: BilingualString;
  url?: string;
}

export interface ResearchEntry {
  id: string;
  title: BilingualString;
  period: BilingualString;
  role: BilingualString; // e.g., First Author
  description?: BilingualString; // Short summary if available
  publication?: PublicationInfo; // Updated to use PublicationInfo
}

export interface AwardEntry {
  id: string;
  name: BilingualString;
  issuer?: BilingualString; // Optional: if award issuer is distinct
  date?: BilingualString; // Optional: year or specific date
  certificateImageUrl?: string; // Optional: URL for the certificate image
  certificateDescription?: BilingualString; // Optional: Alt text for certificate image, defaults to award name
}


export interface Skill {
  name: BilingualString;
  icon?: React.ReactNode;
  level?: number; // Optional: 1-5 for proficiency
}

export interface SkillCategory {
  name: BilingualString;
  skills: Skill[];
}

export interface SocialLink {
  name: string; // Name is usually brand name, less likely to change
  url: string;
  icon: React.ReactNode;
  label: BilingualString; // For aria-label
}

export interface ContactContent {
  title: BilingualString;
  intro: BilingualString;
  cta: BilingualString;
}

export interface FooterContent {
  copyrightName: BilingualString;
  rights: BilingualString;
  builtWith: BilingualString;
}