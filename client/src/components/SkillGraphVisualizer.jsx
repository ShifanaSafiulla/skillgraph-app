import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function SkillGraphVisualizer({ skills, onEditSkill }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const defaultCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Languages', 'Data Science', 'General'];
  const availableCategories = ['All', ...new Set([...defaultCategories, ...skills.map(s => s.category || 'General')])];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => (s.category || 'General').toLowerCase().includes(selectedCategory.toLowerCase()));

  const beginnerSkills = filteredSkills.filter(s => s.level === 'Beginner');
  const intermediateSkills = filteredSkills.filter(s => s.level === 'Intermediate');
  const advancedSkills = filteredSkills.filter(s => s.level === 'Advanced');

  const levelConfigs = [
    {
      level: 'Beginner',
      title: 'Beginner',
      badgeClass: 'level-beginner',
      items: beginnerSkills,
      progressColor: '#34d399',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
      borderColor: 'rgba(16, 185, 129, 0.3)'
    },
    {
      level: 'Intermediate',
      title: 'Intermediate',
      badgeClass: 'level-intermediate',
      items: intermediateSkills,
      progressColor: '#38bdf8',
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 100%)',
      borderColor: 'rgba(6, 182, 212, 0.3)'
    },
    {
      level: 'Advanced',
      title: 'Advanced',
      badgeClass: 'level-advanced',
      items: advancedSkills,
      progressColor: '#c084fc',
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 100%)',
      borderColor: 'rgba(168, 85, 247, 0.3)'
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '1.75rem 2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Activity size={22} color="#06b6d4" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
            Interactive Technical Skill Matrix & Nodes
          </h2>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {availableCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: selectedCategory === cat ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Columns Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {levelConfigs.map(col => (
          <div
            key={col.level}
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              borderRadius: '14px',
              padding: '1.25rem',
              border: `1px solid ${col.borderColor}`,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
            }}
          >
            {/* Column Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className={`badge-level ${col.badgeClass}`}>
                {col.title}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {col.items.length} {col.items.length === 1 ? 'skill' : 'skills'}
              </span>
            </div>

            {/* Nodes Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', minHeight: '140px' }}>
              {col.items.length === 0 ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '110px',
                  color: 'var(--text-dim)',
                  fontSize: '0.82rem',
                  borderRadius: '10px',
                  border: '1px dashed rgba(255, 255, 255, 0.06)',
                  background: 'rgba(0, 0, 0, 0.15)'
                }}>
                  No {col.level.toLowerCase()} skills in {selectedCategory}
                </div>
              ) : (
                col.items.map(skill => (
                  <div
                    key={skill._id}
                    onClick={() => onEditSkill(skill)}
                    className="animate-fade-in"
                    style={{
                      background: col.gradient,
                      borderRadius: '12px',
                      padding: '0.9rem 1rem',
                      border: `1px solid ${col.borderColor}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${col.borderColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                        {skill.name}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        color: 'var(--text-muted)'
                      }}>
                        {skill.category || 'General'}
                      </span>
                    </div>

                    {skill.description && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                        {skill.description}
                      </p>
                    )}

                    {/* Node Strength Bar */}
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.2rem' }}>
                      <div style={{
                        height: '100%',
                        width: col.level === 'Beginner' ? '33%' : col.level === 'Intermediate' ? '66%' : '100%',
                        background: col.progressColor,
                        borderRadius: '2px',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
