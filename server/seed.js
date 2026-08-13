import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import CareerRole from './models/CareerRole.js';
import Skill from './models/Skill.js';
import Course from './models/Course.js';
import Video from './models/Video.js';
import CodingQuestion from './models/CodingQuestion.js';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillgraph';

// 1. Seed Career Roles Data
const sampleCareers = [
  {
    name: 'Python Developer',
    slug: 'python-developer',
    description: 'Build backend web applications, REST APIs, automation scripts, and database integrations using Python, Flask, and SQL.',
    requiredSkills: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'Flask', level: 'Intermediate' },
      { name: 'REST API', level: 'Intermediate' },
      { name: 'SQL', level: 'Beginner' },
      { name: 'Git', level: 'Beginner' },
      { name: 'Object-Oriented Programming', level: 'Intermediate' },
      { name: 'File Handling', level: 'Beginner' }
    ],
    icon: 'Terminal'
  },
  {
    name: 'Full-Stack Developer',
    slug: 'fullstack-developer',
    description: 'Build modern responsive frontends with React and server-side web APIs with Node.js, Express, and MongoDB.',
    requiredSkills: [
      { name: 'HTML', level: 'Beginner' },
      { name: 'CSS', level: 'Beginner' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'React', level: 'Intermediate' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'Express.js', level: 'Intermediate' },
      { name: 'MongoDB', level: 'Beginner' },
      { name: 'Git', level: 'Beginner' }
    ],
    icon: 'Layers'
  },
  {
    name: 'Data Analyst',
    slug: 'data-analyst',
    description: 'Transform raw structured and unstructured data into business insights using SQL, Python, Pandas, and Data Analysis techniques.',
    requiredSkills: [
      { name: 'SQL', level: 'Intermediate' },
      { name: 'Python', level: 'Beginner' },
      { name: 'Data Analysis', level: 'Intermediate' },
      { name: 'Pandas', level: 'Intermediate' },
      { name: 'NumPy', level: 'Beginner' }
    ],
    icon: 'BarChart'
  },
  {
    name: 'Data Scientist',
    slug: 'data-scientist',
    description: 'Apply statistical analysis, predictive modeling, machine learning algorithms, and scientific computing with Python & Scikit-learn.',
    requiredSkills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'Data Analysis', level: 'Advanced' },
      { name: 'Machine Learning', level: 'Intermediate' },
      { name: 'NumPy', level: 'Intermediate' },
      { name: 'Pandas', level: 'Intermediate' },
      { name: 'Scikit-learn', level: 'Intermediate' }
    ],
    icon: 'Cpu'
  },
  {
    name: 'Machine Learning Engineer',
    slug: 'ml-engineer',
    description: 'Design, train, optimize, and deploy scalable machine learning models, neural pipelines, and predictive algorithms into production.',
    requiredSkills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'Machine Learning', level: 'Advanced' },
      { name: 'Scikit-learn', level: 'Advanced' },
      { name: 'NumPy', level: 'Intermediate' },
      { name: 'REST API', level: 'Intermediate' },
      { name: 'Git', level: 'Beginner' }
    ],
    icon: 'Network'
  }
];

// 2. Seed Skills Data
const sampleSkills = [
  { name: 'Python', level: 'Intermediate', category: 'Programming Language', description: 'Core Python syntax, data structures, & scripting', icon: 'Code' },
  { name: 'JavaScript', level: 'Intermediate', category: 'Programming Language', description: 'ES6+, DOM, async/await, & frontend logic', icon: 'FileCode' },
  { name: 'HTML', level: 'Beginner', category: 'Frontend', description: 'Semantic HTML5 structure & web page layout', icon: 'Layout' },
  { name: 'CSS', level: 'Beginner', category: 'Frontend', description: 'CSS3 styling, Flexbox, Grid, & animations', icon: 'Palette' },
  { name: 'React', level: 'Intermediate', category: 'Frontend', description: 'Components, state, hooks, & single page apps', icon: 'Atom' },
  { name: 'Node.js', level: 'Intermediate', category: 'Backend', description: 'Event-driven JavaScript runtime for servers', icon: 'Server' },
  { name: 'Express.js', level: 'Intermediate', category: 'Backend', description: 'Fast, unopinionated web framework for Node', icon: 'Zap' },
  { name: 'MongoDB', level: 'Beginner', category: 'Database', description: 'NoSQL document-oriented database system', icon: 'Database' },
  { name: 'SQL', level: 'Intermediate', category: 'Database', description: 'Relational database queries, joins, & schema', icon: 'Database' },
  { name: 'Git', level: 'Beginner', category: 'Tools', description: 'Version control, branching, & GitHub workflow', icon: 'GitBranch' },
  { name: 'Flask', level: 'Intermediate', category: 'Backend', description: 'Lightweight WSGI Python web framework', icon: 'Feather' },
  { name: 'REST API', level: 'Intermediate', category: 'Architecture', description: 'HTTP endpoints, JSON payloads, & status codes', icon: 'Globe' },
  { name: 'Machine Learning', level: 'Intermediate', category: 'AI & Data', description: 'Supervised, unsupervised algorithms & model training', icon: 'Cpu' },
  { name: 'Data Analysis', level: 'Intermediate', category: 'AI & Data', description: 'Data cleaning, EDA, aggregation, & reporting', icon: 'PieChart' },
  { name: 'Object-Oriented Programming', level: 'Intermediate', category: 'Computer Science', description: 'Classes, inheritance, polymorphism, & encapsulation', icon: 'Box' },
  { name: 'File Handling', level: 'Beginner', category: 'Programming', description: 'Reading, writing, CSV, & JSON file operations', icon: 'FileText' },
  { name: 'Exception Handling', level: 'Beginner', category: 'Programming', description: 'Try/except blocks, custom errors, & debugging', icon: 'AlertTriangle' },
  { name: 'NumPy', level: 'Intermediate', category: 'AI & Data', description: 'Multidimensional array processing & math ops', icon: 'Grid' },
  { name: 'Pandas', level: 'Intermediate', category: 'AI & Data', description: 'DataFrames, series, merging, & data wrangling', icon: 'Table' },
  { name: 'Scikit-learn', level: 'Intermediate', category: 'AI & Data', description: 'Python machine learning library for classification & regression', icon: 'Sliders' }
];

// 3. Seed Free Courses (12 entries)
const sampleFreeCourses = [
  {
    name: 'Python for Beginners',
    platform: 'freeCodeCamp',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: false,
    duration: '4 Hours',
    url: 'https://example.com/course/python-for-beginners',
    description: 'Learn fundamental Python programming from scratch including variables, loops, functions, and control flow.'
  },
  {
    name: 'Python Basics',
    platform: 'Great Learning Academy',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '3.5 Hours',
    url: 'https://example.com/course/python-basics',
    description: 'Introductory Python certification course covering core syntax, data types, and simple algorithm design.'
  },
  {
    name: 'SQL Fundamentals',
    platform: 'IBM SkillsBuild',
    career: 'Data Analyst',
    skill: 'SQL',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '10 Hours',
    url: 'https://example.com/course/sql-fundamentals',
    description: 'Master relational database basics, SQL SELECT statements, filtering, aggregations, and table joins.'
  },
  {
    name: 'Introduction to Machine Learning',
    platform: 'Microsoft Learn',
    career: 'Machine Learning Engineer',
    skill: 'Machine Learning',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '6 Hours',
    url: 'https://example.com/course/intro-machine-learning',
    description: 'Explore fundamental concepts of machine learning, regression models, classification, and AI ethics.'
  },
  {
    name: 'React Basics',
    platform: 'freeCodeCamp',
    career: 'Full-Stack Developer',
    skill: 'React',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: false,
    duration: '8 Hours',
    url: 'https://example.com/course/react-basics',
    description: 'Build modern user interfaces with React components, props, state, and event handlers.'
  },
  {
    name: 'Programming in Python & Backend Fundamentals',
    platform: 'SWAYAM/NPTEL',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '8 Weeks',
    url: 'https://swayam.gov.in',
    description: 'Comprehensive academic course on Python programming, algorithms, and backend scripting foundations.'
  },
  {
    name: 'Web Application Development with Flask & REST APIs',
    platform: 'freeCodeCamp',
    career: 'Python Developer',
    skill: 'Flask',
    level: 'Intermediate',
    type: 'Free',
    certificateAvailable: true,
    duration: '5 Hours',
    url: 'https://www.freecodecamp.org',
    description: 'Build robust REST APIs and web servers using Flask, HTTP methods, and JSON responses.'
  },
  {
    name: 'Git & GitHub Version Control Certification',
    platform: 'Microsoft Learn',
    career: 'Full-Stack Developer',
    skill: 'Git',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '4 Hours',
    url: 'https://learn.microsoft.com',
    description: 'Master version control, commit trees, branching strategies, and open-source GitHub collaboration.'
  },
  {
    name: 'Object-Oriented Programming (OOP) in Python',
    platform: 'Great Learning Academy',
    career: 'Python Developer',
    skill: 'Object-Oriented Programming',
    level: 'Intermediate',
    type: 'Free',
    certificateAvailable: true,
    duration: '3.5 Hours',
    url: 'https://www.mygreatlearning.com/academy',
    description: 'Deep dive into Python OOP principles: classes, objects, inheritance, method overriding, and encapsulation.'
  },
  {
    name: 'Python File Handling & Data Stream Processing',
    platform: 'Simplilearn SkillUp',
    career: 'Python Developer',
    skill: 'File Handling',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '2.5 Hours',
    url: 'https://www.simplilearn.com/skillup-free-online-courses',
    description: 'Learn file input/output operations, reading CSV and JSON files, and context managers in Python.'
  },
  {
    name: 'Networking & API Basics Certification',
    platform: 'Cisco Networking Academy',
    career: 'Python Developer',
    skill: 'REST API',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '15 Hours',
    url: 'https://www.netacad.com',
    description: 'Understand client-server architecture, HTTP headers, authentication, and REST API integration.'
  },
  {
    name: 'Google Data Analytics Professional Foundations',
    platform: 'Infosys Springboard',
    career: 'Data Analyst',
    skill: 'Data Analysis',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '12 Hours',
    url: 'https://infyspringboard.onwingspan.com',
    description: 'Foundational data analysis techniques, data cleaning, exploratory data analysis, and reporting.'
  }
];

// 4. Seed Paid Courses (6 entries)
const samplePaidCourses = [
  {
    name: 'Complete Python BootCamp: Go from Zero to Hero',
    platform: 'Udemy',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    type: 'Paid',
    certificateAvailable: true,
    duration: '22 Hours',
    url: 'https://www.udemy.com',
    description: 'Comprehensive Python bootcamp covering beginner to advanced concepts, object-oriented programming, and real projects.'
  },
  {
    name: 'Python for Everybody Specialization',
    platform: 'Coursera',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    type: 'Paid',
    certificateAvailable: true,
    duration: '3 Months',
    url: 'https://www.coursera.org',
    description: 'University of Michigan specialization covering Python data structures, web scraping, and database interaction.'
  },
  {
    name: 'REST API Development with Flask & Python',
    platform: 'Udemy',
    career: 'Python Developer',
    skill: 'REST API',
    level: 'Intermediate',
    type: 'Paid',
    certificateAvailable: true,
    duration: '17 Hours',
    url: 'https://www.udemy.com',
    description: 'Build scalable RESTful APIs with Flask, SQLAlchemy, JWT authentication, and PostgreSQL deployment.'
  },
  {
    name: 'The Complete Web Developer in 2026: Zero to Mastery',
    platform: 'edX',
    career: 'Full-Stack Developer',
    skill: 'React',
    level: 'Advanced',
    type: 'Paid',
    certificateAvailable: true,
    duration: '4 Months',
    url: 'https://www.edx.org',
    description: 'Become a full-stack developer by mastering React, Node.js, Express, database architecture, and cloud deployment.'
  },
  {
    name: 'Learning Object-Oriented Programming (OOP) with Python',
    platform: 'LinkedIn Learning',
    career: 'Python Developer',
    skill: 'Object-Oriented Programming',
    level: 'Intermediate',
    type: 'Paid',
    certificateAvailable: true,
    duration: '4.5 Hours',
    url: 'https://www.linkedin.com/learning',
    description: 'Master object-oriented design patterns, class hierarchies, and clean code principles in Python.'
  },
  {
    name: 'Mastering Git & GitHub Masterclass',
    platform: 'Udemy',
    career: 'Full-Stack Developer',
    skill: 'Git',
    level: 'Intermediate',
    type: 'Paid',
    certificateAvailable: true,
    duration: '11.5 Hours',
    url: 'https://www.udemy.com',
    description: 'In-depth guide to Git rebase, merge conflict resolution, submodules, and team workflow automation.'
  }
];

// 5. Seed Learning Videos (16 entries)
const sampleVideos = [
  // Python Developer Videos
  {
    title: 'Python Full Course for Beginners',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    channelName: 'freeCodeCamp',
    videoUrl: 'https://example.com/video/python-full-course',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    duration: '6 Hours',
    description: 'Complete Python tutorial covering syntax, variables, conditionals, loops, functions, and modules.'
  },
  {
    title: 'Python Object-Oriented Programming',
    career: 'Python Developer',
    skill: 'Object-Oriented Programming',
    level: 'Intermediate',
    channelName: 'Corey Schafer',
    videoUrl: 'https://example.com/video/python-oop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60',
    duration: '2 Hours',
    description: 'Detailed explanation of Python classes, instance variables, class methods, static methods, and inheritance.'
  },
  {
    title: 'Flask Tutorial for Beginners',
    career: 'Python Developer',
    skill: 'Flask',
    level: 'Intermediate',
    channelName: 'Corey Schafer',
    videoUrl: 'https://example.com/video/flask-tutorial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&auto=format&fit=crop&q=60',
    duration: '3.5 Hours',
    description: 'Learn how to create web applications with Flask, template routing, forms, and database persistence.'
  },
  {
    title: 'REST API with Python',
    career: 'Python Developer',
    skill: 'REST API',
    level: 'Intermediate',
    channelName: 'Traversy Media',
    videoUrl: 'https://example.com/video/rest-api-python',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
    duration: '1.2 Hours',
    description: 'Build REST APIs from scratch with HTTP methods, route parameters, JSON data, and Postman testing.'
  },

  // Full-Stack Developer Videos
  {
    title: 'HTML and CSS Full Course',
    career: 'Full-Stack Developer',
    skill: 'HTML',
    level: 'Beginner',
    channelName: 'freeCodeCamp',
    videoUrl: 'https://example.com/video/html-css-course',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60',
    duration: '4 Hours',
    description: 'Master HTML5 markup and modern CSS3 styling to build clean responsive web layouts.'
  },
  {
    title: 'JavaScript Beginner Tutorial',
    career: 'Full-Stack Developer',
    skill: 'JavaScript',
    level: 'Beginner',
    channelName: 'Programming with Mosh',
    videoUrl: 'https://example.com/video/js-beginner-tutorial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
    duration: '3 Hours',
    description: 'Core JavaScript fundamentals: variables, arrays, objects, functions, loops, and ES6 standard features.'
  },
  {
    title: 'React Full Course',
    career: 'Full-Stack Developer',
    skill: 'React',
    level: 'Intermediate',
    channelName: 'freeCodeCamp',
    videoUrl: 'https://example.com/video/react-full-course',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60',
    duration: '11 Hours',
    description: 'Comprehensive React tutorial building modern component-driven apps with state, hooks, and APIs.'
  },
  {
    title: 'Node.js and Express Tutorial',
    career: 'Full-Stack Developer',
    skill: 'Node.js',
    level: 'Intermediate',
    channelName: 'Programming with Mosh',
    videoUrl: 'https://example.com/video/node-express-tutorial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60',
    duration: '3 Hours',
    description: 'Learn Node.js runtime fundamentals, Express router setup, middleware, and backend API endpoints.'
  },
  {
    title: 'MongoDB Beginner Tutorial',
    career: 'Full-Stack Developer',
    skill: 'MongoDB',
    level: 'Beginner',
    channelName: 'Fireship',
    videoUrl: 'https://example.com/video/mongodb-beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60',
    duration: '1.5 Hours',
    description: 'Understand document databases, collections, Mongoose schema modeling, and CRUD operations.'
  },

  // Data Analyst Videos
  {
    title: 'SQL for Data Analysis',
    career: 'Data Analyst',
    skill: 'SQL',
    level: 'Beginner',
    channelName: 'Alex The Analyst',
    videoUrl: 'https://example.com/video/sql-data-analysis',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60',
    duration: '4.5 Hours',
    description: 'Practical SQL for data analytics: GROUP BY, aggregate functions, CASE statements, JOINs, and subqueries.'
  },
  {
    title: 'Pandas Tutorial',
    career: 'Data Analyst',
    skill: 'Pandas',
    level: 'Intermediate',
    channelName: 'Corey Schafer',
    videoUrl: 'https://example.com/video/pandas-tutorial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60',
    duration: '2.5 Hours',
    description: 'Master Python Pandas DataFrames, indexing, filtering, missing data handling, and CSV export.'
  },
  {
    title: 'Data Analysis with Python',
    career: 'Data Analyst',
    skill: 'Data Analysis',
    level: 'Intermediate',
    channelName: 'freeCodeCamp',
    videoUrl: 'https://example.com/video/data-analysis-python',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60',
    duration: '4 Hours',
    description: 'Exploratory data analysis, statistical metrics, Matplotlib visualization, and business intelligence.'
  },

  // Data Scientist / ML Engineer Videos
  {
    title: 'Machine Learning for Beginners',
    career: 'Machine Learning Engineer',
    skill: 'Machine Learning',
    level: 'Beginner',
    channelName: 'freeCodeCamp',
    videoUrl: 'https://example.com/video/ml-for-beginners',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    duration: '10 Hours',
    description: 'Introductory machine learning concepts, linear regression, logistic classification, and decision trees.'
  },
  {
    title: 'Scikit-learn Tutorial',
    career: 'Data Scientist',
    skill: 'Scikit-learn',
    level: 'Intermediate',
    channelName: 'Tech With Tim',
    videoUrl: 'https://example.com/video/scikit-learn-tutorial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    duration: '2 Hours',
    description: 'Train ML models in Python using Scikit-learn, split datasets, evaluate accuracy metrics, and tune hyper-parameters.'
  },
  {
    title: 'End-to-End Machine Learning Project',
    career: 'Machine Learning Engineer',
    skill: 'Machine Learning',
    level: 'Advanced',
    channelName: 'Daniel Bourke',
    videoUrl: 'https://example.com/video/e2e-ml-project',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    duration: '5 Hours',
    description: 'Build and deploy a complete production-grade machine learning model pipeline from raw data to web API.'
  },
  {
    title: 'NumPy Crash Course for Data Science',
    career: 'Data Scientist',
    skill: 'NumPy',
    level: 'Intermediate',
    channelName: 'freeCodeCamp',
    videoUrl: 'https://example.com/video/numpy-crash-course',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    duration: '1.5 Hours',
    description: 'High-performance numerical processing in Python using multidimensional NumPy arrays and vectorization.'
  }
];

// 6. Seed Coding Questions (15 questions: 5 Beginner, 5 Intermediate, 5 Advanced)
const sampleCodingQuestions = [
  // BEGINNER (5)
  {
    problemId: 'py-beg-1',
    title: 'Even or Odd Filter',
    difficulty: 'Beginner',
    topic: 'Conditions',
    score: 100,
    description: 'Write a function `is_even(n)` that returns `True` if an integer `n` is even and `False` if it is odd.',
    sampleInput: 'n = 4',
    sampleOutput: 'True',
    starterCode: `def is_even(n):\n    # Write your Python code here\n    return n % 2 == 0\n`,
    testCases: [
      { input: [4], expected: true },
      { input: [7], expected: false },
      { input: [0], expected: true },
      { input: [-2], expected: true },
      { input: [99], expected: false }
    ]
  },
  {
    problemId: 'py-beg-2',
    title: 'Sum of First N Numbers',
    difficulty: 'Beginner',
    topic: 'Loops',
    score: 100,
    description: 'Write a function `sum_n(n)` that uses a loop to calculate the sum of numbers from 1 up to `n` (inclusive).',
    sampleInput: 'n = 5',
    sampleOutput: '15',
    starterCode: `def sum_n(n):\n    # Write your Python loop code here\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n`,
    testCases: [
      { input: [5], expected: 15 },
      { input: [10], expected: 55 },
      { input: [1], expected: 1 },
      { input: [100], expected: 5050 }
    ]
  },
  {
    problemId: 'py-beg-3',
    title: 'Reverse String Specialist',
    difficulty: 'Beginner',
    topic: 'Strings',
    score: 100,
    description: 'Write a function `reverse_string(s)` that takes a string `s` and returns it reversed.',
    sampleInput: 's = "python"',
    sampleOutput: '"nohtyp"',
    starterCode: `def reverse_string(s):\n    # Write your string reversal logic\n    return s[::-1]\n`,
    testCases: [
      { input: ["python"], expected: "nohtyp" },
      { input: ["skillgraph"], expected: "hparglliks" },
      { input: ["a"], expected: "a" },
      { input: ["12345"], expected: "54321" }
    ]
  },
  {
    problemId: 'py-beg-4',
    title: 'Find Maximum in List',
    difficulty: 'Beginner',
    topic: 'Lists',
    score: 100,
    description: 'Write a function `find_max(numbers)` that takes a list of integers `numbers` and returns the largest number.',
    sampleInput: 'numbers = [3, 14, 1, 7, 9]',
    sampleOutput: '14',
    starterCode: `def find_max(numbers):\n    # Return maximum element in numbers\n    return max(numbers)\n`,
    testCases: [
      { input: [[3, 14, 1, 7, 9]], expected: 14 },
      { input: [[-10, -5, -20]], expected: -5 },
      { input: [[42]], expected: 42 },
      { input: [[100, 200, 150]], expected: 200 }
    ]
  },
  {
    problemId: 'py-beg-5',
    title: 'Calculate Factorial',
    difficulty: 'Beginner',
    topic: 'Basic functions',
    score: 100,
    description: 'Write a function `factorial(n)` that returns the factorial of a non-negative integer `n`. Note: 0! = 1.',
    sampleInput: 'n = 5',
    sampleOutput: '120',
    starterCode: `def factorial(n):\n    # Calculate n!\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n`,
    testCases: [
      { input: [5], expected: 120 },
      { input: [0], expected: 1 },
      { input: [3], expected: 6 },
      { input: [6], expected: 720 }
    ]
  },

  // INTERMEDIATE (5)
  {
    problemId: 'py-int-1',
    title: 'Word Frequency Count',
    difficulty: 'Intermediate',
    topic: 'Dictionaries',
    score: 150,
    description: 'Write a function `word_count(words)` that takes a list of words and returns a dictionary mapping each unique word to its frequency count.',
    sampleInput: 'words = ["apple", "banana", "apple", "cherry"]',
    sampleOutput: '{"apple": 2, "banana": 1, "cherry": 1}',
    starterCode: `def word_count(words):\n    freq = {}\n    for word in words:\n        freq[word] = freq.get(word, 0) + 1\n    return freq\n`,
    testCases: [
      { input: [["apple", "banana", "apple", "cherry"]], expected: { apple: 2, banana: 1, cherry: 1 } },
      { input: [["a", "b", "a", "c", "b", "a"]], expected: { a: 3, b: 2, c: 1 } },
      { input: [["test"]], expected: { test: 1 } }
    ]
  },
  {
    problemId: 'py-int-2',
    title: 'Binary Search Implementation',
    difficulty: 'Intermediate',
    topic: 'Searching',
    score: 150,
    description: 'Write a function `binary_search(arr, target)` that returns the 0-based index of `target` in sorted list `arr`, or `-1` if not found.',
    sampleInput: 'arr = [10, 20, 30, 40, 50], target = 40',
    sampleOutput: '3',
    starterCode: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1\n`,
    testCases: [
      { input: [[10, 20, 30, 40, 50], 40], expected: 3 },
      { input: [[1, 3, 5, 7, 9], 1], expected: 0 },
      { input: [[2, 4, 6, 8], 5], expected: -1 }
    ]
  },
  {
    problemId: 'py-int-3',
    title: 'Recursive Fibonacci Sequence',
    difficulty: 'Intermediate',
    topic: 'Recursion',
    score: 150,
    description: 'Write a recursive function `fibonacci(n)` that returns the n-th Fibonacci number where `fib(0)=0`, `fib(1)=1`.',
    sampleInput: 'n = 6',
    sampleOutput: '8',
    starterCode: `def fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n`,
    testCases: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [6], expected: 8 },
      { input: [8], expected: 21 }
    ]
  },
  {
    problemId: 'py-int-4',
    title: 'Bubble Sort Algorithm',
    difficulty: 'Intermediate',
    topic: 'Sorting',
    score: 150,
    description: 'Write a function `bubble_sort(arr)` that sorts a list of numbers in ascending order and returns the sorted list.',
    sampleInput: 'arr = [64, 34, 25, 12, 22]',
    sampleOutput: '[12, 22, 25, 34, 64]',
    starterCode: `def bubble_sort(arr):\n    arr = list(arr)\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n`,
    testCases: [
      { input: [[64, 34, 25, 12, 22]], expected: [12, 22, 25, 34, 64] },
      { input: [[5, 1, 4, 2, 8]], expected: [1, 2, 4, 5, 8] },
      { input: [[3, 3, 1]], expected: [1, 3, 3] }
    ]
  },
  {
    problemId: 'py-int-5',
    title: 'File Data Line Extractor Simulator',
    difficulty: 'Intermediate',
    topic: 'File handling',
    score: 150,
    description: 'Write a function `parse_log_lines(lines)` that filters lines starting with "ERROR" from a list of log file line strings.',
    sampleInput: 'lines = ["INFO: start", "ERROR: db connection failed", "WARNING: low memory"]',
    sampleOutput: '["ERROR: db connection failed"]',
    starterCode: `def parse_log_lines(lines):\n    return [line for line in lines if line.startswith("ERROR")]\n`,
    testCases: [
      { input: [["INFO: start", "ERROR: db connection failed", "WARNING: low memory"]], expected: ["ERROR: db connection failed"] },
      { input: [["ERROR: 404", "ERROR: 500"]], expected: ["ERROR: 404", "ERROR: 500"] },
      { input: [["INFO: ok"]], expected: [] }
    ]
  },

  // ADVANCED (5)
  {
    problemId: 'py-adv-1',
    title: 'Bank Account Class (OOP)',
    difficulty: 'Advanced',
    topic: 'OOP',
    score: 200,
    description: 'Write a class `BankAccount` with `deposit(amount)` and `withdraw(amount)` methods that track and return current `balance`. Returns `"Insufficient Funds"` if withdrawal exceeds balance.',
    sampleInput: 'acc = BankAccount(100); acc.withdraw(150)',
    sampleOutput: '"Insufficient Funds"',
    starterCode: `class BankAccount:\n    def __init__(self, initial_balance=0):\n        self.balance = initial_balance\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n    def withdraw(self, amount):\n        if amount > self.balance:\n            return "Insufficient Funds"\n        self.balance -= amount\n        return self.balance\n`,
    testCases: [
      { input: [100, "withdraw", 150], expected: "Insufficient Funds" },
      { input: [100, "deposit", 50], expected: 150 },
      { input: [200, "withdraw", 50], expected: 150 }
    ]
  },
  {
    problemId: 'py-adv-2',
    title: 'Valid Parentheses Stack Validator',
    difficulty: 'Advanced',
    topic: 'Data structures',
    score: 200,
    description: 'Write a function `is_valid_brackets(s)` using a Stack data structure to check if brackets `()`, `{}`, `[]` in string `s` are correctly balanced.',
    sampleInput: 's = "{[()]}"',
    sampleOutput: 'True',
    starterCode: `def is_valid_brackets(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n    return len(stack) == 0\n`,
    testCases: [
      { input: ["{[()]}"], expected: true },
      { input: ["{[(])}"], expected: false },
      { input: ["("], expected: false },
      { input: ["()[]{} "], expected: true }
    ]
  },
  {
    problemId: 'py-adv-3',
    title: 'Climbing Stairs (Dynamic Programming)',
    difficulty: 'Advanced',
    topic: 'Dynamic programming',
    score: 200,
    description: 'You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. Write `climb_stairs(n)` to find distinct ways to reach top.',
    sampleInput: 'n = 4',
    sampleOutput: '5',
    starterCode: `def climb_stairs(n):\n    if n <= 2: return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for i in range(3, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]\n`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [4], expected: 5 },
      { input: [5], expected: 8 }
    ]
  },
  {
    problemId: 'py-adv-4',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Advanced',
    topic: 'Algorithms',
    score: 200,
    description: 'Write `length_of_longest_substring(s)` that finds the length of the longest substring in `s` without repeating characters.',
    sampleInput: 's = "abcabcbb"',
    sampleOutput: '3',
    starterCode: `def length_of_longest_substring(s):\n    seen = {}\n    max_len = start = 0\n    for i, char in enumerate(s):\n        if char in seen and seen[char] >= start:\n            start = seen[char] + 1\n        seen[char] = i\n        max_len = max(max_len, i - start + 1)\n    return max_len\n`,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [" "], expected: 1 }
    ]
  },
  {
    problemId: 'py-adv-5',
    title: 'Matrix Diagonal Sum Calculator',
    difficulty: 'Advanced',
    topic: 'Matrices',
    score: 200,
    description: 'Write `diagonal_sum(matrix)` that calculates the sum of elements on primary and secondary diagonals of a square matrix.',
    sampleInput: 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]',
    sampleOutput: '25',
    starterCode: `def diagonal_sum(matrix):\n    n = len(matrix)\n    total = 0\n    for i in range(n):\n        total += matrix[i][i]\n        if i != n - 1 - i:\n            total += matrix[i][n - 1 - i]\n    return total\n`,
    testCases: [
      { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: 25 },
      { input: [[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]], expected: 8 },
      { input: [[[5]]], expected: 5 }
    ]
  }
];

// 7. Seed Demo Development Users (3 entries)
const sampleUsers = [
  {
    name: 'Student One',
    email: 'student1@skillgraph.io',
    targetCareer: 'Python Developer',
    role: 'Development Demo User',
    skillsCount: 7,
    careerReadiness: 75,
    roadmapProgress: 60,
    codingChallengesCompleted: 8,
    averageAssessmentScore: 88,
    isSeedRecord: true
  },
  {
    name: 'Student Two',
    email: 'student2@skillgraph.io',
    targetCareer: 'Data Analyst',
    role: 'Development Demo User',
    skillsCount: 5,
    careerReadiness: 68,
    roadmapProgress: 45,
    codingChallengesCompleted: 5,
    averageAssessmentScore: 82,
    isSeedRecord: true
  },
  {
    name: 'Student Three',
    email: 'student3@skillgraph.io',
    targetCareer: 'Full-Stack Developer',
    role: 'Development Demo User',
    skillsCount: 8,
    careerReadiness: 84,
    roadmapProgress: 70,
    codingChallengesCompleted: 12,
    averageAssessmentScore: 91,
    isSeedRecord: true
  }
];

// Seed execution function
async function seedDatabase() {
  try {
    console.log(`\n======================================================`);
    console.log(`🌱 SkillGraph Idempotent Database Seeding Started`);
    console.log(`======================================================`);
    console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Connection Established Successfully!\n`);

    // 1. Seed Careers (Idempotent upsert by slug)
    let careerCount = 0;
    for (const career of sampleCareers) {
      await CareerRole.findOneAndUpdate({ slug: career.slug }, career, { upsert: true, new: true });
      careerCount++;
    }
    console.log(`📌 Seeded ${careerCount} Career Roles (Python Dev, Full-Stack, Data Analyst, Data Scientist, ML Eng)`);

    // 2. Seed Skills (Idempotent upsert by name)
    let skillCount = 0;
    for (const skill of sampleSkills) {
      await Skill.findOneAndUpdate({ name: skill.name }, skill, { upsert: true, new: true });
      skillCount++;
    }
    console.log(`📌 Seeded ${skillCount} Skills (Python, JS, React, Node, SQL, Git, Flask, ML, Pandas, etc.)`);

    // 3. Seed Free Courses (Idempotent upsert by name + platform)
    let freeCourseCount = 0;
    for (const course of sampleFreeCourses) {
      await Course.findOneAndUpdate(
        { name: course.name, platform: course.platform },
        course,
        { upsert: true, new: true }
      );
      freeCourseCount++;
    }
    console.log(`📌 Seeded ${freeCourseCount} Free Learning Courses (freeCodeCamp, Microsoft, IBM, Cisco, etc.)`);

    // 4. Seed Paid Courses (Idempotent upsert by name + platform)
    let paidCourseCount = 0;
    for (const course of samplePaidCourses) {
      await Course.findOneAndUpdate(
        { name: course.name, platform: course.platform },
        course,
        { upsert: true, new: true }
      );
      paidCourseCount++;
    }
    console.log(`📌 Seeded ${paidCourseCount} Paid Learning Courses (Udemy, Coursera, edX, LinkedIn Learning)`);

    // 5. Seed Learning Videos (Idempotent upsert by title)
    let videoCount = 0;
    for (const video of sampleVideos) {
      await Video.findOneAndUpdate(
        { title: video.title },
        video,
        { upsert: true, new: true }
      );
      videoCount++;
    }
    console.log(`📌 Seeded ${videoCount} Learning Videos across Python, Full-Stack, Data & ML Careers`);

    // 6. Seed Coding Questions (Idempotent upsert by problemId)
    let questionCount = 0;
    for (const q of sampleCodingQuestions) {
      await CodingQuestion.findOneAndUpdate(
        { problemId: q.problemId },
        q,
        { upsert: true, new: true }
      );
      questionCount++;
    }
    console.log(`📌 Seeded ${questionCount} Daily Coding Questions (5 Beginner, 5 Intermediate, 5 Advanced)`);

    // 7. Seed Demo Development Users (Idempotent upsert by email)
    let userCount = 0;
    for (const user of sampleUsers) {
      await User.findOneAndUpdate(
        { email: user.email },
        user,
        { upsert: true, new: true }
      );
      userCount++;
    }
    console.log(`📌 Seeded ${userCount} Development Demo Users (Student One, Student Two, Student Three)`);

    console.log(`\n======================================================`);
    console.log(`🎉 Seed Command Completed Successfully!`);
    console.log(`======================================================\n`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed with error:`, error.message);
    process.exit(1);
  }
}

seedDatabase();
