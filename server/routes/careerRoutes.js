import express from 'express';

const router = express.Router();

export const careerBenchmarks = [
  {
    id: 'python-developer',
    title: 'Python Developer',
    iconName: 'FileCode2',
    description: 'Builds backend applications, APIs, scripting automation, and Object-Oriented systems using Python.',
    requiredSkills: [
      { name: 'Python', level: 'Advanced', category: 'Languages' },
      { name: 'SQL', level: 'Intermediate', category: 'Database' },
      { name: 'Flask', level: 'Intermediate', category: 'Backend' },
      { name: 'REST API', level: 'Intermediate', category: 'Backend' },
      { name: 'Git', level: 'Intermediate', category: 'DevOps' },
      { name: 'OOP', level: 'Intermediate', category: 'Languages' },
      { name: 'File Handling', level: 'Intermediate', category: 'Languages' }
    ]
  },
  {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    iconName: 'Layers',
    description: 'Builds end-to-end web applications combining modern frontend UIs, REST APIs, and database architecture.',
    requiredSkills: [
      { name: 'JavaScript', level: 'Advanced', category: 'Frontend' },
      { name: 'React.js', level: 'Advanced', category: 'Frontend' },
      { name: 'Node.js', level: 'Intermediate', category: 'Backend' },
      { name: 'Express.js', level: 'Intermediate', category: 'Backend' },
      { name: 'MongoDB', level: 'Intermediate', category: 'Database' },
      { name: 'HTML & CSS', level: 'Advanced', category: 'Frontend' },
      { name: 'Git', level: 'Intermediate', category: 'DevOps' }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    iconName: 'BarChart3',
    description: 'Extracts data insights, builds interactive visual dashboards, and analyzes metrics to guide business decisions.',
    requiredSkills: [
      { name: 'Python', level: 'Intermediate', category: 'Data Science' },
      { name: 'SQL', level: 'Advanced', category: 'Database' },
      { name: 'Data Visualization & Tableau', level: 'Intermediate', category: 'Data Science' },
      { name: 'Excel & Statistics', level: 'Intermediate', category: 'Data Science' },
      { name: 'Pandas & Data Manipulation', level: 'Intermediate', category: 'Data Science' }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    iconName: 'BrainCircuit',
    description: 'Develops predictive statistical models, machine learning algorithms, and deep data explorations.',
    requiredSkills: [
      { name: 'Python', level: 'Advanced', category: 'Languages' },
      { name: 'Statistics & Probability', level: 'Advanced', category: 'Data Science' },
      { name: 'Machine Learning', level: 'Intermediate', category: 'Data Science' },
      { name: 'Pandas & Data Processing', level: 'Advanced', category: 'Data Science' },
      { name: 'SQL', level: 'Intermediate', category: 'Database' },
      { name: 'Data Visualization', level: 'Intermediate', category: 'Data Science' }
    ]
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    iconName: 'Cpu',
    description: 'Designs, deploys, and optimizes production AI/ML models, neural networks, and MLOps infrastructure.',
    requiredSkills: [
      { name: 'Python', level: 'Advanced', category: 'Languages' },
      { name: 'Machine Learning', level: 'Advanced', category: 'Data Science' },
      { name: 'Deep Learning & PyTorch', level: 'Intermediate', category: 'Data Science' },
      { name: 'MLOps & Docker', level: 'Intermediate', category: 'DevOps' },
      { name: 'Linear Algebra & Mathematics', level: 'Intermediate', category: 'Data Science' },
      { name: 'Git', level: 'Intermediate', category: 'DevOps' }
    ]
  }
];

// Level to Weight helper
const getLevelWeight = (level) => {
  switch (level) {
    case 'Beginner': return 1;
    case 'Intermediate': return 2;
    case 'Advanced': return 3;
    default: return 1;
  }
};

// GET /api/careers - Fetch all career benchmark definitions
router.get('/', (req, res) => {
  res.json({ success: true, data: careerBenchmarks });
});

// POST /api/careers/analyze - Compare student skills against a career profile
router.post('/analyze', (req, res) => {
  try {
    const { careerId, studentSkills } = req.body;

    const career = careerBenchmarks.find(c => c.id === careerId);
    if (!career) {
      return res.status(404).json({ success: false, message: 'Career profile not found' });
    }

    const studentSkillsMap = new Map();
    (studentSkills || []).forEach(s => {
      studentSkillsMap.set(s.name.toLowerCase().trim(), s);
    });

    const completedSkills = [];
    const skillsToImprove = [];
    const missingSkills = [];

    let totalRequiredWeight = 0;
    let earnedWeight = 0;

    career.requiredSkills.forEach(reqSkill => {
      const targetWeight = getLevelWeight(reqSkill.level);
      totalRequiredWeight += targetWeight;

      const studentSkill = studentSkillsMap.get(reqSkill.name.toLowerCase().trim());

      if (studentSkill) {
        const studentWeight = getLevelWeight(studentSkill.level);
        if (studentWeight >= targetWeight) {
          earnedWeight += targetWeight;
          completedSkills.push({
            name: reqSkill.name,
            currentLevel: studentSkill.level,
            requiredLevel: reqSkill.level,
            category: reqSkill.category
          });
        } else {
          earnedWeight += studentWeight;
          skillsToImprove.push({
            name: reqSkill.name,
            currentLevel: studentSkill.level,
            requiredLevel: reqSkill.level,
            category: reqSkill.category,
            _id: studentSkill._id
          });
        }
      } else {
        missingSkills.push({
          name: reqSkill.name,
          requiredLevel: reqSkill.level,
          category: reqSkill.category
        });
      }
    });

    const readinessPercentage = totalRequiredWeight > 0
      ? Math.min(100, Math.round((earnedWeight / totalRequiredWeight) * 100))
      : 0;

    res.json({
      success: true,
      data: {
        careerTitle: career.title,
        readinessPercentage,
        completedSkills,
        skillsToImprove,
        missingSkills
      }
    });
  } catch (error) {
    console.error('Error analyzing skill gap:', error);
    res.status(500).json({ success: false, message: 'Error performing gap analysis', error: error.message });
  }
});

export default router;
