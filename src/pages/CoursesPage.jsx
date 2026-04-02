import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import GradeFilter from '../components/GradeFilter';
import { courses as initialCourses, gradeGroups } from '../data/coursesData';
import { getFromFirebase } from '../firebase';
import './CoursesPage.css';

export default function CoursesPage() {
  const [activeGroup, setActiveGroup] = useState('all');
  const [search, setSearch] = useState('');
  const [customCourses, setCustomCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const coursesDoc = await getFromFirebase('pencil_data', 'courses');
      if (coursesDoc?.list) {
        setCustomCourses(coursesDoc.list);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const allCourses = [...initialCourses, ...customCourses];

  const filteredCourses = allCourses.filter((c) => {
    const matchesGroup = activeGroup === 'all' || c.category === activeGroup;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <main className="courses-page" id="courses-page">
      <section className="section courses-page__hero">
        <div className="container">
          <h1 className="section-title gradient-text">Our Courses</h1>
          <p className="section-subtitle">
            Handwriting, Drawing, Calligraphy & Tuition — for ages 5 and above
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="courses-page__search" id="course-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <GradeFilter groups={gradeGroups} activeGroup={activeGroup} onSelect={setActiveGroup} />

          {loading ? (
             <div style={{textAlign: 'center', padding: '40px 0'}}>
               <span className="admin-loading-badge">🔄 Loading dynamic cloud courses...</span>
             </div>
          ) : (
             <>
               <p className="courses-page__count">Showing {filteredCourses.length} courses</p>

               <div className="courses-page__grid">
                 {filteredCourses.map((course) => (
                   <CourseCard key={course.id} course={course} />
                 ))}
               </div>

               {filteredCourses.length === 0 && (
                 <div className="courses-page__empty">
                   <p>No courses found. Try a different filter or search.</p>
                 </div>
               )}
             </>
          )}
        </div>
      </section>
    </main>
  );
}
