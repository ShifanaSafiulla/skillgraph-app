import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggleSwitch({ theme = 'dark', setTheme, showLabel = true, size = 'medium' }) {
  const isLight = theme === 'light';

  const handleToggle = () => {
    if (setTheme) {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const isSmall = size === 'small';

  return (
    <div
      onClick={handleToggle}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '0.5rem' : '0.75rem',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Light Switch Track */}
      <div
        style={{
          position: 'relative',
          width: isSmall ? '54px' : '64px',
          height: isSmall ? '28px' : '32px',
          borderRadius: '20px',
          background: isLight
            ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
            : 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          border: isLight ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(99, 102, 241, 0.4)',
          boxShadow: isLight
            ? '0 0 12px rgba(251, 191, 36, 0.4)'
            : '0 0 12px rgba(99, 102, 241, 0.3)',
          padding: '2px',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Sun Icon inside track */}
        <Sun
          size={isSmall ? 13 : 15}
          color={isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'}
          style={{ marginLeft: isSmall ? '5px' : '6px', zIndex: 1, transition: 'all 0.3s ease' }}
        />

        {/* Moon Icon inside track */}
        <Moon
          size={isSmall ? 13 : 15}
          color={!isLight ? '#c084fc' : 'rgba(255, 255, 255, 0.4)'}
          style={{ marginRight: isSmall ? '5px' : '6px', zIndex: 1, transition: 'all 0.3s ease' }}
        />

        {/* Sliding Thumb Knob */}
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: isLight ? (isSmall ? '28px' : '34px') : '3px',
            width: isSmall ? '22px' : '24px',
            height: isSmall ? '22px' : '24px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isLight ? (
            <Sun size={isSmall ? 12 : 14} color="#f59e0b" />
          ) : (
            <Moon size={isSmall ? 12 : 14} color="#6366f1" />
          )}
        </div>
      </div>

      {/* Optional Label */}
      {showLabel && (
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: isSmall ? '0.78rem' : '0.85rem',
            fontWeight: 700,
            color: isLight ? 'var(--primary)' : 'var(--text-main)',
            whiteSpace: 'nowrap'
          }}
        >
          {isLight ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </span>
      )}
    </div>
  );
}
