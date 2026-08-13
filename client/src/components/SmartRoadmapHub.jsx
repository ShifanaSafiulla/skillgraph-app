import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Award,
  DollarSign,
  Video,
  CheckCircle2,
  ExternalLink,
  Filter,
  Play,
  ArrowRight,
  Code2
} from 'lucide-react';

export const DEFAULT_FREE_COURSES = [
  {
    id: 'free-1',
    name: 'Programming in Python & Backend Fundamentals',
    platform: 'NPTEL / SWAYAM',
    skill: 'Python',
    duration: '8 Weeks',
    difficulty: 'Beginner',
    certificate: 'Free Certification Available',
    url: 'https://swayam.gov.in',
    type: 'free'
  },
  {
    id: 'free-2',
    name: 'Python for Beginners & Scripting Essentials',
    platform: 'Infosys Springboard',
    skill: 'Python',
    duration: '6 Hours',
    difficulty: 'Beginner',
    certificate: 'Free Certificate',
    url: 'https://infyspringboard.onwingspan.com',
    type: 'free'
  },
  {
    id: 'free-3',
    name: 'Python for Data Science & AI Foundations',
    platform: 'IBM SkillsBuild',
    skill: 'Python',
    duration: '10 Hours',
    difficulty: 'Intermediate',
    certificate: 'IBM Digital Badge',
    url: 'https://skillsbuild.org',
    type: 'free'
  },
  {
    id: 'free-4',
    name: 'Web Application Development with Flask & REST APIs',
    platform: 'freeCodeCamp',
    skill: 'Flask',
    duration: '5 Hours',
    difficulty: 'Intermediate',
    certificate: 'Free Certification',
    url: 'https://www.freecodecamp.org',
    type: 'free'
  },
  {
    id: 'free-5',
    name: 'Git & GitHub Version Control Certification',
    platform: 'Microsoft Learn',
    skill: 'Git',
    duration: '4 Hours',
    difficulty: 'Beginner',
    certificate: 'Microsoft Verified Badge',
    url: 'https://learn.microsoft.com',
    type: 'free'
  },
  {
    id: 'free-6',
    name: 'Object-Oriented Programming (OOP) in Python',
    platform: 'Great Learning Academy',
    skill: 'OOP',
    duration: '3.5 Hours',
    difficulty: 'Intermediate',
    certificate: 'Free Certificate',
    url: 'https://www.mygreatlearning.com/academy',
    type: 'free'
  },
  {
    id: 'free-7',
    name: 'Python File Handling & Data Stream Processing',
    platform: 'Simplilearn SkillUp',
    skill: 'File Handling',
    duration: '2.5 Hours',
    difficulty: 'Beginner',
    certificate: 'Free Completion Certificate',
    url: 'https://www.simplilearn.com/skillup-free-online-courses',
    type: 'free'
  },
  {
    id: 'free-8',
    name: 'Full-Stack JavaScript & React Development',
    platform: 'freeCodeCamp',
    skill: 'React.js',
    duration: '300 Hours',
    difficulty: 'Intermediate',
    certificate: 'Free Certification',
    url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
    type: 'free'
  },
  {
    id: 'free-9',
    name: 'Networking & API Basics Certification',
    platform: 'Cisco Networking Academy',
    skill: 'REST API',
    duration: '15 Hours',
    difficulty: 'Beginner',
    certificate: 'Cisco Networking Badge',
    url: 'https://www.netacad.com',
    type: 'free'
  },
  {
    id: 'free-10',
    name: 'Google Data Analytics Professional Foundations',
    platform: 'Google Learning Platforms',
    skill: 'SQL',
    duration: '12 Hours',
    difficulty: 'Beginner',
    certificate: 'Google Skill Badge',
    url: 'https://grow.google',
    type: 'free'
  }
];

export const DEFAULT_PAID_COURSES = [
  {
    id: 'paid-1',
    name: 'Complete Python BootCamp: Go from Zero to Hero',
    platform: 'Udemy',
    skill: 'Python',
    duration: '22 Hours',
    paidLabel: 'Paid Course',
    url: 'https://www.udemy.com',
    difficulty: 'Beginner',
    type: 'paid'
  },
  {
    id: 'paid-2',
    name: 'Python for Everybody Specialization',
    platform: 'Coursera',
    skill: 'Python',
    duration: '3 Months',
    paidLabel: 'Paid Specialization',
    url: 'https://www.coursera.org',
    difficulty: 'Beginner',
    type: 'paid'
  },
  {
    id: 'paid-3',
    name: 'REST API Development with Flask & Python',
    platform: 'Udemy',
    skill: 'REST API',
    duration: '17 Hours',
    paidLabel: 'Paid Course',
    url: 'https://www.udemy.com',
    difficulty: 'Intermediate',
    type: 'paid'
  },
  {
    id: 'paid-4',
    name: 'The Complete Web Developer in 2026: Zero to Mastery',
    platform: 'edX',
    skill: 'Full-Stack',
    duration: '4 Months',
    paidLabel: 'Paid Professional Certificate',
    url: 'https://www.edx.org',
    difficulty: 'Advanced',
    type: 'paid'
  },
  {
    id: 'paid-5',
    name: 'Learning Object-Oriented Programming (OOP) with Python',
    platform: 'LinkedIn Learning',
    skill: 'OOP',
    duration: '4.5 Hours',
    paidLabel: 'Paid Course',
    url: 'https://www.linkedin.com/learning',
    difficulty: 'Intermediate',
    type: 'paid'
  },
  {
    id: 'paid-6',
    name: 'Mastering Git & GitHub Masterclass',
    platform: 'Udemy',
    skill: 'Git',
    duration: '11.5 Hours',
    paidLabel: 'Paid Course',
    url: 'https://www.udemy.com',
    difficulty: 'Intermediate',
    type: 'paid'
  }
];

export const DEFAULT_CAREER_VIDEOS = {
  'python-developer': [
    {
      id: 'vid-py-1',
      title: 'Python Developer Roadmap 2026 - Complete Guide',
      channel: 'freeCodeCamp.org',
      duration: '45 mins',
      topic: 'Career Roadmap',
      url: 'https://www.youtube.com/results?search_query=python+developer+roadmap',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-py-2',
      title: 'How to Become a Successful Python Developer',
      channel: 'Tech Lead Insights',
      duration: '22 mins',
      topic: 'Career Strategy',
      url: 'https://www.youtube.com/results?search_query=how+to+become+python+developer',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-py-3',
      title: '10 Python Projects for Beginners to Build Your Portfolio',
      channel: 'Clever Programmer',
      duration: '2.5 Hours',
      topic: 'Portfolio Projects',
      url: 'https://www.youtube.com/results?search_query=python+projects+for+beginners',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-py-4',
      title: 'Flask Tutorial for Beginners - Full Course',
      channel: 'Corey Schafer',
      duration: '3.5 Hours',
      topic: 'Flask Tutorial',
      url: 'https://www.youtube.com/results?search_query=flask+tutorial+for+beginners',
      thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-py-5',
      title: 'REST API Crash Course - Concepts & Building APIs',
      channel: 'Traversy Media',
      duration: '1.2 Hours',
      topic: 'REST API Tutorial',
      url: 'https://www.youtube.com/results?search_query=rest+api+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-py-6',
      title: 'Python Interview Preparation - Top 25 Questions Asked',
      channel: 'Programming with Mosh',
      duration: '1.5 Hours',
      topic: 'Python Interview Prep',
      url: 'https://www.youtube.com/results?search_query=python+interview+preparation',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60'
    }
  ],
  'fullstack-developer': [
    {
      id: 'vid-fs-1',
      title: 'Full Stack Web Developer Roadmap 2026',
      channel: 'Traversy Media',
      duration: '35 mins',
      topic: 'Full-Stack Roadmap',
      url: 'https://www.youtube.com/results?search_query=full+stack+developer+roadmap',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-fs-2',
      title: 'React.js Complete Beginner to Advanced Course',
      channel: 'freeCodeCamp.org',
      duration: '11 Hours',
      topic: 'React Tutorial',
      url: 'https://www.youtube.com/results?search_query=react+js+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-fs-3',
      title: 'Node.js & Express.js Backend Masterclass',
      channel: 'Programming with Mosh',
      duration: '3 Hours',
      topic: 'Node.js Backend',
      url: 'https://www.youtube.com/results?search_query=node+js+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-fs-4',
      title: 'MongoDB Database Tutorial for Beginners',
      channel: 'Fireship',
      duration: '1.5 Hours',
      topic: 'MongoDB Tutorial',
      url: 'https://www.youtube.com/results?search_query=mongodb+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-fs-5',
      title: 'Modern HTML & CSS Responsive Layouts',
      channel: 'Dev Ed',
      duration: '4 Hours',
      topic: 'HTML & CSS',
      url: 'https://www.youtube.com/results?search_query=html+css+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-fs-6',
      title: 'Full Stack Interview Questions & System Design',
      channel: 'ByteByteGo',
      duration: '40 mins',
      topic: 'Full-Stack Interview',
      url: 'https://www.youtube.com/results?search_query=full+stack+interview+questions',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60'
    }
  ],
  'data-analyst': [
    {
      id: 'vid-da-1',
      title: 'Data Analyst Roadmap 2026 - Skills & Projects',
      channel: 'Alex The Analyst',
      duration: '30 mins',
      topic: 'Data Analyst Roadmap',
      url: 'https://www.youtube.com/results?search_query=data+analyst+roadmap',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-da-2',
      title: 'SQL Complete Bootcamp for Data Analytics',
      channel: 'freeCodeCamp.org',
      duration: '4.5 Hours',
      topic: 'SQL Tutorial',
      url: 'https://www.youtube.com/results?search_query=sql+tutorial+for+data+analytics',
      thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-da-3',
      title: 'Tableau Dashboard Building for Beginners',
      channel: 'Ken Flerlage',
      duration: '2 Hours',
      topic: 'Data Visualization',
      url: 'https://www.youtube.com/results?search_query=tableau+dashboard+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60'
    }
  ],
  'data-scientist': [
    {
      id: 'vid-ds-1',
      title: 'Data Science Roadmap 2026 - Complete Guide',
      channel: 'Ken Jee',
      duration: '40 mins',
      topic: 'Data Science Roadmap',
      url: 'https://www.youtube.com/results?search_query=data+science+roadmap',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-ds-2',
      title: 'Machine Learning Course for Beginners',
      channel: 'freeCodeCamp.org',
      duration: '10 Hours',
      topic: 'Machine Learning',
      url: 'https://www.youtube.com/results?search_query=machine+learning+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
    }
  ],
  'ml-engineer': [
    {
      id: 'vid-ml-1',
      title: 'Machine Learning Engineer Roadmap 2026',
      channel: 'Daniel Bourke',
      duration: '50 mins',
      topic: 'ML Roadmap',
      url: 'https://www.youtube.com/results?search_query=ml+engineer+roadmap',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'vid-ml-2',
      title: 'PyTorch Deep Learning & Neural Networks',
      channel: 'freeCodeCamp.org',
      duration: '25 Hours',
      topic: 'Deep Learning',
      url: 'https://www.youtube.com/results?search_query=pytorch+tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60'
    }
  ]
};

export const DEFAULT_SKILL_GUIDES = {
  'Python': {
    skill: 'Python',
    learn: {
      free: { name: 'Python Programming Essentials', platform: 'NPTEL / SWAYAM', url: 'https://swayam.gov.in' },
      paid: { name: '100 Days of Code: Complete Python Masterclass', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'Python Beginner Tutorial (Full 6 Hour Course)', channel: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=python+tutorial' },
      { title: 'Python OOP & Advanced Concepts Guide', channel: 'Corey Schafer', url: 'https://www.youtube.com/results?search_query=python+oop' }
    ],
    practice: {
      title: 'Python Mini-Project: Automated File Manager & Script',
      difficulty: 'Beginner'
    },
    nextStep: 'Flask & REST APIs'
  },
  'Flask': {
    skill: 'Flask',
    learn: {
      free: { name: 'Python Flask Web Framework Tutorial', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
      paid: { name: 'REST APIs with Flask and Python', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'Flask Crash Course 2026', channel: 'Traversy Media', url: 'https://www.youtube.com/results?search_query=flask+crash+course' },
      { title: 'Building Web Apps with Flask & SQLAlchemy', channel: 'Tech With Tim', url: 'https://www.youtube.com/results?search_query=flask+sqlalchemy' }
    ],
    practice: {
      title: 'Flask Mini-Project: RESTful Todo & Notes API with Auth',
      difficulty: 'Intermediate'
    },
    nextStep: 'REST API & Microservices'
  },
  'REST API': {
    skill: 'REST API',
    learn: {
      free: { name: 'API Design & Networking Fundamentals', platform: 'Cisco Networking Academy', url: 'https://www.netacad.com' },
      paid: { name: 'RESTful API Architecture & Design Patterns', platform: 'Coursera', url: 'https://www.coursera.org' }
    },
    watch: [
      { title: 'REST API Concepts Explained Simply', channel: 'Fireship', url: 'https://www.youtube.com/results?search_query=rest+api+concepts' },
      { title: 'Postman & API Testing Masterclass', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=postman+api+testing' }
    ],
    practice: {
      title: 'REST API Practice: Build & Test API Client with Postman',
      difficulty: 'Intermediate'
    },
    nextStep: 'Database Persistence (MongoDB / SQL)'
  },
  'Git': {
    skill: 'Git',
    learn: {
      free: { name: 'Git & GitHub Complete Certification', platform: 'Microsoft Learn', url: 'https://learn.microsoft.com' },
      paid: { name: 'Git Complete: The Definitive Guide to Git', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'Git & GitHub Crash Course for Beginners', channel: 'Traversy Media', url: 'https://www.youtube.com/results?search_query=git+github+crash+course' },
      { title: 'Git Branching & PR Workflow Explained', channel: 'Fireship', url: 'https://www.youtube.com/results?search_query=git+branching+workflow' }
    ],
    practice: {
      title: 'Git Practice: Initialize Repo, Commit History, Create Branches & PRs',
      difficulty: 'Beginner'
    },
    nextStep: 'DevOps & Docker Basics'
  },
  'OOP': {
    skill: 'OOP',
    learn: {
      free: { name: 'Object-Oriented Programming (OOP) in Python', platform: 'Great Learning Academy', url: 'https://www.mygreatlearning.com' },
      paid: { name: 'Mastering OOP Concepts in Modern Languages', platform: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning' }
    },
    watch: [
      { title: 'OOP in Python Tutorial (Classes, Inheritance, Polymorphism)', channel: 'Corey Schafer', url: 'https://www.youtube.com/results?search_query=oop+python' },
      { title: 'Object Oriented Programming in 10 Minutes', channel: 'Fireship', url: 'https://www.youtube.com/results?search_query=oop+in+10+minutes' }
    ],
    practice: {
      title: 'OOP Mini-Project: Design Bank Account & Employee Hierarchy System',
      difficulty: 'Intermediate'
    },
    nextStep: 'Design Patterns'
  },
  'File Handling': {
    skill: 'File Handling',
    learn: {
      free: { name: 'Python File Input/Output & Stream Processing', platform: 'Simplilearn SkillUp', url: 'https://www.simplilearn.com' },
      paid: { name: 'Advanced Python File Systems & Data Processing', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'Python File Handling (Read, Write, Append, JSON, CSV)', channel: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=python+file+handling' },
      { title: 'Working with Files & Context Managers in Python', channel: 'Corey Schafer', url: 'https://www.youtube.com/results?search_query=python+context+managers' }
    ],
    practice: {
      title: 'File Handling Mini-Project: CSV & JSON Log Parser Script',
      difficulty: 'Beginner'
    },
    nextStep: 'Data Processing with Pandas'
  },
  'SQL': {
    skill: 'SQL',
    learn: {
      free: { name: 'Google Data Analytics Professional SQL Foundations', platform: 'Google Learning Platforms', url: 'https://grow.google' },
      paid: { name: 'The Complete SQL Bootcamp: Go from Zero to Hero', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'SQL Tutorial - Full Database Course for Beginners', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=sql+tutorial' },
      { title: 'SQL Joins & Complex Queries Explained', channel: 'Fireship', url: 'https://www.youtube.com/results?search_query=sql+joins' }
    ],
    practice: {
      title: 'SQL Practice: Relational Schema & Query Optimization',
      difficulty: 'Intermediate'
    },
    nextStep: 'Database Management Systems (DBMS)'
  }
};

export default function SmartRoadmapHub({ skills, selectedCareerId = 'python-developer' }) {
  const [catalog, setCatalog] = useState({
    freeCourses: DEFAULT_FREE_COURSES,
    paidCourses: DEFAULT_PAID_COURSES,
    careerVideos: DEFAULT_CAREER_VIDEOS,
    skillSpecificGuides: DEFAULT_SKILL_GUIDES
  });
  const [progressMap, setProgressMap] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMissingSkill, setSelectedMissingSkill] = useState('Python');

  // Career to missing skills mapping
  const careerMissingSkillsMap = {
    'python-developer': ['Python', 'Flask', 'REST API', 'Git', 'OOP', 'File Handling', 'SQL'],
    'fullstack-developer': ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML & CSS', 'Git'],
    'data-analyst': ['Python', 'SQL', 'Data Visualization & Tableau', 'Excel & Statistics', 'Pandas & Data Manipulation'],
    'data-scientist': ['Python', 'Statistics & Probability', 'Machine Learning', 'Pandas & Data Processing', 'SQL'],
    'ml-engineer': ['Python', 'Machine Learning', 'Deep Learning & PyTorch', 'MLOps & Docker', 'Git']
  };

  const missingSkillsList = careerMissingSkillsMap[selectedCareerId] || ['Python', 'Flask', 'REST API', 'Git'];

  useEffect(() => {
    if (missingSkillsList.length > 0 && !missingSkillsList.includes(selectedMissingSkill)) {
      setSelectedMissingSkill(missingSkillsList[0]);
    }
  }, [selectedCareerId]);

  // Fetch API data if server responds, fallback to DEFAULT state instantly
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCatalog, resProgress] = await Promise.all([
          fetch('/api/resources'),
          fetch('/api/roadmap/progress')
        ]);

        if (resCatalog.ok) {
          const dataCat = await resCatalog.json();
          if (dataCat.success && dataCat.data) {
            setCatalog({
              freeCourses: dataCat.data.freeCourses || DEFAULT_FREE_COURSES,
              paidCourses: dataCat.data.paidCourses || DEFAULT_PAID_COURSES,
              careerVideos: dataCat.data.careerVideos || DEFAULT_CAREER_VIDEOS,
              skillSpecificGuides: dataCat.data.skillSpecificGuides || DEFAULT_SKILL_GUIDES
            });
          }
        }

        if (resProgress.ok) {
          const dataProg = await resProgress.json();
          if (dataProg.success && dataProg.data) {
            setProgressMap(dataProg.data || {});
          }
        }
      } catch (err) {
        console.warn('API fetch notice, using default resources catalog:', err);
      }
    };

    fetchData();
  }, []);

  // Update status in MongoDB
  const handleUpdateStatus = async (resourceId, skillName, newStatus) => {
    setProgressMap(prev => ({ ...prev, [resourceId]: newStatus }));

    try {
      await fetch('/api/roadmap/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId, skillName, status: newStatus })
      });
    } catch (err) {
      console.error('Error saving progress to MongoDB:', err);
    }
  };

  const freeCourses = catalog?.freeCourses || DEFAULT_FREE_COURSES;
  const paidCourses = catalog?.paidCourses || DEFAULT_PAID_COURSES;
  const careerVidsList = (catalog?.careerVideos && catalog.careerVideos[selectedCareerId]) || DEFAULT_CAREER_VIDEOS[selectedCareerId] || DEFAULT_CAREER_VIDEOS['python-developer'];

  // Filtered free courses
  const filteredFreeCourses = useMemo(() => {
    return freeCourses.filter(c => {
      if (activeFilter === 'All' || activeFilter === 'Free') return true;
      if (activeFilter === 'Certificate Available') return Boolean(c.certificate);
      if (['Beginner', 'Intermediate', 'Advanced'].includes(activeFilter)) return c.difficulty === activeFilter;
      return false; // If 'Paid' selected, hide free section
    });
  }, [freeCourses, activeFilter]);

  // Filtered paid courses
  const filteredPaidCourses = useMemo(() => {
    return paidCourses.filter(c => {
      if (activeFilter === 'All' || activeFilter === 'Paid') return true;
      if (['Beginner', 'Intermediate', 'Advanced'].includes(activeFilter)) return c.difficulty === activeFilter;
      return false; // If 'Free' or 'Certificate Available' selected, hide paid section
    });
  }, [paidCourses, activeFilter]);

  // Skill-specific focus guide for selected missing skill
  const skillGuide = catalog?.skillSpecificGuides?.[selectedMissingSkill] || DEFAULT_SKILL_GUIDES[selectedMissingSkill] || {
    skill: selectedMissingSkill,
    learn: {
      free: { name: `Free ${selectedMissingSkill} Fundamentals Certification`, platform: 'freeCodeCamp / SWAYAM', url: 'https://www.freecodecamp.org' },
      paid: { name: `Complete ${selectedMissingSkill} Bootcamp Masterclass`, platform: 'Udemy / Coursera', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: `${selectedMissingSkill} Beginner Tutorial (Full Course 2026)`, channel: 'freeCodeCamp.org', url: 'https://www.youtube.com' },
      { title: `${selectedMissingSkill} Concepts & Hands-on Guide`, channel: 'Traversy Media', url: 'https://www.youtube.com' }
    ],
    practice: {
      title: `${selectedMissingSkill} Mini-Project: Hands-on Implementation`,
      difficulty: 'Intermediate'
    },
    nextStep: 'Node.js & Scalable Architecture'
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Completed': return { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid #10b981' };
      case 'Learning': return { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid #f59e0b' };
      default: return { bg: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255, 255, 255, 0.1)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Module 3 Header */}
      <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', padding: '0.65rem', borderRadius: '12px' }}>
              <BookOpen size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                  Module 3: Smart Learning Roadmap & Resource Hub
                </h2>
                <span className="badge-level level-beginner" style={{ fontSize: '0.7rem', background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
                  MongoDB Progress Active
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
                Personalized roadmap based on missing career skills with certified free courses, paid courses, videos, and topic progress tracking.
              </p>
            </div>
          </div>

          {/* Interactive Multi-Criteria Filter Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Filter size={15} color="var(--text-muted)" style={{ marginRight: '0.2rem' }} />
            {['All', 'Free', 'Paid', 'Certificate Available', 'Beginner', 'Intermediate', 'Advanced'].map(flt => (
              <button
                key={flt}
                onClick={() => setActiveFilter(flt)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '16px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: activeFilter === flt ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: activeFilter === flt ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                {flt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: Skill-Specific Focused Resource Hub */}
      <div className="glass-card animate-fade-in" style={{ padding: '1.75rem 2rem', background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Skill-Specific Resource Navigator
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
              Missing Skill Focus: <span style={{ color: '#818cf8' }}>{selectedMissingSkill}</span>
            </h3>
          </div>

          {/* Missing Skill Selector Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {missingSkillsList.map(sk => (
              <button
                key={sk}
                onClick={() => setSelectedMissingSkill(sk)}
                style={{
                  padding: '0.35rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedMissingSkill === sk ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' : 'rgba(255, 255, 255, 0.06)',
                  color: selectedMissingSkill === sk ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                {sk}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Block Skill Roadmap Grid (Learn, Watch, Practice, Next Step) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          
          {/* 1. Learn Block */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#818cf8', fontWeight: 700 }}>
              <BookOpen size={18} />
              <span>Learn</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>Free Option</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginTop: '0.2rem' }}>{skillGuide.learn.free.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{skillGuide.learn.free.platform}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>Paid Option</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginTop: '0.2rem' }}>{skillGuide.learn.paid.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{skillGuide.learn.paid.platform}</div>
              </div>
            </div>
          </div>

          {/* 2. Watch Block */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#38bdf8', fontWeight: 700 }}>
              <Video size={18} />
              <span>Watch</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skillGuide.watch.map((v, idx) => (
                <a
                  key={idx}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{v.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>📺 {v.channel}</div>
                </a>
              ))}
            </div>
          </div>

          {/* 3. Practice Block */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#34d399', fontWeight: 700 }}>
              <Code2 size={18} />
              <span>Practice</span>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>
                {skillGuide.practice.title}
              </div>
              <span className="badge-level level-beginner" style={{ marginTop: '0.6rem', fontSize: '0.7rem' }}>
                Difficulty: {skillGuide.practice.difficulty}
              </span>
            </div>
          </div>

          {/* 4. Next Step Block */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#c084fc', fontWeight: 700 }}>
              <ArrowRight size={18} />
              <span>Next Step</span>
            </div>
            <div style={{ background: 'rgba(168, 85, 247, 0.05)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Recommended After {selectedMissingSkill}:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#e9d5ff', marginTop: '0.25rem' }}>
                {skillGuide.nextStep}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: Free Certified Courses (Strictly Separated) */}
      {filteredFreeCourses.length > 0 && (
        <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <Award size={22} color="#10b981" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
              Free Certified Courses ({filteredFreeCourses.length})
            </h3>
            <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: 600 }}>
              Recognised Platforms & Certifications
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredFreeCourses.map(course => {
              const currentStatus = progressMap[course.id] || 'Not Started';
              const statusStyle = getStatusBadgeStyle(currentStatus);

              return (
                <div
                  key={course.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.12)', color: '#38bdf8', padding: '0.25rem 0.65rem', borderRadius: '8px', fontWeight: 700 }}>
                        {course.platform}
                      </span>
                      <span style={{ fontSize: '0.7rem', ...statusStyle, padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                        {currentStatus}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: '0.75rem', lineHeight: 1.35 }}>
                      {course.name}
                    </h4>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span>🎯 <strong>Skill:</strong> {course.skill}</span>
                      <span>⏱️ <strong>Duration:</strong> {course.duration}</span>
                      <span>📊 <strong>Level:</strong> {course.difficulty}</span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Award size={14} /> {course.certificate}
                    </div>
                  </div>

                  {/* Actions & MongoDB Status Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    
                    {/* Status Buttons */}
                    <div style={{ display: 'flex', gap: '0.3rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: '8px' }}>
                      {['Not Started', 'Learning', 'Completed'].map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(course.id, course.skill, st)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            background: currentStatus === st ? (st === 'Completed' ? '#10b981' : st === 'Learning' ? '#f59e0b' : 'rgba(255,255,255,0.2)') : 'transparent',
                            color: currentStatus === st ? '#ffffff' : 'var(--text-muted)'
                          }}
                        >
                          {st === 'Completed' ? '✓ Done' : st}
                        </button>
                      ))}
                    </div>

                    {/* View Course Button */}
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      <span>View Course</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: Paid Courses (Completely Separate Section) */}
      {filteredPaidCourses.length > 0 && (
        <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <DollarSign size={22} color="#f59e0b" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
              Paid Courses ({filteredPaidCourses.length})
            </h3>
            <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: 600 }}>
              Premium Platforms (Coursera, Udemy, edX, LinkedIn)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredPaidCourses.map(course => {
              const currentStatus = progressMap[course.id] || 'Not Started';
              const statusStyle = getStatusBadgeStyle(currentStatus);

              return (
                <div
                  key={course.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.25rem 0.65rem', borderRadius: '8px', fontWeight: 700 }}>
                        {course.platform}
                      </span>
                      <span style={{ fontSize: '0.72rem', background: 'rgba(244, 63, 94, 0.15)', color: '#fca5a5', padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: 700 }}>
                        {course.paidLabel}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: '0.75rem', lineHeight: 1.35 }}>
                      {course.name}
                    </h4>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span>🎯 <strong>Skill:</strong> {course.skill}</span>
                      <span>⏱️ <strong>Approx. Duration:</strong> {course.duration}</span>
                      <span>📊 <strong>Level:</strong> {course.difficulty}</span>
                    </div>
                  </div>

                  {/* Actions & MongoDB Status Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    
                    {/* Status Buttons */}
                    <div style={{ display: 'flex', gap: '0.3rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: '8px' }}>
                      {['Not Started', 'Learning', 'Completed'].map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(course.id, course.skill, st)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            background: currentStatus === st ? (st === 'Completed' ? '#10b981' : st === 'Learning' ? '#f59e0b' : 'rgba(255,255,255,0.2)') : 'transparent',
                            color: currentStatus === st ? '#ffffff' : 'var(--text-muted)'
                          }}
                        >
                          {st === 'Completed' ? '✓ Done' : st}
                        </button>
                      ))}
                    </div>

                    {/* View Course Button */}
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}
                    >
                      <span>View Course</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: Career Guidance Videos */}
      {careerVidsList.length > 0 && (
        <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <Video size={22} color="#38bdf8" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
              Career Guidance & Preparation Videos ({careerVidsList.length})
            </h3>
            <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: 600 }}>
              YouTube & Tech Channels
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.25rem' }}>
            {careerVidsList.map(vid => (
              <div
                key={vid.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Video Thumbnail */}
                  <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#000' }}>
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'rgba(244, 63, 94, 0.9)',
                          padding: '0.8rem',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 20px rgba(244, 63, 94, 0.6)'
                        }}
                      >
                        <Play size={20} color="#ffffff" fill="#ffffff" />
                      </a>
                    </div>
                    <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.75rem', fontSize: '0.7rem', background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      {vid.duration}
                    </span>
                  </div>

                  <div style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 600 }}>
                      {vid.topic}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginTop: '0.5rem', lineHeight: 1.35 }}>
                      {vid.title}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                      📺 Channel: <strong>{vid.channel}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0.75rem 1rem 1rem 1rem' }}>
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.8rem' }}
                  >
                    <Play size={14} />
                    <span>Watch Video</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
