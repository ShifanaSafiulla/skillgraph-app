import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Layers,
  BookOpen,
  DollarSign,
  Video,
  Code,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Award,
  Calendar
} from 'lucide-react';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#a855f7', '#f59e0b', '#ec4899'];

export default function AdminDashboard({ onNavigateSection }) {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/dashboard');
      const data = await res.json();
      if (data.success) {
        setDashboardData(data);
      }
    } catch (err) {
      console.error('Error fetching admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <RefreshCw size={36} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading MongoDB Admin Dashboard metrics...</p>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalUsers: 0,
    totalCareers: 0,
    totalSkills: 0,
    totalFreeCourses: 0,
    totalPaidCourses: 0,
    totalVideos: 0,
    totalQuestions: 0,
    totalSubmissions: 0,
    mostSelectedCareer: 'Python Developer',
    recentlyAddedUsers: [],
    latestCourses: [],
    latestVideos: []
  };

  const charts = dashboardData?.charts || {
    usersByCareer: [],
    coursesDistribution: [],
    videosByCareer: [],
    submissionActivity: []
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      
      {/* Top Banner & Quick Refresh */}
      <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800 }}>
                System Overview & Analytics
              </h1>
              <span className="badge-level level-beginner" style={{ fontSize: '0.7rem' }}>
                MongoDB Live Metrics
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
              Real-time platform intelligence, MongoDB data collections, course/video counts, and Recharts user telemetry.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              fontSize: '0.82rem'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>Most Popular Career: </span>
              <strong style={{ color: 'var(--cyan-accent)' }}>{stats.mostSelectedCareer}</strong>
            </div>

            <button onClick={fetchDashboardStats} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={15} /> Refresh DB
            </button>
          </div>
        </div>
      </div>

      {/* 8 DYNAMIC KPI METRICS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Card 1: Total Users */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('users')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #6366f1', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Users</span>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <Users size={20} color="#818cf8" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalUsers}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.2rem' }}>Live database records</div>
        </div>

        {/* Card 2: Total Career Roles */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('careers')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #06b6d4', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Career Roles</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <Briefcase size={20} color="#38bdf8" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalCareers}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '0.2rem' }}>Seeded career targets</div>
        </div>

        {/* Card 3: Total Skills */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('skills')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #10b981', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Skills</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <Layers size={20} color="#34d399" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalSkills}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.2rem' }}>Tech & tool skills</div>
        </div>

        {/* Card 4: Free Courses */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('courses')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #a855f7', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Free Courses</span>
            <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <BookOpen size={20} color="#c084fc" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalFreeCourses}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#c084fc', marginTop: '0.2rem' }}>Certified free resources</div>
        </div>

        {/* Card 5: Paid Courses */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('courses')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #f59e0b', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Paid Courses</span>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <DollarSign size={20} color="#fbbf24" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalPaidCourses}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '0.2rem' }}>Paid bootcamps & certs</div>
        </div>

        {/* Card 6: Total Videos */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('videos')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #ec4899', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Learning Videos</span>
            <div style={{ background: 'rgba(236, 72, 153, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <Video size={20} color="#f472b6" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalVideos}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#f472b6', marginTop: '0.2rem' }}>Video tutorials & guides</div>
        </div>

        {/* Card 7: Coding Questions */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('assessments')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #3b82f6', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Coding Questions</span>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <Code size={20} color="#60a5fa" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalQuestions}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#60a5fa', marginTop: '0.2rem' }}>Beginner / Int / Adv</div>
        </div>

        {/* Card 8: Submissions */}
        <div
          onClick={() => onNavigateSection && onNavigateSection('assessments')}
          className="glass-card clickable-card"
          style={{ padding: '1.25rem', borderLeft: '4px solid #14b8a6', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Submissions</span>
            <div style={{ background: 'rgba(20, 184, 166, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
              <TrendingUp size={20} color="#2dd4bf" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: '#ffffff' }}>
            {stats.totalSubmissions}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#2dd4bf', marginTop: '0.2rem' }}>Total test attempts</div>
        </div>

      </div>

      {/* 4 RECHARTS ANALYTICS VISUALIZATIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        
        {/* CHART 1: Users by Career (PieChart) */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
            📊 Users by Target Career
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.usersByCareer}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {charts.usersByCareer.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Free vs Paid Courses (BarChart) */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
            📚 Free vs Paid Courses Distribution
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.coursesDistribution}>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Videos by Career (BarChart) */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
            🎬 Learning Videos by Career Path
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.videosByCareer}>
                <XAxis dataKey="career" stroke="var(--text-muted)" fontSize={11} interval={0} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: Coding Submission Activity (AreaChart) */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
            ⚡ Coding Submission & Pass Activity
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.submissionActivity}>
                <defs>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="submissions" stroke="#6366f1" fillOpacity={1} fill="url(#subGrad)" name="Submissions" />
                <Area type="monotone" dataKey="passed" stroke="#10b981" fillOpacity={1} fill="url(#passGrad)" name="Passed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* RECENT RECORDS SECTIONS (Users, Courses, Videos) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Recent 5 Users */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>
              Recent Users
            </h3>
            <button onClick={() => onNavigateSection('users')} style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              View All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats.recentlyAddedUsers && stats.recentlyAddedUsers.length > 0 ? (
              stats.recentlyAddedUsers.map(u => (
                <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{u.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  </div>
                  <span className="badge-level level-beginner" style={{ fontSize: '0.68rem' }}>
                    {u.targetCareer}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No users recorded yet.</p>
            )}
          </div>
        </div>

        {/* Latest Courses */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>
              Latest Courses
            </h3>
            <button onClick={() => onNavigateSection('courses')} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              View All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats.latestCourses && stats.latestCourses.length > 0 ? (
              stats.latestCourses.map(c => (
                <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.platform} • {c.skill}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '6px', background: c.type === 'Free' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: c.type === 'Free' ? '#34d399' : '#fbbf24' }}>
                    {c.type}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No courses added yet.</p>
            )}
          </div>
        </div>

        {/* Latest Videos */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>
              Latest Videos
            </h3>
            <button onClick={() => onNavigateSection('videos')} style={{ background: 'none', border: 'none', color: '#f472b6', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              View All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats.latestVideos && stats.latestVideos.length > 0 ? (
              stats.latestVideos.map(v => (
                <div key={v._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ maxWidth: '75%' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📺 {v.channelName} • {v.duration}</div>
                  </div>
                  <span className="badge-level level-intermediate" style={{ fontSize: '0.68rem' }}>
                    {v.level}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No videos added yet.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
