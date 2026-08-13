import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Award,
  DollarSign,
  X,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function AdminCourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Free' | 'Paid' | 'Certificate'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    type: 'Free',
    certificateAvailable: true,
    duration: '6 Hours',
    url: 'https://example.com/course/new',
    description: ''
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      if (data.success) {
        setCourses(data.data || []);
      }
    } catch (err) {
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const careersList = ['All', 'Python Developer', 'Full-Stack Developer', 'Data Analyst', 'Data Scientist', 'Machine Learning Engineer'];
  const levelsList = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      if (activeTab === 'Free' && c.type !== 'Free') return false;
      if (activeTab === 'Paid' && c.type !== 'Paid') return false;
      if (activeTab === 'Certificate' && !c.certificateAvailable) return false;

      if (selectedCareer !== 'All' && c.career !== selectedCareer) return false;
      if (selectedLevel !== 'All' && c.level !== selectedLevel) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = c.name?.toLowerCase().includes(query) ||
          c.platform?.toLowerCase().includes(query) ||
          c.skill?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query);
        if (!matches) return false;
      }

      return true;
    });
  }, [courses, activeTab, selectedCareer, selectedLevel, searchQuery]);

  // Handle Add Form Submit
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => [data.data, ...prev]);
        setIsAddModalOpen(false);
        setFormData({
          name: '',
          platform: '',
          career: 'Python Developer',
          skill: 'Python',
          level: 'Beginner',
          type: 'Free',
          certificateAvailable: true,
          duration: '6 Hours',
          url: 'https://example.com/course/new',
          description: ''
        });
      } else {
        alert(data.message || 'Failed to create course');
      }
    } catch (err) {
      console.error('Error creating course:', err);
    }
  };

  // Handle Edit Form Submit
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;
    try {
      const res = await fetch(`/api/admin/courses/${editingCourse._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse)
      });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.map(c => c._id === editingCourse._id ? data.data : c));
        setEditingCourse(null);
      } else {
        alert(data.message || 'Failed to update course');
      }
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  // Handle Delete
  const handleDeleteCourse = async (id) => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.filter(c => c._id !== id));
        setDeletingCourse(null);
      } else {
        alert(data.message || 'Failed to delete course');
      }
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <BookOpen size={24} color="#38bdf8" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                Course Management System
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Add, edit, or delete free and paid learning resources. Dynamic updates immediately sync to user views.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={fetchCourses} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.55rem 1.1rem' }}>
              <Plus size={16} /> Add Course
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          {[
            { id: 'All', label: 'All Courses' },
            { id: 'Free', label: 'Free Courses' },
            { id: 'Paid', label: 'Paid Courses' },
            { id: 'Certificate', label: 'Certificate Available' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeTab === tab.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-muted)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by course name, platform, skill..."
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
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Career:</span>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              style={{ padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.82rem' }}
            >
              {careersList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
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

      {/* Courses Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading course records...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <BookOpen size={40} color="var(--text-muted)" style={{ opacity: 0.5 }} />
          <h3 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>No courses available yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Add a course from the Admin panel to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredCourses.map(course => (
            <div key={course._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: course.type === 'Free' ? '4px solid #10b981' : '4px solid #f59e0b' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.65rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: course.type === 'Free' ? '#34d399' : '#fbbf24', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                      {course.platform} • {course.type}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem', lineHeight: 1.3 }}>
                      {course.name}
                    </h3>
                  </div>
                  <span className="badge-level level-intermediate" style={{ fontSize: '0.68rem', whiteSpace: 'nowrap' }}>
                    {course.level}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '0.25rem 0.55rem', borderRadius: '6px', color: '#38bdf8' }}>
                    🎯 {course.career}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '0.25rem 0.55rem', borderRadius: '6px', color: '#c084fc' }}>
                    💡 Skill: {course.skill}
                  </span>
                  {course.certificateAvailable && (
                    <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.12)', padding: '0.25rem 0.55rem', borderRadius: '6px', color: '#34d399' }}>
                      📜 Certificate
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {course.description || 'No detailed description specified for this learning resource.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a href={course.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontWeight: 600 }}>
                  <ExternalLink size={14} /> Open Link
                </a>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => setEditingCourse(course)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                    <Edit2 size={13} /> Edit
                  </button>
                  <button onClick={() => setDeletingCourse(course)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD COURSE MODAL */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '560px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Add New Learning Course</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Course Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Python for Beginners" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Platform *</label>
                  <input required type="text" value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })} placeholder="e.g. freeCodeCamp / Udemy" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Target Career *</label>
                  <select value={formData.career} onChange={e => setFormData({ ...formData, career: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    {careersList.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Associated Skill *</label>
                  <input required type="text" value={formData.skill} onChange={e => setFormData({ ...formData, skill: e.target.value })} placeholder="e.g. Python, React, SQL" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Type</label>
                  <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Certificate Available</label>
                  <select value={formData.certificateAvailable ? 'true' : 'false'} onChange={e => setFormData({ ...formData, certificateAvailable: e.target.value === 'true' })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Course URL *</label>
                <input required type="text" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} placeholder="https://example.com/course/..." style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Brief summary of course content..." style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {editingCourse && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '560px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Edit Course Details</h3>
              <button onClick={() => setEditingCourse(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Course Name</label>
                <input required type="text" value={editingCourse.name} onChange={e => setEditingCourse({ ...editingCourse, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Platform</label>
                  <input required type="text" value={editingCourse.platform} onChange={e => setEditingCourse({ ...editingCourse, platform: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Target Career</label>
                  <select value={editingCourse.career} onChange={e => setEditingCourse({ ...editingCourse, career: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    {careersList.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Associated Skill</label>
                  <input required type="text" value={editingCourse.skill} onChange={e => setEditingCourse({ ...editingCourse, skill: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Level</label>
                  <select value={editingCourse.level} onChange={e => setEditingCourse({ ...editingCourse, level: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Type</label>
                  <select value={editingCourse.type} onChange={e => setEditingCourse({ ...editingCourse, type: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Certificate</label>
                  <select value={editingCourse.certificateAvailable ? 'true' : 'false'} onChange={e => setEditingCourse({ ...editingCourse, certificateAvailable: e.target.value === 'true' })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Course URL</label>
                <input required type="text" value={editingCourse.url} onChange={e => setEditingCourse({ ...editingCourse, url: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingCourse(null)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Update Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCourse && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <Trash2 size={40} color="#f43f5e" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Delete Course?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 1.5rem' }}>
              Are you sure you want to delete <strong style={{ color: '#fff' }}>"{deletingCourse.name}"</strong>? It will immediately disappear from user views.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setDeletingCourse(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => handleDeleteCourse(deletingCourse._id)} className="btn btn-secondary" style={{ background: '#f43f5e', color: '#fff', borderColor: '#f43f5e' }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
