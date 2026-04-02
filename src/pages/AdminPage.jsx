import { useState, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../data/coursesData';
import pencilLogo from '../pencil logo.jpeg';
import './AdminPage.css';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const [customCourses, setCustomCourses] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', icon: '📚', category: 'handwriting',
    grade: 'Age: 6+', duration: '', schedule: '', mode: 'Online & Offline',
    fees: 'DM for Details',
  });

  useEffect(() => {
    const auth = localStorage.getItem('pencil_admin_auth');
    if (auth === 'true') setIsLoggedIn(true);
    setCustomCourses(JSON.parse(localStorage.getItem('pencil_custom_courses') || '[]'));
    setGalleryImages(JSON.parse(localStorage.getItem('pencil_gallery') || '[]'));
    setSiteContent(JSON.parse(localStorage.getItem('pencil_site_content') || '{}'));
  }, []);

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

  const saveCourse = () => {
    if (!courseForm.title || !courseForm.description) return;
    let updated;
    if (editingCourse !== null) {
      updated = customCourses.map((c, i) => i === editingCourse ? { ...courseForm, id: c.id } : c);
    } else {
      updated = [...customCourses, { ...courseForm, id: Date.now() }];
    }
    setCustomCourses(updated);
    localStorage.setItem('pencil_custom_courses', JSON.stringify(updated));
    setCourseForm({ title: '', description: '', icon: '📚', category: 'handwriting', grade: 'Age: 6+', duration: '', schedule: '', mode: 'Online & Offline', fees: 'DM for Details' });
    setEditingCourse(null);
    setShowCourseForm(false);
  };

  const deleteCourse = (index) => {
    const updated = customCourses.filter((_, i) => i !== index);
    setCustomCourses(updated);
    localStorage.setItem('pencil_custom_courses', JSON.stringify(updated));
  };

  const editCourse = (index) => {
    setCourseForm(customCourses[index]);
    setEditingCourse(index);
    setShowCourseForm(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newImg = { id: Date.now() + Math.random(), src: ev.target.result, name: file.name, date: new Date().toLocaleDateString() };
        setGalleryImages(prev => {
          const updated = [newImg, ...prev];
          localStorage.setItem('pencil_gallery', JSON.stringify(updated));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (id) => {
    const updated = galleryImages.filter(img => img.id !== id);
    setGalleryImages(updated);
    localStorage.setItem('pencil_gallery', JSON.stringify(updated));
  };

  const updateContent = (key, value) => {
    const updated = { ...siteContent, [key]: value };
    setSiteContent(updated);
    localStorage.setItem('pencil_site_content', JSON.stringify(updated));
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
          <h1 className="section-title gradient-text">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary admin-logout">Logout</button>
        </div>

        <div className="admin-tabs">
          {['courses', 'gallery', 'content'].map(tab => (
            <button key={tab} className={`admin-tab ${activeTab === tab ? 'admin-tab--active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab === 'courses' ? '📚 Courses' : tab === 'gallery' ? '🖼️ Gallery' : '✏️ Content'}
            </button>
          ))}
        </div>

        {activeTab === 'courses' && (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2>Manage Courses</h2>
              <button className="btn btn-primary" onClick={() => { setShowCourseForm(!showCourseForm); setEditingCourse(null); setCourseForm({ title: '', description: '', icon: '📚', category: 'handwriting', grade: 'Age: 6+', duration: '', schedule: '', mode: 'Online & Offline', fees: 'DM for Details' }); }}>
                {showCourseForm ? 'Cancel' : '+ Add Course'}
              </button>
            </div>

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
                <button className="btn btn-primary" onClick={saveCourse}>{editingCourse !== null ? 'Update' : 'Save'} Course</button>
              </div>
            )}

            <div className="admin-courses-list">
              {customCourses.length === 0 && <p className="admin-empty">No custom courses yet. Click "+ Add Course" to create one.</p>}
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
              <h2>Manage Gallery</h2>
              <label className="btn btn-primary" htmlFor="admin-gallery-upload">
                📷 Upload Images
              </label>
              <input type="file" id="admin-gallery-upload" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            <p className="admin-gallery-count">{galleryImages.length} images in gallery</p>
            <div className="admin-gallery-grid">
              {galleryImages.map(img => (
                <div key={img.id} className="admin-gallery-item">
                  <img src={img.src} alt={img.name} />
                  <div className="admin-gallery-item__overlay">
                    <span>{img.name}</span>
                    <button onClick={() => deleteImage(img.id)} className="btn btn-danger btn-sm">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="admin-section">
            <h2>Edit Site Content</h2>
            <div className="admin-content-form glass-card">
              <div className="admin-content-field">
                <label>Hero Tagline</label>
                <input value={siteContent.heroTagline || ''} onChange={e => updateContent('heroTagline', e.target.value)} placeholder="Kids After School Program" />
              </div>
              <div className="admin-content-field">
                <label>About Text</label>
                <textarea value={siteContent.aboutText || ''} onChange={e => updateContent('aboutText', e.target.value)} placeholder="Write about Pencil Classes..." rows={4} />
              </div>
              <div className="admin-content-field">
                <label>Announcement Banner</label>
                <input value={siteContent.announcement || ''} onChange={e => updateContent('announcement', e.target.value)} placeholder="e.g. Summer classes starting soon!" />
              </div>
              <div className="admin-content-field">
                <label>WhatsApp Number</label>
                <input value={siteContent.whatsapp || ''} onChange={e => updateContent('whatsapp', e.target.value)} placeholder="9488286292" />
              </div>
              <p className="admin-content-saved">✅ Changes save automatically</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
