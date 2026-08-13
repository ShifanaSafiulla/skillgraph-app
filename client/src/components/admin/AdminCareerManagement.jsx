import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  Video,
  X,
  Layers,
  RefreshCw
} from 'lucide-react';

export default function AdminCareerManagement() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [deletingCareer, setDeletingCareer] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requiredSkills: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'SQL', level: 'Beginner' }
    ]
  });

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/careers');
      const data = await res.json();
      if (data.success) {
        setCareers(data.data || []);
      }
    } catch (err) {
      console.error('Error loading careers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // Handle Skill Addition in Form
  const handleAddSkillToForm = (target, setTarget) => {
    setTarget({
      ...target,
      requiredSkills: [...(target.requiredSkills || []), { name: '', level: 'Beginner' }]
    });
  };

  const handleSkillChange = (target, setTarget, index, field, value) => {
    const updated = [...(target.requiredSkills || [])];
    updated[index][field] = value;
    setTarget({ ...target, requiredSkills: updated });
  };

  const handleRemoveSkillFromForm = (target, setTarget, index) => {
    const updated = (target.requiredSkills || []).filter((_, i) => i !== index);
    setTarget({ ...target, requiredSkills: updated });
  };

  // Create Career
  const handleCreateCareer = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchCareers();
        setIsAddModalOpen(false);
        setFormData({ name: '', description: '', requiredSkills: [] });
      } else {
        alert(data.message || 'Failed to create career role');
      }
    } catch (err) {
      console.error('Error creating career:', err);
    }
  };

  // Update Career
  const handleUpdateCareer = async (e) => {
    e.preventDefault();
    if (!editingCareer) return;
    try {
      const res = await fetch(`/api/admin/careers/${editingCareer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCareer)
      });
      const data = await res.json();
      if (data.success) {
        fetchCareers();
        setEditingCareer(null);
      } else {
        alert(data.message || 'Failed to update career role');
      }
    } catch (err) {
      console.error('Error updating career:', err);
    }
  };

  // Delete Career
  const handleDeleteCareer = async (id) => {
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCareers(prev => prev.filter(c => c._id !== id));
        setDeletingCareer(null);
      } else {
        alert(data.message || 'Failed to delete career role');
      }
    } catch (err) {
      console.error('Error deleting career:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Briefcase size={24} color="#38bdf8" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                Career Pathways & Benchmarks
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Define target career roles, required skill benchmarks, and track linked users, courses, and videos.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={fetchCareers} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.55rem 1.1rem' }}>
              <Plus size={16} /> Add Career Role
            </button>
          </div>
        </div>
      </div>

      {/* Careers Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading career roles...</p>
        </div>
      ) : careers.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Briefcase size={40} color="var(--text-muted)" style={{ opacity: 0.5 }} />
          <h3 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>No career roles defined yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Click "Add Career Role" to set up your first pathway.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {careers.map(car => (
            <div key={car._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #06b6d4' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                    {car.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => setEditingCareer(car)} className="btn btn-secondary" style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}>
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => setDeletingCareer(car)} className="btn btn-secondary" style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {car.description || 'Target career roadmap and skill set benchmark.'}
                </p>

                {/* Required Skills Chips */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Required Skills Benchmark ({car.requiredSkills?.length || 0})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {car.requiredSkills && car.requiredSkills.map((sk, idx) => (
                      <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', color: '#a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: 600 }}>
                        {sk.name} <span style={{ opacity: 0.75 }}>({sk.level})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Linked Metrics Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Users</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>{car.userCount || 0}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Courses</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{car.courseCount || 0}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Videos</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f472b6' }}>{car.videoCount || 0}</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ADD CAREER MODAL */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '540px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Add New Career Role</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateCareer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Career Role Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. AI Engineer" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Target career description..." style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              {/* Required Skills Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Required Skills & Benchmark Levels</label>
                  <button type="button" onClick={() => handleAddSkillToForm(formData, setFormData)} style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700 }}>+ Add Skill</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {formData.requiredSkills.map((sk, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input type="text" value={sk.name} onChange={e => handleSkillChange(formData, setFormData, idx, 'name', e.target.value)} placeholder="Skill name (e.g. Python)" style={{ flex: 1, padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.8rem' }} />
                      <select value={sk.level} onChange={e => handleSkillChange(formData, setFormData, idx, 'level', e.target.value)} style={{ padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.8rem' }}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <button type="button" onClick={() => handleRemoveSkillFromForm(formData, setFormData, idx)} style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer' }}><X size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Career Role</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CAREER MODAL */}
      {editingCareer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '540px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Edit Career Role</h3>
              <button onClick={() => setEditingCareer(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateCareer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Career Role Name</label>
                <input required type="text" value={editingCareer.name} onChange={e => setEditingCareer({ ...editingCareer, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Description</label>
                <textarea rows={3} value={editingCareer.description} onChange={e => setEditingCareer({ ...editingCareer, description: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              {/* Required Skills Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Required Skills Benchmark</label>
                  <button type="button" onClick={() => handleAddSkillToForm(editingCareer, setEditingCareer)} style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700 }}>+ Add Skill</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(editingCareer.requiredSkills || []).map((sk, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input type="text" value={sk.name} onChange={e => handleSkillChange(editingCareer, setEditingCareer, idx, 'name', e.target.value)} style={{ flex: 1, padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.8rem' }} />
                      <select value={sk.level} onChange={e => handleSkillChange(editingCareer, setEditingCareer, idx, 'level', e.target.value)} style={{ padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.8rem' }}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <button type="button" onClick={() => handleRemoveSkillFromForm(editingCareer, setEditingCareer, idx)} style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer' }}><X size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingCareer(null)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Update Career Role</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCareer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <Trash2 size={40} color="#f43f5e" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Delete Career Role?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 1.5rem' }}>
              Are you sure you want to delete <strong style={{ color: '#fff' }}>"{deletingCareer.name}"</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setDeletingCareer(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => handleDeleteCareer(deletingCareer._id)} className="btn btn-secondary" style={{ background: '#f43f5e', color: '#fff', borderColor: '#f43f5e' }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
