import React, { useState, useEffect, useMemo } from 'react';
import {
  Video,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Play,
  X,
  RefreshCw
} from 'lucide-react';

export default function AdminVideoManagement() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [deletingVideo, setDeletingVideo] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    career: 'Python Developer',
    skill: 'Python',
    level: 'Beginner',
    channelName: 'freeCodeCamp',
    videoUrl: 'https://example.com/video/sample',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    duration: '20 mins',
    description: ''
  });

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/videos');
      const data = await res.json();
      if (data.success) {
        setVideos(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const careersList = ['All', 'Python Developer', 'Full-Stack Developer', 'Data Analyst', 'Data Scientist', 'Machine Learning Engineer'];
  const levelsList = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      if (selectedCareer !== 'All' && v.career !== selectedCareer) return false;
      if (selectedLevel !== 'All' && v.level !== selectedLevel) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = v.title?.toLowerCase().includes(query) ||
          v.channelName?.toLowerCase().includes(query) ||
          v.skill?.toLowerCase().includes(query) ||
          v.description?.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [videos, selectedCareer, selectedLevel, searchQuery]);

  // Create Video
  const handleCreateVideo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setVideos(prev => [data.data, ...prev]);
        setIsAddModalOpen(false);
        setFormData({
          title: '',
          career: 'Python Developer',
          skill: 'Python',
          level: 'Beginner',
          channelName: 'freeCodeCamp',
          videoUrl: 'https://example.com/video/sample',
          thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
          duration: '20 mins',
          description: ''
        });
      } else {
        alert(data.message || 'Failed to add video');
      }
    } catch (err) {
      console.error('Error creating video:', err);
    }
  };

  // Update Video
  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    if (!editingVideo) return;
    try {
      const res = await fetch(`/api/admin/videos/${editingVideo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVideo)
      });
      const data = await res.json();
      if (data.success) {
        setVideos(prev => prev.map(v => v._id === editingVideo._id ? data.data : v));
        setEditingVideo(null);
      } else {
        alert(data.message || 'Failed to update video');
      }
    } catch (err) {
      console.error('Error updating video:', err);
    }
  };

  // Delete Video
  const handleDeleteVideo = async (id) => {
    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setVideos(prev => prev.filter(v => v._id !== id));
        setDeletingVideo(null);
      } else {
        alert(data.message || 'Failed to delete video');
      }
    } catch (err) {
      console.error('Error deleting video:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Video size={24} color="#f472b6" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                Learning Video Management
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.15rem' }}>
              Manage tutorial videos, YouTube URLs, channel attributes, and thumbnails across all career paths.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={fetchVideos} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.55rem 1.1rem' }}>
              <Plus size={16} /> Add Video
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by video title, channel, skill..."
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

      {/* Videos Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading video records...</p>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Video size={40} color="var(--text-muted)" style={{ opacity: 0.5 }} />
          <h3 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>No videos available yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Add a video from the Admin panel to populate the catalog.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {filteredVideos.map(video => (
            <div key={video._id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ position: 'relative', height: '150px', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                  <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(236, 72, 153, 0.9)', padding: '0.6rem', borderRadius: '50%', display: 'flex' }}>
                      <Play size={20} color="#fff" style={{ marginLeft: '2px' }} />
                    </div>
                  </div>
                  <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                    {video.duration}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
                    {video.title}
                  </h3>
                  <span className="badge-level level-intermediate" style={{ fontSize: '0.65rem' }}>
                    {video.level}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#f472b6', fontWeight: 700, marginBottom: '0.5rem' }}>
                  📺 {video.channelName} • <span style={{ color: 'var(--text-muted)' }}>{video.skill}</span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {video.description || 'Interactive tutorial video guide.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontWeight: 600 }}>
                  <ExternalLink size={13} /> Watch URL
                </a>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => setEditingVideo(video)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                    <Edit2 size={13} /> Edit
                  </button>
                  <button onClick={() => setDeletingVideo(video)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD VIDEO MODAL */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '560px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Add New Learning Video</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateVideo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Video Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Python Full Course for Beginners" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Target Career *</label>
                  <select value={formData.career} onChange={e => setFormData({ ...formData, career: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    {careersList.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Associated Skill *</label>
                  <input required type="text" value={formData.skill} onChange={e => setFormData({ ...formData, skill: e.target.value })} placeholder="e.g. Python, React" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Channel Name *</label>
                  <input required type="text" value={formData.channelName} onChange={e => setFormData({ ...formData, channelName: e.target.value })} placeholder="e.g. freeCodeCamp.org" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
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

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Video URL *</label>
                <input required type="text" value={formData.videoUrl} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Thumbnail Image URL</label>
                <input type="text" value={formData.thumbnailUrl} onChange={e => setFormData({ ...formData, thumbnailUrl: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT VIDEO MODAL */}
      {editingVideo && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '560px', padding: '2rem', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Edit Video Details</h3>
              <button onClick={() => setEditingVideo(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateVideo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Video Title</label>
                <input required type="text" value={editingVideo.title} onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Target Career</label>
                  <select value={editingVideo.career} onChange={e => setEditingVideo({ ...editingVideo, career: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }}>
                    {careersList.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Associated Skill</label>
                  <input required type="text" value={editingVideo.skill} onChange={e => setEditingVideo({ ...editingVideo, skill: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Video URL</label>
                <input required type="text" value={editingVideo.videoUrl} onChange={e => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Thumbnail Image URL</label>
                <input type="text" value={editingVideo.thumbnailUrl} onChange={e => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#0f172a', color: '#fff', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingVideo(null)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Update Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingVideo && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-in">
          <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <Trash2 size={40} color="#f43f5e" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Delete Video?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 1.5rem' }}>
              Are you sure you want to delete <strong style={{ color: '#fff' }}>"{deletingVideo.title}"</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setDeletingVideo(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => handleDeleteVideo(deletingVideo._id)} className="btn btn-secondary" style={{ background: '#f43f5e', color: '#fff', borderColor: '#f43f5e' }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
