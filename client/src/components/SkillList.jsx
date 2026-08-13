import React, { useState } from 'react';
import { Search, Edit3, Trash2, ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function SkillList({ skills, onEditSkill, onDeleteSkill, onChangeLevel }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Filter skills based on search term and selected level filter
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (skill.category && skill.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (skill.description && skill.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'All' || skill.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'Beginner': return 'level-beginner';
      case 'Intermediate': return 'level-intermediate';
      case 'Advanced': return 'level-advanced';
      default: return 'level-beginner';
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
      
      {/* Title and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
            Skill Management & Quick Editor
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Modify skill proficiency levels, update details, or delete skills stored in MongoDB
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', width: '100%', maxWidth: '520px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search skills or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Level Filter Dropdown */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="glass-select"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Skills Table / List View */}
      {filteredSkills.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.4)',
          borderRadius: '12px',
          border: '1px dashed rgba(255, 255, 255, 0.1)'
        }}>
          <SlidersHorizontal size={36} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ color: 'var(--text-muted)', fontWeight: 600 }}>No skills found</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
            {searchTerm || selectedLevel !== 'All' ? 'Try adjusting your search or level filter.' : 'Click "Add Technical Skill" to get started.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {filteredSkills.map(skill => (
            <div
              key={skill._id}
              className="animate-fade-in"
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '14px',
                padding: '1.1rem 1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)'}
            >
              {/* Skill Info */}
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {skill.name}
                  </h3>
                  <span style={{
                    fontSize: '0.72rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '8px',
                    color: 'var(--text-muted)'
                  }}>
                    {skill.category || 'General'}
                  </span>
                </div>
                {skill.description && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    {skill.description}
                  </p>
                )}
              </div>

              {/* Skill Level Quick Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.4rem', borderRadius: '10px' }}>
                {['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
                  const isActive = skill.level === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => onChangeLevel(skill, lvl)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '7px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: isActive ? (lvl === 'Beginner' ? '#10b981' : lvl === 'Intermediate' ? '#06b6d4' : '#a855f7') : 'transparent',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                      }}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* Edit Details */}
                <button
                  className="btn btn-secondary"
                  onClick={() => onEditSkill(skill)}
                  title="Edit Skill Details"
                  style={{ padding: '0.5rem 0.75rem' }}
                >
                  <Edit3 size={16} />
                  <span style={{ fontSize: '0.8rem' }}>Edit</span>
                </button>

                {/* Delete Skill */}
                {deleteConfirmId === skill._id ? (
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        onDeleteSkill(skill._id);
                        setDeleteConfirmId(null);
                      }}
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                    >
                      Confirm Delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setDeleteConfirmId(null)}
                      style={{ padding: '0.45rem 0.6rem', fontSize: '0.78rem' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setDeleteConfirmId(skill._id)}
                    title="Delete Skill"
                    style={{ padding: '0.5rem 0.75rem', color: '#fca5a5' }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
