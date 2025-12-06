import React from 'react';
import { Link } from 'react-router-dom';

/* Simple inline SVGs so no extra deps are required */
const IconBlocks = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const IconHome = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  return (
    <header style={{ padding: '14px 0' }}>
      <div
        className="container container-max"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between'
        }}
      >
        {/* Left: Logo + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              display: 'grid',
              placeItems: 'center',
              background: '#ffffff',
              boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
              border: '1px solid rgba(15,23,42,0.04)'
            }}
          >
            <div style={{ color: '#334155' }}>
              <IconBlocks size={20} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f1724' }}>
              StudyBuddy
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(15,23,36,0.55)', marginTop: 3 }}>
              Organize modules • plan exams • stay on track
            </div>
          </div>
        </div>

        {/* Middle: small search (Notion-like subtle) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '460px',
              maxWidth: '58%',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 6px 18px rgba(15,23,42,0.04)',
              border: '1px solid rgba(15,23,42,0.04)'
            }}
          >
            <IconSearch />
            <input
              aria-label="Search modules"
              placeholder="Search modules, notes, exams..."
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.95rem',
                color: '#0f1724',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        {/* Right: nav pills + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              gap: 8,
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: 999,
              background: 'transparent',
              border: '1px solid rgba(15,23,42,0.06)',
              color: '#0f1724',
              textDecoration: 'none',
              fontWeight: 600,
              boxShadow: 'none'
            }}
          >
            <IconHome />
            <span style={{ fontSize: '0.93rem' }}>Home</span>
          </Link>

          <Link
            to="/modules"
            style={{
              display: 'inline-flex',
              gap: 8,
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: 999,
              background: 'linear-gradient(90deg,#111827,#475569)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              boxShadow: '0 8px 20px rgba(71,85,105,0.12)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="7" height="7" rx="1.2" stroke="white" strokeWidth="1.2" />
              <rect x="14" y="3" width="7" height="7" rx="1.2" stroke="white" strokeWidth="1.2" />
              <rect x="3" y="14" width="7" height="7" rx="1.2" stroke="white" strokeWidth="1.2" />
              <rect x="14" y="14" width="7" height="7" rx="1.2" stroke="white" strokeWidth="1.2" />
            </svg>
            <span style={{ fontSize: '0.93rem' }}>Modules</span>
          </Link>

          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            display: 'grid',
            placeItems: 'center',
            background: '#fff',
            border: '1px solid rgba(15,23,42,0.04)',
            boxShadow: '0 6px 18px rgba(15,23,42,0.04)'
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: 'linear-gradient(135deg,#a7b8ff,#cce7ff)',
              display: 'grid',
              placeItems: 'center',
              color: '#0f1724',
              fontWeight: 700
            }}>A</div>
          </div>
        </div>
      </div>
    </header>
  );
}
