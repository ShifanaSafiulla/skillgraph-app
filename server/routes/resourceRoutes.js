import express from 'express';
import RoadmapProgress from '../models/RoadmapProgress.js';
import Course from '../models/Course.js';
import Video from '../models/Video.js';

const router = express.Router();

const isMongoConnected = () => {
  return typeof global.isMongoConnected === 'function' ? global.isMongoConnected() : false;
};

let memoryProgress = {};

export const freeCourses = [
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

export const paidCourses = [
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

export const careerVideos = {
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
    }
  ]
};

export const skillSpecificGuides = {
  'Python': {
    skill: 'Python',
    learn: {
      free: { name: 'Python Programming Essentials', platform: 'NPTEL / SWAYAM', url: 'https://swayam.gov.in' },
      paid: { name: '100 Days of Code: Complete Python Masterclass', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'Python Beginner Tutorial (Full 6 Hour Course)', channel: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=python+beginner+tutorial+programming+with+mosh' },
      { title: 'Python OOP & Advanced Concepts', channel: 'Corey Schafer', url: 'https://www.youtube.com/results?search_query=python+oop+corey+schafer' }
    ],
    practice: {
      title: 'Python Mini-Project: Automated File System Manager & Weather Script',
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
      { title: 'Flask Crash Course 2026', channel: 'Traversy Media', url: 'https://www.youtube.com/results?search_query=flask+crash+course+traversy+media' },
      { title: 'Building Scalable Web Apps with Flask & SQLAlchemy', channel: 'Tech With Tim', url: 'https://www.youtube.com/results?search_query=flask+sqlalchemy+tech+with+tim' }
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
      { title: 'REST API Concepts Explained Simply', channel: 'Fireship', url: 'https://www.youtube.com/results?search_query=rest+api+concepts+fireship' },
      { title: 'Postman & API Testing Masterclass', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/results?search_query=postman+api+testing+freecodecamp' }
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
      { title: 'Git & GitHub Crash Course for Beginners', channel: 'Traversy Media', url: 'https://www.youtube.com/results?search_query=git+github+crash+course+traversy+media' },
      { title: 'Git Branching & PR Workflow Explained', channel: 'Fireship', url: 'https://www.youtube.com/results?search_query=git+branching+workflow+fireship' }
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
      { title: 'OOP in Python Tutorial (Classes, Inheritance, Polymorphism)', channel: 'Corey Schafer', url: 'https://www.youtube.com/results?search_query=oop+python+corey+schafer' },
      { title: 'Object Oriented Programming in 10 Minutes', channel: 'Fireship', url: 'https://www.youtube.com/results?search_query=object+oriented+programming+10+minutes+fireship' }
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
      { title: 'Python File Handling (Read, Write, Append, JSON, CSV)', channel: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=python+file+handling+programming+with+mosh' },
      { title: 'Working with Files & Context Managers in Python', channel: 'Corey Schafer', url: 'https://www.youtube.com/results?search_query=python+context+managers+corey+schafer' }
    ],
    practice: {
      title: 'File Handling Mini-Project: CSV & JSON Log Parser Script',
      difficulty: 'Beginner'
    },
    nextStep: 'Data Processing with Pandas'
  },
  'React': {
    skill: 'React',
    learn: {
      free: { name: 'Free React Course & Modern Component Architecture', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
      paid: { name: 'Paid React Course: React - The Complete Guide (Hooks, Redux)', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'React beginner tutorial (Full Course 2026)', channel: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=react+beginner+tutorial+programming+with+mosh' },
      { title: 'React Hooks tutorial (useState, useEffect, useContext)', channel: 'Dev Ed', url: 'https://www.youtube.com/results?search_query=react+hooks+tutorial+dev+ed' }
    ],
    practice: {
      title: 'React mini-project: Interactive Dashboard & Task Matrix',
      difficulty: 'Intermediate'
    },
    nextStep: 'Node.js'
  },
  'React.js': {
    skill: 'React.js',
    learn: {
      free: { name: 'Free React.js Course & Modern Component Architecture', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
      paid: { name: 'Paid React Course: React - The Complete Guide (Hooks, Redux)', platform: 'Udemy', url: 'https://www.udemy.com' }
    },
    watch: [
      { title: 'React beginner tutorial (Full Course 2026)', channel: 'Programming with Mosh', url: 'https://www.youtube.com/results?search_query=react+beginner+tutorial+programming+with+mosh' },
      { title: 'React Hooks tutorial (useState, useEffect, useContext)', channel: 'Dev Ed', url: 'https://www.youtube.com/results?search_query=react+hooks+tutorial+dev+ed' }
    ],
    practice: {
      title: 'React mini-project: Interactive Dashboard & Task Matrix',
      difficulty: 'Intermediate'
    },
    nextStep: 'Node.js'
  }
};

router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const [dbFreeCourses, dbPaidCourses, dbVideos] = await Promise.all([
        Course.find({ type: 'Free' }),
        Course.find({ type: 'Paid' }),
        Video.find()
      ]);

      // Format free courses to match client expectations
      const formattedFree = dbFreeCourses.length > 0 ? dbFreeCourses.map(c => ({
        id: c._id.toString(),
        name: c.name,
        platform: c.platform,
        career: c.career,
        skill: c.skill,
        difficulty: c.level,
        certificate: c.certificateAvailable ? 'Certification Available' : 'No Certificate',
        duration: c.duration,
        url: c.url,
        type: 'free',
        description: c.description
      })) : freeCourses;

      // Format paid courses to match client expectations
      const formattedPaid = dbPaidCourses.length > 0 ? dbPaidCourses.map(c => ({
        id: c._id.toString(),
        name: c.name,
        platform: c.platform,
        career: c.career,
        skill: c.skill,
        difficulty: c.level,
        paidLabel: 'Paid Course',
        duration: c.duration,
        url: c.url,
        type: 'paid',
        description: c.description
      })) : paidCourses;

      // Group videos by career slug
      const formattedVideos = { ...careerVideos };
      if (dbVideos.length > 0) {
        dbVideos.forEach(v => {
          const slug = v.career.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          if (!formattedVideos[slug]) formattedVideos[slug] = [];
          formattedVideos[slug].unshift({
            id: v._id.toString(),
            title: v.title,
            career: v.career,
            skill: v.skill,
            level: v.level,
            channel: v.channelName,
            url: v.videoUrl,
            thumbnail: v.thumbnailUrl,
            duration: v.duration,
            description: v.description
          });
        });
      }

      return res.json({
        success: true,
        source: 'mongodb',
        data: {
          freeCourses: formattedFree,
          paidCourses: formattedPaid,
          careerVideos: formattedVideos,
          skillSpecificGuides
        }
      });
    }

    res.json({
      success: true,
      source: 'memory-fallback',
      data: {
        freeCourses,
        paidCourses,
        careerVideos,
        skillSpecificGuides
      }
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ success: false, message: 'Error fetching resources', error: error.message });
  }
});

router.get('/progress', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const records = await RoadmapProgress.find();
      const progressMap = {};
      records.forEach(r => {
        progressMap[r.resourceId] = r.status;
      });
      return res.json({ success: true, source: 'mongodb', data: progressMap });
    } else {
      return res.json({ success: true, source: 'memory-fallback', data: memoryProgress });
    }
  } catch (error) {
    console.error('Error fetching roadmap progress:', error);
    res.status(500).json({ success: false, message: 'Error loading progress', error: error.message });
  }
});

router.post('/progress', async (req, res) => {
  try {
    const { resourceId, skillName, status } = req.body;

    if (!resourceId) {
      return res.status(400).json({ success: false, message: 'resourceId is required' });
    }

    const validStatuses = ['Not Started', 'Learning', 'Completed'];
    const newStatus = validStatuses.includes(status) ? status : 'Not Started';

    if (isMongoConnected()) {
      const updated = await RoadmapProgress.findOneAndUpdate(
        { resourceId },
        { resourceId, skillName: skillName || '', status: newStatus },
        { new: true, upsert: true, runValidators: true }
      );
      return res.json({ success: true, source: 'mongodb', data: updated });
    } else {
      memoryProgress[resourceId] = newStatus;
      return res.json({ success: true, source: 'memory-fallback', data: { resourceId, status: newStatus } });
    }
  } catch (error) {
    console.error('Error updating roadmap progress:', error);
    res.status(500).json({ success: false, message: 'Error updating progress', error: error.message });
  }
});

export default router;
