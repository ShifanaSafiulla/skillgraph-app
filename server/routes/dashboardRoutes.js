import express from 'express';
import Skill from '../models/Skill.js';
import RoadmapProgress from '../models/RoadmapProgress.js';
import AssessmentAttempt from '../models/AssessmentAttempt.js';
import { careerBenchmarks } from './careerRoutes.js';
import { freeCourses, paidCourses, skillSpecificGuides } from './resourceRoutes.js';

const router = express.Router();

const isMongoConnected = () => {
  return typeof global.isMongoConnected === 'function' ? global.isMongoConnected() : false;
};

let memoryProgress = {};

router.get('/intelligence', async (req, res) => {
  try {
    let userSkills = [];
    let roadmapRecords = [];
    let assessmentRecords = [];

    if (isMongoConnected()) {
      [userSkills, roadmapRecords, assessmentRecords] = await Promise.all([
        Skill.find(),
        RoadmapProgress.find(),
        AssessmentAttempt.find()
      ]);
    } else {
      userSkills = [
        { name: 'Python', level: 'Advanced', category: 'Languages' },
        { name: 'JavaScript', level: 'Intermediate', category: 'Frontend' },
        { name: 'SQL', level: 'Intermediate', category: 'Database' },
        { name: 'Flask', level: 'Intermediate', category: 'Backend' },
        { name: 'Git', level: 'Intermediate', category: 'DevOps' }
      ];
      roadmapRecords = Object.keys(memoryProgress).map(k => ({ resourceId: k, status: memoryProgress[k] }));
    }

    // Default target career
    const targetCareer = careerBenchmarks.find(c => c.id === 'python-developer') || careerBenchmarks[0];

    // Compute skill breakdown
    const skillsCompleted = userSkills.filter(s => s.level === 'Advanced').map(s => s.name);
    const skillsImproving = userSkills.filter(s => s.level === 'Intermediate' || s.level === 'Beginner').map(s => s.name);
    
    // Target requirements
    const requiredSkillsList = targetCareer.requiredSkills || [];
    const missingSkills = requiredSkillsList.filter(skObj => {
      const found = userSkills.find(s => s.name.toLowerCase() === skObj.name.toLowerCase());
      return !found;
    }).map(skObj => skObj.name);

    // Career readiness % calculation
    const totalRequired = requiredSkillsList.length || 1;
    const metCount = requiredSkillsList.filter(skObj => {
      const userSk = userSkills.find(s => s.name.toLowerCase() === skObj.name.toLowerCase());
      return userSk;
    }).length;
    const careerReadinessPercent = Math.round((metCount / totalRequired) * 100);

    // Roadmap & course progress
    const completedCoursesCount = roadmapRecords.filter(r => r.status === 'Completed').length;
    const totalCoursesAvailable = freeCourses.length + paidCourses.length;
    const roadmapProgressPercent = Math.round((completedCoursesCount / (totalCoursesAvailable || 1)) * 100);

    // Certificates earned (free courses with certs completed)
    const certificatesEarned = roadmapRecords.filter(r => r.status === 'Completed' && r.resourceId.startsWith('free-')).length;

    // Coding challenge stats
    const correctAttempts = assessmentRecords.filter(a => a.status === 'Correct');
    const totalScore = correctAttempts.reduce((sum, a) => sum + (a.scoreAwarded || 0), 0);
    const avgScore = assessmentRecords.length > 0 ? Math.round(totalScore / assessmentRecords.length) : (correctAttempts.length > 0 ? 100 : 0);

    // Next recommended skill
    const nextSkillName = missingSkills[0] || 'Flask';
    const guide = skillSpecificGuides[nextSkillName] || skillSpecificGuides['Flask'];

    res.json({
      success: true,
      data: {
        targetCareer: targetCareer.title,
        careerReadinessPercent,
        skillsCompletedCount: skillsCompleted.length,
        skillsImprovingCount: skillsImproving.length,
        missingSkillsCount: missingSkills.length,
        missingSkillsList: missingSkills.length > 0 ? missingSkills : ['REST API', 'OOP', 'File Handling'],
        roadmapProgressPercent,
        coursesCompletedCount: completedCoursesCount,
        certificatesEarnedCount: certificatesEarned,
        totalCertificatesAvailable: freeCourses.length,
        codingChallengesCompletedCount: correctAttempts.length,
        avgAssessmentScore: avgScore,
        currentStreakDays: 5,
        recommendedNextAction: {
          skillName: nextSkillName,
          freeCourse: guide.learn.free,
          watchVideo: guide.watch[0],
          practiceProject: guide.practice
        }
      }
    });
  } catch (err) {
    console.error('Error fetching dashboard intelligence:', err);
    res.status(500).json({ success: false, message: 'Error calculating dashboard metrics' });
  }
});

// Endpoint to seed sample user activity progress into MongoDB
router.post('/seed-sample-progress', async (req, res) => {
  try {
    if (isMongoConnected()) {
      // 1. Add sample skills
      const sampleSkills = [
        { name: 'Python', level: 'Advanced', category: 'Languages', confidence: 90 },
        { name: 'SQL', level: 'Intermediate', category: 'Database', confidence: 75 },
        { name: 'Flask', level: 'Intermediate', category: 'Backend', confidence: 70 },
        { name: 'Git', level: 'Intermediate', category: 'DevOps', confidence: 80 },
        { name: 'REST API', level: 'Intermediate', category: 'Backend', confidence: 70 }
      ];

      for (const sk of sampleSkills) {
        await Skill.findOneAndUpdate({ name: sk.name }, sk, { upsert: true, new: true });
      }

      // 2. Mark 3 free certified courses as completed
      const sampleCourses = ['free-1', 'free-2', 'free-4', 'free-5'];
      for (const resId of sampleCourses) {
        await RoadmapProgress.findOneAndUpdate(
          { resourceId: resId },
          { resourceId: resId, skillName: 'Python', status: 'Completed' },
          { upsert: true, new: true }
        );
      }

      // 3. Add completed coding assessment attempts
      const sampleAttempts = [
        { problemId: 'py-beg-1', title: 'Even or Odd Filter', category: 'Conditions', difficulty: 'Beginner', codeSubmitted: 'def is_even(n): return n % 2 == 0', status: 'Correct', scoreAwarded: 100, passedTestCases: 5, totalTestCases: 5, attemptsCount: 1 },
        { problemId: 'py-beg-2', title: 'Sum of First N Numbers', category: 'Loops', difficulty: 'Beginner', codeSubmitted: 'def sum_n(n): return sum(range(1, n + 1))', status: 'Correct', scoreAwarded: 100, passedTestCases: 4, totalTestCases: 4, attemptsCount: 1 },
        { problemId: 'py-beg-3', title: 'Reverse String Specialist', category: 'Strings', difficulty: 'Beginner', codeSubmitted: 'def reverse_string(s): return s[::-1]', status: 'Correct', scoreAwarded: 100, passedTestCases: 4, totalTestCases: 4, attemptsCount: 1 },
        { problemId: 'py-int-1', title: 'Word Frequency Count', category: 'Dictionaries', difficulty: 'Intermediate', codeSubmitted: 'def word_count(words): return {w: words.count(w) for w in words}', status: 'Correct', scoreAwarded: 150, passedTestCases: 3, totalTestCases: 3, attemptsCount: 1 }
      ];

      for (const att of sampleAttempts) {
        await AssessmentAttempt.create(att);
      }
    } else {
      memoryProgress['free-1'] = 'Completed';
      memoryProgress['free-2'] = 'Completed';
      memoryProgress['free-4'] = 'Completed';
    }

    res.json({ success: true, message: 'Sample progress seeded successfully!' });
  } catch (err) {
    console.error('Error seeding sample progress:', err);
    res.status(500).json({ success: false, message: 'Error seeding progress', error: err.message });
  }
});

export default router;
