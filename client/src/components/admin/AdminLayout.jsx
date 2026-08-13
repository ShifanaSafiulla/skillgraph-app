import React, { useState } from 'react';
import ThemeToggleSwitch from '../ThemeToggleSwitch';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  BookOpen,
  Video,
  Code,
  ArrowLeft,
  Sun,
  Moon,
  Database,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
  activeSection = 'dashboard',
  onNavigateSection,
  onSwitchToUserPortal,
  theme = 'dark',
  setTheme,
  dbStatus
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleTheme = () => {
    if (setTheme) {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'assessments', label: 'Coding Assessments', icon: Code }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* Sidebar Overlay for Mobile */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 99,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Admin Sidebar */}
      <aside style={{
        width: '260px',
        background: 'var(--card-bg)',
        borderRight: '1px solid var(--border-color)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        transform: isMobileSidebarOpen ? 'translateX(0)' : 'none',
        transition: 'transform 0.3s ease'
      }} className="admin-sidebar">
        
        <div>
          {/* Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', marginBottom: '1.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
              padding: '0.65rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
            }}>
              <ShieldCheck size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                SkillGraph
              </div>
              <div style={{ fontSize: '0.72rem', color: '#fca5a5', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Admin Portal
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateSection(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.7rem 1rem',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    background: isActive ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.35)' : 'none'
                  }}
                >
                  <Icon size={18} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          <button
            onClick={onSwitchToUserPortal}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              width: '100%',
              padding: '0.65rem',
              borderRadius: '10px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              background: 'rgba(99, 102, 241, 0.1)',
              color: '#818cf8',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Switch to User View</span>
          </button>

          {/* Database Status Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            padding: '0.4rem 0.6rem',
            background: 'rgba(15, 23, 42, 0.4)',
            borderRadius: '8px'
          }}>
            <Database size={14} color={dbStatus === 'Connected' ? '#10b981' : '#f59e0b'} />
            <span>MongoDB:</span>
            <strong style={{ color: dbStatus === 'Connected' ? '#34d399' : '#fbbf24' }}>
              {dbStatus || 'Checking...'}
            </strong>
          </div>

        </div>

      </aside>

      {/* Main Content Viewport */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Admin Top Navbar */}
        <header style={{
          padding: '1rem 2rem',
          background: 'var(--card-bg)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="admin-mobile-toggle"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, textTransform: 'capitalize' }}>
              Admin Panel / <span style={{ color: 'var(--primary)' }}>{activeSection}</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            {/* Quick Switch Button */}
            <button
              onClick={onSwitchToUserPortal}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
            >
              <ArrowLeft size={15} /> User View
            </button>

            {/* Global Theme Toggle */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.35rem 0.65rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <ThemeToggleSwitch theme={theme} setTheme={setTheme} size="small" showLabel={true} />
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main style={{ padding: '2rem', flex: 1 }}>
          {children}
        </main>
      </div>

    </div>
  );
}
