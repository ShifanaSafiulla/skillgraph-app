import React from 'react';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import {
  X,
  Settings,
  Sun,
  Moon,
  Eye,
  Sliders,
  Target,
  Bell,
  Database,
  Check,
  RotateCcw
} from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  theme,
  setTheme,
  selectedCareerId,
  setSelectedCareerId,
  showToast,
  accessibilitySettings = {},
  setAccessibilitySettings
}) {
  if (!isOpen) return null;

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (showToast) {
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode!`);
    }
  };

  const handleCareerChange = (e) => {
    const newCareer = e.target.value;
    setSelectedCareerId(newCareer);
    if (showToast) {
      showToast(`Updated target career default!`);
    }
  };

  const toggleAccessibility = (key) => {
    if (setAccessibilitySettings) {
      setAccessibilitySettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
      if (showToast) showToast('Accessibility settings updated!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '580px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Settings size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                System Settings & Preferences
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customize UI theme, career defaults & accessibility</p>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '460px', overflowY: 'auto', paddingRight: '0.3rem' }}>
          
          {/* SECTION 1: GLOBAL THEME SWITCHER */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '1.1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sun size={18} color="var(--cyan-accent)" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Global Interface Theme (Light / Dark)
                </h4>
              </div>

              {/* Light Switch Slider */}
              <ThemeToggleSwitch theme={theme} setTheme={setTheme} size="medium" showLabel={false} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                onClick={() => handleThemeChange('dark')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: theme === 'dark' ? '#ffffff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                <Moon size={18} color={theme === 'dark' ? '#c084fc' : 'currentColor'} />
                <span>🌙 Dark Mode</span>
                {theme === 'dark' && <Check size={16} color="#34d399" />}
              </button>

              <button
                onClick={() => handleThemeChange('light')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: theme === 'light' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: theme === 'light' ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                <Sun size={18} color={theme === 'light' ? '#f59e0b' : 'currentColor'} />
                <span>☀️ Light Mode</span>
                {theme === 'light' && <Check size={16} color="#34d399" />}
              </button>
            </div>
          </div>

          {/* SECTION 2: TARGET CAREER DEFAULTS */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '1.1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Target size={18} color="#38bdf8" />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Target Career Pathway Default
              </h4>
            </div>

            <select
              className="glass-input"
              value={selectedCareerId}
              onChange={handleCareerChange}
              style={{ cursor: 'pointer', fontWeight: 600 }}
            >
              <option value="python-developer" style={{ background: '#0f172a', color: '#fff' }}>🎯 Python Developer (Backend)</option>
              <option value="data-scientist" style={{ background: '#0f172a', color: '#fff' }}>📊 Data Scientist & AI Specialist</option>
              <option value="fullstack-developer" style={{ background: '#0f172a', color: '#fff' }}>⚡ Full-Stack Developer</option>
              <option value="devops-engineer" style={{ background: '#0f172a', color: '#fff' }}>🛠️ DevOps & Cloud Engineer</option>
            </select>
          </div>

          {/* SECTION 3: ACCESSIBILITY PREFERENCES */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '1.1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <Eye size={18} color="#c084fc" />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Accessibility & Visual Preferences
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>High Contrast Mode</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enhances text contrast and borders</div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(accessibilitySettings.highContrast)}
                  onChange={() => toggleAccessibility('highContrast')}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Reduced Motion</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Disables smooth CSS animations</div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(accessibilitySettings.reducedMotion)}
                  onChange={() => toggleAccessibility('reducedMotion')}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: SYSTEM NOTIFICATIONS & DB */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '1.1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <Bell size={18} color="#34d399" />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                System Notifications & Health
              </h4>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Interactive Toast Notifications</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Show popups when adding skills or saving edits</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn btn-primary" onClick={onClose}>
            <span>Done</span>
          </button>
        </div>

      </div>
    </div>
  );
}
