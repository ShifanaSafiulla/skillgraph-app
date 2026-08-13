import React, { useState, useEffect } from 'react';
import {
  Target,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Map,
  BookOpen,
  Award,
  Code,
  Star,
  Flame,
  Sparkles,
  ArrowRight,
  Play,
  ExternalLink,
  Zap,
  TrendingUp,
  Compass
} from 'lucide-react';
import KpiDetailModal from './KpiDetailModal';

export default function ProgressIntelligenceDashboard({ skills, selectedCareerId = 'python-developer', onNavigateTab }) {
  const [intel, setIntel] = useState({
    targetCareer: 'Python Developer',
    careerReadinessPercent: 28,
    skillsCompletedCount: 1,
    skillsImprovingCount: 1,
    missingSkillsCount: 5,
    missingSkillsList: ['Flask', 'REST API', 'Git', 'OOP', 'File Handling'],
    roadmapProgressPercent: 20,
    coursesCompletedCount: 2,
    certificatesEarnedCount: 1,
    totalCertificatesAvailable: 10,
    codingChallengesCompletedCount: 3,
    avgAssessmentScore: 85,
    currentStreakDays: 5,
    recommendedNextAction: {
      skillName: 'Flask',
      freeCourse: { name: 'Python Flask Web Framework Tutorial', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
      watchVideo: { title: 'Flask Crash Course 2026', channel: 'Traversy Media', url: 'https://www.youtube.com/results?search_query=flask+crash+course+traversy+media' },
      practiceProject: { title: 'Build a Simple Flask API with Auth', difficulty: 'Intermediate' }
    }
  });

  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [activeKpiKey, setActiveKpiKey] = useState(null);

  // Fetch intelligence metrics from server API
  const fetchIntel = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard/intelligence');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setIntel(data.data);
        }
      }
    } catch (err) {
      console.warn('Using client dashboard fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntel();
  }, [selectedCareerId]);

  // Handler to trigger sample progress population
  const handleSeedSampleProgress = async () => {
    try {
      setSeeding(true);
      const res = await fetch('/api/dashboard/seed-sample-progress', { method: 'POST' });
      if (res.ok) {
        await fetchIntel();
      }
    } catch (err) {
      console.error('Error seeding sample progress:', err);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Module 5 Header & Streak Banner */}
      <div className="glass-card" style={{ padding: '1.75rem 2rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.85) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', padding: '0.85rem', borderRadius: '16px', boxShadow: '0 8px 25px rgba(168, 85, 247, 0.4)' }}>
              <Compass size={30} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  Module 5: Dashboard & Progress Intelligence
                </h2>
                <span className="badge-level level-advanced" style={{ fontSize: '0.72rem', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
                  AI Guided Active
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Complete user progress intelligence dashboard with real-time career readiness & interactive KPI metrics.
              </p>
            </div>
          </div>

          {/* Controls, Streak & Seed Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            
            <button
              onClick={handleSeedSampleProgress}
              disabled={seeding}
              className="btn btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', borderColor: 'rgba(168, 85, 247, 0.4)', color: '#e9d5ff' }}
            >
              <Zap size={15} color="#c084fc" />
              <span>{seeding ? 'Populating...' : '⚡ Auto-Populate Sample Progress'}</span>
            </button>

            <div
              className="kpi-card-interactive"
              onClick={() => setActiveKpiKey('learningStreak')}
              style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.55rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Flame size={20} color="#f43f5e" fill="#f43f5e" />
              <div>
                <div style={{ fontSize: '0.68rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>Learning Streak</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  🔥 {intel.currentStreakDays} Days
                </div>
              </div>
            </div>

            <div
              className="kpi-card-interactive"
              onClick={() => setActiveKpiKey('targetCareer')}
              style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '0.55rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Target size={20} color="#38bdf8" />
              <div>
                <div style={{ fontSize: '0.68rem', color: '#7dd3fc', textTransform: 'uppercase', fontWeight: 700 }}>Target Career</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  🎯 {intel.targetCareer}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 1: SMART GUIDANCE BOX ("Recommended Next Action") */}
      <div className="glass-card animate-fade-in" style={{ padding: '1.75rem 2rem', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', padding: '0.5rem', borderRadius: '10px' }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>
                Intelligent Career Guidance
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                Recommended Next Action
              </h3>
            </div>
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', background: 'rgba(99, 102, 241, 0.25)', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            Your next recommended skill is <span style={{ color: '#38bdf8', textDecoration: 'underline' }}>{intel.recommendedNextAction?.skillName || 'Flask'}</span>
          </div>
        </div>

        {/* 3 Actionable Cards: Free Course, Watch, Practice */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          
          {/* Card 1: 📚 Free Course */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase' }}>
                <BookOpen size={18} />
                <span>📚 Free Course</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: '0.65rem' }}>
                {intel.recommendedNextAction?.freeCourse?.name || 'Python Flask Web Framework Tutorial'}
              </h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Platform: <strong>{intel.recommendedNextAction?.freeCourse?.platform || 'freeCodeCamp'}</strong>
              </div>
            </div>

            <a
              href={intel.recommendedNextAction?.freeCourse?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', background: '#10b981' }}
            >
              <span>Start Free Course</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Card 2: 🎥 Watch */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase' }}>
                <Play size={18} />
                <span>🎥 Watch Video</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: '0.65rem' }}>
                {intel.recommendedNextAction?.watchVideo?.title || 'Flask Crash Course'}
              </h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Channel: <strong>{intel.recommendedNextAction?.watchVideo?.channel || 'Traversy Media'}</strong>
              </div>
            </div>

            <a
              href={intel.recommendedNextAction?.watchVideo?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
            >
              <Play size={14} />
              <span>Watch Crash Course</span>
            </a>
          </div>

          {/* Card 3: 💻 Practice */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase' }}>
                <Code size={18} />
                <span>💻 Practice Project</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: '0.65rem' }}>
                {intel.recommendedNextAction?.practiceProject?.title || 'Build a Simple Flask API'}
              </h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Level: <strong>{intel.recommendedNextAction?.practiceProject?.difficulty || 'Intermediate'}</strong>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab && onNavigateTab('module4')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }}
            >
              <span>Solve Coding Challenge</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>

      {/* SECTION 2: COMPLETE 11 KPI METRICS DASHBOARD GRID (ALL FULLY INTERACTIVE) */}
      <div>
        <div style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 size={20} color="#06b6d4" />
          <span>Full Progress & Performance Intelligence (11 Interactive Metrics)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          
          {/* 1. 🎯 Target Career */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('targetCareer')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Target size={16} /> 🎯 Target Career
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginTop: '0.5rem' }}>
              {intel.targetCareer}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Selected Target Pathway</div>
          </div>

          {/* 2. 📊 Career Readiness % */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('careerReadiness')}
            style={{ padding: '1.25rem', border: '1px solid rgba(6, 182, 212, 0.3)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06b6d4', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <TrendingUp size={16} /> 📊 Career Readiness
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#38bdf8', marginTop: '0.4rem' }}>
              {intel.careerReadinessPercent}%
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden' }}>
              <div style={{ width: `${intel.careerReadinessPercent}%`, height: '100%', background: 'linear-gradient(90deg, #06b6d4, #10b981)', borderRadius: '3px' }} />
            </div>
          </div>

          {/* 3. ✅ Skills Completed */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('skillsCompleted')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <CheckCircle2 size={16} /> ✅ Skills Completed
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#34d399', marginTop: '0.4rem' }}>
              {intel.skillsCompletedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Advanced Proficiency</div>
          </div>

          {/* 4. 🟡 Skills Improving */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('skillsImproving')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <AlertTriangle size={16} /> 🟡 Skills Improving
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fbbf24', marginTop: '0.4rem' }}>
              {intel.skillsImprovingCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Intermediate Level</div>
          </div>

          {/* 5. ❌ Missing Skills (PRIMARY FEATURE MODAL TRIGGER) */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('missingSkills')}
            style={{ padding: '1.25rem', border: '1px solid rgba(244, 63, 94, 0.4)', background: 'rgba(244, 63, 94, 0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <XCircle size={16} /> ❌ Missing Skills
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fca5a5', marginTop: '0.4rem' }}>
              {intel.missingSkillsCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#f43f5e', fontWeight: 700, marginTop: '0.2rem' }}>
              Click to view OOP, File Handling & guides ↗
            </div>
          </div>

          {/* 6. 🗺️ Roadmap Progress */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('roadmapProgress')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Map size={16} /> 🗺️ Roadmap Progress
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#c084fc', marginTop: '0.4rem' }}>
              {intel.roadmapProgressPercent}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Topics & Modules Completed</div>
          </div>

          {/* 7. 📚 Courses Completed */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('coursesCompleted')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <BookOpen size={16} /> 📚 Courses Completed
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginTop: '0.4rem' }}>
              {intel.coursesCompletedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Finished Course Modules</div>
          </div>

          {/* 8. 🎓 Certificates Earned/Available */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('certificates')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Award size={16} /> 🎓 Certificates
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginTop: '0.4rem' }}>
              {intel.certificatesEarnedCount} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {intel.totalCertificatesAvailable} Available</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Verified Badges & Certs</div>
          </div>

          {/* 9. 💻 Coding Challenges Completed */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('codingChallenges')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a855f7', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Code size={16} /> 💻 Challenges Done
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#c084fc', marginTop: '0.4rem' }}>
              {intel.codingChallengesCompletedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Python Coding Submissions</div>
          </div>

          {/* 10. ⭐ Average Assessment Score */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('avgScore')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Star size={16} /> ⭐ Avg Assessment Score
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fbbf24', marginTop: '0.4rem' }}>
              {intel.avgAssessmentScore} pts
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Average Points Per Challenge</div>
          </div>

          {/* 11. 🔥 Current Learning Streak */}
          <div
            className="glass-card kpi-card-interactive"
            onClick={() => setActiveKpiKey('learningStreak')}
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Flame size={16} /> 🔥 Learning Streak
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fca5a5', marginTop: '0.4rem' }}>
              {intel.currentStreakDays} Days
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Active Consecutive Days</div>
          </div>

        </div>
      </div>

      {/* Render KPI Detail Modal */}
      <KpiDetailModal
        isOpen={Boolean(activeKpiKey)}
        onClose={() => setActiveKpiKey(null)}
        kpiKey={activeKpiKey}
        intelData={intel}
        onNavigateTab={onNavigateTab}
      />

    </div>
  );
}
