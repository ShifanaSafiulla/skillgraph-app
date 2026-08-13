import React, { useState, useEffect, useMemo } from 'react';
import {
  Code,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  Terminal,
  RefreshCw
} from 'lucide-react';

export default function AdminAssessmentManagement() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'Beginner',
    topic: 'Conditions',
    score: 100,
    description: '',
    sampleInput: 'n = 5',
    sampleOutput: '15',
    starterCode: 'def solution(n):\n    # Write Python code here\n    pass\n',
    testCases: [
      { input: [5], expected: 15 }
    ]
  });

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/questions');
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const difficultyList = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = q.title?.toLowerCase().includes(query) ||
          q.topic?.toLowerCase().includes(query) ||
          q.description?.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [questions, selectedDifficulty, searchQuery]);

  // Handle Create Question
  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setQuestions(prev => [data.data, ...prev]);
        setIsAddModalOpen(false);
        setFormData({
          title: '',
          difficulty: 'Beginner',
          topic: 'Conditions',
          score: 100,
          description: '',
          sampleInput: '',
          sampleOutput: '',
          starterCode: 'def solution():\n    pass\n',
          testCases: []
        });
      } else {
        alert(data.message || 'Failed to add coding question');
      }
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  // Handle Update Question
  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!editingQuestion) return;
    try {
      const res = await fetch(`/api/admin/questions/${editingQuestion._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingQuestion)
      });
      const data = await res.json();
      if (data.success) {
        setQuestions(prev => prev.map(q => q._id === editingQuestion._id ? data.data : q));
        setEditingQuestion(null);
      } else {
        alert(data.message || 'Failed to update question');
      }
    } catch (err) {
      console.error('Error updating question:', err);
    }
  };

  // Handle Delete Question
  const handleDeleteQuestion = async (id) => {
    try {
      const res = await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setQuestions(prev => prev.filter(q => q._id !== id));
        setDeletingQuestion(null);
      } else {
        alert(data.message || 'Failed to delete question');
      }
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Code size={24} color="#c084fc" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                Coding Assessment Bank
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Manage Python programming challenges, test cases, sample input/output, and difficulty points.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={fetchQuestions} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.55rem 1.1rem' }}>
              <Plus size={16} /> Add Question
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by title, topic, description..."
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
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{ padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.82rem' }}
            >
              {difficultyList.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Questions Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading coding challenges...</p>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Code size={40} color="var(--text-muted)" style={{ opacity: 0.5 }} />
          <h3 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>No coding questions found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Click "Add Question" to seed a new challenge.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Title & Problem ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Topic</th>
                <th style={{ padding: '0.75rem 1rem' }}>Difficulty</th>
                <th style={{ padding: '0.75rem 1rem' }}>Score Points</th>
                <th style={{ padding: '0.75rem 1rem' }}>Test Cases</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map(q => (
                <tr key={q._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s ease' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{q.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{q.problemId}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#38bdf8', fontWeight: 600 }}>
                    {q.topic}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge-level level-${q.difficulty?.toLowerCase() || 'beginner'}`} style={{ fontSize: '0.7rem' }}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#34d399' }}>
                    +{q.score || 100} pts
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#c084fc', fontWeight: 600 }}>
                    {q.testCases?.length || 0} cases
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => setEditingQuestion(q)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                        <Edit2 size={13} /> Edit
                      </button>
                      <button onClick={() => setDeletingQuestion(q)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}>
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

      {/* ADD QUESTION MODAL */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '580px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Add Python Coding Question</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Question Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Even or Odd Filter" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Difficulty</label>
                  <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Topic *</label>
                  <input required type="text" value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} placeholder="e.g. Loops" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Score Points</label>
                  <input type="number" value={formData.score} onChange={e => setFormData({ ...formData, score: parseInt(e.target.value, 10) || 100 })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Problem Description *</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Write problem details..." style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Sample Input</label>
                  <input type="text" value={formData.sampleInput} onChange={e => setFormData({ ...formData, sampleInput: e.target.value })} placeholder="n = 5" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Sample Output</label>
                  <input type="text" value={formData.sampleOutput} onChange={e => setFormData({ ...formData, sampleOutput: e.target.value })} placeholder="15" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Starter Python Code</label>
                <textarea rows={4} value={formData.starterCode} onChange={e => setFormData({ ...formData, starterCode: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0d1117', color: '#7ee787', fontFamily: 'monospace', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Question</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT QUESTION MODAL */}
      {editingQuestion && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '580px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Edit Coding Question</h3>
              <button onClick={() => setEditingQuestion(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Question Title</label>
                <input required type="text" value={editingQuestion.title} onChange={e => setEditingQuestion({ ...editingQuestion, title: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Difficulty</label>
                  <select value={editingQuestion.difficulty} onChange={e => setEditingQuestion({ ...editingQuestion, difficulty: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Topic</label>
                  <input required type="text" value={editingQuestion.topic} onChange={e => setEditingQuestion({ ...editingQuestion, topic: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Score Points</label>
                  <input type="number" value={editingQuestion.score} onChange={e => setEditingQuestion({ ...editingQuestion, score: parseInt(e.target.value, 10) || 100 })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Problem Description</label>
                <textarea required rows={3} value={editingQuestion.description} onChange={e => setEditingQuestion({ ...editingQuestion, description: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Starter Python Code</label>
                <textarea rows={4} value={editingQuestion.starterCode} onChange={e => setEditingQuestion({ ...editingQuestion, starterCode: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0d1117', color: '#7ee787', fontFamily: 'monospace', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingQuestion(null)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Update Question</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingQuestion && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <Trash2 size={40} color="#f43f5e" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Delete Question?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 1.5rem' }}>
              Are you sure you want to delete <strong style={{ color: '#fff' }}>"{deletingQuestion.title}"</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setDeletingQuestion(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => handleDeleteQuestion(deletingQuestion._id)} className="btn btn-secondary" style={{ background: '#f43f5e', color: '#fff', borderColor: '#f43f5e' }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
