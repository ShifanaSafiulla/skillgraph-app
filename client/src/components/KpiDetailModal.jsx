import React from 'react';
import {
  X,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Map,
  BookOpen,
  Award,
  Code,
  Star,
  Flame,
  ArrowRight,
  BookMarked,
  Sparkles
} from 'lucide-react';

export default function KpiDetailModal({ isOpen, onClose, kpiKey, intelData = {}, onNavigateTab }) {
  if (!isOpen) return null;

  const targetCareerName = intelData.targetCareer || 'Python Developer';

  // Comprehensive details mapping for missing skills
  const missingSkillsData = [
    {
      name: 'OOP (Object-Oriented Programming)',
      category: 'Core Programming',
      difficulty: 'Intermediate',
      priority: 'High',
      reason: 'Crucial for structuring modular, maintainable Python applications using classes, inheritance, encapsulation, and design patterns.',
      moduleTab: 'module3'
    },
    {
      name: 'File Handling & Streams',
      category: 'Data Persistence',
      difficulty: 'Beginner',
      priority: 'Medium',
      reason: 'Essential for reading/writing files (JSON, CSV, TXT), managing buffer streams, logging, and processing dataset files.',
      moduleTab: 'module3'
    },
    {
      name: 'Flask Web Framework',
      category: 'Backend Development',
      difficulty: 'Intermediate',
      priority: 'High',
      reason: 'Lightweight WSGI framework required to build RESTful microservices, Web APIs, and server-side routes in Python.',
      moduleTab: 'module3'
    },
    {
      name: 'REST API Architecture',
      category: 'Web Services',
      difficulty: 'Intermediate',
      priority: 'High',
      reason: 'Industry standard protocol for client-server JSON communication, HTTP methods (GET, POST, PUT, DELETE), and authentication endpoints.',
      moduleTab: 'module3'
    },
    {
      name: 'Git & Version Control',
      category: 'DevOps & Tooling',
      difficulty: 'Beginner',
      priority: 'Critical',
      reason: 'Mandatory software engineering tool for code tracking, branching strategy, GitHub collaboration, and pull request workflows.',
      moduleTab: 'module3'
    }
  ];

  const handleStartLearning = (targetTab) => {
    onClose();
    if (onNavigateTab) {
      onNavigateTab(targetTab);
    }
  };

  const renderContent = () => {
    switch (kpiKey) {
      case 'missingSkills':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#f43f5e' }}>
                <XCircle size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ❌ Missing Skills Breakdown ({intelData.missingSkillsCount || missingSkillsData.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Identified skill gaps for your target path: <strong style={{ color: '#38bdf8' }}>{targetCareerName}</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.3rem' }}>
              {missingSkillsData.map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        Category: <span style={{ color: 'var(--cyan-accent)' }}>{item.category}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span className="badge-level level-beginner" style={{ fontSize: '0.68rem' }}>
                        {item.difficulty}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '20px',
                        background: item.priority === 'Critical' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: item.priority === 'Critical' ? '#fca5a5' : '#fef08a',
                        border: `1px solid ${item.priority === 'Critical' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                      }}>
                        {item.priority} Priority
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    <strong>Why Needed:</strong> {item.reason}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.2rem' }}>
                    <button
                      onClick={() => handleStartLearning(item.moduleTab)}
                      className="btn btn-primary"
                      style={{ padding: '0.45rem 0.95rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                    >
                      <BookMarked size={14} />
                      <span>Start Learning</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'targetCareer':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#38bdf8' }}>
                <Target size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  🎯 Target Career Pathway
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Selected Goal Profile & Skill Requirements</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#38bdf8' }}>
                {targetCareerName}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                As a target <strong>{targetCareerName}</strong>, your objective is to master core backend fundamentals, web frameworks (Flask/Django), database schema architecture, REST APIs, and automated test suites.
              </p>

              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>Industry Market Demand</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  🔥 High Demand • Average Salary: $95,000 - $135,000 / year
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module2')}>
                <Target size={15} />
                <span>Switch Career Pathway</span>
              </button>
            </div>
          </div>
        );

      case 'careerReadiness':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#06b6d4' }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  📊 Career Readiness Score ({intelData.careerReadinessPercent}%)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Skill match benchmark relative to market expectations</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Competency Benchmark Progress</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>{intelData.careerReadinessPercent}% Match</span>
              </div>

              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${intelData.careerReadinessPercent}%`, height: '100%', background: 'linear-gradient(90deg, #06b6d4, #10b981)', borderRadius: '5px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1.25rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 700 }}>Skills Acquired</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>{(intelData.skillsCompletedCount || 1) + (intelData.skillsImprovingCount || 1)} Skills</div>
                </div>

                <div style={{ padding: '0.75rem', background: 'rgba(244, 63, 94, 0.08)', borderRadius: '10px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>Remaining Gaps</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>{intelData.missingSkillsCount || 5} Skills</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module2')}>
                <span>View Full Skill-Gap Matrix</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'skillsCompleted':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#10b981' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ✅ Skills Mastered ({intelData.skillsCompletedCount || 1})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Advanced level technical competencies verified</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                You have reached <strong>Advanced Proficiency</strong> in the following competencies:
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                <div style={{ padding: '0.5rem 0.85rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontWeight: 700, fontSize: '0.85rem' }}>
                  ⚡ Python (Advanced - 90% Confidence)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module1')}>
                <span>Manage All Skills</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'skillsImproving':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#f59e0b' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  🟡 Skills Improving ({intelData.skillsImprovingCount || 1})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Intermediate level skills needing further practice</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#fef08a', fontSize: '0.88rem' }}>SQL & Databases</span>
                  <span className="badge-level level-intermediate" style={{ fontSize: '0.68rem' }}>Intermediate</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module1')}>
                <span>Upgrade Skill Level</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'roadmapProgress':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#c084fc' }}>
                <Map size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  🗺️ Roadmap Completion ({intelData.roadmapProgressPercent || 20}%)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Curated learning roadmap progress tracking</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                You have completed <strong>{intelData.coursesCompletedCount || 2}</strong> courses out of available roadmap modules.
              </div>

              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e9d5ff' }}>Next Milestone Goal</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.15rem' }}>
                  Complete 2 more modules to reach 50% roadmap completion badge!
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module3')}>
                <span>Go to Smart Roadmap</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'coursesCompleted':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#10b981' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  📚 Courses Completed ({intelData.coursesCompletedCount || 2})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Finished structured online learning courses</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Recent Finished Courses:</p>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                <li>Python Core Programming Essentials (freeCodeCamp)</li>
                <li>SQL & Database Design Masterclass (Coursera)</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module3')}>
                <span>Browse Resource Hub</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'certificates':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#f59e0b' }}>
                <Award size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  🎓 Certificates Earned ({intelData.certificatesEarnedCount || 1} / {intelData.totalCertificatesAvailable || 10})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified learning certificates & skill badges</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <Award size={28} color="#fbbf24" />
                <div>
                  <div style={{ fontWeight: 700, color: '#fef08a', fontSize: '0.92rem' }}>Python Foundations Certification</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Issued by SkillGraph Learning Engine • Verified</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module3')}>
                <span>Unlock More Certificates</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'codingChallenges':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#a855f7' }}>
                <Code size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  💻 Coding Challenges Solved ({intelData.codingChallengesCompletedCount || 3})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Automated test suite passing submissions</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                You have successfully completed <strong>{intelData.codingChallengesCompletedCount || 3}</strong> coding challenges in Module 4 Daily Assessment!
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module4')}>
                <span>Solve Today's Coding Challenge</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'avgScore':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#f59e0b' }}>
                <Star size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ⭐ Average Assessment Score ({intelData.avgAssessmentScore || 85} pts)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Average score per coding problem submission</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>
                {intelData.avgAssessmentScore || 85} / 100 Points
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Excellent code optimization quality and test case pass rate!
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module4')}>
                <span>Try Advanced Challenge</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      case 'learningStreak':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#f43f5e' }}>
                <Flame size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  🔥 Active Learning Streak ({intelData.currentStreakDays || 5} Days)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Consecutive days of active skill learning</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fca5a5', fontFamily: 'var(--font-heading)' }}>
                🔥 {intelData.currentStreakDays || 5} Days Streak!
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Keep learning daily to maintain your streak momentum and unlock special achievement badges!
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={() => handleStartLearning('module3')}>
                <span>Continue Daily Roadmap</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <p style={{ color: 'var(--text-muted)' }}>No detail available for this KPI.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Sparkles size={16} />
            <span>Metric Detail Intelligence</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
