import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  X,
  Award,
  BookOpen,
  Code,
  Calendar,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareerFilter, setSelectedCareerFilter] = useState('All');
  const [selectedUserModal, setSelectedUserModal] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const careersList = ['All', 'Python Developer', 'Full-Stack Developer', 'Data Analyst', 'Data Scientist', 'Machine Learning Engineer'];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesCareer = selectedCareerFilter === 'All' || user.targetCareer === selectedCareerFilter;
      const matchesSearch = !searchQuery ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCareer && matchesSearch;
    });
  }, [users, selectedCareerFilter, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      
      {/* Header & Controls */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Users size={22} color="var(--primary)" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>
                User Management Directory
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Monitor student user accounts, target career pathways, roadmap progress, and assessment performance scores.
            </p>
          </div>

          <button onClick={fetchUsers} className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
            <RefreshCw size={14} /> Refresh Users
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.6rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'rgba(15, 23, 42, 0.6)',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Career Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={15} color="var(--text-muted)" />
            <select
              value={selectedCareerFilter}
              onChange={(e) => setSelectedCareerFilter(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'rgba(15, 23, 42, 0.6)',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {careersList.map(c => (
                <option key={c} value={c} style={{ background: '#0f172a' }}>{c === 'All' ? 'All Careers' : c}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading user records...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Users size={40} color="var(--text-muted)" style={{ opacity: 0.5 }} />
          <h3 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>No matching users found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Try adjusting your search criteria or career filter.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>User Name & Email</th>
                <th style={{ padding: '0.75rem 1rem' }}>Target Career</th>
                <th style={{ padding: '0.75rem 1rem' }}>Skills Count</th>
                <th style={{ padding: '0.75rem 1rem' }}>Career Readiness</th>
                <th style={{ padding: '0.75rem 1rem' }}>Roadmap Progress</th>
                <th style={{ padding: '0.75rem 1rem' }}>Coding Challenges</th>
                <th style={{ padding: '0.75rem 1rem' }}>Avg Score</th>
                <th style={{ padding: '0.75rem 1rem' }}>Created Date</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s ease' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{u.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge-level level-beginner" style={{ fontSize: '0.72rem' }}>
                      {u.targetCareer}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#38bdf8' }}>
                    {u.skillsCount} skills
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${u.careerReadiness}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
                      </div>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{u.careerReadiness}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${u.roadmapProgress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)' }} />
                      </div>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{u.roadmapProgress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#c084fc' }}>
                    {u.codingChallengesCompleted} completed
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#fbbf24' }}>
                    {u.averageAssessmentScore} pts
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedUserModal(u)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* USER DETAILS MODAL */}
      {selectedUserModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(5px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '580px', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedUserModal.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                    {selectedUserModal.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{selectedUserModal.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUserModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Career Pathway</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--cyan-accent)', marginTop: '0.2rem' }}>
                  {selectedUserModal.targetCareer}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700 }}>Career Readiness</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                    {selectedUserModal.careerReadiness}%
                  </div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>Roadmap Progress</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                    {selectedUserModal.roadmapProgress}%
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(168, 85, 247, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700 }}>Coding Challenges</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                    {selectedUserModal.codingChallengesCompleted} Completed
                  </div>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700 }}>Avg Assessment Score</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                    {selectedUserModal.averageAssessmentScore} Pts
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.5rem' }}>
                Account Created: {new Date(selectedUserModal.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
