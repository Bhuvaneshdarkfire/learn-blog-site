import { useState, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../data/coursesData';
import pencilLogo from '../pencil logo.jpeg';
import { saveToFirebase, getFromFirebase } from '../firebase';
import './AdminPage.css';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  
  const [customCourses, setCustomCourses] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loadingConfig, setLoadingConfig] = useState(false);
  
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', icon: '📚', category: 'handwriting',
    grade: 'Age: 6+', duration: '', schedule: '', mode: 'Online & Offline',
    fees: 'DM for Details',
  });

  const [driveLink, setDriveLink] = useState('');

  // Initial Auth Check
  useEffect(() => {
    const auth = localStorage.getItem('pencil_admin_auth');
    if (auth === 'true') setIsLoggedIn(true);
  }, []);

  // Fetch Data from Firebase when Logged In
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchCloudData = async () => {
      setLoadingConfig(true);
      const coursesDoc = await getFromFirebase('pencil_data', 'courses');
      if (coursesDoc?.list) setCustomCourses(coursesDoc.list);
      
      const galleryDoc = await getFromFirebase('pencil_data', 'gallery');
      if (galleryDoc?.images) setGalleryImages(galleryDoc.images);
      
      const contentDoc = await getFromFirebase('pencil_data', 'content');
      if (contentDoc?.data) setSiteContent(contentDoc.data);
      
      setLoadingConfig(false);
    };
    fetchCloudData();
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('pencil_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('pencil_admin_auth');
  };

  /* ----- COURSES ----- */
  const saveCourse = async () => {
    if (!courseForm.title || !courseForm.description) return;
    let updated;
    if (editingCourse !== null) {
      updated = customCourses.map((c, i) => i === editingCourse ? { ...courseForm, id: c.id } : c);
    } else {
      updated = [...customCourses, { ...courseForm, id: Date.now().toString() }];
    }
    setCustomCourses(updated);
    await saveToFirebase('pencil_data', 'courses', { list: updated });
    
    setCourseForm({ title: '', description: '', icon: '📚', category: 'handwriting', grade: 'Age: 6+', duration: '', schedule: '', mode: 'Online & Offline', fees: 'DM for Details' });
    setEditingCourse(null);
    setShowCourseForm(false);
  };

  const deleteCourse = async (index) => {
    if(!window.confirm("Delete course?")) return;
    const updated = customCourses.filter((_, i) => i !== index);
    setCustomCourses(updated);
    await saveToFirebase('pencil_data', 'courses', { list: updated });
  };

  const editCourse = (index) => {
    setCourseForm(customCourses[index]);
    setEditingCourse(index);
    setShowCourseForm(true);
  };

  /* ----- GALLERY (Google Drive Links) ----- */
  const extractDriveId = (url) => {
    const match = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)(&|$)/);
    return match ? match[1] : null;
  };

  const handleAddDriveImage = async () => {
    if (!driveLink) return;
    const id = extractDriveId(driveLink);
    if (!id) {
      alert("Invalid Google Drive link format. It should contain /file/d/... or id=...");
      return;
    }
    
    // Direct display URL trick for Google Drive
    const directUrl = `https://drive.google.com/uc?export=view&id=${id}`;
    
    const newImg = { 
      id: Date.now().toString(), 
      src: directUrl, 
      name: `Drive Image - ${id.substring(0, 6)}`, 
      date: new Date().toLocaleDateString() 
    };
    
    const updated = [newImg, ...galleryImages];
    setGalleryImages(updated);
    setDriveLink('');
    await saveToFirebase('pencil_data', 'gallery', { images: updated });
  };

  const deleteImage = async (id) => {
    if(!window.confirm("Delete this image?")) return;
    const updated = galleryImages.filter(img => img.id !== id);
    setGalleryImages(updated);
    await saveToFirebase('pencil_data', 'gallery', { images: updated });
  };

  /* ----- CONTENT ----- */
  const updateContent = async (key, value) => {
    const updated = { ...siteContent, [key]: value };
    setSiteContent(updated);
    await saveToFirebase('pencil_data', 'content', { data: updated });
  };

  if (!isLoggedIn) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-card glass-card">
          <img src={pencilLogo} alt="Pencil Classes" className="admin-login__logo" />
          <h1 className="admin-login__title">Admin Login</h1>
          <p className="admin-login__subtitle">Pencil Classes Dashboard</p>
          <form onSubmit={handleLogin} className="admin-login__form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login__input"
              autoFocus
            />
            {error && <p className="admin-login__error">{error}</p>}
            <button type="submit" className="btn btn-primary admin-login__btn">Login</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="section-title gradient-text">Admin Dashboard</h1>
            {loadingConfig && <span className="admin-loading-badge">🔄 Syncing Cloud...</span>}
          </div>
          <button onClick={handleLogout} className="btn btn-secondary admin-logout">Logout</button>
        </div>

        <div className="admin-tabs">
          {['courses', 'gallery', 'content'].map(tab => (
            <button key={tab} className={`admin-tab ${activeTab === tab ? 'admin-tab--active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab === 'courses' ? '📚 Courses' : tab === 'gallery' ? '🖼️ Cloud Gallery' : '✏️ Site Editor'}
            </button>
          ))}
        </div>

        {activeTab === 'courses' && (
           <div className="admin-section">
           <div className="admin-section__header">
             <h2>Manage Cloud Courses</h2>
             <button className="btn btn-primary" onClick={() => { setShowCourseForm(!showCourseForm); setEditingCourse(null); setCourseForm({ title: '', description: '', icon: '📚', category: 'handwriting', grade: 'Age: 6+', duration: '', schedule: '', mode: 'Online & Offline', fees: 'DM for Details' }); }}>
               {showCourseForm ? 'Cancel' : '+ Add Course'}
             </button>
           </div>
           
           {/* ...rest of the course UI... */}
            {showCourseForm && (
              <div className="admin-form glass-card">
                <h3>{editingCourse !== null ? 'Edit Course' : 'New Course'}</h3>
                <div className="admin-form__grid">
                  <input placeholder="Course Title" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} />
                  <input placeholder="Emoji Icon (e.g. 📚)" value={courseForm.icon} onChange={e => setCourseForm({...courseForm, icon: e.target.value})} />
                  <select value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})}>
                    <option value="handwriting">Handwriting</option>
                    <option value="drawing">Drawing</option>
                    <option value="tuition">Tuition</option>
                    <option value="calligraphy">Calligraphy</option>
                  </select>
                  <input placeholder="Age/Grade (e.g. Age: 6+)" value={courseForm.grade} onChange={e => setCourseForm({...courseForm, grade: e.target.value})} />
                  <input placeholder="Duration (e.g. 15 Days)" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} />
                  <input placeholder="Schedule (e.g. Daily)" value={courseForm.schedule} onChange={e => setCourseForm({...courseForm, schedule: e.target.value})} />
                  <select value={courseForm.mode} onChange={e => setCourseForm({...courseForm, mode: e.target.value})}>
                    <option value="Online & Offline">Online & Offline</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                  <input placeholder="Fees" value={courseForm.fees} onChange={e => setCourseForm({...courseForm, fees: e.target.value})} />
                </div>
                <textarea placeholder="Course Description" value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} rows={3} />
                <button className="btn btn-primary" onClick={saveCourse}>{editingCourse !== null ? 'Update Cloud' : 'Save to Cloud'}</button>
              </div>
            )}

            <div className="admin-courses-list">
              {customCourses.length === 0 && <p className="admin-empty">No dynamic courses yet.</p>}
              {customCourses.map((course, i) => (
                <div key={course.id} className="admin-course-item glass-card">
                  <div className="admin-course-item__info">
                    <span className="admin-course-item__icon">{course.icon}</span>
                    <div>
                      <h4>{course.title}</h4>
                      <p>{course.category} • {course.grade} • {course.duration}</p>
                    </div>
                  </div>
                  <div className="admin-course-item__actions">
                    <button onClick={() => editCourse(i)} className="btn btn-secondary btn-sm">Edit</button>
                    <button onClick={() => deleteCourse(i)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2>Add Images via Google Drive</h2>
            </div>
            
            <div className="glass-card" style={{padding: '24px', marginBottom: '24px'}}>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px'}}>
                Upload photos to Google Drive, Make sure the sharing is set to <strong>"Anyone with the link"</strong>, and paste the link below.
              </p>
              <div style={{display: 'flex', gap: '12px'}}>
                <input 
                  type="text" 
                  autoFocus
                  style={{flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)'}} 
                  placeholder="Paste Google Drive Share Link here..." 
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddDriveImage}>Add Image</button>
              </div>
            </div>

            <p className="admin-gallery-count">{galleryImages.length} images fetching from Cloud</p>
            <div className="admin-gallery-grid">
              {galleryImages.map(img => (
                <div key={img.id} className="admin-gallery-item">
                  <img src={img.src} alt={img.name} loading="lazy" />
                  <div className="admin-gallery-item__overlay">
                    <span>{img.name}</span>
                    <button onClick={() => deleteImage(img.id)} className="btn btn-danger btn-sm">🗑️ Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="admin-section">
            <h2>Edit Site Variables</h2>
            <div className="admin-content-form glass-card">
              <div className="admin-content-field">
                <label>Hero Tagline</label>
                <input value={siteContent.heroTagline || ''} onBlur={e => updateContent('heroTagline', e.target.value)} onChange={e => setSiteContent({...siteContent, heroTagline: e.target.value})} placeholder="Kids After School Program" />
              </div>
              <div className="admin-content-field">
                <label>Announcement Banner</label>
                <input value={siteContent.announcement || ''} onBlur={e => updateContent('announcement', e.target.value)} onChange={e => setSiteContent({...siteContent, announcement: e.target.value})} placeholder="e.g. Summer classes starting soon!" />
              </div>
              <div className="admin-content-field">
                <label>WhatsApp Number</label>
                <input value={siteContent.whatsapp || ''} onBlur={e => updateContent('whatsapp', e.target.value)} onChange={e => setSiteContent({...siteContent, whatsapp: e.target.value})} placeholder="9488286292" />
              </div>
              <p className="admin-content-saved">✅ Blurring input auto-saves to Firebase</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
