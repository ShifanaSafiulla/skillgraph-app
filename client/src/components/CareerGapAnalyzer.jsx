import React, { useState, useEffect, useMemo } from 'react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  ArrowRight,
  FileCode2,
  Layers,
  BarChart3,
  BrainCircuit,
  Cpu,
  BookOpen,
  Check
} from 'lucide-react';

export const DEFAULT_CAREERS = [
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

const careerIcons = {
  'python-developer': FileCode2,
  'fullstack-developer': Layers,
  'data-analyst': BarChart3,
  'data-scientist': BrainCircuit,
  'ml-engineer': Cpu
};

const getLevelWeight = (level) => {
  switch (level) {
    case 'Beginner': return 1;
    case 'Intermediate': return 2;
    case 'Advanced': return 3;
    default: return 1;
  }
};

export default function CareerGapAnalyzer({ skills, onAddQuickSkill }) {
  const [careers, setCareers] = useState(DEFAULT_CAREERS);
  const [selectedCareerId, setSelectedCareerId] = useState('python-developer');

  // Try fetching API careers, fallback to DEFAULT_CAREERS instantly
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch('/api/careers');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            setCareers(data.data);
          }
        }
      } catch (err) {
        console.warn('API fetch careers notice:', err);
      }
    };
    fetchCareers();
  }, []);

  const selectedCareer = useMemo(() => {
    return careers.find(c => c.id === selectedCareerId) || careers[0] || DEFAULT_CAREERS[0];
  }, [careers, selectedCareerId]);

  // Synchronous client-side gap calculation (Guarantees zero blank state!)
  const analysis = useMemo(() => {
    if (!selectedCareer) return null;

    const studentSkillsMap = new Map();
    (skills || []).forEach(s => {
      const nameKey = s.name.toLowerCase().trim();
      studentSkillsMap.set(nameKey, s);
      // Also map partial aliases (e.g. "Git & GitHub" -> "git")
      if (nameKey.includes('git')) studentSkillsMap.set('git', s);
      if (nameKey.includes('sql')) studentSkillsMap.set('sql', s);
      if (nameKey.includes('python')) studentSkillsMap.set('python', s);
      if (nameKey.includes('css')) studentSkillsMap.set('html & css', s);
    });

    const completedSkills = [];
    const skillsToImprove = [];
    const missingSkills = [];

    let totalRequiredWeight = 0;
    let earnedWeight = 0;

    selectedCareer.requiredSkills.forEach(reqSkill => {
      const targetWeight = getLevelWeight(reqSkill.level);
      totalRequiredWeight += targetWeight;

      const reqKey = reqSkill.name.toLowerCase().trim();
      const studentSkill = studentSkillsMap.get(reqKey);

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

    return {
      careerTitle: selectedCareer.title,
      readinessPercentage,
      completedSkills,
      skillsToImprove,
      missingSkills
    };
  }, [selectedCareer, skills]);

  const getReadinessColor = (pct) => {
    if (pct >= 75) return '#10b981'; // Green
    if (pct >= 40) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose
  };

  const getReadinessLabel = (pct) => {
    if (pct >= 75) return 'Job Ready';
    if (pct >= 40) return 'Developing Competency';
    return 'Needs Foundation';
  };

  const possessedSkillsList = analysis ? [
    ...analysis.completedSkills.map(s => `${s.name} – ${s.currentLevel}`),
    ...analysis.skillsToImprove.map(s => `${s.name} – ${s.currentLevel}`)
  ] : [];

  const missingSkillsListStr = analysis && analysis.missingSkills.length > 0
    ? analysis.missingSkills.map(s => s.name).join(', ')
    : 'None! All career skills acquired.';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Module Header Card */}
      <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.5rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', padding: '0.65rem', borderRadius: '12px' }}>
            <Briefcase size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                Module 2: Career Selection & Skill-Gap Analysis
              </h2>
              <span className="badge-level level-intermediate" style={{ fontSize: '0.7rem' }}>
                Skill Gap Engine Active
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Select a target career to evaluate your skill readiness percentage and view personalized skill recommendations.
            </p>
          </div>
        </div>

        {/* Target Career Selection Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          {careers.map(c => {
            const isSelected = c.id === selectedCareerId;
            const IconComponent = careerIcons[c.id] || Briefcase;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCareerId(c.id)}
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)'
                    : 'rgba(15, 23, 42, 0.5)',
                  border: isSelected
                    ? '2px solid #6366f1'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.1rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  boxShadow: isSelected ? '0 8px 25px rgba(99, 102, 241, 0.35)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.06)',
                    padding: '0.5rem',
                    borderRadius: '10px'
                  }}>
                    <IconComponent size={20} color={isSelected ? '#ffffff' : 'var(--text-muted)'} />
                  </div>
                  {isSelected && (
                    <span style={{ fontSize: '0.72rem', background: '#6366f1', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>
                      Selected
                    </span>
                  )}
                </div>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                    {c.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.3 }}>
                    {c.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Career Gap Comparison Output */}
      {analysis && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Target Career Summary & Readiness Meter */}
          <div className="glass-card animate-fade-in" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Career Comparison Result
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                  Target: <span style={{ color: '#818cf8' }}>{analysis.careerTitle}</span>
                </h3>
              </div>

              {/* Career Readiness Percentage Ring */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: `conic-gradient(${getReadinessColor(analysis.readinessPercentage)} ${analysis.readinessPercentage * 3.6}deg, rgba(255, 255, 255, 0.08) 0deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 25px ${getReadinessColor(analysis.readinessPercentage)}40`
                }}>
                  <div style={{
                    width: '86px',
                    height: '86px',
                    borderRadius: '50%',
                    background: '#090d16',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.55rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
                      {analysis.readinessPercentage}%
                    </span>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Readiness</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Career Readiness Status</div>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '0.3rem',
                    background: `${getReadinessColor(analysis.readinessPercentage)}20`,
                    color: getReadinessColor(analysis.readinessPercentage),
                    border: `1px solid ${getReadinessColor(analysis.readinessPercentage)}40`
                  }}>
                    {getReadinessLabel(analysis.readinessPercentage)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Summary Card: "You Have" vs "You Need to Learn" */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              {/* You Have Box */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '14px',
                padding: '1.25rem'
              }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#34d399', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} /> You Have:
                </h4>
                {possessedSkillsList.length === 0 ? (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    No skills matched in your profile yet.
                  </p>
                ) : (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {possessedSkillsList.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.92rem', color: '#f3f4f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#34d399' }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* You Need to Learn Box */}
              <div style={{
                background: 'rgba(244, 63, 94, 0.06)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                borderRadius: '14px',
                padding: '1.25rem'
              }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#fca5a5', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={18} /> You Need to Learn:
                </h4>
                {analysis.missingSkills.length === 0 ? (
                  <p style={{ color: '#34d399', fontSize: '0.88rem', fontWeight: 600 }}>
                    🎉 Great job! You have all required skills for this role.
                  </p>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700, lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      {missingSkillsListStr}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {analysis.missingSkills.map((sk, idx) => (
                        <button
                          key={idx}
                          onClick={() => onAddQuickSkill({
                            name: sk.name,
                            level: 'Beginner',
                            category: sk.category || 'General',
                            description: `Target skill required for ${analysis.careerTitle}`
                          })}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', color: '#fca5a5', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                        >
                          <Plus size={12} /> Add {sk.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 3 Column Detailed Categorization Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            {/* ✅ Completed Skills */}
            <div className="glass-card" style={{ padding: '1.5rem', borderTop: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={20} color="#10b981" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                  ✅ Completed Skills ({analysis.completedSkills.length})
                </h4>
              </div>

              {analysis.completedSkills.length === 0 ? (
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  No required skills fully completed yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {analysis.completedSkills.map((sk, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{sk.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sk.category}</div>
                      </div>
                      <span className="badge-level level-beginner" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: 'none' }}>
                        ✓ {sk.currentLevel}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 🟡 Skills to Improve */}
            <div className="glass-card" style={{ padding: '1.5rem', borderTop: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <AlertTriangle size={20} color="#f59e0b" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                  🟡 Skills to Improve ({analysis.skillsToImprove.length})
                </h4>
              </div>

              {analysis.skillsToImprove.length === 0 ? (
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  All possessed skills meet target proficiency levels.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {analysis.skillsToImprove.map((sk, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem'
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{sk.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                        <span style={{ color: '#fbbf24' }}>Current: {sk.currentLevel}</span>
                        <ArrowRight size={12} color="var(--text-muted)" />
                        <span style={{ color: '#38bdf8', fontWeight: 600 }}>Target: {sk.requiredLevel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ❌ Missing Skills */}
            <div className="glass-card" style={{ padding: '1.5rem', borderTop: '4px solid #f43f5e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <XCircle size={20} color="#f43f5e" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                  ❌ Missing Skills ({analysis.missingSkills.length})
                </h4>
              </div>

              {analysis.missingSkills.length === 0 ? (
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  No missing skills! You possess every skill required.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {analysis.missingSkills.map((sk, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(244, 63, 94, 0.08)',
                      border: '1px solid rgba(244, 63, 94, 0.2)',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{sk.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#fca5a5' }}>Target: {sk.requiredLevel}</div>
                      </div>

                      <button
                        className="btn btn-primary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        onClick={() => onAddQuickSkill({
                          name: sk.name,
                          level: 'Beginner',
                          category: sk.category || 'General',
                          description: `Target skill required for ${analysis.careerTitle}`
                        })}
                      >
                        <Plus size={13} />
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
