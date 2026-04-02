import './CourseCard.css';

export default function CourseCard({ course }) {
  return (
    <div className="course-card glass-card" id={`course-card-${course.id}`}>
      <div className="course-card__header">
        <span className="course-card__icon" style={{ background: `${course.color}15` }}>
          {course.icon}
        </span>
        <span className="course-card__grade" style={{ color: course.color, borderColor: `${course.color}30` }}>
          {course.grade}
        </span>
      </div>

      <h3 className="course-card__name">{course.name}</h3>
      <p className="course-card__desc">{course.description}</p>

      <div className="course-card__meta">
        <div className="course-card__time">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {course.time}
        </div>
        <div className="course-card__duration">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
          </svg>
          {course.duration}
        </div>
      </div>

      <div className="course-card__accent" style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}88)` }} />
    </div>
  );
}
