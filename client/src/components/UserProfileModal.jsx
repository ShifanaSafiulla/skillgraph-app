import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Briefcase,
  Target,
  Award,
  Flame,
  LogIn,
  UserPlus,
  Lock,
  Check,
  Edit2,
  Save,
} from 'lucide-react';
import ThemeToggleSwitch from './ThemeToggleSwitch';

export default function UserProfileModal({ isOpen, onClose, userProfile = {}, onSaveProfile, showToast, theme = 'dark', setTheme }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'login' | 'register'
  const [isEditing, setIsEditing] = useState(false);

  // Profile Edit State
  const [formData, setFormData] = useState({
    name: userProfile.name || 'Alex Morgan',
    role: userProfile.role || 'Full Stack Python Developer Trainee',
    email: userProfile.email || 'alex.morgan@skillgraph.io',
    targetCareer: userProfile.targetCareer || 'Python Developer'
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('alex.morgan@skillgraph.io');
  const [loginPassword, setLoginPassword] = useState('••••••••');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (onSaveProfile) {
      onSaveProfile(formData);
    }
    setIsEditing(false);
    if (showToast) showToast('Profile details updated successfully!');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (showToast) showToast(`Welcome back, ${userProfile.name || 'Alex Morgan'}!`);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail) {
      if (showToast) showToast('Please provide name and email', 'error');
      return;
    }
    const newProf = {
      ...userProfile,
      name: regName,
      email: regEmail
    };
    if (onSaveProfile) onSaveProfile(newProf);
    if (showToast) showToast(`Account created! Welcome to SkillGraph, ${regName}!`);
    setActiveTab('profile');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '560px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                User Profile & Account
              </h3>
            </div>
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

        {/* Modal Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '0.35rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.82rem',
              transition: 'all 0.2s ease',
              background: activeTab === 'profile' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'profile' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Profile Card
          </button>

          <button
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.82rem',
              transition: 'all 0.2s ease',
              background: activeTab === 'login' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'login' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.82rem',
              transition: 'all 0.2s ease',
              background: activeTab === 'register' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'register' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Register
          </button>
        </div>

        {/* TAB 1: PROFILE CARD */}
        {activeTab === 'profile' && (
          <div>
            {!isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Profile Header Avatar Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
                    border: '3px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    AM
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {userProfile.name || 'Alex Morgan'}
                      </h3>
                      <span className="badge-level level-intermediate" style={{ fontSize: '0.68rem' }}>
                        Active Learner
                      </span>
                    </div>

                    <p style={{ color: 'var(--cyan-accent)', fontSize: '0.88rem', fontWeight: 600, marginTop: '0.1rem' }}>
                      {userProfile.role || 'Full Stack Python Developer Trainee'}
                    </p>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                      ✉️ {userProfile.email || 'alex.morgan@skillgraph.io'}
                    </p>
                  </div>
                </div>

                {/* Profile Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Score</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-heading)', marginTop: '0.15rem' }}>
                      ⭐ 850 pts
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Learning Streak</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fca5a5', fontFamily: 'var(--font-heading)', marginTop: '0.15rem' }}>
                      🔥 5 Days
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Target Career</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-heading)', marginTop: '0.15rem' }}>
                      🎯 {userProfile.targetCareer || 'Python Developer'}
                    </div>
                  </div>
                </div>

                {/* Light Switch / Theme Preferences Card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Light Switch Theme Toggle
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Switch theme mode dynamically across SkillGraph
                    </div>
                  </div>
                  <ThemeToggleSwitch theme={theme} setTheme={setTheme} size="medium" />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.8rem' }}>
                    <ShieldCheck size={16} />
                    <span>Account Verified • Active Session</span>
                  </div>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(true)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                  >
                    <Edit2 size={14} />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Current Role / Title
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="glass-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={15} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="glass-input"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="glass-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                <span>Remember me</span>
              </label>

              <a href="#forgot" onClick={(e) => { e.preventDefault(); if (showToast) showToast('Password reset link sent to email!'); }} style={{ color: 'var(--cyan-accent)', textDecoration: 'none', fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <LogIn size={16} />
              <span>Sign In to Account</span>
            </button>
          </form>
        )}

        {/* TAB 3: REGISTER */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input
                type="text"
                className="glass-input"
                placeholder="e.g. Alex Morgan"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <input
                type="email"
                className="glass-input"
                placeholder="alex@skillgraph.io"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Password
              </label>
              <input
                type="password"
                className="glass-input"
                placeholder="••••••••"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <UserPlus size={16} />
              <span>Create Free Account</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
