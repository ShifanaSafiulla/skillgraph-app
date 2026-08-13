import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SkillGraphVisualizer from './components/SkillGraphVisualizer';
import SkillList from './components/SkillList';
import AddSkillModal from './components/AddSkillModal';
import EditSkillModal from './components/EditSkillModal';
import CareerGapAnalyzer from './components/CareerGapAnalyzer';
import SmartRoadmapHub from './components/SmartRoadmapHub';
import DailyCodingAssessment from './components/DailyCodingAssessment';
import ProgressIntelligenceDashboard from './components/ProgressIntelligenceDashboard';
import UserProfileModal from './components/UserProfileModal';
import SettingsModal from './components/SettingsModal';
import { Database, AlertCircle, RefreshCw } from 'lucide-react';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUserManagement from './components/admin/AdminUserManagement';
import AdminCourseManagement from './components/admin/AdminCourseManagement';
import AdminVideoManagement from './components/admin/AdminVideoManagement';
import AdminCareerManagement from './components/admin/AdminCareerManagement';
import AdminSkillManagement from './components/admin/AdminSkillManagement';
import AdminAssessmentManagement from './components/admin/AdminAssessmentManagement';

export default function App() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [activeTab, setActiveTab] = useState('module1'); // 'module1' | 'module2' | 'module3' | 'module4' | 'module5'
  const [selectedCareerId, setSelectedCareerId] = useState('python-developer');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Global Routing & View Mode
  const [viewMode, setViewMode] = useState(() => {
    return window.location.pathname.startsWith('/admin') ? 'admin' : 'user';
  });

  const [adminSection, setAdminSection] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin/users')) return 'users';
    if (path.startsWith('/admin/courses')) return 'courses';
    if (path.startsWith('/admin/videos')) return 'videos';
    if (path.startsWith('/admin/careers')) return 'careers';
    if (path.startsWith('/admin/skills')) return 'skills';
    if (path.startsWith('/admin/assessments')) return 'assessments';
    return 'dashboard';
  });

  // Global Theme & Modal States
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Morgan',
    role: 'Full Stack Python Developer Trainee',
    email: 'alex.morgan@skillgraph.io',
    targetCareer: 'Python Developer'
  });

  // Accessibility settings state
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    reducedMotion: false
  });

  // Handle URL Location Syncing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        setViewMode('admin');
        if (path.includes('/users')) setAdminSection('users');
        else if (path.includes('/courses')) setAdminSection('courses');
        else if (path.includes('/videos')) setAdminSection('videos');
        else if (path.includes('/careers')) setAdminSection('careers');
        else if (path.includes('/skills')) setAdminSection('skills');
        else if (path.includes('/assessments')) setAdminSection('assessments');
        else setAdminSection('dashboard');
      } else {
        setViewMode('user');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateAdminSection = (section) => {
    setAdminSection(section);
    setViewMode('admin');
    const path = section === 'dashboard' ? '/admin' : `/admin/${section}`;
    window.history.pushState(null, '', path);
  };

  const switchToUserPortal = () => {
    setViewMode('user');
    window.history.pushState(null, '', '/');
  };

  const switchToAdminPortal = () => {
    setViewMode('admin');
    const path = adminSection === 'dashboard' ? '/admin' : `/admin/${adminSection}`;
    window.history.pushState(null, '', path);
  };

  // Sync theme attribute & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync accessibility attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-high-contrast', accessibilitySettings.highContrast ? 'true' : 'false');
    document.documentElement.setAttribute('data-reduced-motion', accessibilitySettings.reducedMotion ? 'true' : 'false');
  }, [accessibilitySettings]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch DB health status
  const checkDbHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data.mongoStatus);
      } else {
        setDbStatus('Disconnected');
      }
    } catch {
      setDbStatus('Offline / Reconnecting');
    }
  };

  // Fetch all skills from MongoDB API
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (data.success) {
        setSkills(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load skills:', err);
      showToast('Failed to connect to backend server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
    checkDbHealth();
    const interval = setInterval(checkDbHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  // Add new skill
  const handleAddSkill = async (newSkillData) => {
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkillData)
      });
      const data = await res.json();
      if (data.success) {
        setSkills(prev => [data.data, ...prev]);
        showToast(`Skill "${data.data.name}" added successfully!`);
      } else {
        showToast(data.message || 'Failed to add skill', 'error');
      }
    } catch (err) {
      console.error('Error adding skill:', err);
      showToast('Error sending request to backend', 'error');
    }
  };

  // Quick level change or update skill details
  const handleSaveSkill = async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      const data = await res.json();
      if (data.success) {
        setSkills(prev => prev.map(s => s._id === id ? data.data : s));
        showToast(`Updated "${data.data.name}" details.`);
      } else {
        showToast(data.message || 'Failed to update skill', 'error');
      }
    } catch (err) {
      console.error('Error updating skill:', err);
      showToast('Error updating skill details', 'error');
    }
  };

  // Quick level switcher action from table/card
  const handleChangeLevel = (skill, newLevel) => {
    if (skill.level === newLevel) return;
    handleSaveSkill(skill._id, { level: newLevel });
  };

  // Delete skill
  const handleDeleteSkill = async (id) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        const deletedSkill = skills.find(s => s._id === id);
        setSkills(prev => prev.filter(s => s._id !== id));
        showToast(`Deleted skill "${deletedSkill?.name || 'entry'}"`);
      } else {
        showToast(data.message || 'Failed to delete skill', 'error');
      }
    } catch (err) {
      console.error('Error deleting skill:', err);
      showToast('Error deleting skill', 'error');
    }
  };

  // ----------------------------------------------------
  // RENDER ADMIN PANEL VIEW
  // ----------------------------------------------------
  if (viewMode === 'admin') {
    return (
      <AdminLayout
        activeSection={adminSection}
        onNavigateSection={navigateAdminSection}
        onSwitchToUserPortal={switchToUserPortal}
        theme={theme}
        setTheme={setTheme}
        dbStatus={dbStatus}
      >
        {adminSection === 'dashboard' && <AdminDashboard onNavigateSection={navigateAdminSection} />}
        {adminSection === 'users' && <AdminUserManagement />}
        {adminSection === 'courses' && <AdminCourseManagement />}
        {adminSection === 'videos' && <AdminVideoManagement />}
        {adminSection === 'careers' && <AdminCareerManagement />}
        {adminSection === 'skills' && <AdminSkillManagement />}
        {adminSection === 'assessments' && <AdminAssessmentManagement />}
      </AdminLayout>
    );
  }

  // ----------------------------------------------------
  // RENDER USER PORTAL VIEW
  // ----------------------------------------------------
  return (
    <div className="app-container">
      
      {/* Notification Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 2000,
          background: toastMessage.type === 'error' ? 'rgba(244, 63, 94, 0.95)' : 'rgba(16, 185, 129, 0.95)',
          color: '#ffffff',
          padding: '0.85rem 1.4rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }} className="animate-fade-in">
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        skills={skills}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        dbStatus={dbStatus}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenAdminPanel={switchToAdminPortal}
        userProfile={userProfile}
      />

      {/* DB Connection Alert Notification Banner if Disconnected */}
      {dbStatus.includes('Disconnected') && (
        <div className="glass-card" style={{
          padding: '0.9rem 1.4rem',
          marginBottom: '1.75rem',
          background: 'rgba(245, 158, 11, 0.1)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={20} color="#fbbf24" />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
              <strong>MongoDB Database Notice:</strong> Local MongoDB is currently disconnected. App is actively using robust in-memory storage fallback. Data edits are active!
            </div>
          </div>
          <button
            onClick={() => { fetchSkills(); checkDbHealth(); }}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
          >
            <RefreshCw size={14} /> Retry Mongo
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <RefreshCw size={36} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading SkillGraph records from MongoDB...</p>
        </div>
      ) : (
        <main>
          {/* TAB 1: Skill Management */}
          {activeTab === 'module1' && (
            <div className="animate-fade-in">
              <SkillGraphVisualizer
                skills={skills}
                onEditSkill={(skill) => setEditingSkill(skill)}
              />

              <SkillList
                skills={skills}
                onEditSkill={(skill) => setEditingSkill(skill)}
                onDeleteSkill={handleDeleteSkill}
                onChangeLevel={handleChangeLevel}
              />
            </div>
          )}

          {/* TAB 2: Career Selection & Skill-Gap Analysis */}
          {activeTab === 'module2' && (
            <div className="animate-fade-in">
              <CareerGapAnalyzer
                skills={skills}
                onAddQuickSkill={handleAddSkill}
                selectedCareerId={selectedCareerId}
                setSelectedCareerId={setSelectedCareerId}
              />
            </div>
          )}

          {/* TAB 3: Smart Learning Roadmap & Resource Hub */}
          {activeTab === 'module3' && (
            <div className="animate-fade-in">
              <SmartRoadmapHub
                skills={skills}
                selectedCareerId={selectedCareerId}
              />
            </div>
          )}

          {/* TAB 4: Daily Coding Assessment */}
          {activeTab === 'module4' && (
            <div className="animate-fade-in">
              <DailyCodingAssessment />
            </div>
          )}

          {/* TAB 5: Progress Intelligence Dashboard */}
          {activeTab === 'module5' && (
            <div className="animate-fade-in">
              <ProgressIntelligenceDashboard
                skills={skills}
                selectedCareerId={selectedCareerId}
                onNavigateTab={setActiveTab}
              />
            </div>
          )}
        </main>
      )}

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSkill={handleAddSkill}
      />

      {/* Edit Skill Modal */}
      <EditSkillModal
        isOpen={Boolean(editingSkill)}
        onClose={() => setEditingSkill(null)}
        skill={editingSkill}
        onSaveSkill={handleSaveSkill}
      />

      {/* User Profile & Login/Register Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSaveProfile={setUserProfile}
        showToast={showToast}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Settings & Accessibility Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        theme={theme}
        setTheme={setTheme}
        selectedCareerId={selectedCareerId}
        setSelectedCareerId={setSelectedCareerId}
        showToast={showToast}
        accessibilitySettings={accessibilitySettings}
        setAccessibilitySettings={setAccessibilitySettings}
      />
    </div>
  );
}
