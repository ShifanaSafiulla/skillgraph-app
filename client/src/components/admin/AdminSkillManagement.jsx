import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  Code,
  RefreshCw
} from 'lucide-react';

export default function AdminSkillManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deletingSkill, setDeletingSkill] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    level: 'Beginner',
    category: 'General',
    description: '',
    icon: 'Code'
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/skills');
      const data = await res.json();
      if (data.success) {
        setSkills(data.data || []);
      }
    } catch (err) {
      console.error('Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const levelsList = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered Skills
  const filteredSkills = useMemo(() => {
    return skills.filter(sk => {
      if (selectedLevel !== 'All' && sk.level !== selectedLevel) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = sk.name?.toLowerCase().includes(query) ||
          sk.category?.toLowerCase().includes(query) ||
          sk.description?.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [skills, selectedLevel, searchQuery]);

  // Create Skill
  const handleCreateSkill = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSkills(prev => [data.data, ...prev]);
        setIsAddModalOpen(false);
        setFormData({ name: '', level: 'Beginner', category: 'General', description: '', icon: 'Code' });
      } else {
        alert(data.message || 'Failed to create skill');
      }
    } catch (err) {
      console.error('Error creating skill:', err);
    }
  };

  // Update Skill
  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    if (!editingSkill) return;
    try {
      const res = await fetch(`/api/admin/skills/${editingSkill._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSkill)
      });
      const data = await res.json();
      if (data.success) {
        setSkills(prev => prev.map(s => s._id === editingSkill._id ? data.data : s));
        setEditingSkill(null);
      } else {
        alert(data.message || 'Failed to update skill');
      }
    } catch (err) {
      console.error('Error updating skill:', err);
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (id) => {
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSkills(prev => prev.filter(s => s._id !== id));
        setDeletingSkill(null);
      } else {
        alert(data.message || 'Failed to delete skill');
      }
    } catch (err) {
      console.error('Error deleting skill:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Layers size={24} color="#34d399" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                Skills Management Inventory
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Manage technical skill definitions, proficiency levels, categories, and icons across the platform.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={fetchSkills} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.55rem 1.1rem' }}>
              <Plus size={16} /> Add Skill
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search skills by name, category, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 1rem 0.55rem 2.4rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'rgba(15, 23, 42, 0.6)',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{ padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.82rem' }}
            >
              {levelsList.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Skills Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading skills inventory...</p>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Layers size={40} color="var(--text-muted)" style={{ opacity: 0.5 }} />
          <h3 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>No skills found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Click "Add Skill" to create a new entry.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Skill Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem' }}>Level</th>
                <th style={{ padding: '0.75rem 1rem' }}>Description</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map(s => (
                <tr key={s._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s ease' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.35rem', borderRadius: '6px' }}>
                        <Code size={15} color="#818cf8" />
                      </div>
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#38bdf8', fontWeight: 600 }}>
                    {s.category || 'General'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge-level level-${s.level?.toLowerCase() || 'beginner'}`} style={{ fontSize: '0.7rem' }}>
                      {s.level}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.description || 'No description provided.'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => setEditingSkill(s)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                        <Edit2 size={13} /> Edit
                      </button>
                      <button onClick={() => setDeletingSkill(s)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD SKILL MODAL */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Add New Skill</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Skill Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Python, Docker, React" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Category</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Languages, Backend" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Level</label>
                  <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Skill summary & scope..." style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SKILL MODAL */}
      {editingSkill && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Edit Skill Details</h3>
              <button onClick={() => setEditingSkill(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Skill Name</label>
                <input required type="text" value={editingSkill.name} onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Category</label>
                  <input type="text" value={editingSkill.category} onChange={e => setEditingSkill({ ...editingSkill, category: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Level</label>
                  <select value={editingSkill.level} onChange={e => setEditingSkill({ ...editingSkill, level: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Description</label>
                <textarea rows={3} value={editingSkill.description} onChange={e => setEditingSkill({ ...editingSkill, description: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingSkill(null)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Update Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingSkill && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <Trash2 size={40} color="#f43f5e" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Delete Skill?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 1.5rem' }}>
              Are you sure you want to delete <strong style={{ color: '#fff' }}>"{deletingSkill.name}"</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setDeletingSkill(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => handleDeleteSkill(deletingSkill._id)} className="btn btn-secondary" style={{ background: '#f43f5e', color: '#fff', borderColor: '#f43f5e' }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
