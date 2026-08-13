import React, { useState } from 'react';
import { X, Plus, Sparkles, Layers, BookOpen } from 'lucide-react';

export default function AddSkillModal({ isOpen, onClose, onAddSkill }) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [category, setCategory] = useState('Frontend');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a technical skill name');
      return;
    }

    onAddSkill({
      name: name.trim(),
      level,
      category: category.trim(),
      description: description.trim(),
    });

    // Reset & close
    setName('');
    setLevel('Beginner');
    setCategory('Frontend');
    setDescription('');
    setError('');
    onClose();
  };

  const levelOptions = [
    { value: 'Beginner', description: 'Foundational understanding, learning basics', color: '#34d399' },
    { value: 'Intermediate', description: 'Hands-on practical experience, comfortable building projects', color: '#38bdf8' },
    { value: 'Advanced', description: 'Deep mastery, optimization, complex problem solving', color: '#c084fc' }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div className="glass-card animate-fade-in" style={{
        width: '100%',
        maxWidth: '540px',
        padding: '2rem',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '0.6rem', borderRadius: '10px' }}>
            <Plus size={22} color="#818cf8" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700 }}>
              Add Technical Skill
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Store skill proficiency details into MongoDB database
            </p>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fca5a5',
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Skill Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Skill Name <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. React.js, Python, MongoDB, Docker"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="glass-input"
              autoFocus
            />
          </div>

          {/* Proficiency Level Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Select Skill Level <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {levelOptions.map(opt => {
                const isSelected = level === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLevel(opt.value)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                      border: isSelected ? `2px solid ${opt.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '0.85rem 0.5rem',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? opt.color : 'var(--text-main)' }}>
                      {opt.value}
                    </div>
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
              {levelOptions.find(l => l.value === level)?.description}
            </p>
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-select"
            >
              <option value="Frontend">Frontend Development</option>
              <option value="Backend">Backend & APIs</option>
              <option value="Database">Databases & Storage</option>
              <option value="DevOps">DevOps & Cloud</option>
              <option value="Mobile">Mobile App Development</option>
              <option value="Data Science">Data Science & AI</option>
              <option value="Languages">Programming Languages</option>
              <option value="General">General / Tools</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Short Description / Topics Covered
            </label>
            <textarea
              placeholder="e.g. REST APIs, Async/Await, Mongoose ORM, Aggregation"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-input"
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              Save to SkillGraph
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
