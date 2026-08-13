import React from 'react';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import {
  Network,
  Plus,
  Database,
  Briefcase,
  Layers,
  BookOpen,
  Code,
  Compass,
  Sun,
  Moon,
  Settings,
  User,
  ShieldCheck
} from 'lucide-react';

export default function Header({
  skills = [],
  onOpenAddModal,
  dbStatus,
  activeTab,
  setActiveTab,
  theme = 'dark',
  setTheme,
  onOpenProfileModal,
  onOpenSettingsModal,
  onOpenAdminPanel,
  userProfile = {}
}) {
  const total = skills.length;
  const beginnerCount = skills.filter(s => s.level === 'Beginner').length;
  const intermediateCount = skills.filter(s => s.level === 'Intermediate').length;
  const advancedCount = skills.filter(s => s.level === 'Advanced').length;

  const toggleTheme = () => {
    if (setTheme) {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  return (
    <header className="glass-card" style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            padding: '0.85rem',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Network size={28} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.65rem',
                fontWeight: 800,
                background: theme === 'light' ? 'linear-gradient(to right, #4f46e5, #0284c7)' : 'linear-gradient(to right, #ffffff, #93c5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SkillGraph
              </h1>
              <span className="badge-level level-intermediate" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                All 5 Modules Active
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Skill Management, Career Gap Analysis, Smart Learning Roadmap, Coding Assessment & Dashboard Intelligence
            </p>
          </div>
        </div>

        {/* Top Header Controls: Theme Toggle, Settings, User Profile & DB Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* DB Indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(15, 23, 42, 0.4)',
            padding: '0.5rem 0.85rem',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <Database size={15} color={dbStatus === 'Connected' ? '#10b981' : '#f59e0b'} />
            <span>MongoDB:</span>
            <strong style={{ color: dbStatus === 'Connected' ? '#34d399' : '#fbbf24' }}>
              {dbStatus || 'Checking...'}
            </strong>
          </div>

          {/* Light Switch Theme Toggle Bar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '0.35rem 0.65rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <ThemeToggleSwitch theme={theme} setTheme={setTheme} size="small" showLabel={true} />
          </div>

          {/* Admin Panel Button */}
          <button
            onClick={onOpenAdminPanel}
            className="btn btn-secondary"
            title="Open Admin Panel"
            style={{
              padding: '0.5rem 0.85rem',
              fontSize: '0.82rem',
              borderColor: 'rgba(239, 68, 68, 0.4)',
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#fca5a5'
            }}
          >
            <ShieldCheck size={17} color="#ef4444" />
            <span style={{ fontWeight: 700 }}>Admin Panel</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            className="btn btn-secondary"
            title="Settings & Accessibility Preferences"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}
          >
            <Settings size={17} color="var(--cyan-accent)" />
            <span>Settings</span>
          </button>

          {/* User Profile Avatar Button */}
          <button
            onClick={onOpenProfileModal}
            className="btn btn-secondary"
            style={{
              padding: '0.4rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              borderColor: 'rgba(99, 102, 241, 0.4)',
              background: 'rgba(99, 102, 241, 0.12)'
            }}
          >
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              AM
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {userProfile.name || 'Alex Morgan'}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                {userProfile.targetCareer || 'Python Developer'}
              </div>
            </div>
          </button>

          {/* Add Skill Button */}
          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <Plus size={18} />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.65rem',
        marginTop: '1.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid var(--border-color)',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('module1')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            background: activeTab === 'module1' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'module1' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'module1' ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none'
          }}
        >
          <Layers size={15} />
          Module 1: Skill Management
        </button>

        <button
          onClick={() => setActiveTab('module2')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            background: activeTab === 'module2' ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'module2' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'module2' ? '0 4px 15px rgba(6, 182, 212, 0.4)' : 'none'
          }}
        >
          <Briefcase size={15} />
          Module 2: Career Gap Analysis
        </button>

        <button
          onClick={() => setActiveTab('module3')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            background: activeTab === 'module3' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'module3' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'module3' ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none'
          }}
        >
          <BookOpen size={15} />
          Module 3: Roadmap & Resources
        </button>

        <button
          onClick={() => setActiveTab('module4')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            background: activeTab === 'module4' ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'module4' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'module4' ? '0 4px 15px rgba(168, 85, 247, 0.4)' : 'none'
          }}
        >
          <Code size={15} />
          Module 4: Coding Assessment
        </button>

        <button
          onClick={() => setActiveTab('module5')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            background: activeTab === 'module5' ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'module5' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'module5' ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none'
          }}
        >
          <Compass size={15} />
          Module 5: Progress Intelligence
        </button>
      </div>

      {/* Metrics Bar (if in Module 1) */}
      {activeTab === 'module1' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1.25rem'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Skills</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem', color: 'var(--text-main)' }}>
              {total}
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.04)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
            <div style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Beginner</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem', color: '#34d399' }}>
              {beginnerCount}
            </div>
          </div>

          <div style={{ background: 'rgba(6, 182, 212, 0.04)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Intermediate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem', color: '#38bdf8' }}>
              {intermediateCount}
            </div>
          </div>

          <div style={{ background: 'rgba(168, 85, 247, 0.04)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
            <div style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Advanced</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem', color: '#c084fc' }}>
              {advancedCount}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
