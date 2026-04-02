import { useState, useMemo } from 'react';
import CourseCard from '../components/CourseCard';
import GradeFilter from '../components/GradeFilter';
import { courses, gradeGroups } from '../data/coursesData';
import './CoursesPage.css';

export default function CoursesPage() {
  const [activeGroup, setActiveGroup] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = courses;
    if (activeGroup !== 'all') {
      result = result.filter((c) => c.group === activeGroup);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.grade.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeGroup, search]);

  return (
    <main className="courses-page" id="courses-page">
      <section className="courses-page__hero">
        <div className="container">
          <h1 className="section-title">Our Courses</h1>
          <p className="section-subtitle">
            Explore our comprehensive curriculum designed for every learning stage from KG to 12th Grade
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Search */}
          <div className="courses-page__search" id="course-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="courses-page__search-input"
              id="course-search-input"
            />
          </div>

          {/* Filter */}
          <GradeFilter
            groups={gradeGroups}
            activeGroup={activeGroup}
            onSelect={setActiveGroup}
          />

          {/* Results */}
          <div className="courses-page__count">
            Showing {filtered.length} course{filtered.length !== 1 ? 's' : ''}
          </div>

          {filtered.length > 0 ? (
            <div className="courses-page__grid">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="courses-page__empty">
              <span className="courses-page__empty-icon">🔍</span>
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
