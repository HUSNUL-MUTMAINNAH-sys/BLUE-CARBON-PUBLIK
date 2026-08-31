import EmptyState from '../common/EmptyState';
import './mrv.css';

export default function ActivityTimeline({ activities }) {
  if (!activities?.length) {
    return <EmptyState title="Belum ada aktivitas tercatat." />;
  }

  return (
    <ul className="activity-list">
      {activities.map((a) => (
        <li key={a.id}>
          <span className="activity-dot" />
          <div>
            <strong>{a.title}</strong>
            <span className="activity-time">{a.date} · {a.time}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
