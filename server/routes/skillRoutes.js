import express from 'express';
import Skill from '../models/Skill.js';

const router = express.Router();

// Seed initial technical skills if list is empty
const initialSkills = [
  { name: 'JavaScript', level: 'Advanced', category: 'Frontend', description: 'Core language, ES6+, Async/Await, Closures', icon: 'FileCode' },
  { name: 'React.js', level: 'Advanced', category: 'Frontend', description: 'Hooks, Context API, Redux Toolkit, Performance', icon: 'Atom' },
  { name: 'Node.js', level: 'Intermediate', category: 'Backend', description: 'Event Loop, Express, Streams, Middleware', icon: 'Server' },
  { name: 'Express.js', level: 'Intermediate', category: 'Backend', description: 'REST APIs, Routing, Controller layer, JWT', icon: 'Cpu' },
  { name: 'MongoDB', level: 'Intermediate', category: 'Database', description: 'Schema design, Mongoose ORM, Aggregation pipelines', icon: 'Database' },
  { name: 'TypeScript', level: 'Beginner', category: 'Languages', description: 'Type definitions, Interfaces, Generics', icon: 'Code2' },
  { name: 'Tailwind CSS / Vanilla CSS', level: 'Advanced', category: 'Frontend', description: 'Glassmorphism, Responsive design, Custom layouts', icon: 'Palette' },
  { name: 'Git & GitHub', level: 'Intermediate', category: 'DevOps', description: 'Version control, Branching strategies, PRs', icon: 'GitBranch' }
];

// In-Memory Fallback store if MongoDB connection is pending/disconnected
let memoryStore = [...initialSkills.map((s, idx) => ({ ...s, _id: `mem-${idx + 1}`, createdAt: new Date(), updatedAt: new Date() }))];

// Helper to check DB connection status
const isMongoConnected = () => {
  return typeof global.isMongoConnected === 'function' ? global.isMongoConnected() : false;
};

// GET /api/skills - Fetch all technical skills
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      let skills = await Skill.find().sort({ updatedAt: -1 });
      if (skills.length === 0) {
        // Seed default skills
        skills = await Skill.insertMany(initialSkills);
      }
      return res.json({ success: true, source: 'mongodb', data: skills });
    } else {
      return res.json({ success: true, source: 'memory-fallback', data: memoryStore });
    }
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ success: false, message: 'Server Error fetching skills', error: error.message });
  }
});

// POST /api/skills - Add a new technical skill
router.post('/', async (req, res) => {
  try {
    const { name, level, category, description, icon } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Skill name is required' });
    }

    const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
    const skillLevel = validLevels.includes(level) ? level : 'Beginner';

    if (isMongoConnected()) {
      const newSkill = new Skill({
        name: name.trim(),
        level: skillLevel,
        category: category?.trim() || 'General',
        description: description?.trim() || '',
        icon: icon || 'Code'
      });
      const savedSkill = await newSkill.save();
      return res.status(201).json({ success: true, source: 'mongodb', data: savedSkill });
    } else {
      const newSkill = {
        _id: `mem-${Date.now()}`,
        name: name.trim(),
        level: skillLevel,
        category: category?.trim() || 'General',
        description: description?.trim() || '',
        icon: icon || 'Code',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryStore.unshift(newSkill);
      return res.status(201).json({ success: true, source: 'memory-fallback', data: newSkill });
    }
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ success: false, message: 'Error adding skill', error: error.message });
  }
});

// PUT /api/skills/:id - Edit skill details / level
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, category, description, icon } = req.body;

    if (isMongoConnected() && !id.startsWith('mem-')) {
      const updatedSkill = await Skill.findByIdAndUpdate(
        id,
        {
          ...(name && { name: name.trim() }),
          ...(level && { level }),
          ...(category !== undefined && { category: category.trim() }),
          ...(description !== undefined && { description: description.trim() }),
          ...(icon && { icon })
        },
        { new: true, runValidators: true }
      );

      if (!updatedSkill) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }

      return res.json({ success: true, source: 'mongodb', data: updatedSkill });
    } else {
      const skillIndex = memoryStore.findIndex(s => s._id === id);
      if (skillIndex === -1) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }

      memoryStore[skillIndex] = {
        ...memoryStore[skillIndex],
        ...(name && { name: name.trim() }),
        ...(level && { level }),
        ...(category !== undefined && { category: category.trim() }),
        ...(description !== undefined && { description: description.trim() }),
        ...(icon && { icon }),
        updatedAt: new Date()
      };

      return res.json({ success: true, source: 'memory-fallback', data: memoryStore[skillIndex] });
    }
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ success: false, message: 'Error updating skill', error: error.message });
  }
});

// DELETE /api/skills/:id - Delete a skill
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected() && !id.startsWith('mem-')) {
      const deletedSkill = await Skill.findByIdAndDelete(id);
      if (!deletedSkill) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }
      return res.json({ success: true, source: 'mongodb', message: 'Skill deleted successfully', id });
    } else {
      const initialLen = memoryStore.length;
      memoryStore = memoryStore.filter(s => s._id !== id);
      if (memoryStore.length === initialLen) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }
      return res.json({ success: true, source: 'memory-fallback', message: 'Skill deleted successfully', id });
    }
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ success: false, message: 'Error deleting skill', error: error.message });
  }
});

export default router;
