import './GradeFilter.css';

export default function GradeFilter({ groups, activeGroup, onSelect }) {
  return (
    <div className="grade-filter" id="grade-filter">
      {groups.map((group) => (
        <button
          key={group.id}
          className={`grade-filter__btn ${activeGroup === group.id ? 'grade-filter__btn--active' : ''}`}
          onClick={() => onSelect(group.id)}
          id={`filter-${group.id}`}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
}
